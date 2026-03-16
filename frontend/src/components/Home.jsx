

import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function Home() {
 
  const [centerIndex, setCenterIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(null);
  const navigate = useNavigate();

  // Fallback static images
  const staticImages = [
    { image: "../images/carousal_image_1.jpeg", caption: "Cloth Donation Camp in Yanadi Colony" },
    { image: "../images/carousal_image2.jpg", caption: "Inauguration of Mega Eye Camp with Ashwani Foundation" },
    { image: "../images/carousal_image2.jpg", caption: "Community Health Awareness Program" },
  ];
   const [carouselImages, setCarouselImages] = useState(staticImages);

  // Fetch carousel images from Firebase
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const snapshot = await get(ref(db, "images"));
        const data = snapshot.val() || {};
        const carouselOnly = Object.values(data).filter((img) =>
          img.locations?.includes("carousel")
        );

        if (carouselOnly.length > 0) {
          setCarouselImages(carouselOnly);
        } else {
          setCarouselImages(staticImages); // fallback
        }
      } catch (err) {
        console.error("Failed to fetch carousel images:", err);
        setCarouselImages(staticImages);
      }
    };

    fetchCarouselImages();
  }, []);

  const leftIndex = (centerIndex - 1 + carouselImages.length) % carouselImages.length;
  const rightIndex = (centerIndex + 1) % carouselImages.length;

  const nextImage = () => setCenterIndex((prev) => (prev + 1) % carouselImages.length);
  const prevImage = () => setCenterIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  useEffect(() => {
    if (carouselImages.length === 0) return;
    const interval = setInterval(nextImage, 3000);
    setAutoScroll(interval);
    return () => clearInterval(interval);
  }, [carouselImages]);

  const resetAutoScroll = () => {
    if (autoScroll) clearInterval(autoScroll);
    const interval = setInterval(nextImage, 3000);
    setAutoScroll(interval);
  };

  // Testimonials
  const testimonials = [
    { content: "I'm deeply thankful to Helping Hands RGUKT-Nuzvid for their generous support after my train accident. Their contribution of Rs. 1,45,328/- covered my medical expenses and provided crucial support during my recovery. Thank you for being there for me in my time of need; your assistance and compassion mean the world to me.", by: "Student Help 2014" },
    { content: "I am deeply thankful to Helping Hands RGUKT-Nuzvid for their generous support during a tough time. Their financial help of 2.3 lakh rupees enabled me to undergo crucial hand surgery during my engineering studies, restoring my ability to use my hand fully. Their kindness gave me hope and determination, changing my life and allowing me to pursue my dreams.", by: "Student Help 2015" },
    { content: "I'm profoundly grateful to Helping Hands RGUKT-Nuzvid for their generous support during my kidney transplantation. Their Rs. 1,00,000/- contribution significantly eased my medical expenses and provided immense relief during a challenging time. Thank you for your unwavering support and compassion; I will always cherish your help.", by: "Faculty Help 2015" },
    { content: "I am deeply grateful to Helping Hands RGUKT-Nuzvid for their generous support during a difficult time. Their Rs. 60,000 contribution covered a significant portion of my medical expenses after a hostel fall, allowing me to focus on recovery. Thank you for your kindness and compassion; you've been a beacon of hope for me and my family.", by: "Student Help 2017" },
    { content: "I'm a student of RGUKT-Nuzvid from the 2009 batch. I'm thankful to Helping Hands for contributing Rs. 46,046/- towards my treatment. In 2019, I faced complete kidney failure, and the treatment costs seemed insurmountable. Thanks to Helping Hands and additional donors they rallied, my surgery was successful, and I fully recovered. I'm deeply grateful for their financial support.", by: "Student Help 2019" },
  ];

  const workflow = [
    { image: "../images/buildingteam.png", content: "Building Strong Team" },
    { image: "../images/fund_raising.png", content: "Fund Raising" },
    { image: "../images/Help.png", content: "Helping Needy" },
  ];

  const recognitions = [
    { image: "../images/globe.png", content: "HH Lockdown", file_link: "" },
    { image: "../images/rescue.png", content: "Kerala Floods Acknowledgment", file_link: "" },
    { image: "../images/12a.png", content: "12A Registration", file_link: "" },
  ];

  return (
    <div id="fullpage" className="px-3 px-md-5">
      {/* Carousel */}
      <section className="carousel1">
        <div id="carousel-container">
          <div id="carousel">
            <div className="img-wrapper left-image">
             <img
  src={carouselImages[leftIndex]?.url || carouselImages[leftIndex]?.image || "/images/carousal_image2.jpg"}
  alt="left"
/>
              <div className="caption">{carouselImages[leftIndex].caption || ""}</div>
            </div>
            <div className="img-wrapper center-image">
             <img
  src={carouselImages[centerIndex]?.url || carouselImages[centerIndex]?.image || "/images/carousal_image_1.jpeg"}
  alt="center"
/>
              <div className="caption">{carouselImages[centerIndex].caption || ""}</div>
            </div>
            <div className="img-wrapper right-image">
             <img
  src={carouselImages[rightIndex]?.url || carouselImages[rightIndex]?.image || "/images/carousal_image2.jpg"}
  alt="right"
/>
              <div className="caption">{carouselImages[rightIndex].caption || ""}</div>
            </div>

            <button className="arrow-btn arrow-left" onClick={() => { prevImage(); resetAutoScroll(); }}>&#8592;</button>
            <button className="arrow-btn arrow-right" onClick={() => { nextImage(); resetAutoScroll(); }}>&#8594;</button>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow p-md-4">
        <h3 className="text-center" style={{ color: "#7f1d1d" }}>Our Workflow</h3>
        <div className="card-group">
          {workflow.map((item, index) => (
            <div key={index} className="card justify-content-center align-items-center py-4 border rounded">
              <img src={item.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center" }}>{item.content}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recognitions Section */}
      <section className="recognitions">
        <h3 className="text-center" style={{ color: "#7f1d1d" }}>Recognitions</h3>
        <div className="card-group">
          {recognitions.map((item, index) => (
            <a key={index} href={item.file_link || "#"} target="_blank" rel="noopener noreferrer" className="text-decoration-none shadow1">
              <div className="card justify-content-center align-items-center py-4 h-100">
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>{item.content}</h5>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <h3 className="text-center" style={{ color: "#7f1d1d" }}>Testimonials</h3>
        <div id="testimonial-carousel-container">
          <div id="testimonial-carousel">
            <div className="testimonial-wrapper left-testimonial">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">{testimonials[(testimonialIndex - 1 + testimonials.length) % testimonials.length].content}</p>
                  <p className="card-text"><small style={{ color: "#7f1d1d" }}>{testimonials[(testimonialIndex - 1 + testimonials.length) % testimonials.length].by}</small></p>
                </div>
              </div>
            </div>
            <div className="testimonial-wrapper center-testimonial">
              <div className="card">
                <div className="card-body fw-bold">
                  <p className="card-text">{testimonials[testimonialIndex].content}</p>
                  <p className="card-text"><small style={{ color: "#7f1d1d" }}>{testimonials[testimonialIndex].by}</small></p>
                </div>
              </div>
            </div>
            <div className="testimonial-wrapper right-testimonial">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">{testimonials[(testimonialIndex + 1) % testimonials.length].content}</p>
                  <p className="card-text"><small style={{ color: "#7f1d1d" }}>{testimonials[(testimonialIndex + 1) % testimonials.length].by}</small></p>
                </div>
              </div>
            </div>
          </div>

          <div id="testimonial-arrows">
            <button className="arrow-btn arrow-left" onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>&#8592;</button>
            <button className="arrow-btn arrow-right" onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}>&#8594;</button>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="donate">
        <p className="fw-bold text-center" style={{ fontSize: "25px" }}>
          " A helping hand costs nothing,but it make a priceless impact on the world. "
        </p>
        <button
          type="button"
          className="btn"
          style={{
            padding: "10px 30px",
            borderRadius: "50px",
            border: "none",
            backgroundColor: "#7f1d1d",
            margin: "0 auto",
            display: "block",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "600px !important",
            transition: "background-color 0.3s",
          }}
          onClick={() => navigate("/donateUs")}
        >
          Donate Us
        </button>
      </section>
    </div>
  );
}