import Link from "next/link";

const EmptyMovieList = () => {
  return (
    <div className="containerMovie">
      <div className="container d-flex justify-content-center">
        <label
          className="text-white textMontserrat"
          style={{ fontSize: "48px" }}
        >
          Your movie list is empty
        </label>
      </div>
      <div className="container d-flex justify-content-center p-4">
        <button type="submit" className="button" style={{ width: "18%" }}>
          <Link href="/newmovie">
            <span className="submitText py-3">Add a new movie</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

// Styling for the button
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#0070f3",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
};

export default EmptyMovieList;
