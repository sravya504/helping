// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";

// function AdminRoute({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   if (user && user.email === "n210307@rguktn.ac.in") {
//     return children;
//   }

//   return <Navigate to="/admin/login" />;
// }

// export default AdminRoute;

import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdmin = sessionStorage.getItem("isAdmin");

  if (isAdmin === "true") {
    return children;
  }

  return <Navigate to="/admin/login" />;
}

export default AdminRoute;