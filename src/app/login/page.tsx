import { LoginComponet } from "../../components/Login";
import HumanScan from "../../components/HumanScan";

export default function Login() {
  return (
    <div className="flex ">
      <div className="flex-1 flex justify-center items-center">
        <HumanScan />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <LoginComponet />
      </div>
    </div>
  );
}
