
// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";
// import { useNavigate } from "react-router-dom";

// function adminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const user = userCredential.user;

//       const token = await user.getIdToken();

//       const response = await fetch("http://localhost:5000/admin/dashboard", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         sessionStorage.setItem("isAdmin", "true");
//         navigate("/admin/dashboard");
//       } else {
//         alert(data.message);
//       }

//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Enter email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default adminLogin;



import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css"; // Import CSS for styling

function adminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); 
const [messageType, setMessageType] = useState("");   
  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();

    const response = await fetch("http://localhost:5000/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
  sessionStorage.setItem("isAdmin", "true");
  setLoginMessage("Login successful!");
  setMessageType("success");

  // Delay redirect so message is visible
  setTimeout(() => {
    navigate("/admin/dashboard");
  }, 1500); // 1.5 seconds
} else {
  setLoginMessage(data.message || "Invalid credentials!");
  setMessageType("error");
}

  } catch (error) {
    setLoginMessage(error.message);
    setMessageType("error");
  }
};
  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="my-button">Login</button>
          {loginMessage && (
  <p className={messageType === "success" ? "success-msg" : "error-msg"}>
    {loginMessage}
  </p>
)}
        </form>
      </div>
    </div>
  );
}

export default adminLogin;