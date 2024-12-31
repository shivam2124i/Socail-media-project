import { profileContext } from "@/app/Context/ProfileContext";
import React, { useContext, useState } from "react";
import { Login } from "../Auth/Login";
import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";




let password ="";
let otp=""
export const DeleteUserpage = () => {
  const router = useRouter();
  const [showOtpInput, setshowOtpInput] = useState(false);
  const {dispatch}=useContext(AuthContext);
  const { generateOtp, verifyOtp } = useContext(AuthContext);
  const { checkPassword,deleteUser } = useContext(profileContext);
  const [auxUser, setAuxUser] = useState();
  const { authData } = useContext(AuthContext);
  const [DeleteAccount,setDeleteAccount]=useState(false)


  async function PasswordCheck() {
    try {
      
      const user = await checkPassword(authData,{password: password });
      const status = await generateOtp(user?.user?._id);
      setAuxUser(user?.user);
      if (status == 200) {
        setshowOtpInput(true);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteAccount() {
    const data = await deleteUser(authData)
  }


  async function verifyOtpHandler() {

    const data = await verifyOtp({ _id: auxUser._id, otp: otp });
    if (data?.verified) {
      setshowOtpInput(false);
      deleteAccount();   
      dispatch({
        type:"SIGNOUT"
      });
      router.push("/Auth") ;
      return(true);  
    }
    console.log(data);
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div
                className="card-header text-center bg-warning fw-bolder text-light"
                style={{ fontSize: "24px" }}
              >
                <marquee behavior="alternate" direction="right">
                  DELETE ACCOUNT
                </marquee>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label for="password">Enter Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      password = e.target.value;
                    }}
                  />
                </div>
                <br />
                <button className="btn btn-outline-primary" onClick={()=>{
                  PasswordCheck();
                }}>submit</button>

                {showOtpInput && (
                  <div>
                    <input
                      type="otp"
                      className="form-control"
                      placeholder="Enter OTP"
                      onChange={(e) => {
                        otp = e.target.value;
                      }}
                    />
                    <br />
                    <button
                      className="btn btn-outline-info"
                      onClick={() => {
                       verifyOtpHandler();
                      }}
                    >
                      Verify OTP{" "}
                    </button>
                  </div>
                )}

  {/* {setDeleteAccount && (
                    <div>
                      <label className="form-label">
                            <strong>CONFIRM YOU WONT TO DELETE YOUR ACCOUNT</strong>
                          </label>
                      <button className="btn btn-outline-danger">DELETE</button>
                    </div>
                  )} */}

              </div>
              <div className="card-footer text-center">
                <a
                  href=" #"
                  onClick={() => {
                    router.push("/Auth");
                  }}
                >
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
