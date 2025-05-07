import { HistoryDTO } from "@/app/dtos/HistoryDTO";
import { HistoryGroup } from "@/app/dtos/HistoryGroup";
import { ArrowBigRightIcon } from "lucide-react";
import Link from "next/link";


type Props = {
    sections: HistoryGroup[]
}
export const SectionList = ({ sections }: Props) => {

    console.log("sections", sections)
    return (
        <div className="max-w-md mx-auto p-4">

            {sections.length === 0 ? (
                <p>Nenhuma refeição cadastrada</p>
            ) : (
                sections.map((section, index) => (
                    <div key={index} className="mb-4 mt-6">
                        <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                        <ul className="list-disc ">
                            {section.data.map((item: HistoryDTO, idx) => (
                                <li key={idx} className="text-gray-700 list-none py-2 border mt-1 p-1 bg-white hover:bg-gray-100 font-semibold rounded-md  border-gray-400">
                                    <Link href={`../FoodDiary/UpdateMeal?item=${encodeURIComponent(JSON.stringify(item))}`} className="flex justify-between ">
                                        {item.meals} - {item.withinDiet ? "Dentro da dieta" : "Fora da dieta"}
                                        <ArrowBigRightIcon />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};