// pages/login.tsx
"use client";
import { auth } from "../firebase/conexao";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const router = useRouter();
    const { user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (user) {
        router.push("/");
        return null;
    }

    // const loginGoogle = async () => {
    //     const provider = new GoogleAuthProvider();
    //     await signInWithPopup(auth, provider);
    //     router.push("/");
    // };

    const loginEmail = async () => {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
    };

    const registerEmail = async () => {
        //await createUserWithEmailAndPassword(auth, email, password);
        router.push("/createLogin");
    };

    async function handleForgotPassword() {
        if (email.trim() === '') {
          alert('Email deve ser informado');
          return;
        }
      
        try {
          const auth = getAuth();
          await sendPasswordResetEmail(auth, email.trim());
          alert('Email enviado! Verifique sua caixa de entrada');
        } catch (error: any) {
          if (error.code === 'auth/invalid-email') {
            alert('Erro: Email inválido');
          } else if (error.code === 'auth/user-not-found') {
            alert('Erro: Usuário não encontrado');
          } else {
            console.error("Erro ao enviar email de redefinição:", error);
            alert('Erro ao enviar email de redefinição de senha');
          }
        }
      }

    return (
        <div className="p-6 max-w-md mx-auto space-y-4 mt-4">
            <h1 className="text-xl font-bold">Login</h1>

            <input
                className="border p-2 w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border p-2 w-full"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

        <button className="bg-teal-500 text-white p-2 w-full cursor-pointer rounded-2xl" onClick={loginEmail}>
                Acessar sua conta
            </button>

        <button className="bg-green-400 text-white p-2 w-full cursor-pointer rounded-2xl" onClick={registerEmail}>
                Criar conta
            </button>

            {/* <button className="bg-red-500 text-white p-2 w-full" onClick={loginGoogle}>
                Entrar com Google
            </button> */}

        <button className="pointer text-teal-950 p-2 w-full cursor-pointer" onClick={handleForgotPassword}>
                Esqueci a senha
            </button>
        </div>
    );
}
