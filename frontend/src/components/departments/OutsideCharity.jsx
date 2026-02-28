import { useState, useEffect } from "react";
import "./ImageCarousel.css";
import { Modal } from "bootstrap";

import img1 from "../../assets/outsidecharity1.jpeg";
import img2 from "../../assets/outsidecharity2.jpeg";
import img3 from "../../assets/outsidecharity4.jpeg";
import con1 from "../../assets/outsidecharity_con1.jpg";
import con2 from "../../assets/outsidecharity_con2.jpeg";
import con3 from "../../assets/outsidecharity_con3.jpeg";
import con4 from "../../assets/outsidecharity_con4.jpeg";
import { useNavigate } from "react-router-dom";

const images = [img1, img2, img3];

export default function OutsideCharity() {
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
      title: "Distribution of Money towards Electrician Family",
      image: con1,
      shortDesc: "A Cheque of ₹1,00,000/- was iss..",
      fullDesc:
        "A Cheque of ₹1,00,000/- was issued for the electrician family who fell down while working on the campus and later confirmed as brain dead. We done two fixed deposits with ₹50,000/- each — each will be done in the name of his children.",
    },
    {
      id: 2,
      title: "Naupada School -2018",
      image: con2,
      shortDesc:
        "In 2018, we took on the responsibility of supporting a Government High School in ..",
      fullDesc:
        "In 2018, we took on the responsibility of supporting a Government High School in Naupada village. Our efforts included the installation of essential infrastructure such as a borewell and a hand wash unit, as well as setting up a motor to ensure a sustainable water supply. Through these initiatives, we aimed to enhance the educational environment and promote better hygiene practices for the benefit of the school community.",
    },
    {
      id: 3,
      title: "Orphanage Home Visit-2016",
      image: con3,
      shortDesc:
        "As part of a social visit,we tourned Sneha Rides orphanage in Nuzvid and spent q..",
      fullDesc:
        "As part of a social visit,we tourned Sneha Rides orphanage in Nuzvid and spent quality time with the children in the home",
    },
    {
      id: 4,
      title: "Vegetable Distribution -2021",
      image: con4,
      shortDesc:
        "Adhering to our motto to serve the needy,our team has actively involved in ident..",
      fullDesc:
        "Adhering to our motto to serve the needy,our team has actively involved in identifying the families in need. A total of 50 families of 7 villages from various districts our state were given essentials like Rice,vegetables and pulses sufficient for 2-3 weeks",
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

      <div>
        <h2 className="heading"> Outside Charity (OC)</h2>
        <div className="about">
          The department also extends its support beyond the university campus
          by making thoughtful contributions toward meeting the basic
          expenditures of individuals in the surrounding community. These
          contributions, though modest, are aimed at easing the financial strain
          faced by those in need and ensuring that essential requirements are
          met. Depending on the seriousness and urgency of a given situation,
          the department may even choose to exceed the usual assistance amount
          to provide additional relief and care. This provision is guided by a
          constitutionally defined framework that the department diligently
          upholds, ensuring transparency, fairness, and compassion in every act
          of financial support. Through such efforts, the department reinforces
          its commitment to social responsibility and community well-being
          beyond the boundaries of the institution.
        </div>
      </div>
      <br></br>

      {/* -------- NEW BOOTSTRAP CARDS -------- */}
      
 
     <h2 className="text-center mb-4 text-black fw-bold">Our Contributions</h2>  <br></br>
     <div className="row g-0 justify-content-center" >
  {cards.map((card) => (
    <div className="col-md-6 col-lg-5 d-flex justify-content-center depart" key={card.id} style={{marginBottom: "40px"}}>
      <div className="card shadow h-100" style={{ width: "100%", maxWidth: "480px"}}>
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
          "A helping hand costs nothing,
          <br /> but it can make a priceless impact on the world."
        </h2>
      </div>
      <br></br>

      <div className="btn-container">
        <button className="btnDonate" onClick={()=>{
            navigate('/donateUs')
        }}>Donate Us</button>
      </div>
    </div>
  );
}
