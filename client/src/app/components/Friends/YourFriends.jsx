import { AuthContext } from "@/app/Context/AuthContext";
import { profileContext } from "@/app/Context/ProfileContext";
import React, { useContext, useEffect, useState } from "react";

export const YourFriends = () => {
  const { authData } = useContext(AuthContext);
  const { getAllFriends ,deleteFriend ,commonprofilePicture} = useContext(profileContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchAllFriendsHandler();
  }, [])
  async function fetchAllFriendsHandler() {
    try {
      const data = await getAllFriends(authData);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteFriendHandler(id) {
    try {
      const status =await deleteFriend(id,authData)
      if(status==200)
        fetchAllFriendsHandler()
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
      <div className="my-2 p-3 card justify-content-between">
        <h2>
          <strong>Find Friends</strong>
        </h2>
        {friends?.length == 0 ? (
          <>
            <p>NO FRIENDS TO SHOW</p>
          </>
        ) : (
          <>
            {friends?.map((ele) => {
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
                      src={
                        ele?.profilePicture?.length == 0? commonprofilePicture:ele?.profilePicture 
                      }
                      style={{
                        borderRadius: "50%",
                        height: "100px",
                        width: "100px",
                      }}
                    />
                    <h3>
                      {ele?.firstname} {ele?.lastname}
                    </h3>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteFriendHandler(ele._id)
                      }}
                    >
                     &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                      </svg>
                      &nbsp; delete Friend
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
