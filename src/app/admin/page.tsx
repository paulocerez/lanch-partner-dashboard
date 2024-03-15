import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import HeaderComponent from "../dashboard/_components/dashboard-helpers/header";
import AdminUserList from "../dashboard/_components/admin/admin_user_list";
import { useRouter } from "next/router";
import { useAuth } from "@/app/context/AuthContext";

interface DecodedToken {
  "https://hasura.io/jwt/claims": {
    "x-hasura-user-role": string;
  };
}

export default function Admin() {
  const router = useRouter();
  const { hasuraToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (hasuraToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(hasuraToken);

        const hasuraClaims = decodedToken["https://hasura.io/jwt/claims"];

        if (hasuraClaims && hasuraClaims["x-hasura-user-role"] === "admin") {
          setIsAuthenticated(true);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to decode JWT: ", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [hasuraToken, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or handle redirect to login
  }

  return (
    <div>
      <HeaderComponent />
      <AdminUserList />
    </div>
  );
}
