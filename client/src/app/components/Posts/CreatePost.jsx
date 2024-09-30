import React, { useContext, useRef, useState } from "react";
import { Form } from "./Form";
import { PostsContext } from "@/app/Context/PostContext";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/Context/AuthContext";


export const CreatePost = () => {
  const {createPost}=useContext(PostsContext);
  const {authData}=useContext(AuthContext)
  const ref = useRef();
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    image: "",
    tags: [],
  });

  const router=useRouter(); 

  async function handleSubmit() {
    try {

      const result=await createPost(formData,authData);
      router.push("/Posts")
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} ref={ref} edit={false} />
    </>
  );
};
