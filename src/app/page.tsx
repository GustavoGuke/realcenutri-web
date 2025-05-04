"use client";
import Image from "next/image";
import { CardPercent } from "./components/CardPercent";
import { Header } from "./components/Header";
import { Button } from "@/components/ui/button";
import { ArrowBigRightIcon } from "lucide-react";
import { SectionList } from "./components/SectionList";
import Link from "next/link";

export default function Home() {
  const sections = [
    {
      title: "Frutas",
      data: ["Banana", "Maçã", "Laranja"],
    },
    {
      title: "Verduras",
      data: ["Alface", "Couve", "Espinafre"],
    },
    {
      title: "Grãos",
      data: ["Arroz", "Feijão", "Lentilha"],
    },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      <Header>Aplicativo Realcenutri</Header>
      <div className="mx-auto w-70 md:w-150 text-center">
        <CardPercent title={80} onFoodMeals={() => <Link href="/new-meal">Adicionar refeição</Link>} />

        <div className="mt-10 flex justify-between">
          <Link href="/FoodDiary/NewMeal">
            <Button
              className="mx-auto w-70 md:w-150 text-center bg-teal-600 hover:bg-teal-500" >
              <p className="flex-1">Adicionar refeição</p>
              <ArrowBigRightIcon />
            </Button>
          </Link>
        </div>
        
      </div>

      <div>
        <SectionList sections={sections}/>
      </div>
    </div>
  );
}
