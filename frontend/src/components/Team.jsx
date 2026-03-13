import React from "react";

const teamCss = `
.team-container{
  max-width:1200px;
  margin:40px auto;
  padding:30px;
}

.team-heading{
  text-align:center;
  font-size:2.5rem;
  margin-bottom:40px;
  color:#d21919;
}.section-heading{
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


.member-role{
  color:#555;
}
`;

if (typeof document !== "undefined" && !document.getElementById("team-css")) {
  const style = document.createElement("style");
  style.id = "team-css";
  style.innerHTML = teamCss;
  document.head.appendChild(style);
}

export default function Team() {

  const seniorMembers = [
    {
      id:1,
      name:"Dr. Sadu Chiranjeevi",
      photo:"/images/chiranjeevi.png"
    },
    {
      id:2,
      name:"Dr. Sk. Saleem Babu",
      photo:"/images/saleembabu.jpeg"
    },
    {
      id:3,
      name:"Mr. Vakapalli Ramu",
      photo:"/images/Mr.Vakapalli.Ramu.jpeg"
    }
  ];

  const newMembers = [
    {
      id:4,
      name:"Mr. L. Krishna Kishore Babu",
      photo:"/images/krishana_kishore.jpeg"
    },
    {
      id:5,
      name:"Mrs.S.Pratima",
      photo:"/images/pratima.jpeg"
    },
    {
      id:6,
      name:"Mr.Bonela Lakshmanrao",
      photo:"/images/lakshmanrao.jpeg"
    }
  ];

  return (
    <div className="team-container">

      <h1 className="team-heading">Executive Committee</h1>

      {/* Senior Members */}
      <h2 className="section-heading">Senior Members</h2>
      <div className="members-list">
        {seniorMembers.map(member => (
          <div className="member-card" key={member.id}>
            <img
              src={member.photo}
              alt={member.name}
              className="member-photo"
            />
            <div className="member-name">{member.name}</div>
          </div>
        ))}
      </div>

      {/* New Members */}
      <h3 className="section-heading">New Members</h3>
      <div className="members-list">
        {newMembers.map(member => (
          <div className="member-card" key={member.id}>
            <img
              src={member.photo}
              alt={member.name}
              className="member-photo"
            />
            <div className="member-name">{member.name}</div>
          </div>
        ))}
      </div>

    </div>
  );
}