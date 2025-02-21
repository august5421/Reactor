import { auth } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, deleteDoc, writeBatch, updateDoc, addDoc, query, where, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore"; 
import { isEqual } from 'lodash';

const db = getFirestore();

async function getDocumentById(collectionName, documentId) {
    const docRef = doc(db, collectionName, documentId);
    
    try {
        const docSnapshot = await getDoc(docRef);
        
        if (docSnapshot.exists()) {
            return docSnapshot.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}

async function addDocument(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function getAllDocuments(collectionName) {
    try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Documents:", documents);
        return documents;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

async function updateDocument(collectionName, documentId, data) {
    const docRef = doc(db, collectionName, documentId);
    try {
        await updateDoc(docRef, data);
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

async function deleteDocument(collectionName, documentId) {
    const docRef = doc(db, collectionName, documentId);
    try {
        await deleteDoc(docRef);
        console.log("Document deleted successfully");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

async function getDocumentsByField(collectionName, field, value) {
    const q = query(collection(db, collectionName), where(field, "==", value));
    try {
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Filtered Documents:", documents);
        return documents;
    } catch (error) {
        console.error("Error getting documents by field: ", error);
    }
}

async function checkIfDocumentExists(collectionName, documentId) {
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await get(docRef);
    return docSnapshot.exists();
}

async function batchWrite(dataArray) {
    const batch = writeBatch(db);
    dataArray.forEach(({ collectionName, documentId, data }) => {
        const docRef = doc(db, collectionName, documentId);
        batch.set(docRef, data);
    });
    try {
        await batch.commit();
        console.log("Batch write successful");
    } catch (error) {
        console.error("Error with batch write: ", error);
    }
}

async function getDocumentByField(collectionName, field, value) {
    const q = query(collection(db, collectionName), where(field, "==", value));
    try {
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return documents;
    } catch (error) {
        console.error("Error getting document by field: ", error);
    }
}

function listenToCollection(collectionName, callback) {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(documents);
    }, (error) => {
        console.error("Error listening to collection: ", error);
    });
    return unsubscribe;
}

async function updateConfigsInFirestore(configs) {
    try {
        for (let section of configs) {
            const { key: sectionKey, value: fields } = section;
            const q = query(collection(db, 'Configurations'), where("key", "==", sectionKey));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id; 
                const docRef = doc(db, 'Configurations', docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const docData = docSnap.data(); 

                    const isDifference = !isEqual(docData, section); 

                    if (isDifference) {
                        await updateDocument('Configurations', docId, section);
                    } else {
                        console.log(`No difference for document with ID ${docId}. No update needed.`);
                    }
                }
            } else {
                console.log(`Document with key ${sectionKey} does not exist`);
            }
        }
    } catch (error) {
        console.error("Error updating configs in Firestore: ", error);
    }
}

async function updateColorsInFirestore(colors) {
    try {
        for (let section of colors) {
            const { key: sectionKey, value: fields } = section;
            const q = query(collection(db, 'Colors'), where("key", "==", sectionKey));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id; 
                const docRef = doc(db, 'Colors', docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const docData = docSnap.data(); 

                    const isDifference = !isEqual(docData, section); 

                    if (isDifference) {
                        await updateDocument('Colors', docId, section);
                    } else {
                        console.log(`No difference for document with ID ${docId}. No update needed.`);
                    }
                }
            } else {
                console.log(`Document with key ${sectionKey} does not exist`);
            }
        }
    } catch (error) {
        console.error("Error updating configs in Firestore: ", error);
    }
}

export { 
    getDocumentById, 
    addDocument, 
    getAllDocuments, 
    updateDocument, 
    deleteDocument, 
    getDocumentsByField, 
    checkIfDocumentExists, 
    batchWrite, 
    getDocumentByField, 
    listenToCollection,
    updateConfigsInFirestore,
    updateColorsInFirestore
};
