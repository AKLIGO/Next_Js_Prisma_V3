

import { useActionState } from "react";

import { getProductById } from "@/app/prisma-db";
import EditProductFormPage from "./product-edit";
import { Product } from "../page";
import { notFound } from "next/navigation";

export default async  function EditProductPage({params}:{params: Promise<{id: string}>}){


    const {id} = await params;
    const product: Product = await getProductById(parseInt(id));

    if(!product){
        notFound();
    }
 

    return (

        <EditProductFormPage product={product} />
    );

}