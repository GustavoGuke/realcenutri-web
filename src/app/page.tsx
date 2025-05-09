// pages/dashboard.tsx
"use client";
import { useAuth } from "./hooks/useAuth";
import { auth } from "./firebase/conexao";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

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
            <Link href="/Home">Acessar diário alimentar</Link>
            <button
                onClick={async () => {
                    await signOut(auth);
                    router.push("/login");
                }}
                className="bg-gray-500 text-white p-2 mt-4"
            >
                Sair
            </button>
        </div>
    );
}
