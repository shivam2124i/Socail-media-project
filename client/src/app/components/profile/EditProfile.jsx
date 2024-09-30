import { AuthContext } from '@/app/Context/AuthContext';
import { profileContext } from '@/app/Context/ProfileContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { View } from './View';


export const EditProfile = () => {
  
  const router = useRouter();
  const {getUserById,upDateUserById,removeDp}=useContext(profileContext);
  const {authData}=useContext(AuthContext)
  const [user,setUser]=useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: ""
  })

  useEffect(() => {
    fetchUserById();
  }, []);

  async function fetchUserById() {
    try {
      const data = await getUserById(authData);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit() {
    try {
      const result = await upDateUserById(authData,user)
      fetchUserById()
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async function DPRemove() {
    try {
      const result  = await removeDp(authData);
      setUser(result)
      fetchUserById()
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
      <View user={user} setUser={setUser} handleSubmit={handleSubmit} router={router} DPRemove={DPRemove} />
    </div>
  )
}
