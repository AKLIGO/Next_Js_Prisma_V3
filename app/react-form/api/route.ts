import { createProduct } from "@/app/prisma-db";

export async function POST(request: Request) {
    const body = await request.json();
    const { title, description, price } = body;
    const product = await createProduct(title, description, price);
    return new Response(JSON.stringify(product), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}