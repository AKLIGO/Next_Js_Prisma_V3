
import { createProduct as createProductInDb } from "../prisma-db";
import { submitProduct as SubmitProduct } from "@/component/submit";
import {redirect} from "next/navigation";
import { useActionState } from "react";

type Errors = {
    title?: string;
    description?: string;
    price?: string;
};

type FormState = {
    errors: Errors;
};

export default function AddProductPage(){

    const initialState: FormState = {
        errors: {},
    };

    const [state, formAction, isPending] = useActionState(createProductAction,initialState);

        async function createProductAction(formData: FormData){

            "use server";
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
    

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#cffafe,_#fef3c7_50%,_#ffffff)] px-4 py-10 text-zinc-900">
            <form
                action={formAction}
                className="mx-auto w-full max-w-xl rounded-3xl border border-zinc-200/70 bg-white/85 p-6 shadow-xl shadow-cyan-100/60 backdrop-blur-sm md:p-8"
            >
                <header className="mb-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Back Office</p>
                    <h1 className="mt-2 text-2xl font-bold md:text-3xl">Ajouter un produit</h1>
                    <p className="mt-2 text-sm text-zinc-600">Remplis le formulaire pour enregistrer un nouveau produit.</p>
                </header>

                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-zinc-700">
                        Title
                        <input
                            type="text"
                            name="title"
                            className="mt-1.5 block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                            placeholder="Ex: Product Alpha"
                        />
                    </label>
                    

                    {state.errors.title && <p className="text-sm text-red-500">{state.errors.title}</p>}
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-zinc-700">
                        Description
                        <textarea
                            name="description"
                            className="mt-1.5 block min-h-28 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                            placeholder="Décris brièvement le produit"
                        />
                    </label>

                    {state.errors.description && <p className="text-sm text-red-500">{state.errors.description}</p>}
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-zinc-700">
                        Price
                        <input
                            type="number"
                            name="price"
                            className="mt-1.5 block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                            min={0}
                            step="1"
                        />
                    </label>

                    {state.errors.price && <p className="text-sm text-red-500">{state.errors.price}</p>}
                    </div>
                </div>

                <button
                
                    type="submit"
                    disabled={isPending}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
                >
                    {isPending ? "Creating..." : "Create Product"}

                </button>

                {/* <SubmitProduct /> */}
            </form>
        </main>
    );

}