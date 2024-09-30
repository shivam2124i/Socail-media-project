import { AuthContext } from "@/app/Context/AuthContext";
import { PostsContext } from "@/app/Context/PostContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";


  const CardModal = ({setShowCard,handleDelete}) => {   
    return (
      <div className="card p-3 shadow bg-danger-subtle">Do You Want To Delete This Post ?
      <br />
      <br />
      <button className="btn btn-danger my-1" onClick={()=>{
        handleDelete();
      }}>Delete</button>
      <button className="btn btn-info" onClick={()=>{
        setShowCard(prev=>!prev)
      }}>Cancel</button>
      </div>
    )
  }



const Card = ({ post,SetMode ,setPostToBeEdited ,fetchPosts}) => {
  const router=useRouter();  
  const { authData } = useContext(AuthContext);
  const {deletePost,likePosts }=useContext(PostsContext)
  const [showCard,setShowCard]=useState(false);

  async function handleDelete(){

    try {
      await deletePost(post._id,authData);
      await fetchPosts();
      setShowCard(prev=>!prev)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLikes(){
    try {
      await likePosts(post._id,authData);
      await fetchPosts(); 
    } catch (error) {
      console.log(error);
    }
  }
  async function PostDetailRedirect(){
    try {
      router.push(`/Posts/PostDetail/?id=${post._id}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className="card shadow-lg p-5 mb-5">
            <div className = "d-flex justify-content-between">
            <h4>{post.title}</h4>
           <div>
           {authData.userId === post.creator ?
          <>
          <svg xmlns="http://www.w3.org/2000/svg" id={post._id} width="20" height="20" fill="green" className="bi bi-pencil-square" viewBox="0 0 16 16" onClick={()=>{
            setPostToBeEdited(post._id);
            SetMode("edit")
          }}>
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
            &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16"
             id={post._id} onClick={()=>{
              setShowCard(prev=>!prev)
             }} >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
        </svg>
          </>
            
        : ""
        }
           </div>
            </div>
            <img className="my-2" src={post.image} alt=""/>
            <br/>
            <div  className="d-flex justify-content-between">
              <div>
                {
                  post.likes.find((post)=>{
                    if(post===authData.userId ){
                      return true;
                    }  
                  })
                  ?
                  <> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg> &nbsp; {post.likes.length}</>
                    : 
                <> <svg xmlns="http://www.w3.org/2000/svg" id={post._id} width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" onClick={()=>{
                  handleLikes()
                }}>
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg> &nbsp; {post.likes.length}</>
                }
              </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16" onClick={()=>{
              PostDetailRedirect()
            }}>
              <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"/>
            </svg>
            </div>
            <br/>
            <p>{post.caption}</p>
            <hr/>
            <strong>
            {post.tags.map((tag) => {
          return <strong>#{tag} &nbsp;</strong>; 
        })
        }
        </strong>
            
            <br/>
            {
              showCard &&(
                <div className="p-2" style={{position:"absolute",right:"50px",top:"90px"}}>
                  <CardModal setShowCard={setShowCard} handleDelete={handleDelete} />
                </div>
              )
            }
            </div>
  )
}

export default Card;
