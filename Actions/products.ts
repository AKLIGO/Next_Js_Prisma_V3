"use server";

import { createProduct as createProductInDb } from "@/app/prisma-db";

import {redirect} from "next/navigation";

type Errors = {
    title?: string;
    description?: string;
    price?: string;
};

export type FormState = {
    errors: Errors;
};

export async function createProductAction(_prevState: FormState, formData: FormData): Promise<FormState> {

            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const price = parseInt(formData.get("price") as string, 10);

            const errors: Errors = {};

            if(!title){
                errors.title = "Title is required";
            }
            if(!description){
                errors.description = "Description is required";
            }
            if(isNaN(price) || price < 0){
                errors.price = "Price must be a positive number";
            }

            if(Object.keys(errors).length > 0){
                return {
                    errors,
                };
            }
            
            await createProductInDb(title, description, price);
            redirect("/product-db");
        }