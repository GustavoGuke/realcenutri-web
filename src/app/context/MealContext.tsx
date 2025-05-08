"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Meal = {
    meals: string;
    description: string;
    withinDiet: boolean;
    idMeal: string;
};

type MealContextType = {
    selectedMeal: Meal | null;
    setSelectedMeal: (meal: Meal) => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);



export const MealProvider = ({ children }: { children: ReactNode }) => {
    const [selectedMeal, setSelectedMealState] = useState<Meal | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("selectedMeal");
        if (stored) {
            setSelectedMealState(JSON.parse(stored));
        }
    }, []);

    const setSelectedMeal = (meal: Meal) => {
        setSelectedMealState(meal);
        sessionStorage.setItem("selectedMeal", JSON.stringify(meal));
    };

    return (
        <MealContext.Provider value={{ selectedMeal, setSelectedMeal }}>
            {children}
        </MealContext.Provider>
    );
};

export const useMeal = () => {
    const context = useContext(MealContext);
    if (!context) throw new Error("useMeal must be used within MealProvider");
    return context;
};
