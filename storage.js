import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection, 
    addDoc, 
    getDocs, 
    writeBatch, 
    doc,
    serverTimestamp,
    query,
    orderBy,
    updateDoc
} from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDhxx1VCfEVkVCDbHrPq4C4L0Ew_fF9VTA",
    authDomain: "todo-8bfd2.firebaseapp.com",
    projectId: "todo-8bfd2",
    storageBucket: "todo-8bfd2.firebasestorage.app",
    messagingSenderId: "677722116106",
    appId: "1:677722116106:web:0eb31d1c94728fa75dcff3"
};

export function createStorage(key) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    return {
        key,
        db,
        pull: async function() {
            const ref = collection(this.db, this.key);
            const q = query(ref, orderBy("createdAt"));
            const querySnapshot = await getDocs(q);

            const Todos = [];
            
            querySnapshot.forEach((doc) => {
                Todos.push({
                    id: doc.id,
                    title: doc.data().title,
                    done: doc.data().done
                });
            });
            return Todos;
        }, 
        push: async function(todo) {
            try {
                const docRef = await addDoc(collection(this.db, this.key), {
                    title: todo.title,
                    done: false,
                    createdAt: serverTimestamp()
                });

                todo.id = docRef.id;

                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error addind document: ", e);
            }
        },
        delete: async function(Todos) {
            const batch = writeBatch(this.db);

            Todos.forEach((todo) => {
                const ref = doc(this.db, this.key, todo.id);
                batch.delete(ref);
            });

            console.log("удаление прошло успешно");

            await batch.commit();
        },
        update: async function (todo) {
            const ref = doc(this.db, this.key, todo.id);

            await updateDoc(ref, {
                done: todo.done
            });
        }
    }
}