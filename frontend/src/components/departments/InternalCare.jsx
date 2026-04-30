// import React from 'react'
// import {useState,useEffect} from 'react'
// import "./ImageCarousel.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import { Modal } from 'bootstrap';


// import img4 from "../../assets/Tricycle Distribution-2013 (1)(1).jpeg"
// import { useNavigate} from 'react-router-dom';

// const images = [img4, img4, img4];

// const InternalCare = () => {

//      const [index, setIndex] = useState(0);
//       const [modalData, setModalData] = useState({});
    
//       // Auto-slide every 2s
//       useEffect(() => {
//         const interval = setInterval(() => {
//           setIndex((prev) => (prev + 1) % images.length);
//         }, 2000);
//         return () => clearInterval(interval);
//       }, []);

//        // Sample card data
//         const cards = [
//           {
//             id: 1,
//             title: "Tricycle Distribution-2013",
//             image: img4,
//             shortDesc:
//               "As part of its ongoing commitment to community service and social responsibility...",
//             fullDesc:
//               "As part of its ongoing commitment to community service and social responsibility, Helping Hands organized a tricycle distribution program for specially abled students in collaboration with the Rotary Club of Vijayawada. This initiative aimed to enhance mobility, independence, and confidence among the beneficiaries, enabling them to pursue education and daily activities with greater ease. The program reflects the shared dedication of Helping Hands and the Rotary Club to inclusivity, empowerment, and improving the quality of life for differently abled individuals through meaningful and compassionate service.",
//           },
         
//         ];
      
//         const openModal = (card) => {
//   setModalData(card);
//   const modal = new Modal(
//     document.getElementById("infoModal")
//   );
//   modal.show();
// };

//         const navigate = useNavigate();
    
//   return (
//    <div>
//      <div className="carousel-container two">
//       <div className="carousel">
//         {images.map((img, i) => {
//           let position = "";
//           if (i === index) {
//             position = "active"; // center
//           } else if (i === (index - 1 + images.length) % images.length) {
//             position = "left"; // previous
//           } else if (i === (index + 1) % images.length) {
//             position = "right"; // next
//           } else {
//             position = "hidden"; // all other images
//           }

//           return (
//             <img
//               key={i}
//               src={img}
//               alt="carousel"
//               className={`carousel-img ${position}`}
//             />
//           );
//         })}
//       </div>          
//     </div>

//     <div >
//        <h2 className="heading"> </h2>
//        <div className="about">
//           The Internal Care Department is dedicated to catering to the essential requirements of students with financial constraints, offering travel assistance, and ensuring access to washing machine facilities and specially-designed tricycles for students with disabilities. This department plays a crucial role in supporting the needs of disadvantaged students and ensuring their inclusive participation within the academic community.
//        </div>
//     </div>

//        <div className="quote">
//           <h2>"A helping hand costs nothing,<br/> but it can make a
//             priceless impact on the world."</h2>

//        </div >

//       {/* -------- NEW BOOTSTRAP CARDS -------- */}
//       <div className="container my-5">
//         <h2 className="text-center mb-4 text-black fw-bold">Our Contributions</h2>
//         <div className="row justify-content-center g-4">
//           {cards.map((card) => (
//             <div className="col-md-4 depart" key={card.id}>
//               <div className="card shadow h-100">
//                 <img src={card.image} className="card-img-top" alt={card.title} />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{card.title}</h5>
//                   <p className="card-text">{card.shortDesc}</p>
//                   <button
//                     className="btn btn-dark mt-auto"
//                     onClick={() => openModal(card)}
//                   >
//                     Read More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* -------- MODAL -------- */}
//       <div
//         className="modal fade"
//         id="infoModal"
//         tabIndex="-1"
//         aria-labelledby="infoModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header bg-black text-white">
//               <h5 className="modal-title" id="infoModalLabel">
//                 {modalData.title}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close btn-close-black"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body text-center">
//               {modalData.image && (
//                 <img
//                   src={modalData.image}
//                   alt={modalData.title}
//                   className="img-fluid rounded mb-3"
//                 />
//               )}
//               <p>{modalData.fullDesc}</p>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-dark"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="quote">
//         <h2>
//           "A helping hand costs nothing,<br /> but it can make a priceless
//           impact on the world."
//         </h2>
//       </div>

//       <br></br>
        
//       <div className="btn-container">
//         <button className="btnDonate " onClick={()=>{
//             navigate('/donateUs')
//         }}>Donate Us</button>
//       </div>
//     </div>
//   )
// }

// export default InternalCare

import { useState, useEffect } from "react";
import "./HealthCare.css";
import "./ImageCarousel.css";
import * as bootstrap from "bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useRef } from "react";
import img1 from "../../assets/Tricycle Distribution-2013 (1)(1).jpeg"



const BASE_URL = "https://helping-backend.onrender.com/";

export default function InternalCare() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [originalImages, setOriginalImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [deleteModalImage, setDeleteModalImage] = useState(null);
  const [showCarouselSection, setShowCarouselSection] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [fileKey, setFileKey] = useState(Date.now());
  const [modalData, setModalData] = useState({});
  const [contributions, setContributions] = useState([]);
  const [newContribution, setNewContribution] = useState({ image: null, title: "", description: "" });
  const [previewContribution, setPreviewContribution] = useState(null);
  const [activeContribution, setActiveContribution] = useState(null);
  const [deleteContributionId, setDeleteContributionId] = useState(null);
  const fileInputRef = useRef(null);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  

const defaultImages = [img1, img1, img1];
  
 const isFormValid =
    newContribution.image &&
    newContribution.title.trim() &&
    newContribution.description.trim();
const infoModalRef = useRef(null);

  const navigate = useNavigate();
  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // ✅ Validate image
  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file");
    e.target.value = "";
    return;
  }

  setNewContribution((prev) => ({ ...prev, image: file }));
  setPreviewContribution(URL.createObjectURL(file));

  // ✅ Reset file input to avoid old filename issue
  setFileKey(Date.now());
};

  // Fetch carousel images
  useEffect(() => {
    fetchCarouselImages();
    fetchContributions();
  }, []);

  const fetchCarouselImages = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/department-images?department=internalcare&type=carousel`
    );

    const data = res.data;

    // store original images
    setOriginalImages(data);

    let finalImages = [];

    // ✅ FIX: default images when no data
    if (data.length === 0) {
      finalImages = defaultImages.map((img, i) => ({
        id: i,
        url: img,
        isDefault: true,
      }));
    }
    else if (data.length === 1) {
      finalImages = Array(3).fill(data[0]);
    }
    else if (data.length === 2) {
      finalImages = [data[0], data[1], { ...data[0] }];
    }
    else {
      finalImages = data;
    }

    setCarouselImages(finalImages);

  } catch (err) {
    console.error(err);
  }
};
  const fetchContributions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/contributions?department=internalcare`);
      setContributions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Carousel auto-scroll
  useEffect(() => {
    if (carouselImages.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  // Handle carousel click
  const handleCarouselClick = (img, i) => {
    if (i === index && sessionStorage.getItem("isAdmin") === "true") setShowCarouselSection(true);
  };

  const handleImageClick = (img) => setActiveImage(img);
  const handleImageDoubleClick = () => setActiveImage(null);

 const handleDeleteImage = (img) => {
  setDeleteModalImage(img);

  const modalEl = document.getElementById("deleteCarouselModal"); // ✅ FIXED
  if (modalEl) new bootstrap.Modal(modalEl).show();
};

  const confirmDeleteImage = async () => {
    try {
      if (!deleteModalImage?.id) return;

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return alert("You are not logged in!");

      const token = await user.getIdToken();

      await axios.delete(`${BASE_URL}/department-wise/delete-image/${deleteModalImage.id}?department=internalcare&type=carousel`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCarouselImages();
      setActiveImage(null);
      setDeleteModalImage(null);

      const modalEl = document.getElementById("deleteConfirmModal");
      bootstrap.Modal.getInstance(modalEl)?.hide();
      alert("Image deleted successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };
  const confirmDeleteContribution = async () => {
  try {
    if (!deleteContributionId) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert("You are not logged in!");

    const token = await user.getIdToken();

    await axios.delete(
      `${BASE_URL}/contributions/delete/${deleteContributionId}?department=internalcare`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchContributions();
    setActiveContribution(null);
    setDeleteContributionId(null);

    const modalEl = document.getElementById("deleteContributionModal");
    bootstrap.Modal.getInstance(modalEl)?.hide();

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  const handleAddImages = async () => {
    try {
      const formData = new FormData();
      newImages.forEach((img) => formData.append("images", img.file));
      formData.append("department", "internalcare");
      formData.append("type", "carousel");

      await axios.post(`${BASE_URL}/upload`, formData);
      fetchCarouselImages();
      setNewImages([]);
      setFileKey(Date.now());
    } catch (err) {
      console.error(err);
    }
  };

//   const handleAddContribution = async () => {
//     try {
//       const formData = new FormData();
//       if (newContribution.image) formData.append("image", newContribution.image);
//       formData.append("title", newContribution.title);
//       formData.append("description", newContribution.description);
//       formData.append("department", "healthcare");

//       await axios.post(`${BASE_URL}/contributions/add`, formData);
//       fetchContributions();
//       setNewContribution({ image: null, title: "", description: "" });
//       setPreviewContribution(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };
const deleteCarouselImage = async () => {
  try {
    if (!deleteModalImage) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert("Login required");

    const token = await user.getIdToken();

    await axios.delete(
      `${BASE_URL}/department-wise/delete-image/${deleteModalImage.id}?department=internalcare&type=carousel`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Refresh carousel
    fetchCarouselImages();

    // ✅ Reset state
    setDeleteModalImage(null);

    // ✅ Close modal
    const modalEl = document.getElementById("deleteCarouselModal");
    bootstrap.Modal.getInstance(modalEl)?.hide();

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  const handleDeleteContribution = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contribution?")) return;
    const auth = getAuth();
const user = auth.currentUser;
if (!user) return alert("You are not logged in!");
const token = await user.getIdToken();
    try {
      await axios.delete(`${BASE_URL}/contributions/delete/${id}?department=internalcare`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      fetchContributions();
      setActiveContribution(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Carousel */}
      <div className="carousel-container two">
        <div className="carousel">
          {carouselImages.map((img, i) => {
            let position = i === index ? "active" : i === (index - 1 + carouselImages.length) % carouselImages.length ? "left" : i === (index + 1) % carouselImages.length ? "right" : "hidden";
            return (
<img
  key={i}
  src={img.url}
  alt="carousel"
  className={`carousel-img ${position}`}
onClick={() => handleCarouselClick(img, i)}/>            );
          })}
        </div>
      </div>

      {/* Carousel section overlay */}
      {showCarouselSection && (
        <div className="carousel-section-overlay">
          <div className="carousel-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Carousel Images</h3>
              <button className="close-carousel-btn" onClick={() => { setShowCarouselSection(false); setActiveImage(null); }}>Close</button>
            </div>
            <div className="carousel-images-grid">
<div
  className="carousel-image-card add-card"
  style={{ zIndex: 1000, position: "relative", cursor: "pointer" }}
  onClick={(e) => {
    e.stopPropagation(); // 🔥 VERY IMPORTANT

    const modalEl = document.getElementById("addImagesModal");

    if (modalEl) {
      const existingModal = bootstrap.Modal.getInstance(modalEl);
      if (existingModal) {
        existingModal.show();
      } else {
        new bootstrap.Modal(modalEl).show();
      }
    }
  }}
>
  +
</div>         
   {originalImages.map((img, idx) => (
                <div key={idx} className={`carousel-image-card ${activeImage === img ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); handleImageClick(img); }} onDoubleClick={handleImageDoubleClick}>
                  <img src={img.url} alt={`carousel-${idx}`} />
                  {activeImage === img && !img.isDefault  && <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteImage(img); }}>Delete</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Department Info & Cards */}

      <div>
       <h2 className="heading">Internal Care Department (ICD)</h2>
       <div className="about">
                   The Internal Care Department is dedicated to catering to the essential requirements of students with financial constraints, offering travel assistance, and ensuring access to washing machine facilities and specially-designed tricycles for students with disabilities. This department plays a crucial role in supporting the needs of disadvantaged students and ensuring their inclusive participation within the academic community.

        </div>
      </div>

      {/* Contributions */}
      <div className="container my-5 position-relative">
  <h2 className="text-center mb-4 text-black fw-bold">Our Contributions</h2>

  {/* + Add button at top-right */}
  {sessionStorage.getItem("isAdmin") === "true" && (
   <button
   className="btn btn-maroon position-absolute top-0 end-0 mt-2 me-2"
   onClick={() => {
     setNewContribution({ image: null, title: "", description: "" });
     setPreviewContribution(null);
 
     const modalEl = document.getElementById("addContributionModal");
     if (modalEl) new bootstrap.Modal(modalEl).show();
   }}
 >
   +
 </button>)}

  <div className="row justify-content-center g-4">
    {contributions.map((card) => (
      <div key={card.id} className="col-md-4 depart">
        <div
          className="card shadow h-100 position-relative d-flex flex-column"
          onClick={() => setActiveContribution(card.id)}
          onDoubleClick={() => setActiveContribution(null)}
        >
            {sessionStorage.getItem("isAdmin") === "true" && activeContribution === card.id && (
  <div className="position-absolute top-0 end-0 m-2">
    <button
      className="btn btn-danger btn-sm"
     onClick={(e) => {
  e.stopPropagation();
  setDeleteContributionId(card.id);

  const modalEl = document.getElementById("deleteContributionModal");
  if (modalEl) new bootstrap.Modal(modalEl).show();
}}
    >
      Delete
    </button>
  </div>
)}
          <img src={card.url} className="card-img-top" alt={card.title} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text text-truncate">{card.description}</p>
            <div className="mt-auto">
            <button
  className="read-more-btn mt-auto"
  onClick={(e) => {
    e.stopPropagation();

    setModalData({
      title: card.title,
      image: card.url,
      fullDesc: card.description,
    });

    setTimeout(() => {
      const modalEl = document.getElementById("infoModal");
      if (modalEl) new bootstrap.Modal(modalEl).show();
    }, 100); // ✅ FIX timing issue
  }}
>
  Read More
</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Add Contribution Modal */}
      <div className="modal fade" id="addContributionModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Add Contribution</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
{/* <input
key = {fileKey}
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewContribution(URL.createObjectURL(file));
      setNewContribution(prev => ({ ...prev, image: file }));
    }

    // Reset the input so the same file can be selected again

  }}/>        */}
  <input
  key={fileKey} // ✅ important
  type="file"
  className="form-control"
  accept="image/*"
  onChange={handleFileChange}
/>
         <input type="text" className="form-control my-2" placeholder="Title" value={newContribution.title} onChange={(e) => setNewContribution(prev => ({ ...prev, title: e.target.value }))} />
              <textarea className="form-control my-2" placeholder="Description" value={newContribution.description} onChange={(e) => setNewContribution(prev => ({ ...prev, description: e.target.value }))} />
              {previewContribution && <img src={previewContribution} alt="preview" className="img-fluid mt-2" style={{ maxHeight: "150px", objectFit: "cover" }} />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddContribution}>Add</button> */}
              <button
  type="button"
  className="btn btn-primary"
  disabled={!isFormValid}
  data-bs-dismiss="modal"
  onClick={async () => {

  

    try {
      const formData = new FormData();
      if (newContribution.image) formData.append("images", newContribution.image); // must match backend
      formData.append("department", "internalcare");
      formData.append("type", "contributions");
      formData.append("title", newContribution.title);
      formData.append("description", newContribution.description);

      await axios.post(`${BASE_URL}/upload`, formData);
      fetchContributions();
      setNewContribution({ image: null, title: "", description: "" });
      setPreviewContribution(null);
      
    } catch (err) {
      console.error(err);
    }
  }}
>
  Add
</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="deleteCarouselModal">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-danger text-white">
        <h5>Confirm Delete</h5>
        <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body text-center">
        Delete this carousel image?
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button className="btn btn-danger" onClick={deleteCarouselImage}>
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="deleteContributionModal">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-danger text-white">
        <h5>Confirm Delete</h5>
        <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body text-center">
        Delete this contribution?
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button className="btn btn-danger" onClick={confirmDeleteContribution}>
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
 <div className="modal fade" id="addImagesModal" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-dark text-white">
        <h5 className="modal-title">Add Images</h5>
        <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>

      <div className="modal-body">
        <input
          key={fileKey}
          type="file"
          multiple
          accept="image/*"
          className="form-control"
          onChange={(e) => {
            const files = Array.from(e.target.files);

            // ✅ VALIDATION
            const validFiles = files.filter((file) => file.type.startsWith("image/"));

            if (validFiles.length !== files.length) {
              alert("Only image files allowed");
            }

            const previews = validFiles.map((file) => ({
              file,
              preview: URL.createObjectURL(file),
            }));

            setNewImages(previews);
          }}
        />

        <div className="mt-3 d-flex flex-wrap gap-2">
          {newImages.map((img, idx) => (
            <img
              key={idx}
              src={img.preview}
              className="img-thumbnail"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleAddImages}
          data-bs-dismiss="modal"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Info Modal */}
<div
  className="modal fade"
  id="infoModal"
  tabIndex="-1"
  aria-labelledby="infoModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-black text-white">
        <h5 className="modal-title">{modalData.title}</h5>
        <button
  type="button"
  className="btn-close btn-close-white"
  data-bs-dismiss="modal"
 
></button>
      </div>
     
      <div className="modal-body text-center">
        {modalData.image && (
          <img src={modalData.image} alt={modalData.title} className="img-fluid rounded mb-3" />
        )}
        <p>{modalData.fullDesc}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
     {/* Quote & Donate Button */}
      <div className="quote">
        <h2>           "A helping hand costs nothing,
          <br /> but it can make a priceless impact on the world."         </h2>
      </div>

      <div className="btn-container">
         <button className="btnDonate" onClick={() => navigate("/donateUs")}>
          Donate 
        </button>
     </div>
    </div>
  );
}