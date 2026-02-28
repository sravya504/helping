import React from 'react'
import {useState,useEffect} from 'react'
import "./ImageCarousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Modal } from 'bootstrap';


import img4 from "../../assets/Tricycle Distribution-2013 (1)(1).jpeg"
import { useNavigate} from 'react-router-dom';

const images = [img4, img4, img4];

const InternalCare = () => {

     const [index, setIndex] = useState(0);
      const [modalData, setModalData] = useState({});
    
      // Auto-slide every 2s
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
            title: "Tricycle Distribution-2013",
            image: img4,
            shortDesc:
              "As part of its ongoing commitment to community service and social responsibility...",
            fullDesc:
              "As part of its ongoing commitment to community service and social responsibility, Helping Hands organized a tricycle distribution program for specially abled students in collaboration with the Rotary Club of Vijayawada. This initiative aimed to enhance mobility, independence, and confidence among the beneficiaries, enabling them to pursue education and daily activities with greater ease. The program reflects the shared dedication of Helping Hands and the Rotary Club to inclusivity, empowerment, and improving the quality of life for differently abled individuals through meaningful and compassionate service.",
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
       <h2 className="heading"> Internal Care Department (ICD)</h2>
       <div className="about">
          The Internal Care Department is dedicated to catering to the essential requirements of students with financial constraints, offering travel assistance, and ensuring access to washing machine facilities and specially-designed tricycles for students with disabilities. This department plays a crucial role in supporting the needs of disadvantaged students and ensuring their inclusive participation within the academic community.
       </div>
    </div>

       <div className="quote">
          <h2>"A helping hand costs nothing,<br/> but it can make a
            priceless impact on the world."</h2>

       </div >

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

export default InternalCare
