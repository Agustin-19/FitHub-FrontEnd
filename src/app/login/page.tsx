import { LoginComponet } from "../../components/Login";

export default function Login() {
  return (
    <div className=" text-white bg-gray-100">
      <h1 className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2  text-2xl p-5 text-center">
        Ingresa a FitHub
      </h1>

      <LoginComponet />
    </div>
  );
}
