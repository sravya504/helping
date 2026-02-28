import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Events.css';

function Events(){
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const events = [
    {
      img: "/images/14th Anniversary of Helping Hands.png",
      date: { day: '25', month: 'AUG' },
      title: '14th Anniversary of Helping Hands',
      desc: 'Marking 14 years of Helping Hands! Since 2009, your consistent encouragement has paved the way for an inspiring journey 💫',
      fullDate: 'August 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'SAC BUILDING AUDITORIUM'
    },
    {
      img: "/images/Cloth Distribution.jpeg",
      date: { day: '25', month: 'AUG' },
      title: 'Cloth Distribution at MPP High School, Yanadi Colony.',
      desc : 'Helping Hands RGUKT, Nuzvid, an NGO, certified by the government, established by the students of RGUKT and supported by faculty, conducted a cloth distribution camp at MPP High School, Yanadi Colony, Nuzvid . These wearable dresses have been collected from students and faculty of RGUKT. HH collaborated with the Destiny Changes Foundation established by Alexander Pretham Jacob, to help the people in need around the village. The event was a huge success, with about 160 families benefiting from the distribution of nearly 2000 pairs of dresses. The cloth donation event was coordinated by the school teacher, Pamavathi Garu , along with the Headmaster Pardha Sarathi Garu and English teacher Joseph Garu, who played a significant role in making the event a huge success.',
      fullDate: 'August 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'SAC BUILDING AUDITORIUM'
    },
    {
      img: "/images/Cloth Distribution at RR peta.jpeg",
      date: { day: '25', month: 'AUG' },
      title: 'Cloth Distribution at RR peta and line thanda Village.',
      desc: 'Helping Hands RGUKT, Nuzvid, a government-certified NGO established by RGUKT students and supported by faculty, organized a cloth distribution camp in RR peta and Line thanda villages, Nuzvid. The event was highly successful, benefiting approximately 53 families, who received nearly 239 pairs of dresses.',
      fullDate: 'August 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'SAC BUILDING AUDITORIUM'
    },
    {
      img: "/images/Teckzite-23.png",
      date: { day: '20', month: 'JAN' },
      title: 'Teckzite-23 Eco-Friendly Crafts Stall',
      desc: 'Aesthetically Pleasing and Environmentally Conscious? Here is A Clarion Call from Helping Hands to visit our Eco-Friendly Crafts Stall in Teckzite 23 and meet our new born Eco Hands.... Your Time & Visit inspires us. Visit the Stall & Buy our Unique Eco Crafts.',
      fullDate: 'January 20, 2026',
      time: '11:00 AM - 3:00 PM',
      location: 'NGO Headquarters'
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
      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {events.map((event, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-11" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card shadow-sm h-100 event-card events">
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

export default Events;
