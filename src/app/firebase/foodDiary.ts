import { 
    collection, 
    getDocs, 
    where, 
    orderBy, 
    query,
    addDoc,
    serverTimestamp} from "firebase/firestore";
import moment from 'moment-timezone';
import { db } from "./conexao"

export async function getFoodDiary() {
    const Id = ""

    try {
        const mealsRef = collection(db, "meals");
        const q = query(mealsRef, where('userId', '==', Id), orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);
        const dadosDoc = querySnapshot.docs.map((doc) => doc.data());


        const newData = dadosDoc.reduce((acc: any[], item: any) => {
            const createdAt = item.createdAt?.toDate?.() ?? null;
            const formattedDate = moment(createdAt).format('DD/MM/YYYY');
            const formattedHour = moment(createdAt).tz('America/Sao_Paulo').format('HH:mm');

            const existingSection = acc.find(section => section.title === formattedDate);

            const mealData = {
                hour: formattedHour,
                meals: item.meal,
                withinDiet: item.withinDiet,
                idMeal: item.idMeal,
                description: item.description,
                reasonNotDiet: item.reasonNotDiet,
                data: formattedDate
            };

            if (existingSection) {
                existingSection.data.push(mealData);
            } else {
                acc.push({
                    title: formattedDate,
                    data: [mealData]
                });
            }

            return acc;
        }, []);

        return newData;
    } catch (error) {
        console.error('Erro ao buscar histórico de refeições:', error);
        return [];
    }
}

export async function createMeal(
    userId: string | undefined,
    meal: string,
    description: string,
    withinDiet: boolean,
    reasonNotDiet: string,
    photo?: string
) {
    if (!userId) return;

    try {
        await addDoc(collection(db, "meals"), {
            userId,
            meal,
            description,
            withinDiet,
            reasonNotDiet,
            photo:"",
            createdAt: serverTimestamp(),
            idMeal: crypto.randomUUID(), // função nativa do browser
        });
        return true
    } catch (error) {
        console.error("Erro ao criar refeição:", error);
    }
}