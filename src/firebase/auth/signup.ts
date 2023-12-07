import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../config";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);

export const signupWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    //console.log("Signed up user:", user);
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("Email address already in use.");
        case "auth/invalid-email":
          throw new Error("Invalid email address.");
        case "auth/weak-password":
          throw new Error("Password is too weak.");
        default:
          console.error("Error signing up:", error);
          throw error;
      }
    } else {
      console.error("Error signing up:", error);
      //throw error;
    }
  }
};
