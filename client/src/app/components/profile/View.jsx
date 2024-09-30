import { profileContext } from "@/app/Context/ProfileContext";
import React, { useContext } from "react";

export const View = ({ user, setUser, handleSubmit, router, DPRemove }) => {
  const { commonprofilePicture } = useContext(profileContext);
  return (
    <>
      {user && (
        <div className="container">
          <div className="p-5 my-3">
            <div id="header">
              <div className="d-flex justify-content-between">
                <img
                  src={
                    user?.profilePicture?.length == 0
                      ? commonprofilePicture
                      : user.profilePicture
                  }
                  id="profilePicture"
                  height="150px"
                  width="150px"
                  style={{ borderRadius: "50%" }}
                />
                
                <div className="my-4">
                  <p
                    id="profileName"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "cursive",
                    }}
                    className="display-4 fw-bold mt-3"
                  >
                    {user.firstname}&nbsp;{user.lastname}
                  </p>
                </div>
                <div className="align-content-center">
                  <button
                    className="btn btn-warning btn-lg text-white"
                    onClick={() => {
                      router.push("/Friends/YourFriends");
                    }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-people-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>{" "}
                    &nbsp;Friends{" "}
                  </button>
                </div>
              </div>
              <br />
              
              <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        DPRemove();
                      }}
                    >
                      Remove DP
                    </button>
                  </div>
                </div>
              <hr />
              <br />
            </div>
            <div id="detail">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-outline">
                    <label className="form-label" for="firstname">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      className="form-control form-control-lg"
                      value={user.firstname}
                      onChange={(e) => {
                        setUser((prev) => {
                          return { ...prev, firstname: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-outline">
                    <label className="form-label" for="lastname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      className="form-control form-control-lg"
                      value={user.lastname}
                      onChange={(e) => {
                        setUser((prev) => {
                          return { ...prev, lastname: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <label className="form-label" for="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      disabled
                      value={user.email}
                      onChange={(e) => {
                        setUser((prev) => {
                          return { ...prev, email: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <label className="form-label" for="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="form-control form-control-lg"
                      value={user.phone}
                      onChange={(e) => {
                        setUser((prev) => {
                          return { ...prev, phone: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3 pb-2">
                    <div className="form-outline">
                      <label className="form-label" for="email">
                        Age
                      </label>
                      <input
                        type="email"
                        id="age"
                        className="form-control form-control-lg"
                        disabled
                        value={user.age}
                        onChange={(e) => {
                          setUser((prev) => {
                            return { ...prev, age: e.target.value };
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-outline">
                      <label for="" className="form-label">
                        Gender
                      </label>
                      <input
                        type="text"
                        id="gender"
                        className="form-control form-control-lg"
                        disabled
                        value={user.gender}
                        onChange={(e) => {
                          setUser((prev) => {
                            return { ...prev, gender: e.target.value };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <input
                      type="file"
                      id="profilePicture"
                      onChange={(e) => {
                        console.log(e.target.value);
                        const profilePicture = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(profilePicture);
                        reader.addEventListener("load", (e) => {
                          setUser((prev) => {
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
                <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <button className="btn btn-outline-danger" onClick={()=>{
                        router.push("/Profile/DeleteUser");
                    }}>
                      Delete Your Account
                    </button>
                  </div>
                </div>  
              </div>
              <div className="row">
                <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      onClick={() => {
                        handleSubmit();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
