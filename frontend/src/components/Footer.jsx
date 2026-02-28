// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function Footer() {
//   const [visits, setVisits] = useState(0);

//   useEffect(() => {
//     if (!sessionStorage.getItem("visitedOnce")) {
//       const storedVisits = localStorage.getItem("siteVisits");
//       const newCount = storedVisits ? parseInt(storedVisits) + 1 : 1;
//       localStorage.setItem("siteVisits", newCount);
//       setVisits(newCount);
//       sessionStorage.setItem("visitedOnce", "true");
//     } else {
//       const storedVisits = localStorage.getItem("siteVisits");
//       setVisits(storedVisits ? parseInt(storedVisits) : 1);
//     }
//   }, []);

//   return (
//     <footer style={{ backgroundColor: "black", color: "white"

//      }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//             gap: "20px",
//             maxHeight:'50px'
//           }}
//         >
//           {/* Logo + Title + Description */}
//           <div
//             style={{ display: "flex", flex: "1 1 300px", marginBottom: "20px" }}
//           >
//             <img
//               src="./images/hhlogo.png"
//               alt="Logo"
//               width={70}
//               height={70}
//               style={{ marginRight: "15px" }}
//             />
//             <div>
//               <span
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                   display: "block",
//                 }}
//               >
//                 Helping Hands RGUKT Nuzvid
//               </span>
//               <p style={{ marginTop: "5px", lineHeight: "1.4" }}>
//                 A Students's Initiative - An Abode of Service
//                 <br />
//                 (Regd No. 313/2019 under the A.P. Societies Registration Act,
//                 2001)
//               </p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
//             <h6 style={{ fontWeight: "bold", marginBottom: "8px" }}>
//               Quick Links
//             </h6>
//             <ul style={{ listStyle: "none", padding: 0 }}>
//               <li>
//                 <Link
//                   to="/about"
//                   style={{ color: "white", textDecoration: "none" }}
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   style={{ color: "white", textDecoration: "none" }}
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Social Icons */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           marginTop: "20px",
//         }}
//       >
//         <a
//           href="https://www.facebook.com/rgukthelpinghands"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaFacebookF size={20} />
//         </a>
//         <a
//           href="https://x.com/HH_RguktN"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaTwitter size={20} />
//         </a>
//         <a
//           href="https://www.instagram.com/helpinghands_rguktn/"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaInstagram size={20} />
//         </a>
//         <a
//           href="https://www.whatsapp.com/channel/0029VahYAYdEgGfNOxdJXH2u"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaWhatsapp size={20} />
//         </a>
//       </div>

//       {/* Bottom Section */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "10px 20px",
//           paddingBottom:"0px",
//           maxHeight:'67px'
         
//         }}
//       >
//         {/* Centered copyright */}
//         <div
//           style={{ flex: "1 1 100%", textAlign: "center", marginBottom: "5px" }}
//         >
//           © 2025 RGUKT-AP. All Rights Reserved.
//           <br />
//           Designed, Developed & Maintained By RGUKT Webteam
//         </div>

//         {/* Site Visits */}
//         <div style={{ flex: "1 1 100%", textAlign: "right" ,
//           position:' relative',
//     top:' -184px',
//     left:' -40px;'
//           } }>
//           👁‍🗨 <span>Site Visits:</span> {visits}
//         </div>
//       </div>
//     </footer>
//   );
// }



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function Footer() {
//   const [visits, setVisits] = useState(0);

//   useEffect(() => {
//     if (!sessionStorage.getItem("visitedOnce")) {
//       const storedVisits = localStorage.getItem("siteVisits");
//       const newCount = storedVisits ? parseInt(storedVisits) + 1 : 1;
//       localStorage.setItem("siteVisits", newCount);
//       setVisits(newCount);
//       sessionStorage.setItem("visitedOnce", "true");
//     } else {
//       const storedVisits = localStorage.getItem("siteVisits");
//       setVisits(storedVisits ? parseInt(storedVisits) : 1);
//     }
//   }, []);

//   return (
//     <footer style={{ backgroundColor: "black", color: "white"

//      }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//             gap: "20px",
//             maxHeight:'50px'
//           }}
//         >
//           {/* Logo + Title + Description */}
//           <div
//             style={{ display: "flex", flex: "1 1 300px", marginBottom: "20px" }}
//           >
//             <img
//               src="./images/hhlogo.png"
//               alt="Logo"
//               width={70}
//               height={70}
//               style={{ marginRight: "15px" }}
//             />
//             <div>
//               <span
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                   display: "block",
//                 }}
//               >
//                 Helping Hands RGUKT Nuzvid
//               </span>
//               <p style={{ marginTop: "5px", lineHeight: "1.4" }}>
//                 A Students's Initiative - An Abode of Service
//                 <br />
//                 (Regd No. 313/2019 under the A.P. Societies Registration Act,
//                 2001)
//               </p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
//             <h6 style={{ fontWeight: "bold", marginBottom: "8px" }}>
//               Quick Links
//             </h6>
//             <ul style={{ listStyle: "none", padding: 0 }}>
//               <li>
//                 <Link
//                   to="/about"
//                   style={{ color: "white", textDecoration: "none" }}
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   style={{ color: "white", textDecoration: "none" }}
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Social Icons */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           marginTop: "20px",
//         }}
//       >
//         <a
//           href="https://www.facebook.com/rgukthelpinghands"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaFacebookF size={20} />
//         </a>
//         <a
//           href="https://x.com/HH_RguktN"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaTwitter size={20} />
//         </a>
//         <a
//           href="https://www.instagram.com/helpinghands_rguktn/"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaInstagram size={20} />
//         </a>
//         <a
//           href="https://www.whatsapp.com/channel/0029VahYAYdEgGfNOxdJXH2u"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "white" }}
//         >
//           <FaWhatsapp size={20} />
//         </a>
//       </div>

//       {/* Bottom Section */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "10px 20px",
//           paddingBottom:"0px",
//           maxHeight:'67px'
         
//         }}
//       >
//         {/* Centered copyright */}
//         <div
//           style={{ flex: "1 1 100%", textAlign: "center", marginBottom: "5px" }}
//         >
//           © 2025 RGUKT-AP. All Rights Reserved.
//           <br />
//           Designed, Developed & Maintained By RGUKT Webteam
//         </div>

//         {/* Site Visits */}
//         <div style={{ flex: "1 1 100%", textAlign: "right" ,
//           position:' relative',
//     top:' -184px',
//     left:' -40px;'
//           } }>
//           👁‍🗨 <span>Site Visits:</span> {visits}
//         </div>
//       </div>
//     </footer>
//   );
// }




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    if (!sessionStorage.getItem("visitedOnce")) {
      const storedVisits = localStorage.getItem("siteVisits");
      const newCount = storedVisits ? parseInt(storedVisits) + 1 : 1;
      localStorage.setItem("siteVisits", newCount);
      setVisits(newCount);
      sessionStorage.setItem("visitedOnce", "true");
    } else {
      const storedVisits = localStorage.getItem("siteVisits");
      setVisits(storedVisits ? parseInt(storedVisits) : 1);
    }
  }, []);

  return (
    <footer style={{ backgroundColor: "black", color: "white", marginTop: "40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

        {/* TOP SECTION */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          {/* Logo Section */}
          <div style={{ flex: "1 1 300px", display: "flex" }}>
            <img
              src="./images/hhlogo.png"
              alt="Logo"
              width={70}
              height={70}
              style={{ marginRight: "15px" }}
            />
            <div>
              <span style={{ fontWeight: "bold", fontSize: "18px", display: "block" }}>
                Helping Hands RGUKT Nuzvid
              </span>
              <p style={{ marginTop: "5px", lineHeight: "1.4" }}>
                A Students's Initiative - An Abode of Service <br />
                (Regd No. 313/2019 under the A.P. Societies Registration Act, 2001)
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ flex: "1 1 150px" }}  className="w-full md:w-1/3 text-center md:text-left">
            <h6 style={{ fontWeight: "bold", marginBottom: "8px" }}>Quick Links</h6>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <a style={{ color: "white" }} href="https://www.facebook.com/rgukthelpinghands">
            <FaFacebookF size={20} />
          </a>
          <a style={{ color: "white" }} href="https://x.com/HH_RguktN">
            <FaTwitter size={20} />
          </a>
          <a style={{ color: "white" }} href="https://www.instagram.com/helpinghands_rguktn/">
            <FaInstagram size={20} />
          </a>
          <a style={{ color: "white" }} href="https://www.whatsapp.com/channel/0029VahYAYdEgGfNOxdJXH2u">
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* BOTTOM SECTION */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div>
            © 2025 RGUKT-AP. All Rights Reserved. <br />
            Designed, Developed & Maintained By RGUKT Webteam
          </div>

          {/* VISITOR COUNT */}
          <div style={{ fontSize: "10px",float:"right",marginRight:"-11px"}}>
            👁‍🗨 <span>Site Visits:</span> {visits}
          </div>
        </div>
      </div>
    </footer>
  );
}