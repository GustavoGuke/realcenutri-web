"use client";

import { useEffect } from "react";
import { getMeal } from "../actions/getMeals";
import { getAuth } from "firebase/auth";

export default function YourComponent() {
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            getMeal(user.uid).then((meals) => {
                console.log("Refeições:", meals);
            });
        }
    }, []);

    return <div>Exibindo refeições...</div>;
}
