import { RegisterComponet } from "../../components/Register";
import Link from "next/link";

export default function Register() {
  return (
    <div className="z-10 relative">
      <Link href="/">
        <button className="m-4 absolute  z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <RegisterComponet />
    </div>
  );
}
