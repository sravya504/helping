import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const events = [
    {
      img: "/14th Anniversary of Helping Hands.png",
      date: { day: '25', month: 'AUG' },
      title: '14th Anniversary of Helping Hands',
      desc: 'Marking 14 years of Helping Hands! Since 2009, your consistent encouragement has paved the way for an inspiring journey 💫',
      fullDate: 'August 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'SAC BUILDING AUDITORIUM'
    },
    {
      img: "/Cloth Distribution.jpeg",
      date: { day: '25', month: 'AUG' },
      title: 'Cloth Distribution at MPP High School, Yanadi Colony.',
      // desc:' Helping Hands RGUKT, Nuzvid, an NGO, certified by the government, established by...',
      desc : 'Helping Hands RGUKT, Nuzvid, an NGO, certified by the government, established by the students of RGUKT and supported by faculty, conducted a cloth distribution camp at MPP High School, Yanadi Colony, Nuzvid . These wearable dresses have been collected from students and faculty of RGUKT. HH collaborated with the Destiny Changes Foundation established by Alexander Pretham Jacob, to help the people in need around the village. The event was a huge success, with about 160 families benefiting from the distribution of nearly 2000 pairs of dresses. The cloth donation event was coordinated by the school teacher, Pamavathi Garu , along with the Headmaster Pardha Sarathi Garu and English teacher Joseph Garu, who played a significant role in making the event a huge success.',
      fullDate: 'August 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'SAC BUILDING AUDITORIUM'
    },
    {
      img: "/Cloth Distribution at RR peta.jpeg",
      date: { day: '25', month: 'AUG' },
      title: 'Cloth Distribution at RR peta and line thanda Village.',
      desc: 'Helping Hands RGUKT, Nuzvid, a government-certified NGO established by RGUKT students and supported by faculty, organized a cloth distribution camp in RR peta and Line thanda villages, Nuzvid. The event was highly successful, benefiting approximately 53 families, who received nearly 239 pairs of dresses.',
      fullDate: 'August 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'SAC BUILDING AUDITORIUM'
    },
    {
      img: "/Teckzite-23.png",
      date: { day: '20', month: 'JAN' },
      title: 'Teckzite-23 Eco-Friendly Crafts Stall',
      desc: 'Aesthetically Pleasing and Environmentally Conscious? Here is A Clarion Call from Helping Hands to visit our Eco-Friendly Crafts Stall in Teckzite 23 and meet our new born Eco Hands.... Your Time & Visit inspires us. Visit the Stall & Buy our Unique Eco Crafts.',
      fullDate: 'January 20, 2026',
      time: '11:00 AM - 3:00 PM',
      location: 'NGO Headquarters'
    }
  ];

  const archiveEvents = [
    {
      img: "/Covid Initiatives in Lockdown.jpg",
      date: { day: '10', month: 'OCT' },
      title: 'Covid Initiatives in Lockdown',
      desc: 'During the lockdown period, Helping Hands took several initiatives to support the community. We organized food distribution drives, provided essential supplies to those in need, and collaborated with local authorities to ensure safety and well-being. Our volunteers worked tirelessly to make a positive impact during these challenging times.',
      fullDate: 'October 10, 2022',
      time: '4:00 PM - 6:00 PM',
      location: 'Old Venue 1'
    },
    {
      img: "/Entrepreneural Initiative.jpg",
      date: { day: '16', month: 'DEC' },
      title: 'Entrepreneurial Initiative',
      desc: 'We stepped into Entrepreneurship and established an Enterprise - GROCERY STORE for the faculty members in RGUKT NUZVID on 16 Dec 2020, funded and administrating by HH.',
      fullDate: 'December 16, 2020',
      time: '2:00 PM - 5:00 PM',
      location: 'Old Venue 2'
    },
    {
      img: "/Mega Eye Camp 2019.jpg",
      date: { day: '23', month: 'OCT' },
      title: 'Mega Eye Camp',
      desc: 'We successfully organized a Mega Eye Camp on 23/10/2016 in collaboration with Ashwani Foundation India. The eye camp benefited over 2500 people in the campus with free check-ups and medicines.',
      fullDate: 'October 23, 2016',
      time: '3:00 PM - 7:00 PM',
      location: 'Old Venue 3'
    }
  ];

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <header className="hh-header-top">
        <h1>HELPING HANDS</h1>
        <h2>RGUKT-NUZVID</h2>
        <p><strong>A Students's Initiative- An Abode of Service</strong></p>
        <div className="hh-reg">(Regd No. 313/2019 under the A.P. Societies Registration Act, 2001)</div>
      </header>

      <nav className="navbar navbar-expand-lg hh-navbar sticky-top">
        <div className="container">
          <button className="navbar-toggler" type="button" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="hhNavbarNav">
            <img src="/logo.jpg" alt="Logo" className="navbar-logo" />
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Departments</a></li>
              <li className="nav-item"><a className="nav-link" href="#">People</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Certificate</a></li>
              <li className="nav-item"><a className="nav-link active" href="#">Events</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Join us</a></li>
            </ul>
            <button className="donate-btn">Donate Us</button>
          </div>
        </div>
      </nav>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {events.map((event, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card shadow-sm h-100 event-card">
                  <img src={event.img} className="card-img-top" alt={event.title} />
                  <div className="card-body d-flex flex-column pt-4">
                    <div className="event-date"><span>{event.date.day}</span>{event.date.month}</div>
                    <h5 className="card-title mt-3" style={{color:'#8B2323'}}>{event.title}</h5>
                    <p className="card-text flex-grow-1">{event.desc.length > 100 ? event.desc.substring(0, 100) + '...' : event.desc}</p>
                    <button className="btn btn-outline-danger w-100 mt-auto rounded-pill" onClick={() => handleViewDetails(event)}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-center mt-5" style={{color:'#8B2323'}}>Archives</h2>
          <div className="row g-4 justify-content-center">
            {archiveEvents.map((event, index) => (
              <div key={`archive-${index}`} className="col-xl-3 col-lg-4 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card shadow-sm h-100 event-card">
                  <img src={event.img} className="card-img-top" alt={event.title} />
                  <div className="card-body d-flex flex-column pt-4">
                    <div className="event-date"><span>{event.date.day}</span>{event.date.month}</div>
                    <h5 className="card-title mt-3" style={{color:'#8B2323'}}>{event.title}</h5>
                    <p className="card-text flex-grow-1">{event.desc.length > 100 ? event.desc.substring(0, 100) + '...' : event.desc}</p>
                    <button className="btn btn-outline-danger w-100 mt-auto rounded-pill" onClick={() => handleViewDetails(event)}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="hh-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-start">
              <h5>Helping Hands</h5>
              <div className="hh-desc">
                A student-volunteer organization committed to the welfare of the student community in RGUKT-Nuzvid, serving rural youth since 2009.
              </div>
            </div>
            <div className="col-md-6 text-start">
              <h5>Office</h5>
              <ul className="hh-contact-list">
                <li><i className="fa fa-location-dot"></i> RGUKT-Nuzvid Campus, Nuzvid, Krishna District, Andhra Pradesh - 521201</li>
                <li><i className="fa fa-envelope"></i> helpinghands@rgukt.ac.in</li>
                <li><i className="fa fa-phone"></i> +91 98765 43210</li>
              </ul>
              <h5>Follow Us</h5>
              <div className="social-links mb-2">
                <a href="https://www.instagram.com/helpinghands_rguktn/#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.whatsapp.com/channel/0029VahYAYdEgGfNOxdJXH2u" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                <a href="https://x.com/HH_RguktN" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://www.facebook.com/rgukthelpinghands" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center hh-copyright mt-3">
            &copy; 2025 Helping Hands - RGUKT Nuzvid. All rights reserved.
          </div>
        </div>
      </footer>

      {showModal && selectedEvent && (
        <>
          <div className="modal-backdrop show" onClick={closeModal}></div>
          <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: 'white', color: '#8B2323'}}>
                  <h5 className="modal-title" id="eventModalLabel">{selectedEvent.title}</h5>
                  <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src={selectedEvent.img} className="img-fluid mb-3" alt={selectedEvent.title} />
                  <p>{selectedEvent.desc}</p>
                  <hr />
                  <p><i className="fa fa-calendar-alt me-2 text-muted"></i><strong>{selectedEvent.fullDate}</strong></p>
                  <p><i className="fa fa-clock me-2 text-muted"></i><strong>{selectedEvent.time}</strong></p>
                  <p><i className="fa fa-map-marker-alt me-2 text-muted"></i><strong>{selectedEvent.location}</strong></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
