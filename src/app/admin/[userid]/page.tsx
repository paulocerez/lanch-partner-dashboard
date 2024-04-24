"use client";
import { useRouter } from "next/navigation";

import HeaderComponent from "../../../components/dashboard/dashboard-helpers/Header";
import AdminEditUser from "../../../components/dashboard/admin/AdminEditUser";
import { Button } from "@tremor/react";

export default function Home({ params }: { params: { userid: string } }) {
  const router = useRouter();

  return (
    <div className="">
      <HeaderComponent />
      <Button onClick={() => router.back()}> Zurück</Button>
      <AdminEditUser userID={params.userid} />
    </div>
  );
}
