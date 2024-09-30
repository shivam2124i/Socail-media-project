import React, { useContext, useEffect } from 'react'
import { AuthContext } from '@/app/Context/AuthContext';
import { RecivedRequest } from './RecivedRequest'
import { UserList } from './UserList'
import { profileContext } from '@/app/Context/ProfileContext';

export const Main = () => {
    const {authData}=useContext(AuthContext);
    const {getAllReceivedRequests,dispatch}=useContext(profileContext)

    useEffect(()=>{
        fetchHandlers()
    },[]);

    async function fetchHandlers(){
        try {
          const data= await getAllReceivedRequests(authData);
          dispatch({
            type:"GET_RECEIVED_REQUEST",
            payload:data
          })
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='container'>
    <RecivedRequest fetchHandlers={fetchHandlers}/>
    <UserList/>    
    </div>
  )
}
