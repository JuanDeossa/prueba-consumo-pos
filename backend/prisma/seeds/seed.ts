import bcrypt from "bcrypt";
import { envs } from "../../src/config/envs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const {
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
    DEVELOPER_EMAIL,
    DEVELOPER_PASSWORD,
  } = envs;

  // Crea el usuario developer
  if (DEVELOPER_EMAIL === "" || DEVELOPER_PASSWORD === "") {
    console.error(
      "No se puede crear el usuario developer por falta de credenciales en el archivo .env"
    );
  } else {
    const hashedPassword = await bcrypt.hash(DEVELOPER_PASSWORD, 10);

    const developer = await prisma.user.upsert({
      where: { email: DEVELOPER_EMAIL },
      update: {},
      create: {
        email: DEVELOPER_EMAIL,
        password: hashedPassword,
        name: "Developer User",
        role: "DEVELOPER",
      },
    });

    console.table([developer.email, developer.role]);
  }

  // Crea el usuario super administrador
  if (SUPER_ADMIN_EMAIL === "" || SUPER_ADMIN_PASSWORD === "") {
    console.error(
      "No se puede crear el usuario super administrador por falta de credenciales en el archivo .env"
    );
  } else {
    const superHashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

    const superAdmin = await prisma.user.upsert({
      where: { email: SUPER_ADMIN_EMAIL },
      update: {},
      create: {
        email: SUPER_ADMIN_EMAIL,
        password: superHashedPassword,
        name: "Super Admin User",
        role: "SUPER_ADMIN",
      },
    });

    console.table([superAdmin.email, superAdmin.role]);
  }

  // Crea 15 productos (platillos y bebidas)
  const products = [
    {
      name: "Perrito sencillo",
      description: "Clásica pizza italiana con tomate, mozzarella y albahaca.",
      price: 5000,
      stock: 50,
    },
    {
      name: "Hamburguesa Especial",
      description: "Hamburguesa con carne premium, queso cheddar y tocineta.",
      price: 8000,
      stock: 40,
    },
    {
      name: "Perrito con queso",
      description:
        "Pasta tradicional italiana con salsa de huevo, queso y panceta.",
      price: 6500,
      stock: 35,
    },
    {
      name: "Perrito especial",
      description: "Ensalada con lechuga romana, crutones y aderezo César.",
      price: 7000,
      stock: 60,
    },
    {
      name: "Perrito con tocineta",
      description: "Deliciosa sopa de tomate asado con albahaca.",
      price: 6000,
      stock: 30,
    },
    {
      name: "Hamburguesa sencilla",
      description: "Sándwich triple con pavo, tocino, lechuga y tomate.",
      price: 5000,
      stock: 45,
    },
    {
      name: "Hamburguesa con queso",
      description: "Tacos de cerdo marinado con guacamole y cebolla.",
      price: 6000,
      stock: 50,
    },
    {
      name: "Hamburguesa con tocineta",
      description: "Risotto cremoso con champiñones y parmesano.",
      price: 6200,
      stock: 25,
    },
    {
      name: "cocacola 600ml",
      description: "Bistec jugoso a la parrilla con papas fritas.",
      price: 5000,
      stock: 20,
    },
    {
      name: "manzana 600ml",
      description: "Salmón fresco horneado con espárragos y limón.",
      price: 5000,
      stock: 15,
    },
    {
      name: "quatro 600ml",
      description: "Té negro helado con limón.",
      price: 5000,
      stock: 100,
    },
    {
      name: "colombiana 600ml",
      description: "Café espresso italiano fuerte.",
      price: 4000,
      stock: 80,
    },
    {
      name: "soda kiwi 600ml",
      description: "Limonada recién exprimida.",
      price: 4000,
      stock: 90,
    },
    {
      name: "soda manzana 600ml",
      description: "Batido de fresas frescas con leche.",
      price: 5000,
      stock: 70,
    },
    {
      name: "soda mangostino 600ml",
      description: "Cerveza artesanal local.",
      price: 6000,
      stock: 50,
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
    });

    console.log(
      `Producto creado: ${createdProduct.name} (${createdProduct.price} USD)`
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("error: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
