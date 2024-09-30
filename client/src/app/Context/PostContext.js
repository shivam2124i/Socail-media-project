"use client";

import { API } from "@/Utils/constants";
import { createContext, useReducer } from "react";

let Posts = [];

export const PostsContext = createContext();

async function getPosts(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const data = await API.get("/posts/getPosts");
    return data?.data?.posts;
  } catch (error) {
    console.log(error);
  }
}

async function getPostById(authData,id) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const data = await API.get(`/posts/getPostById/${id}`);
    return data?.data?.post;
  } catch (error) {
    console.log(error);
  }
}


async function createPost(body,authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const data = await API.post("/posts/createPost",body);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function updatePost(id,body,authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const data=await API.put(`/posts/updatePost/${id}`,body);
    return data?.status;
  } catch (error) {
    console.log(error);
  }
}

async function deletePost(id) {
  try {
    const response = await API.delete(`/posts/deletePost/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

async function likePosts(id,authData){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const response = await API.put(`/posts/likePost/${id}`);
    return response.status;

  } catch (error) {
    console.log(error);
  }
}

async function addComment(id,authData,body){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response = await API.put(`/posts/addComment/${id}`,body);
    return response?.status;
    
  } catch (error) {
    console.log(error);
  }
}



function reducer(state,action) {
    try {
        
        switch (action.type) {
            case  "GET_POSTS":
                // console.log(action.payload);
                return action.payload;
            default:
                return state;
        }

    } catch (error) {
        console.log(error);
    }
}

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, Posts);
  return (
    <PostsContext.Provider
      value={{
        Posts: state,
        dispatch,
        getPosts,
        createPost,
        updatePost,
        deletePost,
        getPostById,
        likePosts,
        addComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
