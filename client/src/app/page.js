"use client"
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import { handler } from "@/Utils/constants";
import Main from "./components/Posts/Main";
import { useRouter } from "next/navigation";
  
  
  export default function Home() {
    const router = useRouter();
    const {authData}=useContext(AuthContext);
    useEffect(()=>{
      handler(authData,router)
    },[])
    // if(states==200){
    //   router.push("/Posts")
    // }
    // else{
    //   router.push("/Auth")
    // }
  return (
<div>
</div>
  );
}