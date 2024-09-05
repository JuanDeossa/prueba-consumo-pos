import { createOrder } from "../src/services/createOrder";

export const createManyOrders = async (
  quantity = 10,
  fetchOrders = async () => {}
) => {
  //
  for (let i = 0; i < quantity; i++) {
    const randomQuantity = Math.floor(Math.random() * 10) + 1;

    await createOrder({
      products: [
        {
          product_id: "918c1c33-40c1-4890-b04c-85fd12147ef7",
          price: 5000,
          quantity: 2,
        },
        {
          product_id: "3820c29a-d5bf-4d71-b750-a933bea902fa",
          price: 8000,
          quantity: randomQuantity,
        },
        {
          product_id: "d7dcd58b-2e4e-46f2-85fd-8a6799a76f30",
          price: 6500,
          quantity: 7,
        },
        {
          product_id: "a500cfe2-7667-4d8f-8306-c9824ac5e73a",
          price: 7000,
          quantity: 7,
        },
        {
          product_id: "b78177cf-d65f-4c49-b8c0-932afc336d76",
          price: 6000,
          quantity: randomQuantity,
        },
        {
          product_id: "cc40f22d-e67c-4a66-a4ed-34b41dac953f",
          price: 5000,
          quantity: 5,
        },
        {
          product_id: "bece1f85-8da0-4d9f-a938-d1661da83995",
          price: 6000,
          quantity: 7,
        },
        {
          product_id: "3cb4b61b-3a30-4079-beef-2699b74fc817",
          price: 6200,
          quantity: 7,
        },
        {
          product_id: "a5eb63f1-a3d5-4c20-9635-e0dd0a41accc",
          price: 5000,
          quantity: randomQuantity,
        },
        {
          product_id: "35dd1412-91b7-4a18-bbbe-e7c3677c0fcb",
          price: 5000,
          quantity: 7,
        },
        {
          product_id: "ad7d694f-c9d9-48ac-b3b9-f55694e143bd",
          price: 5000,
          quantity: 3,
        },
        {
          product_id: "9a6c6ccc-cbfc-46e3-977f-6beacc9a7994",
          price: 4000,
          quantity: 7,
        },
        {
          product_id: "2bb41095-0de4-4e2c-841c-89c8a62fefcf",
          price: 4000,
          quantity: randomQuantity,
        },
        {
          product_id: "d5e0f05c-7428-41dd-96d1-61a9166bebc6",
          price: 5000,
          quantity: 7,
        },
        {
          product_id: "4c44f416-225d-4491-8c1d-de9e9809f1ec",
          price: 6000,
          quantity: 7,
        },
      ],
    });
  }

  fetchOrders();
};
