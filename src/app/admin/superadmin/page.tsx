"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import AdminForm from "@/components/Admin/AdminForms/CreateAdmin";
import { jwtDecode } from "jwt-decode";

export default function AdminDashboard() {
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookie.get("token");
        if (token) {
            const decodedToken: any = jwtDecode(token);
            if (decodedToken.role === "superadmin") {
                setIsSuperAdmin(true);
            } else {
                router.push("/admin/coachs"); 
            }
        } else {
            router.push("/admin/coachs"); 
        }
    }, [router]);

    if (!isSuperAdmin) {
        return null; 
    }

    return (
        <div className=" top-32">
            <AdminForm />
        </div>
    );
}
