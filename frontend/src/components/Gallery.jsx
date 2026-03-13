// import React, { useState, useEffect } from "react";
// import { ref, get, child } from "firebase/database";
// import { db } from "../firebase";

// const styles = {
//   section: { textAlign: "center", padding: "40px 0", fontFamily: "Arial, sans-serif" },
//   title: { fontSize: "2em", color: "#c90000ff", marginBottom: "20px", fontWeight: "bold" },
//   galleryContainer: { display: "flex", justifyContent: "center", width: "90%", maxWidth: "1200px", margin: "0 auto" },
//   imagesWrapper: { display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" },
//   imageCard: {
//     position: "relative",
//     flex: "0 0 300px",
//     height: "200px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     borderRadius: "8px",
//     overflow: "hidden",
//     cursor: "pointer",
//     marginBottom: "16px",
//     background: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   galleryImage: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
// };

// const ImageCard = ({ imageUrl, altText }) => (
//   <div style={styles.imageCard}>
//     <img src={imageUrl} alt={altText} style={styles.galleryImage} />
//   </div>
// );

// const Gallery = () => {

//   const [galleryImages, setGalleryImages] = useState([]);

//   useEffect(() => {

//     const fetchGalleryImages = async () => {

//       try {

//         const dbRef = ref(db);
//         const snapshot = await get(child(dbRef, "images"));
//         const data = snapshot.val() || {};

//         const galleryImgs = Object.entries(data)
//   .map(([id, img]) => ({
//     id,
//     url: img.url,
//     alt: img.alt || "Gallery Image",
//     locations: img.locations || [],
//     createdAt: img.createdAt || 0,
//     order: img.order || 0
//   }))
//   .filter(img => img.locations.includes("gallery"))
//   .sort((a, b) => {
//     if (b.createdAt !== a.createdAt) {
//       return b.createdAt - a.createdAt;
//     }
//     return a.order - b.order;
//   });
//         setGalleryImages(galleryImgs);

//       } catch (err) {

//         console.error("Failed to fetch gallery images:", err);

//       }

//     };

//     fetchGalleryImages();

//   }, []);

//   return (

//     <section style={styles.section}>

//       <h2 style={styles.title}>Gallery</h2>

//       <div style={styles.galleryContainer}>

//         <div style={styles.imagesWrapper}>

//           {galleryImages.length === 0 ? (

//             <div style={{ fontSize: "1.2em", color: "#888", margin: "auto" }}>
//               No gallery images found.
//             </div>

//           ) : (

//             galleryImages.map(img => (
//               <ImageCard
//                 key={img.id}
//                 imageUrl={img.url}
//                 altText={img.alt}
//               />
//             ))

//           )}

//         </div>

//       </div>

//     </section>

//   );

// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import { ref, get, child, remove } from "firebase/database";
import { db } from "../firebase";

const styles = {
  section: { textAlign: "center", padding: "40px 0", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "2em", color: "#c90000ff", marginBottom: "20px", fontWeight: "bold" },
  galleryContainer: { display: "flex", justifyContent: "center", width: "90%", maxWidth: "1200px", margin: "0 auto" },
  imagesWrapper: { display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" },
  imageCard: {
    position: "relative",
    flex: "0 0 300px",
    height: "200px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    marginBottom: "16px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  galleryImage: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  deleteButton: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

const Gallery = () => {

  const [galleryImages, setGalleryImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  // check admin from sessionStorage
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  useEffect(() => {

    const fetchGalleryImages = async () => {

      try {

        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "images"));
        const data = snapshot.val() || {};

        const galleryImgs = Object.entries(data)
          .map(([id, img]) => ({
            id,
            url: img.url,
            alt: img.alt || "Gallery Image",
            locations: img.locations || [],
            createdAt: img.createdAt || 0,
            order: img.order || 0
          }))
          .filter(img => img.locations.includes("gallery"))
          .sort((a, b) => {
            if (b.createdAt !== a.createdAt) {
              return b.createdAt - a.createdAt;
            }
            return a.order - b.order;
          });

        setGalleryImages(galleryImgs);

      } catch (err) {

        console.error("Failed to fetch gallery images:", err);

      }

    };

    fetchGalleryImages();

  }, []);

  // delete image
const deleteImage = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/delete-image/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setGalleryImages(prev => prev.filter(img => img.id !== id));
    setActiveImage(null);

  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (

    <section style={styles.section}>

      <h2 style={styles.title}>Gallery</h2>

      <div style={styles.galleryContainer}>

        <div style={styles.imagesWrapper}>

          {galleryImages.length === 0 ? (

            <div style={{ fontSize: "1.2em", color: "#888", margin: "auto" }}>
              No gallery images found.
            </div>

          ) : (

            galleryImages.map(img => (

              <div
                key={img.id}
                style={styles.imageCard}
                onClick={() => {
                  if (!isAdmin) return;
                  setActiveImage(img.id);
                }}
                onDoubleClick={() => {
                  if (!isAdmin) return;
                  setActiveImage(null);
                }}
              >

                <img src={img.url} alt={img.alt} style={styles.galleryImage} />

                {isAdmin && activeImage === img.id && (
                  <button
                    style={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(img.id);
                    }}
                  >
                    Delete
                  </button>
                )}

              </div>

            ))

          )}

        </div>

      </div>

    </section>

  );

};

export default Gallery;