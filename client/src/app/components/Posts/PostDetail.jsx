import { AuthContext } from "@/app/Context/AuthContext";
import { PostsContext } from "@/app/Context/PostContext";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

export const PostDetail = () => {
  const { authData } = useContext(AuthContext);
  const { getPostById, addComment } = useContext(PostsContext);
  const params = useSearchParams();
  const [post, setPost] = useState();
  const [commentList, setCommentList] = useState();

  const [comment, setComment] = useState({ text:"" });
  const ref = useRef();

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      const data = await getPostById(authData, params.get("id"));
      setPost(data);
      setCommentList(data?.comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      const status = await addComment(params.get("id"), authData, comment);
      console.log(status);

      if (status == 200) {
        ref.current.value = "";
        fetchPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container my-3">
      {post && (
        <div className="card shadow-lg p-5 mb-5">
          <div className="d-flex justify-content-between">
            <h4>{post?.title}</h4>
          </div>
          <img className="my-2" src={post?.image} alt="" />
          <br />
          <br />
          <p>{post?.caption}</p>
          <hr />
          <strong>
            {post?.tags?.map((tag) => {
              return <strong>#{tag} &nbsp;</strong>;
            })}
          </strong>
          <div className="d-flex p-1 my-3">
            <form method="post">
              <input
                ref={ref}
                type="text"
                onChange={(e) => {
                  setComment((prev) => {
                    return { ...prev, text: e.target.value };
                  });
                }}
              />{" "}
              &nbsp; 
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-send-fill"
                  viewBox="0 0 16 16"
                  >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>{" "}
              </button>
                  &nbsp;
                  &nbsp;
            </form>
            <div className="">
              {commentList?.map((ele) => {
                return <div>{ele?.text}</div>
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
