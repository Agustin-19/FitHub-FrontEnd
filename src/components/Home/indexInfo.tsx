export function InfoHomeComponent() {
  return (
    <div className="relative z-10 m-5">
      <h1 className="text-4xl sm:text-5xl text-[#FF3E1A] font-extrabold text-center mb-8 sm:mb-10">
        ¡Bienvenido a FitHub!
      </h1>
      <h2 className="text-xl sm:text-2xl text-[#97D6DF] font-extrabold text-center mx-4 sm:mx-36 mb-8 sm:mb-10">
        En FitHub, creemos que el bienestar es una elección diaria. Te ofrecemos
        dos emocionantes opciones para comenzar tu viaje.
      </h2>
      <div className="flex flex-col gap-6 items-center justify-center sm:flex-row sm:gap-8">
        <div className="flex-1 max-w-md mx-4 sm:mx-6 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-xl sm:text-2xl font-bold text-center">
            Rutinas Personalizadas:
          </h3>
          <p>
            Descarga nuestras rutinas de ejercicios diseñadas por expertos y
            guárdalas en tu perfil de usuario para acceder a ellas en cualquier
            momento. Cada rutina cuenta con ejercicios adaptados a tus
            objetivos. ¡Empieza ya!
          </p>
        </div>
        <div className="flex-1 max-w-md mx-4 sm:mx-6 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-xl sm:text-2xl font-bold text-center">
            Actividades Presenciales:
          </h3>
          <p>
            Únete a nuestras clases presenciales con instructores apasionados y
            elige entre una variedad de planes mensuales adaptados a tus
            objetivos. Desde clases de baile hasta entrenamiento funcional,
            tenemos algo para todos los niveles.
          </p>
        </div>
      </div>
    </div>
  );
}
