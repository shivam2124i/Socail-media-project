let age =""
import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";

export const Signup = ({ setMode }) => {
  const { signup,dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname:"",
    lastname:"",
    password:"",
    email:"",
    profilePicture:"",
    phone:"",
    gender:"",  
    age:"",
    confirmPassword:""
  });
  console.log(formData);

  const ref= useRef(null);
  const router = useRouter();
  async function handleSubmit(){
   if (age>=18) {
    try {
      delete formData.confirmPassword;  
      let data=await signup(formData)
      dispatch({
        type:"SIGNUP",
        payload:data
      })
      ref.current.reset();
      router.push("/Posts")
    } catch (error) {
      console.log(error);
    }
   }
   else{
    alert("Your Age Is Less Then 18 You Can Not Signup")
   }
  }

  return (
    <div>
      <div className="gradient-custom ">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7 ">
              <div
                className="card shadow-2-strong card-registration shadow-lg "
                style={{ borderRadius: "15px;" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 ">SingUp Form</h3>
                  <form ref={ref}/>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="firstName">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg  "
                          onChange={(e)=>{
                            setFormData((prev)=>{return{...prev,firstname:e.target.value}})
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="lastName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg  "  onChange={(e)=>{
                            setFormData((prev)=>{return{...prev,lastname:e.target.value}})
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <label for="birthdayDate" className="form-label">
                          Birthday
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg  "
                          onChange={(e) => {
                            console.log(e.target.value);
                            const date = new Date(e.target.value);
                            const today = new Date();
                            console.log(today);
                            if (today.getDate() > date.getDate()) {
                              if (today.getMonth() >= date.getMonth()) {
                                age = today.getFullYear() - date.getFullYear();
                              } else {
                                age =
                                  today.getFullYear() - date.getFullYear() - 1;
                              }
                            } else if (today.getDate() < date.getDate()) {
                              if (today.getMonth() >= date.getMonth()) {
                                age = today.getFullYear() - date.getFullYear();
                              } else {
                                age =
                                  today.getFullYear() - date.getFullYear() - 1;
                              }

                            } else {
                              if (today.getMonth() >= date.getMonth()) {
                                age = today.getFullYear() - date.getFullYear();
                              } else {
                                age =
                                  today.getFullYear() - date.getFullYear() - 1;
                              }
                            }

                            console.log(age);
                            setFormData((prev)=>{
                              return{...prev,age:age}
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Gender: </h6>

                      <div class="q" onChange={(e)=>{
                        setFormData((prev)=>{return{...prev,gender:e.target.value}})
                      }}>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                          />
                          <label className="form-check-label" for="gender">
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                          />
                          <label className="form-check-label" for="gender">
                            Female
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="other"
                            value="other"
                          />
                          <label className="form-check-label" for="gender">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" for="emailAddress">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg  "  onChange={(e)=>{
                            setFormData((prev)=>{return{...prev,email:e.target.value}})
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" for="phoneNumber">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-control form-control-lg  "  onChange={(e)=>{
                            setFormData((prev)=>{return{...prev,phone:e.target.value}})
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" for="password">
                          password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg  "  onChange={(e)=>{
                            setFormData((prev)=>{return{...prev,password:e.target.value}})
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" for="confirmPassword">
                          confirm Password
                        </label>
                        <input
                          type="Password"
                          id="confirmPassword"
                          className="form-control form-control-lg"   
                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-outline">
                  <label className="form-label" for="profilePicture">
                    Uplode Profile picture
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    className="form-control form-control-lg  shadow-lg"
                    onChange={(e) => {
                      console.log(e.target.value);
                      const profilePicture = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(profilePicture);
                      reader.addEventListener("load", (e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            profilePicture: e.target.result,
                          };
                        });
                      });
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary "
                  value="Submit"
                  id="submitBtn"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setMode("login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
