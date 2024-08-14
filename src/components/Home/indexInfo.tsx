export function InfoHomeComponent() {
  return (
    <div className="relative z-10 m-5">
      <h1 className="text-5xl text-[#FF3E1A] font-extrabold text-center mb-10">
        ¡Bienvenido a FitHub!
      </h1>
      <br></br>
      <h2 className="text-2xl text-[#97D6DF] font-extrabold text-center mx-36 mb-10">
        En FitHub, creemos que el bienestar es una elección diaria. Te ofrecemos
        dos emocionantes opciones para comenzar tu viaje.
      </h2>
      <br></br>
      <div className="flex gap-96 items-center justify-center">
        <div className="flex-1 max-w-md mx-6 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-2xl font-bold text-center">
            Rutinas Personalizadas:{" "}
          </h3>
          <p>
            Descarga nuestras rutinas de ejercicios diseñadas por expertos y
            guárdalas en tu perfil de usuario para acceder a ellas en cualquier
            momento. ¡Nunca pierdas el ritmo!
          </p>
        </div>
        <div className="flex-1 max-w-md mx-6 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-2xl font-bold text-center">
            Planes de Entrenamiento Presencial:{" "}
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
