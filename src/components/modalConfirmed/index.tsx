type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  operatorName?: string;
};

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  operatorName = "Operador",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="w-full flex justify-center items-center bg-black/30 h-screen fixed top-0 right-0 z-50">
      <div className="border-2 border-purple-400 bg-white w-[450px] p-5 rounded-2xl">
        <div className="w-full text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-700">
            Confirmar Venda
          </h2>
          <p className="text-md font-bold text-black/60">
            Operador: {operatorName}
          </p>
        </div>

        <div>
          <button
            onClick={onConfirm}
            className="w-full bg-green-500 p-2 rounded-2xl text-white font-bold text-xl hover:bg-green-600 transition duration-300"
          >
            Confirmar venda
          </button>

          <button
            onClick={onClose}
            className="w-full bg-blue-500 p-2 rounded-2xl text-white font-bold text-xl hover:bg-blue-600 transition duration-300 mt-2"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
