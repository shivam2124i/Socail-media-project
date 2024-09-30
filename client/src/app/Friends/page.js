"use client"
import React, { useContext, useEffect } from 'react' 
import { Header } from '../components/Header/main'
import { Main } from '../components/Friends/Main'
import { AuthContext } from '../Context/AuthContext'
import { handler } from '@/Utils/constants'
import { useRouter } from 'next/navigation'



const page = () => {
  const router = useRouter();
  const {authData}=useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <>
    <Header/>
    <Main/>
    
    </>
  )
}

export default page