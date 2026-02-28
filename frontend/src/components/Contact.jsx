import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left side: Text with icons */}
        <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
          <h1 style={{ color: "maroon" }}>How can we help you?</h1>
          <p style={{ fontSize: "1.2rem" }}>
            We're here to help and answer any questions you might have. We look
            forward to hearing from you!
          </p>

          <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
            <a
              href="https://www.google.com/maps/search/I3-First+Floor-62,+RGUKT,+Nuzvid,+521202/@16.7904555,80.8191098,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center text-decoration-none text-dark"
            >
              <FaMapMarkerAlt
                style={{ color: "maroon", marginRight: "10px" }}
              />
              <span>I3-First Floor-62, RGUKT, Nuzvid, 521202</span>
            </a>
          </div>

          <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
            <FaPhoneAlt style={{ color: "maroon", marginRight: "10px" }} />
            <span>+91 9848678011</span>
          </div>

          <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
            <a
              href="mailto:helpinghands@rguktn.ac.in"
              className="d-flex align-items-center text-decoration-none"
              style={{ color: "maroon" }}
            >
              <FaEnvelope style={{ marginRight: "10px" }} size={20} />
              <span style={{ color: "black" }}>helpinghands@rguktn.ac.in</span>
            </a>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <img
            src="./images/contacting.png"
            alt="help"
            className="img-fluid"
            style={{ maxHeight: "200px" }}
          />
        </div>
      </div>
    </div>
  );
}
