"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/app/components/Spinner";
import { useEffect, useState } from "react";
import { useMeal } from "@/app/context/MealContext";
import { deleteMealStorage, updateMealStorage } from "@/app/firebase/foodDiary";
import { useRouter } from "next/navigation";
import { on } from "events";


const formSchema = z.object({
    meal: z.string().min(1, { message: "Favor preencha o campo.", }),
    description: z.string().min(1, { message: "Favor preencha o campo.", }),
    //optionRadio: z.enum(["Sim", "Nao"], { required_error: "Favor preencha o campo.", }),
})
type FormSchema = z.infer<typeof formSchema>
export default function UpdateMeal() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { selectedMeal } = useMeal()


    const defaultValues: FormSchema = {
        meal: selectedMeal?.meals || "",
        description: selectedMeal?.description || "",
        //optionRadio: selectedMeal?.withinDiet ? "Sim" : "Nao",
    }

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues, values: {
            ...defaultValues
        },
    })

    async function onSubmit(data: FormSchema) {
        setIsLoading(true)
        try {
            const response = await updateMealStorage("", selectedMeal?.idMeal || "", data)
            if(response){
                alert("Refeição alterada com sucesso")
                router.push("/")
            } else {
                alert("Ocorreu um erro ao tentar alterar refeição, tente novamente mais tarde.")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function onDelete() {
        setIsLoading(true)
        try {
            const response = await deleteMealStorage("", selectedMeal?.idMeal || "")
            if(response){
                alert("Refeição excluida com sucesso")
                router.push("/")
            } else {
                alert("Ocorreu um erro ao tentar excluir refeição, tente novamente mais tarde.")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="max-w-xl p-4 mx-auto">

                <div className="mt-2 flex justify-between items-center mx-auto">
                    <Link href="/">
                        <Button variant="outline" className="border-none" >
                            <ArrowBigLeftIcon />
                            <p className="">Voltar</p>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-center my-3 text-teal-600">
                        Alterar refeição
                    </h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto p-4">



                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <FormField
                            control={form.control}
                            name="meal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da refeição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Almoco" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Informe o nome da refeição.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mt-15">
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Almoco de frutas" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Informe a descrição da refeição.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="optionRadio"
                            render={({ field }) => (
                                <FormItem className="space-y-3 mt-5 ">
                                    <FormLabel>Esta refeição está dentro do plano alimentar? </FormLabel>
                                    <FormControl >
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="Sim" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Sim
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="Nao" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Não
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <Button type="submit" className="mx-auto mt-5  w-full  text-center bg-teal-600 hover:bg-teal-500">
                                <p className="flex-1">Salvar</p>
                                <ArrowBigRightIcon />
                            </Button>
                        )}
                        {isLoading ? (
                            <Spinner />
                        ) : (
                                <Button type="button" className="mx-auto mt-5  w-full  text-center bg-red-400 hover:bg-red-500"
                                    onClick={() => onDelete()}>
                                <p className="flex-1">Excluir</p>
                                <ArrowBigRightIcon />
                            </Button>
                        )}
                    </form>
                </Form>
            </div>
        </>
    );
}