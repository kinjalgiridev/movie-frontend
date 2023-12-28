import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import vector from "../public/Vectors.png";
const NewMovieForm = () => {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [poster, setPoster] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      formData.append("poster", poster);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/movie/movies`, {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `${token}` : '',
        },
      });

      if (response.ok) {
        router.push("/list");
      } else {
        console.error("Error creating movie:", response.statusText);
        localStorage.removeItem('token');
        router.push('/'); 
      }
    } catch (error) {
      console.error("Error creating movie:", error.message);
    }
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setPoster(selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="containerMovie pb-3" style={{ height: "auto" }}>
      <div
        className="container d-flex justify-content-start"
        style={{ padding: "100px" }}
      >
        <label
          className="text-white textMontserrat"
          style={{ fontSize: "48px" }}
        >
          Create a new movie
        </label>
      </div>
      <div className="container" style={{ paddingLeft: "100px", paddingBottom:"150px" }}>
        <div className="row">
          <div className="col-md-6">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p className="rememberMeText" style={{ fontSize: "14px" }}>
                  {selectedFileName
                    ? `Selected image: ${selectedFileName}`
                    : "Drop an image here"}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="title"
                value={title}
                style={{ width: "100%" }}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
                className="input"
              />

              <input
                type="number"
                id="publishingYear"
                value={publishingYear}
                onChange={(e) => setPublishingYear(e.target.value)}
                required
                placeholder="Publishing year"
                className="input mt-3"
                style={{ width: "70%" }}
              />

              <div className="d-flex justify-content-between pt-5">
                <Link href="/list">
                  <button
                    type="button"
                    className="cancelBtn px-5 py-3"
                    style={{ width: "100%" }}
                  >
                    <span className="submitText py-3">Cancel</span>
                  </button>
                </Link>
                <button
                  type="submit"
                  className="button px-4 py-3"
                  style={{ width: "48%" }}
                >
                  <span className="submitText py-3">Submit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="position-absolute bottom-0 left-0">
          <Image src={vector} alt="Your Alt Text" style={{ width: "100vw" }} />
        </div>
    </div>
  );
};

export default NewMovieForm;
