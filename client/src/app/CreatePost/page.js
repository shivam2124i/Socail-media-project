"use client"
import React, { useContext, useEffect } from 'react'
import { CreatePost } from '../components/Posts/CreatePost'
import { Header } from '../components/Header/main'
import { AuthContext } from '../Context/AuthContext'
import { handler } from '@/Utils/constants'

import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const {authData}=useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <div>
      <Header/>
      <CreatePost/>
    </div>
  )
}

export default page
