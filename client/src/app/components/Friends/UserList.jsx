import { AuthContext } from '@/app/Context/AuthContext';
import { profileContext } from '@/app/Context/ProfileContext'
import React, { useContext, useEffect, useState } from 'react'


export const UserList = () => {
  const {authData}= useContext(AuthContext)
  const {featchAllUser,sendFriendRequest,commonprofilePicture}=useContext(profileContext);
  const [users,setUser]=useState([]);
  useEffect(()=>{
    featchHandler()
  },[])

  async function featchHandler(){
    try {
      const data = await featchAllUser(authData);
      setUser(data)
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };




  async function SendFriendRequestHandler(id){
    try {
      const status =await sendFriendRequest(id,authData)
      if(status==200)
        featchHandler()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <hr />
    <div className='my-2 p-3 card justify-content-between'>
      <h2><strong>Find Friends</strong></h2>
      {
        users?.length==0?<>
        <p>NOTHING TO SHOW</p>
        </>:
        <>
        {
          users?.map((ele)=>{
            console.log(ele);
            return (
              <div>
                <div className='my-1 p-2 d-flex shadow align-items-center justify-content-between 'style={{border:"1px solid black", borderRadius:"20px", height:"120px", width:"100%" }} >
                <img src={
                  ele?.profilePicture?.length ==0? commonprofilePicture:ele.profilePicture

                  }  style={{borderRadius:"50%",height:"100px", width:"100px"}}/>
                <h3>{ele.firstname} {ele.lastname}</h3>
                <button className='btn btn-primary' onClick={()=>{
                  SendFriendRequestHandler(ele._id)
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg> &nbsp; ADD FRIEND</button>
              </div>
              </div>
            )
          })
        }
        </>

      }
    </div>
</>
  )
}