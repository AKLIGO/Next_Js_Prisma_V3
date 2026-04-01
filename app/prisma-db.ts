import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

const seedProducts = async () =>{
    const count = await prisma.product.count();

    if(count === 0){
        await prisma.product.createMany({
            data: [
                {
                    name: "Product 1",
                    description: "Description for product 1",
                    price: 19.99,

                },

                {
                    name: "Product 2",
                    description: "Description for product 2",
                    price: 29.99,
                },

                {
                    name: "Product 3",
                    description: "Description for product 3",
                    price: 39.99,
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


export async function createProduct(name: string, description: string, price: number) {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.create({
        data: {
            name,
            description,
            price,
        },
    });
}

export async function updateProduct(id: number, name: string, description: string, price: number) {
    await new Promise((resolve)=> setTimeout(resolve,1500));
    return prisma.product.update({
        where: {
            id,
        },
        data: {
            name,
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
