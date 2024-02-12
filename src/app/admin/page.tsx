'use client';

import HeaderComponent from "../dashboard/_components/dashboard-helpers/header";
import AdminUserList from "../dashboard/_components/admin/admin_user_list";

export default function Home(){

  return (

      <div className="">
        <HeaderComponent/>
        <AdminUserList/>
      </div>

  )
}

