import React from 'react'
import {useState,useEffect} from 'react'
import "./ImageCarousel.css";
import { Modal } from "bootstrap";

import img1 from "../../assets/publicrelations1.jpeg";
import img2 from "../../assets/publicrelations2.jpeg";
import img3 from "../../assets/publicrelations3.jpeg";

import img4 from "../../assets/publicrelations_con1.jpeg";
import img5 from "../../assets/publicrelations_con2.jpeg";
import img6 from "../../assets/publicrelations_con3.jpeg";
import img7 from "../../assets/publicrelations_con4.jpeg";
import { useNavigate } from 'react-router-dom';
// import img8 from "../../assets/publicrelations_con5.jpeg"

const images = [img1, img2, img3];

const PublicRelations = () => {

         const [index, setIndex] = useState(0);
         const [modalData, setModalData] = useState({});
    
        
          // Auto-slide every 3s
          useEffect(() => {
            const interval = setInterval(() => {
              setIndex((prev) => (prev + 1) % images.length);
            }, 2000);
            return () => clearInterval(interval);
          }, []);

          // Sample card data
            const cards = [
              {
                id: 1,
                title: "2013 Mega Blood Donation",
                image: img4,
                shortDesc:
                  "Helping Hands conduct blood donation camp which involves organized blood drives...",
                fullDesc:
                  "Helping Hands conducted a Mega Blood Donation Camp in 2013 with active participation from students and staff. Hundreds of volunteers came forward, making it one of the most successful donation events in RGUKT history.",
              },
              {
                id: 2,
                title: "Health Awareness Camp",
                image: img5,
                shortDesc: "Organized to promote regular health checkups and fitness awareness...",
                fullDesc:
                  "This camp was aimed at promoting the importance of regular medical checkups and a healthy lifestyle. Doctors from reputed hospitals visited the campus and conducted free consultations and health screenings.",
              },
              {
                id: 3,
                title: "Medical Aid Program",
                image: img6,
                shortDesc: "Financial and emotional support to students and staff in need...",
                fullDesc:
                  "The Medical Aid Program offers financial support to those who face medical emergencies. It ensures that every student and staff member receives timely medical assistance without any financial burden.",
              },
              {
                id: 4,
                title: "Convocation-2015",
                image: img7,
                shortDesc: "During Convocation 2015, we established a dedicated Helping Hands booth. Here, t...",
                fullDesc:
                  "During Convocation 2015, we established a dedicated Helping Hands booth. Here, the organisation actively showcased and communicated the various service activities and accomplishments we had undertaken to contribute to our community and beyond.",
              },
               {
                id: 5,
                title: "Munuguru Cloth Donation",
                image: img7,
                shortDesc: "Munuguru Cloth Donation We Successfully organised cloth donation campaign in fe...",
                fullDesc:
                  "Munuguru Cloth Donation We Successfully organised cloth donation campaign in few areas near Munuguru,Khammam District on 28-07-19. we have collected wearable clothes from the students and faculty, distributed more than 1000 pairs of clothes to the needy people.",
              },
            ];
          
            const openModal = (card) => {
  setModalData(card);
  const modal = new Modal(
    document.getElementById("infoModal")
  );
  modal.show();
};

            const navigate = useNavigate();
  return (
    <div>
     <div className="carousel-container two">
      <div className="carousel">
        {images.map((img, i) => {
          let position = "";
          if (i === index) {
            position = "active"; // center
          } else if (i === (index - 1 + images.length) % images.length) {
            position = "left"; // previous
          } else if (i === (index + 1) % images.length) {
            position = "right"; // next
          } else {
            position = "hidden"; // all other images
          }

          return (
            <img
              key={i}
              src={img}
              alt="carousel"
              className={`carousel-img ${position}`}
            />
          );
        })}
      </div>          
    </div>

    <div >
       <h2 className="heading">Public Relations Department (PRD)</h2>
       <div className="about">
         It makes a significant contribution toward covering the basic expenditures of individuals residing off-campus, ensuring that their essential needs are met to some extent. Depending on the severity of each individual’s circumstances, the financial assistance provided can sometimes exceed the standard amount to offer additional relief. This specific marginal amount is determined and regulated in accordance with the constitution we uphold, reflecting our commitment to fairness, equity, and support for those in need.
       </div>
    </div>

      

      {/* -------- NEW BOOTSTRAP CARDS -------- */}
      <div className="container my-5">
        <h2 className="text-center mb-4 text-black fw-bold">Our Contributions</h2>
        <div className="row justify-content-center g-4">
          {cards.map((card) => (
            <div className="col-md-4 depart" key={card.id}>
              <div className="card shadow h-100">
                <img src={card.image} className="card-img-top" alt={card.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.shortDesc}</p>
                  <button
                    className="btn btn-dark mt-auto"
                    onClick={() => openModal(card)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- MODAL -------- */}
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
              <h5 className="modal-title" id="infoModalLabel">
                {modalData.title}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-black"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              {modalData.image && (
                <img
                  src={modalData.image}
                  alt={modalData.title}
                  className="img-fluid rounded mb-3"
                />
              )}
              <p>{modalData.fullDesc}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="quote">
        <h2>
          "A helping hand costs nothing,<br /> but it can make a priceless
          impact on the world."
        </h2>
      </div>
              <br></br>

      <div className="btn-container">
        <button className="btnDonate " onClick={()=>{
            navigate('/donateUs')
        }}>Donate Us</button>
      </div>
   </div>
  )
}

export default PublicRelations
