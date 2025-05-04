import { HistoryGroup } from "@/app/dtos/HistoryGroup";


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
                    <div key={index} className="mb-4">
                        <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                        <ul className="list-disc pl-4">
                            {section.data.map((item, idx) => (
                                <li key={idx} className="text-gray-700">{item.meals} - {item.withinDiet ? "Dentro da dieta" : "Fora da dieta"}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};