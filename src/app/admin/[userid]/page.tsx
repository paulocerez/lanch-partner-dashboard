'use client';
import { useRouter } from 'next/navigation'

import HeaderComponent from "../../dashboard/_components/header";
import AdminEditUser from '../../dashboard/_components/admin_edit_user';
import { Button } from '@tremor/react';


export default function Home({ params }: { params: { userid: string } }){
  const router = useRouter()

  return (

      <div className="">
        <HeaderComponent/>
        <Button  onClick={() => router.back()}> Zurück</Button>
        <AdminEditUser userID={params.userid}/>
      </div>

  )
}

