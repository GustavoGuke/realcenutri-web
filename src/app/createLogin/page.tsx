// pages/login.tsx
"use client";
import { auth } from "../firebase/conexao";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Spinner } from "../components/Spinner";
import { Button } from "@/components/ui/button";
import { ArrowBigRightIcon } from "lucide-react";
import { createUsers } from "../firebase/foodDiary";


const schema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email().min(1, { message: "Email é obrigatório" }),
    password: z.string().min(6, { message: 'No mínimo 6 dígitos' }),
    confirmPassword: z.string().min(6, { message: "No mínimo 6 dígitos" })
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Senhas diferentes",
        path: ["confirmPassword"],
    }
);
type FormSchema = z.infer<typeof schema>

export default function createLogin() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const form = useForm<FormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = async (data: FormSchema) => {
        setIsLoading(true)
        if (data.email === '' || data.password === '' || data.name === '') {
            alert('Nome, email e senha devem ser informados');
            setIsLoading(false);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password.trim());
            if (!userCredential) return
            const user = userCredential.user
            // Atualiza o displayName do usuário
            //await user.updateProfile({ displayName: data.name });

            // Envia email de verificação
            //await user.sendEmailVerification();

            const res = await createUsers(user.uid, data.name, data.email);
            if(res){
                router.push("/");
            } else {
                alert("Erro ao tentar salvar o usuário")
                return
            }
        } catch (error:any) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Erro: Email já cadastrado');
              } else if (error.code === 'auth/invalid-email') {
                alert('Erro: Email inválido');
              } else if (error.code === 'auth/weak-password') {
                alert('Erro: Senha fraca (mínimo 6 caracteres)');
              } else {
                console.error(error);
                alert('Erro ao criar conta. Tente novamente.');
              }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto space-y-4">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Informe seu nome
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Informe seu Email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Informe a senha, minímo 6 caracteres
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirme a senha</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Falta pouco...
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Button type="submit" className="mx-auto mt-5  w-full  text-center bg-teal-600 hover:bg-teal-500">
                            <p className="flex-1">Adicionar refeição</p>
                            <ArrowBigRightIcon />
                        </Button>
                    )}
                </form>
            </Form>
            {/* <h1 className="text-xl font-bold">Criar Cadastro</h1>

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

            <button className="bg-green-500 text-white p-2 w-full" onClick={registerEmail}>
                Criar Conta com Email
            </button> */}

        </div>
    );
}
