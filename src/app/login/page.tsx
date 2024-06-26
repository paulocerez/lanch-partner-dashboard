"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import { auth, analytics } from "@/firebase/config";
import { Spinner } from "@/components/dashboard/dashboard-helpers/Loading/Spinner";
import { sendGAEvent } from "@next/third-parties/google";
import { setGAUserId, trackGAEvent } from "../../utils/googleAnalytics";
import GoogleAnalytics from "../../components/dashboard/dashboard-helpers/GoogleAnalytics";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setIsLogginError] = useState("");
  const router = useRouter();
  const { setHasuraToken, hasuraToken } = useAuth();

  function signIn(email: string, password: string) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("signing in");
        //signed in
        const user = userCredential.user;
        const token = await userCredential.user.getIdToken();
        setGAUserId(userCredential.user.uid);
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            setLoading(false);
            sendGAEvent({ event: "EmailAndPassword", value: user.email });
            trackGAEvent("login", "successfulLogin", user.email as string);
            setHasuraToken(data.jwtToken);
            router.push("/dashboard");
          } else {
            const errorText = await response.text();
            console.error("Failed to log in:", errorText);
            throw new Error("Failed to log in");
          }
        });
      })
      //   network errors
      .catch((fetchError) => {
        console.error("Network error:", fetchError);
      })
      //   firebase errors
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const loginError = error.message;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          setIsLogginError(
            "Die Kombination aus E-Mail und Passwort ist ungültig."
          );
        } else {
          setIsLogginError(
            "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut."
          );
        }
        console.log(errorCode, loginError);
      });
  }

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
            Einloggen
          </h2>
        </div>
        <Spinner />
      </div>
    );

  return (
    <>
      <GoogleAnalytics />
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
            Einloggen
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsLogginError("");
                  }}
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
                <div className="text-sm">
                  <div
                    onClick={() => router.push("/forgot-password")}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Passwort vergessen?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsLogginError("");
                  }}
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => signIn(email, password)}
                name="Login"
                disabled={!email || !password}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Einloggen
              </button>
            </div>
            {loginError && (
              <p className="text-red-500 text-sm mt-2">{loginError}</p>
            )}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Neu hier?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Registrieren
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
