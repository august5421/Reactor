import { auth } from "../config/dbConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

const db = getFirestore();

const AuthenticationService = {
  signup: async (formData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userDocRef = await addDoc(collection(db, "Users"), {
        email: user.email,
        firstName: formData.firstName,
        lastName: formData.lastName || null, 
        createdAt: new Date(), 
        role: 'user'
      });

      return userDocRef; 

    } catch (error) {
      console.error('Error during signup: ', error.message);
      throw new Error(error.message);
    }
  },

  login: async (formData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userQuery = query(collection(db, "Users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(userQuery);

      let userDoc = null;
      querySnapshot.forEach((doc) => {
        userDoc = { id: doc.id, ...doc.data() };
      });

      if (!userDoc) {
        throw new Error("User document not found.");
      }

      return userDoc; 
    } catch (error) {
      console.error('Error during login: ', error.message);
      throw new Error(error.message);
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Password reset email sent successfully." };
    } catch (error) {
      console.error('Error sending password reset email: ', error.message);
      throw new Error(error.message);
    }
  }
  
};

export default AuthenticationService;
