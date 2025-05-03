type Section = {
    title: string;
    data: string[];
}
export const SectionList = ({ sections }: { sections: Section[] }) => {
    return (
        <div className="max-w-md mx-auto p-4">
            {sections.map((section, index) => (
                <div key={index} className="mb-4">
                    <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                    <ul className="list-disc pl-4">
                        {section.data.map((item, idx) => (
                            <li key={idx} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};