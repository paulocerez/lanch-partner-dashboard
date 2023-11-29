'use client';
import { useRouter } from 'next/navigation'

import HeaderComponent from "../../dashboard/_components/header";
import AdminEditUser from '../../dashboard/_components/admin_edit_user';

export default function Home({ params }: { params: { userid: number } }){


  return (

      <div className="">
        <HeaderComponent/>

        <AdminEditUser/>
      </div>

  )
}

