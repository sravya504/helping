// import React from 'react'
// import {useState,useEffect} from 'react'
// import "./ImageCarousel.css";
// import { useNavigate } from 'react-router-dom';
// import { Modal } from "bootstrap";


// import img1 from "../../assets/innovative2.jpg";
// import img2 from "../../assets/innovative1.jpg";
// import img3 from "../../assets/innovative2.jpg";


// // EchoFriendly crafts and techzite expo

// const images = [img1, img2, img3];

// const InnovativeAndInfomative = () => {

//          const [index, setIndex] = useState(0);
//           const [modalData, setModalData] = useState({});
        
//           // Auto-slide every 3s
//           useEffect(() => {
//             const interval = setInterval(() => {
//               setIndex((prev) => (prev + 1) % images.length);
//             }, 2000);
//             return () => clearInterval(interval);
//           }, []);


//           // Sample card data
//             const cards = [
//               {
//                 id: 1,
//                 title: "2013 Mega Blood Donation",
//                 image: img1,
//                 shortDesc:
//                   "Helping Hands conduct blood donation camp which involves organized blood drives...",
//                 fullDesc:
//                   "Helping Hands conducted a Mega Blood Donation Camp in 2013 with active participation from students and staff. Hundreds of volunteers came forward, making it one of the most successful donation events in RGUKT history.",
//               },
//               {
//                 id: 2,
//                 title: "Health Awareness Camp",
//                 image: img2,
//                 shortDesc: "Organized to promote regular health checkups and fitness awareness...",
//                 fullDesc:
//                   "This camp was aimed at promoting the importance of regular medical checkups and a healthy lifestyle. Doctors from reputed hospitals visited the campus and conducted free consultations and health screenings.",
//               },
//               {
//                 id: 3,
//                 title: "Medical Aid Program",
//                 image: img3,
//                 shortDesc: "Financial and emotional support to students and staff in need...",
//                 fullDesc:
//                   "The Medical Aid Program offers financial support to those who face medical emergencies. It ensures that every student and staff member receives timely medical assistance without any financial burden.",
//               },
//             ];
          
//             const openModal = (card) => {
//   setModalData(card);
//   const modal = new Modal(
//     document.getElementById("infoModal")
//   );
//   modal.show();
// };

//     const navigate = useNavigate();
//   return (
//     <div>
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
//        <h2 className="heading">Innovative And Infomative Department(IAID)</h2>
//        <div className="about">
//         The Innovative and Informative Department is dedicated to fostering creativity, knowledge sharing, and forward-thinking among the university community. By organizing workshops, seminars, and interactive sessions, the department encourages students and staff to explore new ideas, embrace modern technologies, and stay informed about emerging trends. Through innovative initiatives and educational programs, it cultivates a spirit of curiosity and continuous learning. The department serves as a hub for innovation and intellectual growth, empowering individuals to think critically, create impactful solutions, and contribute meaningfully to academic and societal advancement. 
          
//        </div>
//     </div>

       

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
//               <br></br>

//       <div className="btn-container">
//         <button className="btnDonate " onClick={()=>{
//             navigate('/donateUs')
//         }}>Donate Us</button>
//       </div>
//    </div>
//   )
// }

// export default InnovativeAndInfomative;
import React, { useState, useEffect, useRef } from "react";
import "./ImageCarousel.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { Modal } from "bootstrap";
import "./HealthCare.css"

import img1 from "../../assets/innovative2.jpg";
import img2 from "../../assets/innovative1.jpg";
import img3 from "../../assets/innovative2.jpg";

const BASE_URL = "http://localhost:5000";

const InnovativeAndInfomative = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [deleteModalImage, setDeleteModalImage] = useState(null);
  const [showCarouselSection, setShowCarouselSection] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [fileKey, setFileKey] = useState(Date.now());
  const [contributions, setContributions] = useState([]);
  const [newContribution, setNewContribution] = useState({ image: null, title: "", description: "" });
  const [previewContribution, setPreviewContribution] = useState(null);
  const [activeContribution, setActiveContribution] = useState(null);
  const [modalData, setModalData] = useState({});

  const navigate = useNavigate();

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (carouselImages.length || 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  // Fetch carousel images and contributions
  useEffect(() => {
    fetchCarouselImages();
    fetchContributions();
  }, []);

  const fetchCarouselImages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/department-images?department=innovative&type=carousel`);
      const data = res.data;
      setOriginalImages(data);

      if (data.length === 0) return;

      let finalImages = [];
      if (data.length === 1) finalImages = Array(3).fill(data[0]);
      else if (data.length === 2) finalImages = [data[0], data[1], { ...data[0] }];
      else finalImages = data;

      setCarouselImages(finalImages);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContributions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/contributions?department=innovative`);
      setContributions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddImages = async () => {
    try {
      const formData = new FormData();
      newImages.forEach((img) => formData.append("images", img.file));
      formData.append("department", "innovative");
      formData.append("type", "carousel");

      await axios.post(`${BASE_URL}/upload`, formData);
      fetchCarouselImages();
      setNewImages([]);
      setFileKey(Date.now());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = (img) => {
    setDeleteModalImage(img);
    const modalEl = document.getElementById("deleteConfirmModal");
    if (modalEl) new Modal(modalEl).show();
  };

  const confirmDeleteImage = async () => {
    try {
      if (!deleteModalImage?.id) return;

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return alert("You are not logged in!");

      const token = await user.getIdToken();
      await axios.delete(`${BASE_URL}/department-wise/delete-image/${deleteModalImage.id}?department=innovative&type=carousel`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCarouselImages();
      setActiveImage(null);
      setDeleteModalImage(null);

      const modalEl = document.getElementById("deleteConfirmModal");
      Modal.getInstance(modalEl)?.hide();
      alert("Image deleted successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  const handleAddContribution = async () => {
    try {
      const formData = new FormData();
      if (newContribution.image) formData.append("images", newContribution.image);
      formData.append("department", "innovative");
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
  };

  const handleDeleteContribution = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contribution?")) return;
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert("You are not logged in!");
    const token = await user.getIdToken();

    try {
      await axios.delete(`${BASE_URL}/contributions/delete/${id}?department=innovative`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContributions();
      setActiveContribution(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (card) => {
    setModalData(card);
    const modal = new Modal(document.getElementById("infoModal"));
    modal.show();
  };

  return (
    <div>
      {/* Carousel */}
      <div className="carousel-container two">
        <div className="carousel">
          {images.map((img, i) => {
            let position = "";
            if (i === index) position = "active";
            else if (i === (index - 1 + images.length) % images.length) position = "left";
            else if (i === (index + 1) % images.length) position = "right";
            else position = "hidden";

            return <img key={i} src={img} alt="carousel" className={`carousel-img ${position}`} />;
          })}
        </div>
      </div>

      {/* Carousel overlay section */}
      {showCarouselSection && (
        <div className="carousel-section-overlay">
          <div className="carousel-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Carousel Images</h3>
              <button className="close-carousel-btn" onClick={() => setShowCarouselSection(false)}>
                Close
              </button>
            </div>
            <div className="carousel-images-grid">
              <div className="carousel-image-card add-card" onClick={() => {
                const modalEl = document.getElementById("addImagesModal");
                if (modalEl) new Modal(modalEl).show();
              }}>+</div>
              {originalImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`carousel-image-card ${activeImage === img ? "active" : ""}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img.url} alt={`carousel-${idx}`} />
                  {activeImage === img && <button className="delete-btn" onClick={() => handleDeleteImage(img)}>Delete</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Department Info */}
      <div>
        <h2 className="heading">Innovative And Infomative Department(IAID)</h2>
        <div className="about">
          The Innovative and Informative Department is dedicated to fostering creativity, knowledge sharing, and forward-thinking among the university community. By organizing workshops, seminars, and interactive sessions, the department encourages students and staff to explore new ideas, embrace modern technologies, and stay informed about emerging trends. Through innovative initiatives and educational programs, it cultivates a spirit of curiosity and continuous learning.
        </div>
      </div>

      {/* Contributions section */}
      <div className="container my-5 position-relative">
        <h2 className="text-center mb-4 text-black fw-bold">Our Contributions</h2>

        {/* Top-right + button */}
        <button
          className="btn btn-maroon position-absolute top-0 end-0 mt-2 me-2"
          data-bs-toggle="modal"
          data-bs-target="#addContributionModal"
          onClick={() => {
            setNewContribution({ image: null, title: "", description: "" });
            setPreviewContribution(null);
          }}
        >+</button>

        <div className="row justify-content-center g-4">
          {contributions.map((card) => (
            <div key={card.id} className="col-md-4 depart">
              <div className="card shadow h-100 position-relative d-flex flex-column">
                <img src={card.url} className="card-img-top" alt={card.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text text-truncate">{card.description}</p>
                  <div className="mt-auto">
                    <button className="read-more-btn w-100" onClick={() => openModal(card)}>Read More</button>
                  </div>
                </div>

                {activeContribution === card.id && (
                  <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteContribution(card.id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Modal */}
      <div className="modal fade" id="addContributionModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Add Contribution</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreviewContribution(URL.createObjectURL(file));
                setNewContribution(prev => ({ ...prev, image: file }));
              }} />
              <input type="text" className="form-control my-2" placeholder="Title" value={newContribution.title} onChange={(e) => setNewContribution(prev => ({ ...prev, title: e.target.value }))} />
              <textarea className="form-control my-2" placeholder="Description" value={newContribution.description} onChange={(e) => setNewContribution(prev => ({ ...prev, description: e.target.value }))} />
              {previewContribution && <img src={previewContribution} alt="preview" className="img-fluid mt-2" style={{ maxHeight: "150px", objectFit: "cover" }} />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddContribution}>Add</button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <div className="modal fade" id="infoModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-black text-white">
              <h5 className="modal-title">{modalData.title}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center">
              {modalData.image && <img src={modalData.image} alt={modalData.title} className="img-fluid rounded mb-3" />}
              <p>{modalData.fullDesc}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote & Donate */}
      <div className="quote">
        <h2>"A helping hand costs nothing,<br /> but it can make a priceless impact on the world."</h2>
      </div>

      <div className="btn-container">
        <button className="btnDonate" onClick={() => navigate("/donateUs")}>Donate</button>
      </div>
    </div>
  );
};

export default InnovativeAndInfomative;