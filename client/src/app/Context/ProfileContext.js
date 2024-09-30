"use client";

import { createContext, useReducer } from "react";
import { API } from "@/Utils/constants";
import { date } from "yup";

const Profile = {
  recivedRequests: [],
  sendRequests: [],
  tribe: [],
  user:[]
};
async function getUserById(authData){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    console.log(authData?.userId);
    
    const data = await API.get(`/user/getUserById/${authData?.userId}`);
    console.log(data?.data?.user);  
    return data?.data?.user;
  } catch (error) {
    console.log(error);
  }
}
async function upDateUserById(authData,body) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const data = await API.put(`/user/updateUser/${authData?.userId}`,body);
    console.log(data);
    
    return data?.status;
  } catch (error) {
    console.log(error);
    
  }
}
async function getAllFriends(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const data = await API.get(`/user/yourFriends`);
    // console.log(data?.data?.friends);
    return data?.data?.friends;
  } catch (error) {
    console.log(error);
    
  }
}

async function sendFriendRequest(id, authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response =await API.put(`/user/sendRequest/${id}`);
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}

async function removeDp(authData,body) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const data = await API.put(`/user/removeDP/${authData?.userId}`,body);
    console.log(data);
    
  } catch (error) {
    console.log(error);
    
  }
  
}

async function acceptFriendRequest(id, authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response =await API.put(`/user/acceptRequest/${id}`)
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}
async function removeFriendRequest(id,authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response = await API.put(`/user/removeRequest/${id}`)
    return response?.status;
  } catch (error) {
    console.log(error);
    
  }
}


async function deleteFriend(id,authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response = await API.put(`/user/deleteFriend/${id}`)
    return response?.status;
  } catch (error) {
    console.log(error);
    
  }
}

async function featchAllUser(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response=await API.get("/user/getAllUsers")
    return response?.data?.users;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData?.token}`;
      return req;
    });
    const response = await API.delete(`/user/deleteUser/${authData?.userId}`)
    return response?.status;

  } catch (error) {
    console.log(error);

  }
};

async function checkPassword(authData,body) {
  try {
    
    
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    // console.log(authData?.userId);
    
    const response = await API.post(`/user/CheckPassword/${authData?.userId}`,body);
    
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllReceivedRequests(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response = await API.get("/user/getAllReceivedRequest");
    return response?.data?.requestsReceived;
  } catch (error) {
    console.log(error); 
  }
}

export const profileContext = createContext();

function reducer(state,action) {
  try {
    switch (action.type) {
      case "GET_RECEIVED_REQUEST":
        const newState={...state,recivedRequests:action.payload}
        return newState;
      case "GET_USER_BY_ID":
        const newState1={...state,getUserById:action.payload}
        return newState1;
      default:
    }
  } catch (error) {
    console.log(error);
  }
}

export const commonprofilePicture = "https://tse4.mm.bing.net/th?id=OIP.e2DatKXudFxqaUgnUXrFVAHaH6&pid=Api&P=0&h=180";

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, Profile);
  return (
    <profileContext.Provider
      value={{
        Profile: state,
        dispatch,
        sendFriendRequest,
        acceptFriendRequest,
        featchAllUser,
        getAllReceivedRequests,
        getUserById,
        removeFriendRequest,
        getAllFriends,
        upDateUserById,
        deleteFriend,
        removeDp,
        commonprofilePicture,
        deleteUser,
        checkPassword,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};
