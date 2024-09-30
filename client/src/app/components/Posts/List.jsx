import { AuthContext } from "@/app/Context/AuthContext";
import { PostsContext } from "@/app/Context/PostContext";
import React, { useContext, useEffect } from "react";
import Card from "./Card";


export const List = ({SetMode,setPostToBeEdited}) => {
  const { getPosts, Posts, dispatch } = useContext(PostsContext);
  const { authData } = useContext(AuthContext);
 
  useEffect(() => {
    fetchPosts();
  }, []); 

  async function fetchPosts() {
    try {
      const posts = await getPosts(authData);
      dispatch({
        type: "GET_POSTS",
        payload: posts
      });
    } catch (error) {
      console.log(error);
    }   
  }
  return (
    <div className="my-3">
       {
        Posts?.map((post)=>{
          return <Card SetMode={SetMode} post={post} setPostToBeEdited={setPostToBeEdited} fetchPosts={fetchPosts}/>
        })
        }
    </div>
  )
};