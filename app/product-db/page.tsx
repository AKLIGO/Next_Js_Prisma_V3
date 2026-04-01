import { getProducts } from "../prisma-db"

type Product={
    id: number;
    title: string;
    description: string | null;
    price: number;
}

export default async function ProductsDBPage() {
    const products: Product [] = await getProducts();
    const currency = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    });

    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-cyan-50 px-4 py-10 text-zinc-900">
            <section className="mx-auto max-w-4xl rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-xl shadow-cyan-100/40 backdrop-blur-sm md:p-8">
                <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Catalogue</p>
                        <h1 className="text-2xl font-bold md:text-3xl">Produits en base</h1>
                    </div>
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800">
                        {products.length} article{products.length > 1 ? "s" : ""}
                    </span>
                </header>

                {products.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-zinc-600">
                        Aucun produit disponible pour le moment.
                    </p>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {products.map((product) => (
                            <li
                                key={product.id}
                                className="group rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <h2 className="mb-2 text-lg font-semibold text-zinc-900 group-hover:text-cyan-700">
                                    {product.title}
                                </h2>
                                <p className="mb-4 line-clamp-3 text-sm text-zinc-600">
                                    {product.description ?? "Sans description"}
                                </p>
                                <p className="text-base font-bold text-emerald-700">
                                    {currency.format(product.price)}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}