import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'


export const Header = () => {
  const router=useRouter();
  const {dispatch}=useContext(AuthContext);
  
  function logOut(){
    try {
      dispatch({
        type:"SIGNOUT"
      });
      router.push("/Auth")
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div className="container-fluid">
      <button className="navbar-brand btn btn-dark" onClick={()=>{
        router.push("/Profile")
      }}>
    Profile
      </button>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link active" aria-current="page" onClick={()=>{
              router.push("/Posts")
            }}>Home</button>
          </li>
          <li className="nav-item">
            <button className="nav-link active" onClick={()=>{
              router.push("/CreatePost")
            }}>create Post</button>
          </li>
          <li className="nav-item">
            <button className="nav-link active" onClick={()=>{
              router.push("/Friends")
            }}>Friends</button>
          </li>
        </ul>
        <div className="d-flex justify-content-end" style={{width:"80%" }}>
         <button className="btn btn-outline-danger" onClick={()=>{
          console.log("hello");
          logOut()
         }}>Sign out
          </button>
      </div>
    </div>
    </div>
    </nav>
  )
}
