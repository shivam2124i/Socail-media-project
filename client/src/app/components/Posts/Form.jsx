import React from 'react'
// value
export const Form = ({formData,setFormData,handleSubmit,value,ref,edit}) => {
  return (
    <>
    {
           edit==false?(
           <div className="wrapper">
            <form ref={ref}   />
              <div className="navBar"></div>
                <div className="logo">
                  <img  alt=""  />
                </div>
      
                <div className="form-outline">
                  <label className="form-label">
                    Add Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
      
                <div className="form-outline">
                  <label className="form-label" for="firstName">
                    Add Caption
                  </label>
                  <input
                    type="text"
                    id="caption"
                    className="form-control"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          caption: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="form-outline">
                  <label className="form-label" for="firstName">
                    Add Profile Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) => {
                      console.log(e.target.value);
                      const image = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.addEventListener("load", (e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            image: e.target.result,
                          };
                        });
                      });
                    }}
                  />
                </div>
                <div className="form-outline">
                  <label className="form-label" for="">
                    Add Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    className="form-control"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          tags: e.target.value.split("#"),
                        };
                      });
                    }}
                    />
                </div>
                <div className="mt-4 pt-2">
                  <input
                    className="btn btn-primary btn-lg"
                    value="submit"
                    id="submitBtn"
                    onClick={()=>{
                      handleSubmit();
                    }}
                    />
                </div>
                </div>
                ):
                // -----------------------------------------------------------------------------------------------------------
                <>
                <div className="wrapper">
            <form ref={ref}   />
              <div className="navBar"></div>
                <div className="logo">
                  <img src={formData.image} alt=""  />
                </div>
      
                <div className="form-outline">
                  <label className="form-label" for="firstName">
                    Add Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    className="form-control"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
      
                <div className="form-outline">
                  <label className="form-label" for="firstName">
                    Add Caption
                  </label>
                  <input
                    type="text"
                    id="caption"
                    value={formData.caption}
                    className="form-control"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          caption: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="form-outline">
                  <label className="form-label" for="firstName">
                    Add Profile Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    values={formData.image}

                    className="form-control"
                    onChange={(e) => {
                      const image = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.addEventListener("load", (e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            image: e.target.result,
                          };
                        });
                      });
                    }}
                  />
                </div>
                <div className="form-outline">
                  <label className="form-label" for="">
                    Add Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags}

                    className="form-control"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          tags: e.target.value.split("#"),
                        };
                      });
                    }}
                    />
                </div>
                <div className="mt-4 pt-2">
                  <input
                    className="btn btn-primary btn-lg"
                    value="submit"
                    id="submitBtn"
                    onClick={()=>{
                      handleSubmit();
                    }}
                    />
                </div>
                </div>
                </>
    }
    </>
  )
}
