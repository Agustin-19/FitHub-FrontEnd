import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { UsersProvider } from "@/context/userContext";
import "@/app/globals.css";
import { RutinaProvider } from "@/context/trainingContext";
import { PlanProvider } from "@/context/planContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "FitHub",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <RutinaProvider>
            <UsersProvider>
              <UserProvider>
                <Navbar />
                {children}
                <Footer />
              </UserProvider>
            </UsersProvider>
          </RutinaProvider>
        </PlanProvider>
      </body>
    </html>
  );
}
