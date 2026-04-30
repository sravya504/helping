import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
const teamCss = `
.team-container{
  max-width:1200px;
  margin:40px auto;
  padding:30px;
}

.team-heading-container{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:40px;
}

.team-heading{
  font-size:2.5rem;
  color:#d21919;
}

.add-faculty-btn{
  padding:8px 16px;
  background:maroon;
  color:white;
  border:none;
  border-radius:5px;
  cursor:pointer;
  font-weight:600;
}

.section-heading{
  text-align:center;
  font-size:1.8rem;
  margin:50px 0 20px;
  color:#222;
  font-weight:600;
  position:relative;
}

.section-heading::after{
  content:"";
  display:block;
  width:60px;
  height:3px;
  background:#d21919;
  margin:8px auto 0;
  border-radius:2px;
}

.members-list{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:30px;
}

.member-card{
  width:250px;
  background:white;
  padding:20px;
  border-radius:10px;
  text-align:center;
  box-shadow:0 2px 10px rgba(0,0,0,0.1);
  position:relative;
}

.member-card:hover{
  transform:translateY(-5px);
}

.member-photo{
  width:100%;
  height:180px;
  object-fit:cover;
  border-radius:8px;
}

.member-name{
  font-weight:700;
  margin-top:10px;
}

.modal-backdrop{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:999;
}

.modal-content{
  background:white;
  padding:30px;
  border-radius:10px;
  width:400px;
  max-width:90%;
}

.modal-content h2{
  margin-bottom:20px;
  text-align:center;
  color:#d21919;
}

.modal-content input, .modal-content select{
  width:100%;
  padding:8px 10px;
  margin-bottom:15px;
  border-radius:5px;
  border:1px solid #ccc;
}

.delete-icon{
  position:absolute;
  bottom:10px;
  right:10px;
  background:red;
  border:none;
  border-radius:50%;
  width:36px;
  height:36px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  cursor:pointer;
}

.delete-icon:hover{
  background:#cc0000;
}

.modal-content button{
  width:100%;
  padding:10px;
  background:maroon;
  color:white;
  border:none;
  border-radius:5px;
  cursor:pointer;
  font-weight:600;
}
`;

if (typeof document !== "undefined" && !document.getElementById("team-css")) {
  const style = document.createElement("style");
  style.id = "team-css";
  style.innerHTML = teamCss;
  document.head.appendChild(style);
}

export default function Team() {

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [showModal, setShowModal] = useState(false);
  const [facultyName, setFacultyName] = useState("");
  const [facultyType, setFacultyType] = useState("");
  const [facultyImage, setFacultyImage] = useState(null);
  const [activeFaculty, setActiveFaculty] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadMessageType, setUploadMessageType] = useState("");

  const [seniorMembers, setSeniorMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);

  const [addingFaculty, setAddingFaculty] = useState(false);   // improvement 1

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://helping-backend.onrender.com/faculty", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch faculty");

        const data = await res.json();

        const senior = [];
        const newM = [];

        data.forEach((member) => {
          if (member.type === "Senior") senior.push(member);
          else newM.push(member);
        });

        setSeniorMembers(senior);
        setNewMembers(newM);

      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
    };

    fetchFaculty();
  }, []);

  const handleAddFaculty = async () => {

    if (addingFaculty) return;   // prevent multiple clicks
    setAddingFaculty(true);

    setUploadMessage("");
    setUploadMessageType("");

    if (!facultyName || !facultyType || !facultyImage) {
      setUploadMessage("All fields are required!");
      setUploadMessageType("error");
      setAddingFaculty(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", facultyName);
    formData.append("type", facultyType);
    formData.append("image", facultyImage);

    try {

      const token = localStorage.getItem("token");

      const res = await fetch("https://helping-backend.onrender.com/upload-faculty", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {

        setUploadMessage("Faculty added successfully!");
        setUploadMessageType("success");

        const newFaculty = {
          id: data.id || Date.now(),
          name: facultyName,
          photo: data.url,
        };

        if (facultyType === "Senior")
          setSeniorMembers((prev) => [...prev, newFaculty]);
        else
          setNewMembers((prev) => [...prev, newFaculty]);

        setFacultyName("");
        setFacultyType("");
        setFacultyImage(null);

        setTimeout(() => {      // improvement 3
          setUploadMessage("");
        },6000);

      } else {
        setUploadMessage(data.message || "Upload failed");
        setUploadMessageType("error");
      }

    } catch (err) {
      console.error(err);
      setUploadMessage("Upload failed: " + err.message);
      setUploadMessageType("error");
    }

    setAddingFaculty(false);
  };

  const deleteFaculty = async (id) => {

  const result = await Swal.fire({
    title: "Delete Faculty?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d21919",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  try {

    const token = localStorage.getItem("token");

    await fetch(`https://helping-backend.onrender.com/delete-faculty/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSeniorMembers((prev) => prev.filter((member) => member.id !== id));
    setNewMembers((prev) => prev.filter((member) => member.id !== id));

    setActiveFaculty(null);

    Swal.fire({
      title: "Deleted!",
      text: "Faculty removed successfully",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });

  } catch (err) {
    console.error("Delete failed:", err);
  }
};
  return (
    <div className="team-container">

      <div className="team-heading-container">
        <h1 className="team-heading">Executive Committee</h1>

        {isAdmin && (
          <button
            className="add-faculty-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Faculty
          </button>
        )}
      </div>

      <h2 className="section-heading">Senior Members</h2>

      <div className="members-list">
        {seniorMembers.map((member) => (
          <div
            className="member-card"
            key={member.id}
            onClick={() => {
              if (!isAdmin) return;
              setActiveFaculty(member.id);
            }}
            onDoubleClick={() => {
              if (!isAdmin) return;
              setActiveFaculty(null);
            }}
          >

            <img
              src={member.photo}
              alt={member.name}
              className="member-photo"
            />

            <div className="member-name">{member.name}</div>

            {isAdmin && activeFaculty === member.id && (
              <button
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFaculty(member.id);
                }}
              >
                <FaTrash size={18}/>
              </button>
            )}

          </div>
        ))}
      </div>

      <h3 className="section-heading">New Members</h3>

      <div className="members-list">
        {newMembers.map((member) => (
          <div
            className="member-card"
            key={member.id}
            onClick={() => {
              if (!isAdmin) return;
              setActiveFaculty(member.id);
            }}
            onDoubleClick={() => {
              if (!isAdmin) return;
              setActiveFaculty(null);
            }}
          >

            <img
              src={member.photo}
              alt={member.name}
              className="member-photo"
            />

            <div className="member-name">{member.name}</div>

            {isAdmin && activeFaculty === member.id && (
              <button
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFaculty(member.id);
                }}
              >
                <FaTrash size={18}/>
              </button>
            )}

          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <h2>Add Faculty</h2>

            <input
              type="text"
              placeholder="Faculty Name"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
            />

            <select
              value={facultyType}
              onChange={(e) => setFacultyType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Senior">Senior</option>
              <option value="New">New</option>
            </select>

            <input
              type="file"
              onChange={(e) => setFacultyImage(e.target.files[0])}
            />

            <button
              onClick={handleAddFaculty}
              disabled={addingFaculty}
            >
              {addingFaculty ? "🚫 Adding..." : "Add Faculty"}
            </button>

            {uploadMessage && (
              <p
                style={{
                  color: uploadMessageType === "success" ? "green" : "red",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {uploadMessage}
              </p>
            )}

          </div>
        </div>
      )}

    </div>
  );
}