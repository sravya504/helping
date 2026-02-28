
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import

// const CATEGORIES = [
//   { label: "Executive Committee", key: "executive" },
//   { label: "Students", key: "students" },
//   { label: "Web Team", key: "web" },
// ];

// export default function AdminMemberForm() {
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState(CATEGORIES[0].key);
//   const [role, setRole] = useState("");
//   const [year, setYear] = useState("");
//   const [successMessage, setSuccessMessage] = useState(""); // ✅ success message

//   const navigate = useNavigate(); // ✅ navigate

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       if (selectedFile.size > 1 * 1024 * 1024) { // 1MB limit
//         alert("File too large. Max size is 1MB.");
//         e.target.value = null;
//         setFile(null);
//       } else {
//         setFile(selectedFile);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !name || !category || ((category === "executive" && !role) || ((category === "students" || category === "web") && !year))) {
//       return alert("Please fill all required fields");
//     }

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("name", name);
//     formData.append("category", category);
//     if (category === "executive") formData.append("role", role);
//     else formData.append("year", year);

//     try {
//       const res = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         // ✅ Show success message instead of alert
//         setSuccessMessage("Member added successfully!");

//         // ✅ Clear form fields
//         setFile(null);
//         setName("");
//         setRole("");
//         setYear("");
//         setCategory(CATEGORIES[0].key);

//         // ✅ Navigate to Team page after a short delay (optional: 1 sec)
//         setTimeout(() => navigate("/admin/ourTeam"), 1000);
//       } else {
//         alert("Error: " + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong while uploading");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{
//       maxWidth: "500px",
//       margin: "40px auto",
//       padding: "24px",
//       borderRadius: "12px",
//       boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
//       backgroundColor: "#fff"
//     }}>
//       <h2 style={{ textAlign: "center", marginBottom: "24px", color: "maroon" }}>Add New Team Member</h2>

//       {successMessage && (
//         <div style={{
//           marginBottom: "16px",
//           padding: "12px",
//           backgroundColor: "#d4edda",
//           color: "#155724",
//           borderRadius: "6px",
//           textAlign: "center"
//         }}>
//           {successMessage}
//         </div>
//       )}

//       <div style={{ marginBottom: "16px" }}>
//         <label>Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter member name"
//           style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
//         />
//       </div>

//       <div style={{ marginBottom: "16px" }}>
//         <label>Category:</label>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
//         >
//           {CATEGORIES.map((cat) => (
//             <option key={cat.key} value={cat.key}>
//               {cat.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {category === "executive" ? (
//         <div style={{ marginBottom: "16px" }}>
//           <label>Role:</label>
//           <input
//             type="text"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             placeholder="Enter member role"
//             style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
//           />
//         </div>
//       ) : (
//         <div style={{ marginBottom: "16px" }}>
//           <label>Year:</label>
//           <input
//             type="text"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             placeholder="Enter year (e.g. 2nd Year)"
//             style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
//           />
//         </div>
//       )}

//       <div style={{ marginBottom: "16px" }}>
//         <label>Photo (max 1MB):</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           style={{ display: "block", marginTop: "8px" }}
//         />
//       </div>

//       <button type="submit" style={{
//         width: "100%",
//         padding: "12px",
//         backgroundColor: "maroon",
//         color: "#fff",
//         border: "none",
//         borderRadius: "6px",
//         cursor: "pointer",
//         fontWeight: "bold"
//       }}>
//         Add Member
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { label: "Executive Committee", key: "executive" },
  { label: "Students", key: "students" },
  { label: "Web Team", key: "web" },
];

export default function AdminMemberForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1 * 1024 * 1024) { // 1MB limit
        alert("File too large. Max size is 1MB.");
        e.target.value = null;
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !file ||
      !name ||
      !category ||
      ((category === "executive" && !role) ||
        ((category === "students" || category === "web") && !year))
    ) {
      return alert("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("category", category);
    if (category === "executive") formData.append("role", role);
    else formData.append("year", year);

    setLoading(true); // ✅ disable button

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Member added successfully!");
        setFile(null);
        setName("");
        setRole("");
        setYear("");
        setCategory(CATEGORIES[0].key);

        setTimeout(() => navigate("/admin/ourTeam"), 1000);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading");
    } finally {
      setLoading(false); // ✅ re-enable button
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "24px", color: "maroon" }}
      >
        Add New Team Member
      </h2>

      {successMessage && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {successMessage}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter member name"
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {category === "executive" ? (
        <div style={{ marginBottom: "16px" }}>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter member role"
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: "16px" }}>
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year (e.g. 2nd Year)"
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label>Photo (max 1MB):</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "block", marginTop: "8px" }}
        />
      </div>

      <button
        type="submit" 
        disabled={loading} // ✅ disable during upload
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#999" : "maroon",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Adding..." : "Add Member"} {/* ✅ show progress text */}
      </button>
    </form>
  );
}

