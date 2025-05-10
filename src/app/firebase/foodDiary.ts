import {
    collection,
    getDocs,
    where,
    orderBy,
    query,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
import moment from 'moment-timezone';
import { db } from "./conexao"

export async function createUsers(
    userId: string,
    name: string,
    email: string,
) {
    try {
        await addDoc(collection(db, "users"), {
            userId,
            name,
            email,
            userType: "paciente",
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Erro ao criar usuário no Firestore:", error);
        return false;
    }
}

export async function getFoodDiary(userId: string) {

    try {
        const mealsRef = collection(db, "meals");
        const q = query(mealsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

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
        //console.error('Erro ao buscar histórico de refeições:', error);
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
            photo: "",
            createdAt: serverTimestamp(),
            idMeal: crypto.randomUUID(), // função nativa do browser
        });
        return true
    } catch (error) {
        //console.error("Erro ao criar refeição:", error);
        return false
    }
}

interface Update {
    meal?: string;
    description?: string;
    //withinDiet?: boolean;
}

export async function updateMealStorage(
    userId: string,
    idMeal: string,
    update: Update
) {
    try {
        if (!userId || !idMeal) return;

        const queryRef = collection(db, "meals");
        const q = query(
            queryRef,
            where("userId", "==", userId),
            where("idMeal", "==", idMeal),
            orderBy("createdAt", "desc")
        );

        const querySnap = await getDocs(q);
        if (querySnap.empty) return [];

        const docId = querySnap.docs[0].id;
        const docRef = doc(db, "meals", docId);

        await updateDoc(docRef, { meal: update.meal, description: update.description });

        return true
    } catch (error) {
        //console.error("Erro ao atualizar refeição:", error);
        return false;

    }
}

export async function deleteMealStorage(userId: string, idMeal: string) {
    try {
        const queryRef = collection(db, "meals");
        const q = query(
            queryRef,
            where("userId", "==", userId),
            where("idMeal", "==", idMeal),
            orderBy("createdAt", "desc")
        );

        const querySnap = await getDocs(q);
        if (querySnap.empty) return [];

        const docId = querySnap.docs[0].id;
        const docRef = doc(db, "meals", docId);

        await deleteDoc(docRef);

        return true
    } catch (error) {
        //console.error("Erro ao atualizar refeição:", error);
        return false;
    }
}