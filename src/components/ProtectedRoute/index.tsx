import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLogged } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  return <>{isLogged ? children : null}</>;
};

export default ProtectedRoute;
