"use client";
import Link from "next/link";
import { ArrowBigRightIcon } from "lucide-react";
import { CardPercent } from "../components/CardPercent";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { SectionList } from "../components/SectionList";
import { HistoryDTO } from "../dtos/HistoryDTO";
import { getMeal } from "../actions/getMeals";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFoodDiary } from "../firebase/foodDiary";
import { HistoryGroup } from "../dtos/HistoryGroup";
import { on } from "events";

export default  function Home() {
   const [getResult, setGetResult] = useState<HistoryGroup[]>([])
  const [loading, setLoading] = useState(true);
  //const getResult = await getMeal()
  const goodSequence = getResult?.map(item => item.data).flat().filter((withinDiet) => withinDiet.withinDiet === true).length
  const badSequence = getResult?.map(item => item.data).flat().filter((withinDiet) => withinDiet.withinDiet === false).length
  let totalSequence = goodSequence! + badSequence!
  let goodSequencePercentage = (goodSequence! / totalSequence) * 100

  async function getMeal(userId: string) {
    try {
      const result: HistoryGroup[] = await getFoodDiary(userId)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const auth = getAuth()
    const user = onAuthStateChanged(auth, async (user) => {
      if (user) {
        getMeal(user.uid).then((meals) => {
          setGetResult(meals)
        })
        setLoading(false)
      }
    })
    return () => user()
  },[])

  if (loading) return <p>Carregando...</p>
  return (
    <div className="max-w-7xl mx-auto">
      <Header>Aplicativo Realcenutri</Header>
      <div className="mx-auto w-70 md:w-150 text-center">
        <CardPercent title={Number(goodSequencePercentage) ? Number(goodSequencePercentage.toFixed(0)) : 0} />

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
