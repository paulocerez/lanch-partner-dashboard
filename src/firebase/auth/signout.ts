import { getAuth } from "firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
