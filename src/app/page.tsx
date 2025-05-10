// pages/dashboard.tsx
"use client";
import { useAuth } from "./hooks/useAuth";
import { auth } from "./firebase/conexao";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../app/public/logo.jpeg";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/Login");
        }
    }, [user, loading]);

    if (loading || !user) return <p>Carregando...</p>;

    return (
        <div className="p-6">
            <h1>Olá, {user.displayName}</h1>
            <div className="flex flex-col justify-center text-center item max-w-md mx-auto mt-5">
                <div className="flex justify-center">
                    <Image src={logo} alt="Logo" width={200} height={200} />
                </div>
                <Button onClick={() => router.push("/Home")} className="bg-teal-600 text-white p-2 mt-4 hover:bg-teal-500">Acessar diário alimentar</Button>
                <Button
                    onClick={async () => {
                        await signOut(auth);
                        router.push("/login");
                    }}
                    className="bg-red-300 text-white p-2 mt-4 hover:bg-red-200"
                >
                    Sair
                </Button>
            </div>
        </div>
    );
}
