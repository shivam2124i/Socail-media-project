import { AuthContext } from "@/app/Context/AuthContext";
import { profileContext } from "@/app/Context/ProfileContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

export const RecivedRequest = ({ fetchHandlers }) => {
  const router = useRouter();
  const { Profile, acceptFriendRequest,removeFriendRequest,commonprofilePicture } = useContext(profileContext);
  const { authData } = useContext(AuthContext);
  async function accpetFriendRequestHandler(id) {
    try {
      const status = await acceptFriendRequest(id, authData);
      if (status == 200) fetchHandlers();
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFriendRequestHandler(id) {
   try {
    const status = await removeFriendRequest(id,authData);
    if(status == 200)
      fetchHandlers()
   } catch (error) {
    console.log(error);
    
   } 
  }

  // async function YourFriends(id) {
  //   try {
  //     router.push("/YourFriends")
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }

  return (
<div className="d- flex justify-content-between">
  <div>
  <button className="btn btn-outline-success my-2 " onClick={()=>{
    // YourFriends()
    router.push("/Friends/YourFriends")
  }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg> &nbsp; Your Friends</button>
  </div>
<div className=" card my-2 p-3">
      <h2>
        <strong>Recived Request</strong>
      </h2>

      {Profile.recivedRequests?.length == 0 ? (
        <>
          <p> NO REQUEST RECEIVED</p>
        </>
      ) : (
        <div>
          {Profile.recivedRequests?.map((ele) => {
            console.log(ele);
            return (
              <div>
                <div
                  className="my-1 p-2 d-flex shadow align-items-center justify-content-between "
                  style={{
                    border: "1px solid black",
                    borderRadius: "20px",
                    height: "120px",
                    width: "100%",
                  }}
                >
                  <img
                    src={ ele?.profilePicture?.length ==0? commonprofilePicture:ele.profilePicture}
                    style={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                    }}
                  />
                  <h3>
                    {ele.firstname} {ele.lastname}
                  </h3>
               <div>
               <button
                    className="btn btn-primary "
                    onClick={() => {
                      accpetFriendRequestHandler(ele._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>{" "}
                    &nbsp; ACCEPT
                  </button>&nbsp;
                  <button className="btn btn-danger"
                  onClick={()=>{
                    removeFriendRequestHandler(ele._id);
                  }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                    </svg>{" "}
                    Remove
                  </button>
               </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
</div>
  );
};
