"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase/config";
import Image from "next/image";
import Spinner from "../dashboard/_components/dashboard-helpers/spinner";
import { assertWrappingType } from "graphql";
import { useAuth } from "@/app/context/AuthContext";

interface FirebaseError extends Error {
  code?: string;
}

export default function Signup() {
  const router = useRouter();
  const [signupEmail, setEmail] = useState("");
  const [signupPassword, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupError, setIsSignupError] = useState("");

  const { setHasuraToken } = useAuth();

  const signup = async () => {
    if (signupPassword !== passwordAgain) {
      setIsSignupError("The passwords do not match.");
      return;
    }
    setLoading(true);
    setIsSignupError("");
    console.log("signup started");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );

      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/api/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
          //   Hasura JWT
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setHasuraToken(data.jwtToken); // store Hasura JWT in AuthContext
      router.push("/dashboard");
    } catch (error) {
      const firebaseError = error as FirebaseError;

      switch (firebaseError.code) {
        case "auth/weak-password":
          setIsSignupError(
            "The password is too weak. It must be 6 characters long or more."
          );
          break;
        case "auth/email-already-in-use":
          setIsSignupError(
            "The email address is already in use by another account."
          );
          break;
        case "auth/invalid-email":
          setIsSignupError("The email address is not valid.");
          break;
        default:
          setIsSignupError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Image
              src="/lanch_logo_with_text.png"
              alt="LANCH Logo"
              width="150"
              height="150"
            />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrieren
          </h2>
        </div>
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Image
              src="/lanch_logo_with_text.png"
              alt="LANCH Logo"
              width="150"
              height="150"
            />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrieren
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Passwort
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Passwort wiederholen
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordagain"
                  name="passwordagain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={
                  !signupEmail ||
                  !signupPassword ||
                  !passwordAgain ||
                  signupPassword !== passwordAgain
                }
                onClick={() => signup()}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrieren
              </button>
            </div>
            {signupError && (
              <p className="text-red-500 text-sm mt-2">{signupError}</p>
            )}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Zurück zum Login?{" "}
            <button
              onClick={() => router.push("login")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Einloggen
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
