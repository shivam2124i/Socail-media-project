"use client"
import React, { useContext, useEffect } from 'react'
import Main from '../components/profile/Main'
import { AuthContext } from '../Context/AuthContext';
import { handler } from '@/Utils/constants';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const {authData}=useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <div><Main/></div>
  )
}

export default page