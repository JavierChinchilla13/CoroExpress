const ComoFunciona = () => {
  return (
    <div className="flex justify-center mb-10 px-4 z-10 ">
      <div className="bg-[#E2F3F9] py-12 px-6 w-full max-w-4xl shadow-xl rounded-2xl flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          ¿Cómo Funciona?
        </h2>
        <div className="w-full max-w-xl rounded-xl overflow-hidden shadow-md aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/"
            title="Como pedir con Coro Express"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;
