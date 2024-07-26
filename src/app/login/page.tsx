import { LoginComponet } from "../../components/Login";
import HumanScan from "../../components/HumanScan";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export default function Login() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  if (isLogged) {
    router.push("/login");
  }
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
