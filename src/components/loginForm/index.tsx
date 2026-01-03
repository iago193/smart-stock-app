export default function LoginForm() {
  const styleInput =
    "bg-gray-300/50 p-2 rounded-md focus:outline-2 outline-blue-300";
  return (
    <div className="w-full h-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="p-5 shadow-2xl rounded-2xl w-1xl bg-white/50 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-white border-b-2 border-b-gray-300 py-2 mb-5">Faça login</h2>
          <form action="" className="text-md text-white">
            <div className="flex flex-col font-bold gap-2">
              <label htmlFor="name">Nome</label>
              <input
                className={`${styleInput}`}
                id="name"
                name="name"
                type="text"
              />

              <label className="" htmlFor="email">
                E-mail:
              </label>
              <input
                className={`${styleInput}`}
                id="email"
                name="name"
                type="email"
                placeholder="E-mail"
              />
            </div>
            <button className="w-full text-xl font-bold mt-2 bg-blue-500 hover:bg-blue-600 transition duration-300 p-2 rounded-md">
                Logar
            </button>
            <p className="text-sm mt-5 text-blue-400 font-bold">Esqueceu a senha? entre em contato com seu gestor!</p>
          </form>
        </div>
      </div>
    </div>
  );
}
