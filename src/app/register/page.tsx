import { RegisterComponet } from "../../components/Register";
import HumanScan from "../../components/HumanScan";

export default function Register() {
  return (
    <div className="flex">
      <div className="flex-1 flex justify-center items-center">
        <HumanScan />
      </div>
      <div className="flex-1 flex justify-center items-center border-l-4 border-[#FF3E1A]">
        <RegisterComponet />
      </div>
    </div>
  );
}
