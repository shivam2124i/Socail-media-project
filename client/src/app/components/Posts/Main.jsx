import React, { useState } from "react";
import { List } from "./List";
import { EditPost } from "./EditPost";

const Main = () => {
  const[mode,SetMode]=useState("view");
  const [PostToBeEdited,setPostToBeEdited]=useState("");
  return (
  <div className="container">
    {
      mode=="view"?<List SetMode={SetMode} setPostToBeEdited={setPostToBeEdited}/>:<EditPost PostToBeEdited={PostToBeEdited} SetMode={SetMode}/>
    }
  </div>);
};

export default Main;
