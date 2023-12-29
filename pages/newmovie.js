import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import vector from "../public/Vectors.png";
import Auth from "../components/Auth/Auth";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewMovieForm = () => {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [poster, setPoster] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userid", user._id);
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      formData.append("poster", poster);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/movie/movies`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        showToast("Movie Created successfully", "success");
        router.push("/list");
      } else {
        const errorData = await response.json(); 
        throw new Error(`${response.status} - ${errorData.message}`);
      }
    } catch (error) {
      showToast(error.toString(), "error");
      console.error(error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setPoster(selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Auth>
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
        <div
          className="container"
          style={{ paddingLeft: "100px", paddingBottom: "150px" }}
        >
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
    </Auth>
  );
};

export default NewMovieForm;
