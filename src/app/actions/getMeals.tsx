"use server"

import { HistoryGroup } from "../dtos/HistoryGroup"
import { getFoodDiary } from "../firebase/foodDiary"

export async function getMeal() {
    try {
        const result: HistoryGroup[] = await getFoodDiary()
        return result
    } catch (error) {
        console.log(error)
    }
}