import React from "react";
import "../App.css";

export default function AboutUs() {
  const about_2 = [
    {
      image: "/images/about_us_1.png",
      bg_clr: "#ffae52",
      h1_clr: "#9f1239",
      heading: "Evolution",
      matter: "Every journey starts with a single step. A student of RGUKT-Nuzvid initiated their journey of service in 2009 by establishing a foundation, Helping Hands. The pupil with social responsibility,noble thoughts, and commitment towards society has evidently proven the strength of a rupee. It mainly focuses on the well-being of the students from the poor background on the campus.This has set a new beginning for many students to let their grievances from their lives and stood as an inspiration to upcoming generations.",
    },
    {
      image: "/images/about_us_2.png",
      bg_clr: "#eb8aeb",
      h1_clr: "#4f46e5",
      heading: "Vision",
      matter: " We, the students of RGUKT-NUZVID, embark on a path with a single  destination that leads to one aspiration - build a better society. Leadership Skills and Social Responsibility are considered to be paramount. Community service enriches students' interpersonal skills and helps them evolve into active and real citizens responsible for more community building initiatives. We will persist in our service, remaining mindful of our vision and staying true to our motto."
    },
  ];
  return (
    <div
      
      className="d-flex flex-column justify-content-center align-items-center px-3 px-md-5"
    >
      <h1
        className="heading_size"
        style={{ marginTop: "100px", marginBottom: "30px", color: "#7f1d1d" }}
      >
        "A helping hand can be ray of sunshine in a cloudy world"
      </h1>
      {/* <section className="about_2">
       { about_2.map((item,index) => {
            return(
               <div key={index} className="d-flex position-relative">
          <img
            src={item.image}
            alt=""
            height="100px"
            width="100px"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              transform: "translateY(-50%)",
            }}
          />  
          <div
            className="p-3 rounded mb-3"
            style={{ backgroundColor:`${item.bg_clr}`, flex: 1,marginLeft:"40px" }}
          >
            <h2 className="ps-md-5 heading_size " style={{ color: `${item.h1_clr}`,textAlign:"left" }}>
              {item.heading}
            </h2>
            <p>
              {item.matter}
            </p>
          </div>
        </div>
            )
        })}        
      </section> */}
      <section className="about_2 d-flex justify-content-around flex-wrap w-75" style={{gap:"10px"}}>
  {about_2.map((item, index) => (
    <div key={index} >
      <div className="about_card_image">
        <img src={item.image} alt={item.heading} />
      </div>
      <div className="about_card" style={{ backgroundColor: item.bg_clr }}>
        <h2 style={{ color: item.h1_clr }}>{item.heading}</h2>
      <p>{item.matter}</p>
      </div>
      
    </div>
  ))}
</section>

      <section className="aims_n_objectives">
      <h2 className="heading_size  text-center" style={{ color: "#7f1d1d" }}>
        Aims and Objectives
      </h2>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide mt-md-3"
        data-bs-ride="carousel"
        data-bs-wrap="true"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="card-group gap-md-3">
              <div className="card card-hover-grey bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#581c87" }}>
                    Daily Needs
                  </h5>
                  <p className="card-text">
                    We extend our valuable services by providing daily needs to
                    the students so as to meet the minimum requirements in the
                    campus, travelling allowances on vacation and providing
                    tricycles and washing machines to the differently-abled
                    students
                  </p>
                </div>
              </div>
              <div className="card border-start card-hover-grey bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#831843" }}>
                    Financial Support
                  </h5>
                  <p className="card-text">
                    We provide financial support for medical needs and surgeries
                    of the students and staff.
                  </p>
                </div>
              </div>
              <div className="card border-start card-hover-grey bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#fb923c" }}>
                    Health Awareness
                  </h5>
                  <p className="card-text">
                    In continuation of its endeavour towards service and to
                    bring health awareness among students, we periodically
                    conduct Mega health camps, eye camps in the campus for the
                    welfare of students.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card-group gap-md-3">
              <div className="card card-hover-grey bg-white rounded ">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#65a30d" }}>
                    Anniversary Celebration
                  </h5>
                  <p className="card-text">
                    On the eve of Mother Teresa's birthday, we celebrate our
                    anniversary every year to encourage and inspire our students
                    towards the motto of service, to promote our achievements
                    and to plan our future self for its service expansion.
                  </p>
                </div>
              </div>
              <div className="card card-hover-grey bg-white rounded border-start">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#06b6d4" }}>
                    Blood Donation
                  </h5>
                  <p className="card-text">
                    We organize blood donation camps inside the campus in
                    collaboration with other community-level
                    organizations/clubs.
                  </p>
                </div>
              </div>
              <div className="card card-hover-grey bg-white rounded border-end">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#a21caf" }}>
                    Recruitment of Volunteers
                  </h5>
                  <p className="card-text">
                    To recruit new volunteers to ensure adequate participation
                    by them in achieving the objects of the Society.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-md-3 gap-md-2 c-btn">
          <button
            className="carousel-control-prev btn btn-hover p-2"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
            style={{
              position: "relative",
              bottom: "0",
              display: "inline-block",
              color: "black",
              width: "100px",
              opacity: 1,
              backgroundColor: "grey",
            }}
          >
            Previous
          </button>
          <button
            className="carousel-control-next btn btn-hover  p-2"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
            style={{
              position: "relative",
              bottom: "0",
              display: "inline-block",
              color: "black",
              width: "100px",
              opacity: 1,
              backgroundColor: "grey",
            }}
          >
            Next
          </button>
        </div>
      </div> </section>

      <section className="departments">
        <h2
          className="text-center"
          style={{ fontSize: "1.5rem", color: "#7f1d1d" }}
        >
          Departments
        </h2>
        <img
          src="/images/departments.jpeg"
          alt=""
          height="600px"
          width="800px"
          
        />
      </section>
      <section className="funding_resources ">
        <h2
          style={{ fontSize: "1.5rem", color: "#7f1d1d" ,}}
          className="text-center"
        >
          Funding Resources
        </h2>
        <div
          className="main_content row g-0 border shadow-bottom "
          style={{
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src="/images/charity.jpg"
            alt=""
            height="750px"
            width="750px"
            className="col-md-6 img-fluid p-0"
            style={{
              objectFit:"cover"
            }}
          />
          <div className="col-md-6 align-self-center p-2">
            {" "}
            <p
              className="charity_para mt-md-4"
              style={{ backgroundColor: "#e9d5ff" }}
            >
              The unique donation based crowdfunding model is the fundamental
              source for running our activities. It collects Rs. 1/- from all
              the students once a week.
            </p>
            <p
              className="charity_para mt-md-4"
              style={{ backgroundColor: "#99f6e4" }}
            >
              By selling off the used notebooks by students, newspapers and
              plastic scrap collected from faculty blocks.
            </p>
            <p
              className="charity_para mt-md-4"
              style={{ backgroundColor: "#d9f99d" }}
            >
              By placing stalls on the occasions of convocation , technical and
              cultural fests.
            </p>
            <p
              className="charity_para mt-md-4"
              style={{ backgroundColor: "#fef08a" }}
            >
              By raising money from philanthropic individuals
            </p>
            <p
              className="charity_para mt-md-4"
              style={{ backgroundColor: "#fecdd3" }}
            >
              Generating Revenue by establishing a GROCERY STORE in the premises
              Faculty quarters of RGUKT NUZVID.
            </p>
          </div>
        </div>
      </section>
      <section className="organs d-flex flex-column rounded">
        <h2
          style={{ fontSize: "1.5rem", color: "#7f1d1d" }}
          className="text-center"
        >
          ORGANS OF SOCIETY
        </h2>
        <img
          src="/images/org.png"
          alt=""
          height="150px"
          width="150px"
          className="d-block mx-auto"
        />
        <h2
          style={{ fontSize: "1.5rem", color: "#7f1d1d" }}
          className="text-center"
        >
          Executive Committee Responsibilities
        </h2>
        <p>
          The Executive authority of the association shall be vested in the
          Executive Committee(EC). The EC members are responsible for overseeing
          the departments and they also have the power to make necessary rules
          and regulations subjected to the provisions of the constitution with
          2/3rd majority deciding the result.
        </p>
        <ul>
          <li>PRESIDENT (FACULTY )</li>
          <li>VICE-PRESIDENT (Student)</li>
          <li>GENERAL SECRETARY (Faculty)</li>
          <li>TREASURER (Faculty)</li>
          <li>3 JOINT SECRETARIES (Faculty)</li>
          <li>JOINT TREASURER (Student)</li>
          <li>10 EXECUTIVE COMMITTEE MEMBERS (Students)</li>
        </ul>
        <div>
          The Executive Committee shall consist of 18 members, i.e., President
          ,Vice President, Treasurer, Secretary and 10 Executive Committee
          members. Any interim vacancy in the Executive Committee shall be
          filled up by the Committee itself. A member who has completed his term
          as an elected member is eligible for Re-election as a member of the
          Committee.
          <br />
          The Executive Committee may meet as often as necessary. The meeting
          shall contain the proposed agenda and the reasons for such a meeting.
          <br />
          Each member of the Executive Committee shall have one vote and any
          proposed matter can be finalized by the Executive Committee with the
          2/3rd majority of the voting.
          <br />
          Every resolution of the Executive Committee meeting shall be recorded
          in the minute book. Such minutes shall be communicated to members
          invited for meeting as early as possible.
          <br />
          The affairs and funds of the Society shall be managed, administered
          and controlled subject to rules/bye-laws and the orders/directions of
          the Society, by the Executive Committee.
          <br />
        </div>
      </section>
      <section className="selection d-flex flex-column  rounded" style={{marginBottom: "clamp(1rem, 5vw, 4rem)"}}>
        <img
          src="/images/volunteer.png"
          alt=""
          height="100"
          width="100"
          className="d-block mx-auto"
        />
        <h2
          style={{ fontSize: "1.5rem", color: "#7f1d1d" }}
          className="text-center"
        >
          Volunteers
        </h2>
        <h2
          style={{ fontSize: "1.5rem", color: "#7f1d1d" }}
          className="mt-md-1 text-center"
        >
          RGUKT Nuzvid Organization
        </h2>
        <p className="">
          All the 7000+ students and faculty of RGUKT-Nuzvid makes our
          organisation full-fledged. Every volunteer of our organization plays
          an eminent role in extending our services to the impoverished ones. A
          total of 250 active volunteers are responsible for proper
          functionality of our daily affairs. In spite of serving students in
          the campus, whenever possible, we extend our valuable services to the
          staff and outside charity.
        </p>
        <div className="d-flex  rounded p-3 volunteer_innerdiv justify-content-around align-items-stretch gap-4">
          <div
            className="border rounded p-4  justify-self-center d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "#D1D5DB", margin: "0" }}
          >
            <h5 style={{ fontWeight: "600", fontSize: "1.125rem" }}>
              Executive Committe
            </h5>
            <span>(Includes students and faculty)</span>
          </div>
          <div
            className="border rounded p-4  d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#FECACA", margin: "0" }}
          >
            <h2 style={{ fontWeight: "600", fontSize: "1.125rem" }}>
              Branch/Floor Level Representatives
            </h2>
          </div>
          <div
            className="border rounded p-4  d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#C084FC", margin: "0" }}
          >
            <h2 style={{ fontWeight: "600", fontSize: "1.125rem" }}>
              Class Level Representatives(HR)
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
