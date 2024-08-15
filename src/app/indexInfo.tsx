export function InfoLandingComponent() {
  return (
    <div className="relative z-10 m-5">
      <h2 className="text-4xl text-[#97D6DF] font-extrabold text-center mx-auto mb-10 max-w-4xl">
        En FitHub, creemos que el bienestar es una elección diaria. Te ofrecemos
        una plataforma completa para ayudarte a mantenerte activo, saludable y
        motivado. ¿Qué puedes encontrar aquí?
      </h2>
      <div className="flex flex-col gap-4 items-center justify-center lg:flex-row md:gap-8">
        <div className="flex-1 max-w-md mx-4 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-2xl font-bold text-center">
            Rutinas Personalizadas:
          </h3>
          <p>
            Descarga rutinas de ejercicios diseñadas por expertos. Desde
            entrenamientos de fuerza hasta sesiones de yoga, tenemos algo para
            todos. Guarda tus rutinas favoritas en tu perfil para acceder a
            ellas en cualquier momento. ¡Nunca pierdas el ritmo!
          </p>
        </div>
        <div className="flex-1 max-w-md mx-4 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-2xl font-bold text-center">
            Planes de Entrenamiento Presenciales:
          </h3>
          <p>
            Prefieres el contacto humano? Únete a nuestras clases presenciales
            con instructores apasionados. Elige entre una variedad de planes
            mensuales adaptados a tus objetivos. Desde clases de baile hasta
            entrenamiento funcional, tenemos algo para todos los niveles.
          </p>
        </div>
        <div className="flex-1 max-w-md mx-4 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/10 rounded-lg text-white">
          <h3 className="text-2xl font-bold text-center">
            Para los Entrenadores:
          </h3>
          <p>
            Tú también puedes ser parte activa de FitHub. Diseña tus propias
            rutinas y véndelas en nuestra plataforma. Comparte tus conocimientos
            y ayuda a otros a alcanzar sus metas de fitness. ¡Juntos
            construiremos un estilo de vida activo y saludable!
          </p>
        </div>
      </div>
    </div>
  );
}
