import { FormEvent, useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./_services/api";

interface CustomersProps {
    id: string;
    name: string;
    email: string;
    status: boolean;
    created_at: string;
}

export default function App() {
    const [customers, setCustomers] = useState<CustomersProps[]>([]);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!nameRef.current?.value || !emailRef.current?.value) {
            throw new Error("preencha todos os dados");
        }

        const response = await api.post("/customer", {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
        });

        setCustomers([...customers, response.data]);
    }

    async function handleDelete(id: string) {
        try {
            await api.delete("/customer", {
                params: {
                    id: id,
                },
            });

            const allCustomers = customers.filter(
                (customer) => customer.id !== id
            );
            setCustomers(allCustomers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadCustomers();
    }, []);

    async function loadCustomers() {
        const response = await api.get("/customers");
        setCustomers(response.data);
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-w-2xl">
                <h1 className="text-4xl text-white font-medium">Clientes</h1>

                <form className="flex flex-col my-6" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="font-medium text-white">
                        Nome:
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu nome completo..."
                        id="name"
                        className="w-full mb-5 p-2 rounded"
                        ref={nameRef}
                    />
                    <label htmlFor="email" className="font-medium text-white">
                        Email:
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu email..."
                        id="email"
                        className="w-full mb-5 p-2 rounded"
                        ref={emailRef}
                    />

                    <input
                        type="submit"
                        value="Cadastrar"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    />
                </form>

                <section className="flex flex-col gap-4">
                    {customers.map((customer) => (
                        <article
                            key={customer.id}
                            className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200 "
                        >
                            <p>
                                <span className="font-medium">Nome:</span>{" "}
                                {customer.name}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{" "}
                                {customer.email}
                            </p>
                            <p>
                                <span className="font-medium">Status:</span>{" "}
                                {customer.status ? "ATIVO" : "INATIVO"}
                            </p>

                            <button
                                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded absolute right-1 top-1"
                                onClick={() => handleDelete(customer.id)}
                            >
                                <FiTrash size={18} color="#fff" />
                            </button>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
}
