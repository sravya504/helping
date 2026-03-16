// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "./Events.css";

// function Events() {
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const [showAddEventModal, setShowAddEventModal] = useState(false);

//   const [isAdmin, setIsAdmin] = useState(
//     sessionStorage.getItem("isAdmin") === "true",
//   );

//   const [newEvent, setNewEvent] = useState({
//     imageFile: null,
//     title: "",
//     desc: "",
//     fullDate: "",
//     time: "",
//     location: "",
//   });

//   // ==============================
//   // Page Load
//   // ==============================

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//     });

//     fetchEvents();
//   }, []);

//   // ==============================
//   // Fetch Events
//   // ==============================

//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/events");

//       setEvents(res.data);
//     } catch (error) {
//       console.error("Error fetching events", error);
//     }
//   };

//   // ==============================
//   // View Details
//   // ==============================

//   const handleViewDetails = (event) => {
//     setSelectedEvent(event);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedEvent(null);
//   };

//   // ==============================
//   // Add Event Modal
//   // ==============================

//   const closeAddEventModal = () => {
//     setShowAddEventModal(false);
//   };

//   const handleInputChange = (e) => {
//     setNewEvent({
//       ...newEvent,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setNewEvent({
//       ...newEvent,
//       imageFile: e.target.files[0],
//     });
//   };

//   // ==============================
//   // Add Event
//   // ==============================

//   const handleAddEvent = async () => {
//     const formData = new FormData();

//     formData.append("image", newEvent.imageFile);
//     formData.append("title", newEvent.title);
//     formData.append("desc", newEvent.desc);
//     formData.append("fullDate", newEvent.fullDate);
//     formData.append("time", newEvent.time);
//     formData.append("location", newEvent.location);

//     try {
//       await axios.post("http://localhost:5000/events", formData);

//       await fetchEvents();

//       setShowAddEventModal(false);

//       setNewEvent({
//         imageFile: null,
//         title: "",
//         desc: "",
//         fullDate: "",
//         time: "",
//         location: "",
//       });
//     } catch (error) {
//       console.error("Upload failed", error);
//     }
//   };

//   // ==============================
//   // Delete Event
//   // ==============================

//  const handleDeleteEvent = async (id) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this event?");

//   if (!confirmDelete) {
//     return; // stop if user clicks Cancel
//   }

//   try {
//     await axios.delete(`http://localhost:5000/events/${id}`);

//     await fetchEvents();

//     setShowModal(false);
//   } catch (error) {
//     console.error("Delete failed", error);
//   }
// };

//   return (
//     <div>
//       {showAddEventModal && (
//         <>
//           <div className="modal-backdrop show"></div>

//           <div className="modal fade show" style={{ display: "block" }}>
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 >Add Event</h5>
//                   <button
//                     className="btn-close"
//                     onClick={closeAddEventModal}
//                   ></button>
//                 </div>

//                 <div className="modal-body">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="form-control mb-2"
//                     onChange={handleImageChange}
//                   />

//                   {newEvent.imageFile && (
//                     <img
//                       src={URL.createObjectURL(newEvent.imageFile)}
//                       alt="preview"
//                       style={{
//                         width: "100%",
//                         height: "180px",
//                         objectFit: "cover",
//                         marginBottom: "10px",
//                         borderRadius: "8px",
//                       }}
//                     />
//                   )}

//                   <input
//                     type="text"
//                     name="title"
//                     placeholder="Event Title"
//                     className="form-control mb-2"
//                     value={newEvent.title}
//                     onChange={handleInputChange}
//                   />

//                   <textarea
//                     name="desc"
//                     placeholder="Description"
//                     className="form-control mb-2"
//                     value={newEvent.desc}
//                     onChange={handleInputChange}
//                   />

//                   <input
//                     type="date"
//                     name="fullDate"
//                     className="form-control mb-2"
//                     value={newEvent.fullDate}
//                     onChange={handleInputChange}
//                   />

//                   <input
//                     type="text"
//                     name="time"
//                     placeholder="Time"
//                     className="form-control mb-2"
//                     value={newEvent.time}
//                     onChange={handleInputChange}
//                   />

//                   <input
//                     type="text"
//                     name="location"
//                     placeholder="Location"
//                     className="form-control"
//                     value={newEvent.location}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={closeAddEventModal}
//                   >
//                     Cancel
//                   </button>

//                   <button className="btn btn-danger" onClick={handleAddEvent}>
//                     Add Event
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Admin Add Event Button */}

//       {isAdmin && (
//         <div className="container text-end mt-4">
//           <button
//             className="btn"
//             style={{ backgroundColor: "#8B2323", color: "white" }}
//             onClick={() => setShowAddEventModal(true)}
//           >
//             Add Event
//           </button>
//         </div>
//       )}

//       {/* Events List */}

//       <section className="py-5">
//         <div className="container">
//           <div className="row g-4">
//             {events.map((event) => (
//               <div
//                 key={event.id}
//                 className="col-12 col-md-6 col-lg-4 col-xl-3"
//                 data-aos="fade-up"
//               >
//                 <div className="card shadow-sm h-100 event-card events">
//                   <img
//                     src={event.img}
//                     className="card-img-top"
//                     alt={event.title}
//                   />

//                   <div className="card-body d-flex flex-column pt-4">
//                     <div className="event-date">
//                       <span>{event.date.day}</span>
//                       {event.date.month}
//                     </div>

//                     <h5
//                       className="card-title mt-3"
//                       style={{ color: "#8B2323" }}
//                     >
//                       {event.title}
//                     </h5>

//                     <p className="card-text event-desc">{event.desc}</p>

//                     <button
//                       className="btn btn-outline-danger w-100 mt-auto rounded-pill"
//                       onClick={() => handleViewDetails(event)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* View Event Modal */}

//       {showModal && selectedEvent && (
//         <>
//           <div className="modal-backdrop show"></div>

//           <div className="modal fade show" style={{ display: "block" }}>
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">{selectedEvent.title}</h5>

//                   <button className="btn-close" onClick={closeModal}></button>
//                 </div>

//                 <div className="modal-body">
//                   <img
//                     src={selectedEvent.img}
//                     alt={selectedEvent.title}
//                     style={{
//                       width: "100%",
//                       height: "250px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                       marginBottom: "15px",
//                     }}
//                   />

//                   <p>{selectedEvent.desc}</p>

//                   <hr />

//                   <p>
//                     <strong>{selectedEvent.fullDate}</strong>
//                   </p>
//                   <p>
//                     <strong>{selectedEvent.time}</strong>
//                   </p>
//                   <p>
//                     <strong>{selectedEvent.location}</strong>
//                   </p>
//                 </div>

//                 <div className="modal-footer">
//                   {isAdmin && (
//                     <button
//                       className="btn "
//                       style={{backgroundColor:'#8B2323', color:'white'}}
//                       onClick={() => handleDeleteEvent(selectedEvent.id)}
//                     >
//                       Delete Event
//                     </button>
//                   )}

//                   <button className="btn btn-secondary" onClick={closeModal}>
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Events;

import axios from "axios";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [isAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true"
  );

  const [newEvent, setNewEvent] = useState({
    imageFile: null,
    title: "",
    desc: "",
    fullDate: "",
    time: "",
    location: "",
  });

  // ==============================
  // Page Load
  // ==============================
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchEvents();
  }, []);

  // ==============================
  // Fetch Events
  // ==============================
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  // ==============================
  // View Details
  // ==============================
  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  // ==============================
  // Add Event
  // ==============================
  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewEvent({ ...newEvent, imageFile: e.target.files[0] });
  };

  const handleAddEvent = async () => {
    const formData = new FormData();
    formData.append("image", newEvent.imageFile);
    formData.append("title", newEvent.title);
    formData.append("desc", newEvent.desc);
    formData.append("fullDate", newEvent.fullDate);
    formData.append("time", newEvent.time);
    formData.append("location", newEvent.location);

    try {
      await axios.post("http://localhost:5000/events", formData);
      await fetchEvents();
      setShowAddEventModal(false);
      setNewEvent({
        imageFile: null,
        title: "",
        desc: "",
        fullDate: "",
        time: "",
        location: "",
      });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  // ==============================
  // Delete Event
  // ==============================
  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/events/${selectedEvent.id}`);
      await fetchEvents();
      setShowDeleteConfirm(false);
      setShowModal(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      {/* ================= ADD EVENT MODAL ================= */}
      {showAddEventModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Add Event</h5>
                  <button className="btn-close" onClick={() => setShowAddEventModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input type="file" accept="image/*" className="form-control mb-2" onChange={handleImageChange} />
                  {newEvent.imageFile && (
                    <img
                      src={URL.createObjectURL(newEvent.imageFile)}
                      alt="preview"
                      style={{ width: "100%", height: "180px", objectFit: "cover", marginBottom: "10px", borderRadius: "8px" }}
                    />
                  )}
                  <input type="text" name="title" placeholder="Event Title" className="form-control mb-2" value={newEvent.title} onChange={handleInputChange} />
                  <textarea name="desc" placeholder="Description" className="form-control mb-2" value={newEvent.desc} onChange={handleInputChange} />
                  <input type="date" name="fullDate" className="form-control mb-2" value={newEvent.fullDate} onChange={handleInputChange} />
                  <input type="text" name="time" placeholder="Time" className="form-control mb-2" value={newEvent.time} onChange={handleInputChange} />
                  <input type="text" name="location" placeholder="Location" className="form-control" value={newEvent.location} onChange={handleInputChange} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleAddEvent}>Add Event</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= ADMIN ADD BUTTON ================= */}
      {isAdmin && (
        <div className="container text-end mt-4">
          <button className="btn" style={{ backgroundColor: "#8B2323", color: "white" }} onClick={() => setShowAddEventModal(true)}>
            Add Event
          </button>
        </div>
      )}

      {/* ================= EVENTS LIST ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {events.map((event) => (
              <div key={event.id} className="col-12 col-md-6 col-lg-4 col-xl-3" data-aos="fade-up">
                <div className="card shadow-sm h-100 event-card">
                  <img src={event.img} className="card-img-top" alt={event.title} />
                  <div className="card-body d-flex flex-column pt-4">
                    <div className="event-date"><span>{event.date.day}</span>{event.date.month}</div>
                    <h5 className="card-title mt-3" style={{ color: "#8B2323" }}>{event.title}</h5>
                    <p className="card-text event-desc">{event.desc}</p>
                    <button className="btn btn-outline-danger w-100 mt-auto rounded-pill" onClick={() => handleViewDetails(event)}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENT DETAILS MODAL ================= */}
      {showModal && selectedEvent && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{selectedEvent.title}</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <img src={selectedEvent.img} alt={selectedEvent.title} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }} />
                  <p>{selectedEvent.desc}</p>
                  <hr />
                  <p><strong>{selectedEvent.fullDate}</strong></p>
                  <p><strong>{selectedEvent.time}</strong></p>
                  <p><strong>{selectedEvent.location}</strong></p>
                </div>
                <div className="modal-footer">
                  {isAdmin && (
                    <button className="btn" style={{ backgroundColor: "#8B2323", color: "white" }} onClick={() => setShowDeleteConfirm(true)}>Delete Event</button>
                  )}
                  <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showDeleteConfirm && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Confirm Delete</h5>
                  <button className="btn-close" onClick={() => setShowDeleteConfirm(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this event?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                  <button className="btn" style={{ backgroundColor: "#8B2323", color: "white" }} onClick={handleDeleteEvent}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Events;
