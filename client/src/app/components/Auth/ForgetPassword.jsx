import { AuthContext } from '@/app/Context/AuthContext';
import React, { useContext, useState } from 'react'
import { TypeNewPassword } from './TypeNewPassword';
import { useRouter } from 'next/navigation';

 
let email =""
let otp =""
export const ForgetPassword = () => {
    const router = useRouter();
    const [showOtpInput,setshowOtpInput]=useState(false);
    const {findUserByEmail,generateOtp,verifyOtp}=useContext(AuthContext);
    const [auxUser,setAuxUser]=useState()
    const [newPassword,setNewPassword]=useState(false)
    async function generateOtpHandler(){
        try {
            const user = await findUserByEmail({email:email})
            const status= await generateOtp(user?.user?._id)
            setAuxUser(user?.user)
            if(status==200)
            {
                setshowOtpInput(true)
            }
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    async function verifyOtpHandler(){
        const data =await verifyOtp({_id:auxUser._id,otp:otp});
        if(data?.verified)
        {
        setshowOtpInput(false);
            setNewPassword(true);
        }
        console.log(data);
    }
  return (
  <>
  
  <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card shadow-lg">
                    <div className="card-header text-center bg-warning fw-bolder text-light" style={{fontSize:"24px"}}>
                       <marquee behavior="alternate" direction="right">Forgot Password</marquee> 
                    </div>
                    <div className="card-body">
                       
                            <div className="form-group">
                                <label for="email">Email address</label>
                                <input type="email" className="form-control" placeholder="Enter your email" onChange={(e)=>{
                                    email=e.target.value
                                }}/>
                            </div>
                                <br />
                            {!showOtpInput &&!newPassword&& <button className="btn btn-outline-success" onClick={()=>{
                                generateOtpHandler()
                            }}>GET OTP</button>}
                            
                            {
                                showOtpInput&&(
                                    <div>
                                        <input type="otp" className="form-control" placeholder="Enter OTP" onChange={(e)=>{
                                            otp = e.target.value
                                        }}/>
                                        <br />
                                        <button className="btn btn-outline-info" onClick={()=>{
                                            verifyOtpHandler()
                                        }}>Verify OTP </button>    
                                    </div>
                                )
                            }
                            <div>
                                {
                                    newPassword?<TypeNewPassword id={auxUser?._id} />:<></>
                                }
                            </div>
                    </div>
                    <div className="card-footer text-center">
                        <a href=' #' onClick={()=>{
                            router.push("/Auth")   
                        }}>Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
          

  </>

  )
}
