import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "./components/Providers";
import Appbar from "./components/Appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeWorld",
  description: "Created by Rashmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen`}>
        <div
          className="h-screen w-screen bg-cover bg-center overflow-auto"
          style={{
            backgroundImage: `url('/bg5.jpg')`,
          }}
        >
           
          <Providers>
          <Appbar />
            {children}
          </Providers>
      
        </div>
      </body>
    </html>
  );
}
