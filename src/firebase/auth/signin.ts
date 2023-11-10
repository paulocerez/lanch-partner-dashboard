import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../config";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Logged in user:", user);
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-email":
          throw new Error("Invalid email address.");
        case "auth/user-disabled":
          throw new Error("This user has been disabled.");
        case "auth/user-not-found":
          throw new Error("User not found.");
        case "auth/wrong-password":
          throw new Error("Incorrect password.");
        default:
          console.error("Error logging in:", error);
          throw error;
      }
    } else {
      console.error("Error logging in:", error);
      //throw error;
    }
  }
};
