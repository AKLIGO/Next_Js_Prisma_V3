"use client";
import { useFormStatus } from "react-dom";
export const submitProduct =()=>{

    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
        >
            {pending ? "Creating..." : "Create Product"}
        </button>
    );
}