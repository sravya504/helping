// import React, { useState } from "react";
// import './Certificatestyling.css'

// export default function Certificate() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     fatherName: "",
//     email: "",
//     idNumber: "",
//     batch: "",
//     startDate: "",
//     endDate: "",
//     position: "",
//     image: null,
//   });

//   const [certId, setCertId] = useState("");
//   const [showCertificate, setShowCertificate] = useState(false);
//   const [showForm, setShowForm] = useState(false); // controls form visibility

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleCertIdChange = (e) => {
//     setCertId(e.target.value);
//   };

//   const handleCheckCertificate = () => {
//     // Simulated check (replace with actual API call)
//     if (certId === "1234") {
//       setShowCertificate(true);
//       setShowForm(false); // hide form if certificate found
//     } else {
//       alert("Certificate not found. Click below to fill the form.");
//       setShowCertificate(false);
//     }
//   };

//   const handleShowForm = () => {
//     setShowForm(true);
//     setShowCertificate(false); // hide certificate ID input section
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Form submitted successfully!");
//   };

//   return (
//     <div className="form-container">
//       <h2>Certificate / Registration</h2>

//       {/* Certificate ID Input */}
//       {!showForm && !showCertificate && (
//         <div className="form-group">
//           <label>Certificate ID (if known):</label>
//           <input
//             type="text"
//             value={certId}
//             onChange={handleCertIdChange}
//             placeholder="Enter Certificate ID"
//           />
//           <button
//             type="button"
//             className="submit-btn"
//             onClick={handleCheckCertificate}
//           >
//             Generate Certificate
//           </button>

//           {/* Button to show form if ID is unknown */}
//           <div className="form-group mt-2">
//             <button
//               type="button"
//               className="submit-btn"
//               onClick={handleShowForm}
//             >
//               Don’t know ID / Fill Form
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Show certificate if ID is valid */}
//       {showCertificate && (
//         <div className="certificate-preview mt-4 p-3 border border-success rounded">
//           <h3>Certificate Generated!</h3>
//           <p>Certificate ID: {certId}</p>
//           <p>Name: {formData.firstName} {formData.lastName}</p>
//           <p>Position: {formData.position}</p>
//         </div>
//       )}

//       {/* Show registration form only when user clicks "Fill Form" */}
//       {showForm && (
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="form-group">
//             <label>First Name:</label>
//             <input type="text" name="firstName" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Last Name:</label>
//             <input type="text" name="lastName" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Father Name:</label>
//             <input type="text" name="fatherName" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Email:</label>
//             <input type="email" name="email" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>ID Number:</label>
//             <input type="text" name="idNumber" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Batch (e.g., 2019-2025):</label>
//             <input type="text" name="batch" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Tenure Start Date:</label>
//             <input type="date" name="startDate" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Tenure End Date:</label>
//             <input type="date" name="endDate" onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Select Your Position:</label>
//             <select name="position" onChange={handleChange} required>
//               <option value="">--Select--</option>
//               <option value="Volunteer">Volunteer</option>
//               <option value="Faculty">Faculty</option>
//               <option value="Student">Student</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Upload your image:</label>
//             <input type="file" name="image" accept="image/*" onChange={handleChange} required />
//           </div>

//           <button type="submit" className="submit-btn mt-2">Submit Form</button>
//         </form>
//       )}
//     </div>
//   );
// }



import React, { useState } from "react";
import "./Certificatestyling.css";
import emailjs from "@emailjs/browser";

export default function Certificate() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    idNumber: "",
    batch: "",
    startDate: "",
    endDate: "",
    position: "",
  });

  const [certId, setCertId] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Certificate check (dummy)
  const handleCertIdChange = (e) => setCertId(e.target.value);

  const handleCheckCertificate = () => {
    if (certId === "1234") {
      setShowCertificate(true);
      setShowForm(false);
    } else {
      alert("Certificate not found. Click below to fill the form.");
      setShowCertificate(false);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowCertificate(false);
  };

  // ✅ EmailJS send (using template parameters)
  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .send(
      "service_inj9e0p",
      "template_k6o1ow9",
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fatherName: formData.fatherName,
        email: formData.email,
        idNumber: formData.idNumber,
        batch: formData.batch,
        startDate: formData.startDate,
        endDate: formData.endDate,
        position: formData.position,
      },
      "piAk1P-3wU66ZCDWA"
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Form submitted successfully! Email sent.");
      setFormData({
        firstName: "",
        lastName: "",
        fatherName: "",
        email: "",
        idNumber: "",
        batch: "",
        startDate: "",
        endDate: "",
        position: "",
       
      });
      setPreview(null);
      setShowForm(false);
    })
    .catch((err) => {
      console.error("FAILED...", err);
      console.log(preview)
      alert("Form submission failed. Try again.");
      
    });
};


  return (
    <div className="form-container">
      <h2>Certificate / Registration</h2>

      {/* 🔹 Certificate ID Check Section */}
      {!showForm && !showCertificate && (
        <div className="form-group">
          <label>Certificate ID (if known):</label>
          <input
            type="text"
            value={certId}
            onChange={handleCertIdChange}
            placeholder="Enter Certificate ID"
          />
          <button
            type="button"
            className="submit-btn"
            onClick={handleCheckCertificate}
          >
            Generate Certificate
          </button>

          <div className="form-group mt-2">
            <button
              type="button"
              className="submit-btn"
              onClick={handleShowForm}
            >
              Don’t know ID / Fill Form
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Show Certificate if Found */}
      {showCertificate && (
        <div className="certificate-preview mt-4 p-3 border border-success rounded">
          <h3>Certificate Generated!</h3>
          <p>Certificate ID: {certId}</p>
          <p>
            Name: {formData.firstName} {formData.lastName}
          </p>
          <p>Position: {formData.position}</p>
        </div>
      )}

      {/* 🔹 Registration Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Father Name:</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>ID Number:</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Batch (e.g., 2019-2025):</label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tenure Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tenure End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Your Position:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">--Select--</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
              <option value="Others">Others</option>
            </select>
          </div>

          
          <button type="submit" className="submit-btn mt-2">
            Submit Form
          </button>
        </form>
      )}
    </div>
  );
}
