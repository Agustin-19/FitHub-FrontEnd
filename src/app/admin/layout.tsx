import AdminNavbar from "@/components/Admin/AdminNavbar";

function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <AdminNavbar />
            <div className="flex flex-col items-center w-full flex-grow pt-16 z-10">
                <div className="w-10/12 border-x-2 border-color flex-grow">
                    <div className="flex-grow w-full flex items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;