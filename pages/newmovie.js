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
      // Create FormData object to send the form data, including the poster file
      const formData = new FormData();
      formData.append("userid", "658ba0360b2ae7e67af1879e");
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      formData.append("poster", poster);

      // Make a POST request to your server
      const response = await fetch("http://localhost:5000/movie/movies", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2hhbGh0dEBnbWFpbC5jb20iLCJpYXQiOjE3MDM2NTEyMDYsImV4cCI6MTcwMzY1NDgwNn0.05tw9Yt8iCRC1l6GvjykLT4yfQPVcw7N6OvfUJ47yr8`,
        },
      });

      if (response.ok) {
        console.log("Movie created successfully");

        router.push("/list");
      } else {
        console.error("Error creating movie:", response.statusText);
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
