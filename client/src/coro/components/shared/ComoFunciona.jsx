import imgComoFunciona from "../../../assets/ComoFunciona.jpg";

const ComoFunciona = () => {
  return (
    <div className="flex justify-center mb-10 px-4">
      <div className="bg-[#E2F3F9] py-10 px-6 w-full max-w-4xl shadow-xl rounded-lg flex flex-col md:flex-row items-center gap-6">
        {/* Imagen al lado del texto */}
        <div className="w-[200px] md:w-[250px] lg:w-[280px] shrink-0">
          <img
            src={imgComoFunciona}
            alt="Como Funciona"
            className="w-full h-auto object-cover shadow-xl rounded-lg"
          />
        </div>

        {/* Contenido de texto */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-6">¿Cómo Funciona?</h2>
          <div className="max-w-[380px]">
            <p className="text-black font-semibold">
              Información Información Información Información Información
              Información Información Información Información Información
              Información Información Información Información Información
              Información Información Información Información Información
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;
