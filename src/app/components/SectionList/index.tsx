"use client"
import { useMeal } from "@/app/context/MealContext";
import { HistoryDTO } from "@/app/dtos/HistoryDTO";
import { HistoryGroup } from "@/app/dtos/HistoryGroup";
import { ifError } from "assert";
import { ArrowBigRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Props = {
    sections: HistoryGroup[] | undefined
}
export const SectionList = ({ sections }: Props) => {
    const router = useRouter()
    const {setSelectedMeal} = useMeal()

    const handleNavigate = (item: HistoryDTO) => {
        setSelectedMeal(item)
        router.push("../FoodDiary/UpdateMeal")
    }

    //console.log("sections", sections)
    return (
        <div className="max-w-md mx-auto p-4">

            {sections?.length === 0 ? (
                <p>Nenhuma refeição cadastrada</p>
            ) : (
                sections?.map((section, index) => (
                    <div key={index} className="mb-4 mt-6">
                        <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                        <ul className="list-disc ">
                            {section.data.map((item: HistoryDTO, idx) => (
                                <li key={idx}
                                    onClick={() => handleNavigate(item)}
                                    className="text-gray-700 flex justify-between list-none p-3 border mt-1 p-1 bg-white hover:bg-gray-100 font-semibold rounded-md  border-gray-400"
                                >
                                    {item.meals} - {item.withinDiet ? "Dentro da dieta" : "Fora da dieta"}
                                    <ArrowBigRightIcon />
                                    {/* <Link href={`../FoodDiary/UpdateMeal?item=${encodeURIComponent(JSON.stringify(item))}`} className="flex justify-between ">
                                        {item.meals} - {item.withinDiet ? "Dentro da dieta" : "Fora da dieta"}
                                    </Link> */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};