// // Team.js
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";


// const SECRET_KEY = "myVeryStrongSecretKey123!";

// const teamCss = `
// .team-container { max-width: 1200px; margin: 40px auto; padding: 32px 24px 48px 24px; background: #f7fafd; border-radius: 18px; box-shadow: 0 4px 32px rgba(25,118,210,0.08);}
// .team-heading { font-size: 2.7rem; text-align: center; margin-bottom: 32px; color: #d21919ff; letter-spacing: 1px; font-weight: 700;}
// .team-nav { display: flex; justify-content: center; gap: 32px; margin-bottom: 44px;}
// .team-nav-btn { background: #fff; color: #f32f38ff; border: 2px solid #fdbdc1ff; border-radius: 30px; padding: 12px 38px; font-size: 1.18rem; font-weight: 600; cursor: pointer; transition: background 0.18s, color 0.18s, border 0.18s; outline: none; box-shadow: 0 2px 8px rgba(25,118,210,0.04);}
// .team-nav-btn:hover { background: #e93d54ff; color: #fff; border: 2px solid #d63737ff;}
// .team-nav-btn.active { background: #e93d54ff; color: #fff; border: 2px solid #d63737ff;}
// .members-list { display: flex; flex-wrap: wrap; gap: 36px; justify-content: center; margin-top: 8px;}
// .member-card { background: #fff; border-radius: 18px; box-shadow: 0 2px 16px rgba(25,118,210,0.10); padding: 22px; width: 260px; text-align: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s, background 0.15s; border: 2px solid transparent; position: relative;}
// .member-card:hover { transform: translateY(-6px) scale(1.035); box-shadow: 0 8px 32px rgba(25,118,210,0.13); background: #e3f2fd; border: 2px solid #e781a8ff;}
// .member-photo { width: 250px; height: 180px; object-fit: cover; margin-bottom: 18px; border-radius: 8px; border: 2px solid rgba(20, 105, 190, 0.05); background: #f7fafd;}
// .member-name { font-size: 1.18rem; font-weight: 700; color: #fcb4b4ff; margin-bottom: 4px;}
// .member-role { font-size: 1.05rem; color: #444; margin-bottom: 2px; font-weight: 500;}
// .member-year { font-size: 0.98rem; color: #888; margin-bottom: 2px;}
// .add-member-btn { position: absolute; top: 209px; right: 42px; font-size: 2rem; width: 50px; height: 50px; border-radius: 50%; border: none; background-color: #7f1d1d; color: #fff; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; transition: all 0.2s;}
// .add-member-btn:hover { background-color: #b71515; transform: scale(1.1);}
// .member-actions { display: flex; justify-content: center; gap: 8px; margin-top: 12px;}
// .member-actions button { padding: 6px 12px; border: none; border-radius: 6px; color: #fff; cursor: pointer;}
// .member-actions .delete-btn { background: #d9534f;}
// .modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 999;
// }

// // .modal-content { background: #fff; padding: 24px; border-radius: 12px; width: 450px; max-width: 95%; position: relative; animation: fadeIn 0.25s ease;}
// .modal-content {
//   background: rgba(255, 255, 255, 0.95) !important;
//   padding: 24px;
//   border-radius: 12px;
//   width: 50%;              /* ⬅️ make it half width */
//   max-width: 600px;        /* ⬅️ prevent it from getting too big on large screens */
//   min-width: 320px;        /* ⬅️ keep it readable on small screens */
//   position: relative;
//   animation: fadeIn 0.25s ease;
//   margin: 0 auto;          /* ⬅️ horizontally center it */
//   box-shadow: 0 4px 24px rgba(244, 248, 246, 0.39);
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
// }

// .modal-content h2 { margin-bottom: 16px; text-align: center; color: #d21919;}
// .modal-content label { display: block; margin-top: 12px; font-weight: 500;}
// .modal-content input, .modal-content select { width: 100%; padding: 8px 10px; margin-top: 4px; border-radius: 6px; border: 1px solid #ccc;}
// .modal-content .modal-buttons { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;}
// .modal-content .modal-buttons button { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer;}
// .modal-content .save-btn { background: #28a745; color: #fff;}
// .modal-content .cancel-btn { background: #d9534f; color: #fff;}
// .loading-overlay {
//   position: fixed;
//   inset: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(255,255,255,0.9) url("/images/hhlogo.png") center center no-repeat;
//   background-size: 50px; 
//   z-index: 2000;
// }


// .spinner {
//   border: 1px solid rgba(255, 255, 255, 0.3);
//   border-top: 6px solid #b71515;
//   border-radius: 50%;
//   width: 60px;
//   height: 60px;
//   animation: spin 1s linear infinite;
// }

// @keyframes spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }


// @keyframes fadeIn {
//   from { opacity: 0; transform: scale(0.95); }
//   to { opacity: 1; transform: scale(1); }
// }


// @keyframes fadeIn { from {opacity: 0; transform: translateY(-20px);} to {opacity: 1; transform: translateY(0);} }
// @media (max-width: 480px) {
//   .team-nav { flex-direction: column; gap: 12px; align-items: center;}
//   .team-nav-btn { width: 80%;}
//   .add-member-btn { top: 204px; right: 16px; width: 38px; height: 38px; font-size: 1.4rem;}
//   .member-card { width: 90%;}
//   .modal-content { width: 90%;}
  
// `;

// if (typeof document !== "undefined" && !document.getElementById("team-css")) {
//   const style = document.createElement("style");
//   style.id = "team-css";
//   style.innerHTML = teamCss;
//   document.head.appendChild(style);
// }

// export default function Team() {
//   const [selectedTab, setSelectedTab] = useState("executive");
//   const [members, setMembers] = useState([]);
//   const [selectedMemberId, setSelectedMemberId] = useState(null); // For toggle buttons
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editMember, setEditMember] = useState({});
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   const decryptText = (encryptedHex, ivHex) => {
//     if (!encryptedHex || !ivHex) return "";
//     try {
//       const key = CryptoJS.SHA256(SECRET_KEY);
//       const iv = CryptoJS.enc.Hex.parse(ivHex);
//       const decrypted = CryptoJS.AES.decrypt(
//         { ciphertext: CryptoJS.enc.Hex.parse(encryptedHex) },
//         key,
//         { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
//       );
//       return decrypted.toString(CryptoJS.enc.Utf8);
//     } catch {
//       return "";
//     }
//   };

  

  
//   const categorized = {
//     executive: members.filter((m) => m.category === "executive"),
//     students: members.filter((m) => m.category === "students"),
//     web: members.filter((m) => m.category === "web"),
//   };

//   const currentMembers = categorized[selectedTab] || [];
//   const handleAddMember = () => navigate("/admin/add-member");

//   const handleEditClick = (member) => {
//     setSelectedMemberId((prev) => (prev === member.id ? null : member.id)); // toggle buttons
//     setEditMember(member);
//     setModalOpen((prev) => prev || (prev === false && true)); // open modal only when clicking edit button
//   };

//   // Inside Team.js, update handleModalSave and handleDelete:

//   const handleModalSave = () => {
//     const formData = new FormData();
//     formData.append("name", editMember.name);
//     if (editMember.role !== undefined) formData.append("role", editMember.role);
//     if (editMember.year !== undefined) formData.append("year", editMember.year);
//     formData.append("category", editMember.category);
//     if (editMember.file) formData.append("image", editMember.file);

    
      

 

//   if (loading) {
//     return (
//       <div className="loading-overlay">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="team-container">
//       <h1 className="team-heading">Our Team</h1>

//       {isAdminPage && (
//         <button
//           onClick={handleAddMember}
//           className="add-member-btn"
//           title="Add New Member"
//         >
//           +
//         </button>
//       )}

//       <div className="team-nav">
//         <button
//           className={`team-nav-btn${
//             selectedTab === "executive" ? " active" : ""
//           }`}
//           onClick={() => setSelectedTab("executive")}
//         >
//           Executive Committee
//         </button>
//         <button
//           className={`team-nav-btn${
//             selectedTab === "students" ? " active" : ""
//           }`}
//           onClick={() => setSelectedTab("students")}
//         >
//           Students
//         </button>
//         <button
//           className={`team-nav-btn${selectedTab === "web" ? " active" : ""}`}
//           onClick={() => setSelectedTab("web")}
//         >
//           Web Team
//         </button>
//       </div>

//       <div className="members-list">
//         {currentMembers.map((member) => (
//           <div
//             className="member-card"
//             key={member.id}
//             onClick={() =>
//               isAdminPage &&
//               setSelectedMemberId((prev) =>
//                 prev === member.id ? null : member.id
//               )
//             }
//           >
//             <img
//               src={member.photo}
//               alt={member.name}
//               className="member-photo"
//             />
//             <div className="member-name">{member.name}</div>
//             {member.role && <div className="member-role">{member.role}</div>}
//             {member.year && <div className="member-year">{member.year}</div>}

//             {isAdminPage && selectedMemberId === member.id && (
//               <div className="member-actions">
//                 <button
//                   className="update-btn btn-primary btn"
//                   onClick={() => {
//                     handleEditClick(member);
//                     setModalOpen(true);
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(member)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {modalOpen && (
//         <div className="modal-overlay" onClick={() => setModalOpen(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>Edit Member</h2>

//             <label>Name</label>
//             <input
//               type="text"
//               value={editMember.name || ""}
//               onChange={(e) =>
//                 setEditMember({ ...editMember, name: e.target.value })
//               }
//             />

//             {editMember.category === "executive" && (
//               <>
//                 <label>Role</label>
//                 <input
//                   type="text"
//                   value={editMember.role || ""}
//                   onChange={(e) =>
//                     setEditMember({ ...editMember, role: e.target.value })
//                   }
//                 />
//               </>
//             )}

//             {editMember.category === "students" && (
//               <>
//                 <label>Year</label>
//                 <input
//                   type="text"
//                   value={editMember.year || ""}
//                   onChange={(e) =>
//                     setEditMember({ ...editMember, year: e.target.value })
//                   }
//                 />
//               </>
//             )}

//             {editMember.category === "web" && (
//               <>
//                 <label>Role</label>
//                 <input
//                   type="text"
//                   value={editMember.role || ""}
//                   onChange={(e) =>
//                     setEditMember({ ...editMember, role: e.target.value })
//                   }
//                 />
//               </>
//             )}

//             <label>Category</label>
//             <select
//               value={editMember.category || ""}
//               onChange={(e) =>
//                 setEditMember({ ...editMember, category: e.target.value })
//               }
//             >
//               <option value="executive">Executive Committee</option>
//               <option value="students">Students</option>
//               <option value="web">Web Team</option>
//             </select>

//             <label>Photo</label>
//             <input
//               type="file"
//               onChange={(e) =>
//                 setEditMember({ ...editMember, file: e.target.files[0] })
//               }
//             />

//             <div className="modal-buttons">
//               <button
//                 className="cancel-btn"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button className="save-btn" onClick={handleModalSave}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// Team.js
import React, { useState } from "react";

const teamCss = `
.team-container { max-width: 1200px; margin: 40px auto; padding: 32px 24px 48px 24px; background: #f7fafd; border-radius: 18px; box-shadow: 0 4px 32px rgba(25,118,210,0.08);}
.team-heading { font-size: 2.7rem; text-align: center; margin-bottom: 32px; color: #d21919ff; letter-spacing: 1px; font-weight: 700;}
.team-nav { display: flex; justify-content: center; gap: 32px; margin-bottom: 44px;}
.team-nav-btn { background: #fff; color: #f32f38ff; border: 2px solid #fdbdc1ff; border-radius: 30px; padding: 12px 38px; font-size: 1.18rem; font-weight: 600; cursor: pointer; transition: background 0.18s, color 0.18s, border 0.18s; outline: none; box-shadow: 0 2px 8px rgba(25,118,210,0.04);}
.team-nav-btn:hover { background: #e93d54ff; color: #fff; border: 2px solid #d63737ff;}
.team-nav-btn.active { background: #e93d54ff; color: #fff; border: 2px solid #d63737ff;}
.members-list { display: flex; flex-wrap: wrap; gap: 36px; justify-content: center; margin-top: 8px;}
.member-card { background: #fff; border-radius: 18px; box-shadow: 0 2px 16px rgba(25,118,210,0.10); padding: 22px; width: 260px; text-align: center; transition: transform 0.15s, box-shadow 0.15s, background 0.15s; border: 2px solid transparent;}
.member-card:hover { transform: translateY(-6px) scale(1.035); box-shadow: 0 8px 32px rgba(25,118,210,0.13); background: #e3f2fd; border: 2px solid #e781a8ff;}
.member-photo { width: 250px; height: 180px; object-fit: cover; margin-bottom: 18px; border-radius: 8px; background: #f7fafd;}
.member-name { font-size: 1.18rem; font-weight: 700; color: #fcb4b4ff; margin-bottom: 4px;}
.member-role { font-size: 1.05rem; color: #444; margin-bottom: 2px; font-weight: 500;}
.member-year { font-size: 0.98rem; color: #888; margin-bottom: 2px;}

@media (max-width: 480px) {
  .team-nav { flex-direction: column; gap: 12px; align-items: center;}
  .team-nav-btn { width: 80%;}
  .member-card { width: 90%;}
}
`;

if (typeof document !== "undefined" && !document.getElementById("team-css")) {
  const style = document.createElement("style");
  style.id = "team-css";
  style.innerHTML = teamCss;
  document.head.appendChild(style);
}

export default function Team() {
  const [selectedTab, setSelectedTab] = useState("executive");

  const members = [
    {
      id: 1,
      name: "President Name",
      role: "President",
      category: "executive",
      photo: "/images/sample1.jpg",
    },
    {
      id: 2,
      name: "Vice President",
      role: "Vice President",
      category: "executive",
      photo: "/images/sample2.jpg",
    },
    {
      id: 3,
      name: "Student Member",
      year: "3rd Year",
      category: "students",
      photo: "/images/sample3.jpg",
    },
    {
      id: 4,
      name: "Another Student",
      year: "2nd Year",
      category: "students",
      photo: "/images/sample4.jpg",
    },
    {
      id: 5,
      name: "Frontend Developer",
      role: "Web Developer",
      category: "web",
      photo: "/images/sample5.jpg",
    },
  ];

  const categorized = {
    executive: members.filter((m) => m.category === "executive"),
    students: members.filter((m) => m.category === "students"),
    web: members.filter((m) => m.category === "web"),
  };

  const currentMembers = categorized[selectedTab] || [];

  return (
    <div className="team-container">
      <h1 className="team-heading">Our Team</h1>

      <div className="team-nav">
        <button
          className={`team-nav-btn ${
            selectedTab === "executive" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("executive")}
        >
          Executive Committee
        </button>

        <button
          className={`team-nav-btn ${
            selectedTab === "students" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("students")}
        >
          Students
        </button>

        <button
          className={`team-nav-btn ${
            selectedTab === "web" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("web")}
        >
          Web Team
        </button>
      </div>

      <div className="members-list">
        {currentMembers.map((member) => (
          <div className="member-card" key={member.id}>
            <img
              src={member.photo}
              alt={member.name}
              className="member-photo"
            />
            <div className="member-name">{member.name}</div>
            {member.role && <div className="member-role">{member.role}</div>}
            {member.year && <div className="member-year">{member.year}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
