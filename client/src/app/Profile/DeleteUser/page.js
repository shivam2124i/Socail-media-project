"use client"

import React, { useContext, useEffect } from 'react'
import { DeleteUserpage } from '../../components/deleteUser/Main'
import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import { handler } from '@/Utils/constants';

const page = () => {
  const router = useRouter();
  const {authData}=useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <div>
        <DeleteUserpage/>
    </div>
  )
}

export default page