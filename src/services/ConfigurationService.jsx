import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/dbConfig";

export const fetchConfigs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Configurations"));
    const configsArray = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (Array.isArray(docData.value)) {
          docData.value = docData.value.flat(); 
        }
        configsArray.push({
          id: doc.id,
          ...docData,
        });
    });
    return configsArray;
  } catch (error) {
    console.error("Error fetching configuration:", error);
    return [];
  }
};

export const fetchColors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Colors"));
      const colorsArray = [];
  
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (Array.isArray(docData.value)) {
          docData.value = docData.value.flat(); 
        }
        colorsArray.push({
          id: doc.id,
          ...docData,
        });
      });
      return colorsArray;
    } catch (error) {
      console.error("Error fetching colors:", error);
      return [];
    }
};

export const fetchBlogPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Blog"));
      const blogArray = [];
  
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (Array.isArray(docData.value)) {
          docData.value = docData.value.flat(); 
        }
        blogArray.push({
          id: doc.id,
          ...docData,
        });
      });
      return blogArray;
    } catch (error) {
      console.error("Error fetching colors:", error);
      return [];
    }
};
  