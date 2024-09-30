import axios from "axios";

const  BASE_URL="http://localhost:8000"
export const API = axios.create({baseURL:BASE_URL})


async function checkAuth(authData){
    
    try {
      const response = await API.post("/auth/checkLogin",authData);
      return response?.status
    } catch (error) {
      console.log(error);
    }
  }

export async function handler(authData,router){
    try {
      const status = await checkAuth(authData)
        if(status!=200 || status=="undefined"){
            router.push("/Auth")
        }
    } catch (error) {
      console.log(error);
    }
  }
