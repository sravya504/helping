// import { useState } from "react";

// function AdminDashboard() {
//   const [file, setFile] = useState(null);
//   const [carousel, setCarousel] = useState(false);
//   const [gallery, setGallery] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const locations = [];
//     if (carousel) locations.push("carousel");
//     if (gallery) locations.push("gallery");

//     if (!file || locations.length === 0) {
//       return alert("Please select a file and at least one location");
//     }

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("locations", JSON.stringify(locations));

//     try {
//       const res = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Image uploaded: " + data.url);
//         setFile(null);
//         setCarousel(false);
//         setGallery(false);
//       } else {
//         alert("Upload failed: " + data.message || "Server error");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed: " + err.message);
//     }
//   };

//   return (
//     <>
//       <h1>Welcome Admin Portal</h1>
//       <button
//         onClick={() => {
//           sessionStorage.removeItem("isAdmin");
//           window.location.href = "/admin/login";
//         }}
//       >
//         Logout
//       </button>

//       <hr />

//       {/* Upload Form */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Choose Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>

//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={carousel}
//               onChange={(e) => setCarousel(e.target.checked)}
//             />
//             Carousel
//           </label>

//           <label style={{ marginLeft: "10px" }}>
//             <input
//               type="checkbox"
//               checked={gallery}
//               onChange={(e) => setGallery(e.target.checked)}
//             />
//             Gallery
//           </label>
//         </div>

//         <button type="submit">Upload Image</button>
//       </form>
//     </>
//   );
// }

// export default AdminDashboard;




import { useState } from "react";
import "./adminDashboard.css"; // import the CSS

function AdminDashboard() {

  const [file, setFile] = useState(null);
  const [carousel, setCarousel] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(""); // text of message
const [uploadMessageType, setUploadMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
  e.preventDefault();
  const locations = [];
  if (carousel) locations.push("carousel");
  if (gallery) locations.push("gallery");

  if (!file || locations.length === 0) {
    setUploadMessage("Please select a file and at least one location");
    setUploadMessageType("error");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("locations", JSON.stringify(locations));

  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setUploadMessage("Image uploaded successfully!");
      setUploadMessageType("success");
      setFile(null);
      setCarousel(false);
      setGallery(false);
    } else {
      setUploadMessage(data.message || "Upload failed");
      setUploadMessageType("error");
    }
  } catch (err) {
    console.error(err);
    setUploadMessage("Upload failed: " + err.message);
    setUploadMessageType("error");
  }
};

  return (
    <div className="admin-dashboard-page">
      {/* Top Bar */}
      <div className="top-bar">
        <h1>Welcome to Admin Portal</h1>
        <button
          className="logout-btn"
          onClick={() => {
            sessionStorage.removeItem("isAdmin");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>

      <hr style={{ width: "100%", margin: "20px 0" }} />

      {/* Upload Form */}
      <div className="upload-form-wrapper">
       
        <form className="upload-form-container" onSubmit={handleSubmit}>

          <div>
             <h2 align="center">Upload Image </h2> 
            <label>Choose Image:</label> <br></br> 
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <label>
              <input
                type="checkbox"
                checked={carousel}
                onChange={(e) => setCarousel(e.target.checked)}
              />
              Carousel
            </label>

            <label style={{ marginLeft: "15px" }}> 
              <input
                type="checkbox"
                checked={gallery}
                onChange={(e) => setGallery(e.target.checked)}
              />
              Gallery
            </label>
          </div>

          <button type="submit" className="my-button">Upload Image</button>
          {uploadMessage && (
  <p className={uploadMessageType === "success" ? "success-msg" : "error-msg"}>
    {uploadMessage}
  </p>
)}
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;