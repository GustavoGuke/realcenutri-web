import Link from "next/link";
import { ArrowBigRightIcon } from "lucide-react";
import { CardPercent } from "./components/CardPercent";
import { Header } from "./components/Header";
import { Button } from "@/components/ui/button";
import { SectionList } from "./components/SectionList";
import { HistoryDTO } from "./dtos/HistoryDTO";
import { getMeal } from "./actions/getMeals";


export default async function Home() {
  const getResult = await getMeal()
  
  const goodSequence = getResult?.map(item => item.data).flat().filter((withinDiet: HistoryDTO) => withinDiet.withinDiet === true).length
  const badSequence = getResult?.map(item => item.data).flat().filter((withinDiet: HistoryDTO) => withinDiet.withinDiet === false).length
  
  let totalSequence = goodSequence! + badSequence!
  let goodSequencePercentage = (goodSequence! / totalSequence) * 100


  // async function get() {
  //  try {
  //   const result = await getFoodDiary()
  //   setResult(result.map((item: HistoryGroup) => item))
  //  } catch (error) {
  //   console.log(error)
  //  }
  // }

  // useEffect(() => {
  //   get()
  // },[])

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
