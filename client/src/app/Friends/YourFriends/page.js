"use client"
import { YourFriends } from '@/app/components/Friends/YourFriends'
import { Header } from '@/app/components/Header/main';
import { AuthContext } from '@/app/Context/AuthContext';
import { handler } from '@/Utils/constants';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = () => {
    const router = useRouter();
    const {authData}=useContext(AuthContext);
    useEffect(()=>{
      handler(authData,router)
    },[])
  return (
    <div>
      <Header/>
      <YourFriends/>
      </div>
  )
}

export default page