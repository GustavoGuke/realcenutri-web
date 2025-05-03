import { Button } from "@/components/ui/button"
import { ArrowLongRightIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
type Props = {
    title: number 
    subtitle?: string
    onFoodMeals?: () => void
}

export const CardPercent = ({title, subtitle, onFoodMeals, ...props}: Props) => {
    return (
        <Button onClick={onFoodMeals} {...props} className={clsx("w-full justify-between p-10 cursor-pointer",
            {
                "bg-red-300 hover:bg-red-200": title <= 79,
                "bg-green-800 hover:bg-green-700": title >= 80
            }
        )} >
            <div className="flex-1">
                <h1>{title}%</h1>
                <h2>{title <= 79 ? "fora do Plano" : "dentro do Plano"}</h2>
            </div>
            <ArrowLongRightIcon/>
        </Button>
    )
}