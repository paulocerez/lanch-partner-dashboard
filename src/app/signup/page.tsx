"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase/config";
import Image from "next/image";
import Spinner from "../dashboard/_components/dashboard-helpers/spinner";

export default function Signup() {
  const [signupEmail, setEmail] = useState("");
  const [signupPassword, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signup = () => {
    setLoading(true);
    console.log("signup started");
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .then((res) => {
        console.log("registering");

        const admin_secret =
          "fFdgywmUUJRaiKLn2FVzNKbHW1nBtH81fpFjc1bRIE0JbxFN7CE0X3PpbM11wQ6J";
        const url = "https://eternal-leech-72.hasura.app/v1/graphql";
        const query = `mutation($user_id_firebase: String!, $userEmail: String) {
        insert_user(objects: [{
          user_id_firebase: $user_id_firebase, email: $userEmail, last_seen: "now()"
        }], on_conflict: {constraint: user_pkey, update_columns: [last_seen, email]}
        ) {
          affected_rows
        }
      }`;

        const variables = {
          user_id_firebase: res?.user.uid,
          userEmail: res?.user.email,
        };

        fetch(url, {
          method: "post",
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": admin_secret,
          },
          body: JSON.stringify({
            query: query,
            variables: variables,
          }),
        });
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ":", errorMessage);
      })
      .then(() => {
        setLoading(false);
        console.log("redirect after successful signup");
        router.push("/dashboard");
      });
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
