// src/renderer/src/services/n8nClient.ts
import axios from 'axios';

const N8N_WEBHOOK_URL = import.meta.env.VITE_NGROK_URL;

export const analyzeLocation = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(`${N8N_WEBHOOK_URL}/analyze`, formData);
        return response.data; // Returns JSON: { location, history, safety_score, etc. }
    } catch (error) {
        console.error("Agent communication failed:", error);
        throw error;
    }
};

// src/renderer/src/hooks/useFirestore.ts
import { db } from '../../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const useSyncData = () => {
    const syncToCloud = async (agentData: any) => {
        try {
            await addDoc(collection(db, "explorations"), {
                ...agentData,
                timestamp: serverTimestamp()
            });
            console.log("Data synced to Firestore successfully!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return { syncToCloud };
};