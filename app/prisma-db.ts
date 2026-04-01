import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const seedProducts = async () =>{
    const count = await prisma.product.count();

    if(count === 0){
        await prisma.product.createMany({
            data: [
                {
                    title: "Product 1",
                    description: "Description for product 1",
                    price: 20,

                },

                {
                    title: "Product 2",
                    description: "Description for product 2",
                    price: 30,
                },

                {
                    title: "Product 3",
                    description: "Description for product 3",
                    price: 40,
                },
            ]
        });
    }       
};

seedProducts();

export async function getProducts() {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.findMany();
}

export async function getProductById(id: number) {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.findUnique({
        where: {
            id,
        },
    });
}


export async function createProduct(title: string, description: string, price: number) {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.create({
        data: {
            title,
            description,
            price,
        },
    });
}

export async function updateProduct(id: number, title: string, description: string, price: number) {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            price,
        },
    })
}


export async function deleteProduct(id: number) {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.delete({
        where: {
            id,
        },
    });
}
