"use client";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const router = useRouter();

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSuccess(
          "Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet."
        );
        setResetError("");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        setResetError(
          "Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts. Bitte versuchen Sie es erneut."
        );
        setResetSuccess("");
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Image
              src="/lanch_logo_with_text.png"
              alt="LANCH Logo"
              width={150}
              height={150}
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Passwort vergessen
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={resetEmail}
                  disabled={!email}
                >
                  Sende Email zum Passwort zurücksetzen
                </button>
              </div>
            </form>

            {resetSuccess && (
              <div className="mt-3 text-center text-sm font-medium text-green-600">
                {resetSuccess}
              </div>
            )}

            {resetError && (
              <div className="mt-3 text-center text-sm font-medium text-red-600">
                {resetError}
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Oder gehe zurück zum
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
