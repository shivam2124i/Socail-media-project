import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export const Login = ({ setMode }) => {
  const {signin,dispatch}=useContext(AuthContext)
  const [formData,setFormData]= useState({email:"",password:""})
  const router= useRouter();
  async function handleSubmit(){
    const data =await signin(formData);
    dispatch({
      type:"SIGNIN",
      payload:data 
    })
    router.push('/Posts')
  }
  return (
    <div>

      <div className="wrapper">
        <div className="logo">
          <img src="https://th.bing.com/th/id/OIG2.akJvkXawZ48FSubbZCAx?pid=ImgGn" alt="" />
        </div>
        <div className="text-center mt-4 name">Login</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" name="Email" id="email" placeholder="Email" onChange={(e)=>{
                            setFormData((prev)=>{return{...prev,email:e.target.value}})
                          }} />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              onChange={(e)=>{
                setFormData((prev)=>{return{...prev,password:e.target.value}})
              }}
            />
          </div>
        </form>
        <button className="btn mt-3" id="submitBtn"
         onClick={() => {
          handleSubmit();
        }}>
          Login
        </button>
        <div className="text-center fs-6">
          <a href="#" onClick={()=>{
            router.push("/Auth/ForgetPassword")
          }}>Forget password </a>
          
           <a className="text-dark">or</a>{" "}

          <a
            type="button"
            href="#"
            onClick={() => {
              setMode("Signup");
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

