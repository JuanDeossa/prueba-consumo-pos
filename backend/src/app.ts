import { server } from "./server";
import { envs } from "./config/envs";
import { usersRouter } from "./modules/users/users.route";

import authRouter from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { validateAccessMiddleware } from "./modules/auth/auth.middleware";
import { validateRole } from "./middlewares/validateRole.middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { PORT } = envs;

(async () => {
  server.use("/api/users", usersRouter);
  server.use("/api/auth", authRouter);

  server.get(
    "/api/products",
    [
      validateAccessMiddleware,
      validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN", "USER"]),
    ],
    async (_req: any, res: any) => {
      try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({});
      }
    }
  );

  server.get(
    "/api/orders",
    [
      validateAccessMiddleware,
      validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN", "USER"]),
    ],
    async (_req: any, res: any) => {
      try {
        const orders = await prisma.order.findMany({
          include: { _count: { select: { OrderItem: true } } },
        });

        const ordersResponse = orders.map((order) => {
          const { _count, ...rest } = order;

          return {
            ...rest,
            order_items_count: order._count.OrderItem,
          };
        });

        res.status(200).json(ordersResponse);
      } catch (error) {
        res.status(500).json({});
      }
    }
  );

  server.delete(
    "/api/orders/:id",
    [
      validateAccessMiddleware,
      validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN", "USER"]),
    ],
    async (req: any, res: any) => {
      const id = req.params.id;

      try {
        await prisma.order.delete({ where: { id } });

        res.status(204).json({});
      } catch (error) {
        res.status(500).json({});
      }
    }
  );

  server.post(
    "/api/orders",
    [
      validateAccessMiddleware,
      validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN", "USER"]),
    ],
    async (req: any, res: any) => {
      //
      try {
        const userId = req.body.payload.sub.id;

        const { products } = req.body;

        const total = products.reduce(
          (a: number, b: { price: number; quantity: number }) =>
            a + b.price * b.quantity,
          0
        );

        const order = await prisma.order.create({
          data: {
            user_id: userId,
            total: total,
            status: "PENDING",
            OrderItem: {
              create: products.map(
                (product: {
                  product_id: string;
                  quantity: number;
                  price: number;
                }) => ({
                  product_id: product.product_id,
                  quantity: product.quantity,
                  price: product.price,
                })
              ),
            },
          },
          include: { OrderItem: true },
        });

        res.status(201).json(order);
      } catch (error) {
        console.error(error);
        res.status(500).json({});
      }
    }
  );

  server.use(errorMiddleware);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
