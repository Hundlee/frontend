import { FiTrash } from "react-icons/fi";

export default function App() {
    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-w-2xl">
                <h1 className="text-4xl text-white font-medium">Clientes</h1>

                <form className="flex flex-col my-6">
                    <label htmlFor="name" className="font-medium text-white">
                        Nome:
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu nome completo..."
                        id="name"
                        className="w-full mb-5 p-2 rounded"
                    />
                    <label htmlFor="email" className="font-medium text-white">
                        Email:
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu email..."
                        id="email"
                        className="w-full mb-5 p-2 rounded"
                    />

                    <input
                        type="submit"
                        value="Cadastrar"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    />
                </form>

                <section className="flex flex-col">
                    <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
                        <p>
                            <span className="font-medium">Nome:</span> Gabriel
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            Gabriel@gmail.com
                        </p>
                        <p>
                            <span className="font-medium">Status:</span> ATIVO
                        </p>

                        <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded absolute right-1 top-1">
                            <FiTrash size={18} color="#fff" />
                        </button>
                    </article>
                </section>
            </main>
        </div>
    );
}
