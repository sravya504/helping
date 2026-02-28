

// import { useState, useEffect } from "react";
// import "./ImageCarousel.css";

// import img1 from "../assets/image.jpg";
// import img2 from "../assets/image.jpg";
// import img3 from "../assets/image.jpg";

// const images = [img1, img2, img3];

// export default function HealthCare() {
//   const [index, setIndex] = useState(0);

//   // Auto-slide every 3s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//    <div>
//      <div className="carousel-container">
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
//        <h2 className="heading"> Health Care Department (HCD)</h2>
//        <div className="about">
//           The Health Care Department is committed to safeguarding the well-being of 
//           the university community by organizing regular health camps and extending financial support to meet the medical needs of both students and staff. Beyond providing essential healthcare services, the department ensures timely access to quality medical assistance and offers financial aid to ease the burden of medical expenses. By fostering a healthier environment, it plays a pivotal role in enhancing the overall quality of life on campus and promoting a culture of care and wellness.
//        </div>
//     </div>
//      <br/>
//      <br/>
//        <div className="quote">
//           <h2>"A helping hand costs nothing,<br/> but it can make a
//             priceless impact on the world."</h2>

//        </div >

//        <div className="btn-container">
//           <button className="btn">Donate Us</button>
//        </div>
//    </div>
//   );
// }




import { useState, useEffect } from "react";
import "./ImageCarousel.css";
import * as bootstrap from "bootstrap";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/healthcare1.jpg"
import img2 from "../../assets/healthcare2.jpg";
import img3 from "../../assets/healthcare_con5.jpg";
import con1 from "../../assets/healthcare_con1.jpg";
import con2 from "../../assets/healthcare_con2.jpg";
import con3 from "../../assets/healthcare_con3.jpg";
import con4 from "../../assets/healthcare_con4.jpg";
import con5 from "../../assets/healthcare_con5.jpg";
import con7 from "../../assets/healthcare_con7.jpg";


const images = [img1, img2, img3];

export default function HealthCare() {
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
      title: "2013 Mega Blood Donation",
      image: con1,
      shortDesc:
        "Helping Hands conduct blood donation camp which involves organized blood drives...",
      fullDesc:
        "Helping Hands conduct blood donation camp which involves organized blood drives where volunteers registered, undergo health screenings, and donate blood. These events are crucial for maintaining a steady blood supply for hospitals. Trained staff ensure a safe and efficient process, while refreshments and rest areas help donors recover post-donation. Such initiatives save countless lives and support community health.",
    },
    {
      id: 2,
      title: "Distribution of Money for Ganesh who is suffering",
      image: con2,
      shortDesc: "Student named B.Ganesh from the 2018 batch has approached Helping Hands for his ...",
      fullDesc:
        "Student named B.Ganesh from the 2018 batch has approached Helping Hands for his surgery expenses as he is suffering from Hemisectomy. The cheque of 25,000/- was issued for his medical treatment.",
    },
    {
      id: 3,
      title: "Medical Aid Program",
      image: con3,
      shortDesc: "Financial and emotional support to students and staff in need...",
      fullDesc:
        "The Medical Aid Program offers financial support to those who face medical emergencies. It ensures that every student and staff member receives timely medical assistance without any financial burden.",
    },
    {
      id: 4,
      title: "EYE CAMP",
      image: con4,
      shortDesc: "We organized a large scale Eye and provided quality spectacles nearly to 2000 st...",
      fullDesc:
        "We organized a large scale Eye and provided quality spectacles nearly to 2000 students and faculty members, medicines and cataract surgeries for the two day eye camp in 2019 association with Aswini Foundation",
    },
    {
      id: 5,
      title: "Mega Health Camp -2013",
      image: con5,
      shortDesc: "Helping Hands organized a mega health camp offering free medical services, inclu...",
      fullDesc:
        "Helping Hands organized a mega health camp offering free medical services, including blood donation, health screenings, and consultations. Volunteers and medical professionals provided care to hundreds of students. The event included dental check-ups, eye exams, and vaccinations. Refreshments and educational materials were provided to promote healthy living. The camp successfully improved community health and raised awareness about preventive care.",
    },
    {
      id: 6,
      title: "Spects Distribution -2015",
      image: con7,
      shortDesc: "Helping Hands hosted an eye camp, providing essential eye care services to the s...",
      fullDesc:
        "Helping Hands hosted an eye camp, providing essential eye care services to the students. Attendees received free vision screenings, consultations with ophthalmologists, and prescription glasses.Informative sessions on maintaining eye health and preventing common eye diseases were part of the event. A great feedback regarding the quality of spectacles.",
    }
   
  ];

  const openModal = (card) => {
  setModalData(card);
  const modal = new bootstrap.Modal(document.getElementById("infoModal"));
  modal.show();
};

const navigate  = useNavigate();


  return (
    <div>
      {/* -------- YOUR EXISTING CODE -------- */}
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

      <div>
        <h2 className="heading">Health Care Department (HCD)</h2>
        <div className="about">
          The Health Care Department is committed to safeguarding the
          well-being of the university community by organizing regular health
          camps and extending financial support to meet the medical needs of
          both students and staff. Beyond providing essential healthcare
          services, the department ensures timely access to quality medical
          assistance and offers financial aid to ease the burden of medical
          expenses. By fostering a healthier environment, it plays a pivotal
          role in enhancing the overall quality of life on campus and promoting
          a culture of care and wellness.
        </div>
      </div>
      <br />
      <br />
      

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
  );
}