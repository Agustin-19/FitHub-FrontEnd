import { RegisterComponet } from "../../components/Register";

export default function Register() {
  return (
    <div className=" text-black bg-gray-100">
      <h1 className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2  text-2xl p-5 text-center">
        ¿ Quieres unirte a FitHub ?
      </h1>

      <RegisterComponet />
    </div>
  );
}
