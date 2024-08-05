import Link from "next/link";

export function MercadoPagoFaild() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black rounded-3xl my-5 mx-80">
      <svg
        fill="#000000"
        width="200px"
        height="200px"
        viewBox="0 0 24 24"
        id="full-cross-circle-alt"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
      >
        <circle
          id="secondary"
          cx="12"
          cy="12"
          r="9"
          style={{ fill: "rgb(44, 169, 188)", strokeWidth: 2 }}
        ></circle>
        <path
          id="primary"
          d="M5.85,18.15l12.3-12.3M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z"
          style={{
            fill: "none",
            stroke: "rgb(0, 0, 0)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></path>
      </svg>
      <h1 className="text-2xl font-bold text-center">
        Tu pago se ha rechazado, por favor vuelve a intertarlo. Muchas Gracias
      </h1>
      <Link href="/home">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver a Intentarlo
        </button>
      </Link>
    </div>
  );
}
