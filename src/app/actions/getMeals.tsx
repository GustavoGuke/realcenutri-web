"use server"

import { HistoryGroup } from "../dtos/HistoryGroup"
import { getFoodDiary } from "../firebase/foodDiary"


export async function getMeal(userId: string) {
    try {
        const result: HistoryGroup[] = await getFoodDiary(userId)
        return result
    } catch (error) {
        console.log(error)
    }
}