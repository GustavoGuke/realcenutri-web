"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowBigRightIcon } from "lucide-react";
import { CardPercent } from "./components/CardPercent";
import { Header } from "./components/Header";
import { Button } from "@/components/ui/button";
import { SectionList } from "./components/SectionList";
import { getFoodDiary } from "./firebase/foodDiary";
import { HistoryGroup } from "./dtos/HistoryGroup";

export default function Home() {
  const [getResult, setResult] = useState<HistoryGroup[]>([]);
  async function get() {
   try {
    const result = await getFoodDiary()
    setResult(result.map((item: HistoryGroup) => item))
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    get()
  },[])

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
        <SectionList sections={getResult}/>
      </div>
    </div>
  );
}
