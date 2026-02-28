// import React, { useState } from 'react';

// // Images grouped by department (no description)
// const DEPARTMENT_IMAGES = {
//   'INTERNAL CARE': [
  
//     { id: 1, url: 'images/i1.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 2, url: 'images/i2.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 3, url: 'images/i3.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 4, url: 'images/i4.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 5, url: 'images/i5.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 90, url: 'images/i6.jpg', alt: 'Community workshop', year: 2024 },
//   ],
//   'HEALTH CARE': [
    
//     { id: 6, url: 'images/h1.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 7, url: 'images/h2.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 8, url: 'images/h3.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 9, url: 'images/h4.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 10, url: 'images/h5.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 11, url: 'images/h6.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 12, url: 'images/h7.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 13, url: 'images/h8.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 14, url: 'images/h9.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 15, url: 'images/h10.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 16, url: 'images/h11.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 17, url: 'images/h12.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 10, url: 'images/h13.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 11, url: 'images/h14.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 12, url: 'images/h15.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 13, url: 'images/h16.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 14, url: 'images/h17.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 15, url: 'images/h18.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 16, url: 'images/h19.jpg', alt: 'Community workshop', year: 2024 },
    
//   ],
//   'PUBLIC RELATIONS': [
//     { id: 18, url: 'images/p1.jpg', alt: 'Volunteers handing out supplies', year: 2023 },
//     { id: 19, url: 'images/p2.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 20, url: 'images/p3.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 21, url: 'images/p4.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 22, url: 'images/p5.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 23, url: 'images/p6.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 24, url: 'images/p7.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 25, url: 'images/p8.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 28, url: 'images/p9.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 29, url: 'images/p10.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 30, url: 'images/p11.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 36, url: 'images/p12.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 37, url: 'images/p13.jpg', alt: 'Community workshop', year: 2024 },
//      { id: 28, url: 'images/p14.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 29, url: 'images/p15.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 30, url: 'images/p16.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 36, url: 'images/p17.jpg', alt: 'Community workshop', year: 2024 },
   
//   ],
//   'OUTSIDE CHARITY': [
//     { id: 45, url: 'images/o1.jpg', alt: 'Group photo after event', year: 2022 },
//     { id: 46, url: 'images/o2.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 47, url: 'images/o3.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 48, url: 'images/o4.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 49, url: 'images/o5.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 50, url: 'images/o6.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 40, url: 'images/o7.jpg', alt: 'Community workshop', year: 2024 },
//      { id: 28, url: 'images/o8.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 29, url: 'images/o9.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 30, url: 'images/o10.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 36, url: 'images/o11.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 37, url: 'images/o12.jpg', alt: 'Community workshop', year: 2024 },
//     { id: 37, url: 'images/o13.jpg', alt: 'Community workshop', year: 2024 },
//   ],
// };

// // Carousel images (separate from department images)
// const CAROUSEL_IMAGES = [
//   { id: 'c1', url: 'images/image1.jpg', alt: 'Carousel Image 1' },
//   { id: 'c2', url: 'images/image2.jpg', alt: 'Carousel Image 2' },
//   { id: 'c3', url: 'images/image3.jpg', alt: 'Carousel Image 3' },
//   { id: 'c4', url: 'images/image4.jpg', alt: 'Carousel Image 1' },
//   { id: 'c5', url: 'images/image5.jpg', alt: 'Carousel Image 2' },
//   { id: 'c6', url: 'images/image6.jpg', alt: 'Carousel Image 3' },
//   { id: 'c7', url: 'images/image7.jpg', alt: 'Carousel Image 2' },
//   { id: 'c8', url: 'images/image8.jpg', alt: 'Carousel Image 3' },
// ];

// const DEPARTMENTS = Object.keys(DEPARTMENT_IMAGES);

// const styles = {
//   section: { textAlign: 'center', padding: '40px 0', fontFamily: 'Arial, sans-serif', },
//   title: { fontSize: '2em', color: '#c90000ff', marginBottom: '20px', fontWeight: 'bold', },
//   filterRow: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' },
//   select: { padding: '8px 16px', fontSize: '1em', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' },
//   input: { padding: '8px 16px', fontSize: '1em', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', width: '120px' },
//   galleryContainer: { display: 'flex', alignItems: 'center', width: '90%', maxWidth: '1200px', margin: '0 auto', position: 'relative', },
//   imagesWrapper: { display: 'flex', gap: '15px', padding: '10px 0', flexGrow: 1, overflow: 'visible', justifyContent: 'center', flexWrap: 'wrap' },
//   imageCard: {
//     position: 'relative',
//     flex: '0 0 300px',
//     height: '200px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     cursor: 'pointer',
//     marginBottom: '16px',
//     background: '#fff',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   galleryImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     display: 'block',
//   },
//   navArrow: {
//     backgroundColor: 'rgba(175, 9, 9, 1)',
//     border: '1px solid #ccc',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     fontSize: '1.5em',
//     cursor: 'pointer',
//     zIndex: 10,
//     margin: '0 10px',
//     lineHeight: '1',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: 'bold',
//     userSelect: 'none',
//     boxShadow: '0 2px 5px rgba(226, 24, 34, 0.93)',
//     transition: 'background-color 0.2s ease',
//     color: '#fff',
//   },
//   navArrowHover: { backgroundColor: '#ec5c5cff', }
// };

// const ImageCard = ({ imageUrl, altText }) => (
//   <div style={styles.imageCard}>
//     <img src={imageUrl} alt={altText} style={styles.galleryImage} />
//   </div>
// );

// const Gallery = () => {
//   const [selectedDept, setSelectedDept] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');

//   // Get images for selected department and year
//   let imagesToShow = [];
//   if (selectedDept) {
//     imagesToShow = DEPARTMENT_IMAGES[selectedDept].filter(img =>
//       selectedYear ? img.year === Number(selectedYear) : true
//     );
//   }

//   // Carousel navigation for carousel images only
//   const [carouselIdx, setCarouselIdx] = useState(0);
//   const CAROUSEL_PER_ROW = 3; // Show three carousel images side by side
//   const carouselEndIdx = carouselIdx + CAROUSEL_PER_ROW;
//   const visibleCarouselImages = CAROUSEL_IMAGES.slice(carouselIdx, carouselEndIdx);

//   const handleCarouselPrev = () => {
//     setCarouselIdx(prev => Math.max(prev - CAROUSEL_PER_ROW, 0));
//   };

//   const handleCarouselNext = () => {
//     setCarouselIdx(prev => (prev + CAROUSEL_PER_ROW < CAROUSEL_IMAGES.length ? prev + CAROUSEL_PER_ROW : prev));
//   };

//   return (
//     <section style={styles.section}>
//       <h2 style={styles.title}>Latest Images</h2>
//       {/* Filters for department and year (placed after title and before carousel) */}
//       <div style={styles.filterRow}>
//         <select
//           style={styles.select}
//           value={selectedDept}
//           onChange={e => { setSelectedDept(e.target.value); }}
//         >
//           <option value="">All Departments</option>
//           {DEPARTMENTS.map(dept => (
//             <option key={dept} value={dept}>{dept}</option>
//           ))}
//         </select>
//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Enter Year"
//           value={selectedYear}
//           onChange={e => { setSelectedYear(e.target.value); }}
//         />
//       </div>
//       {/* Carousel only if no department is selected */}
//       {!selectedDept && (
//         <div style={styles.galleryContainer}>
//           <button
//             style={styles.navArrow}
//             onClick={handleCarouselPrev}
//             aria-label="Previous Carousel Image"
//             disabled={carouselIdx === 0}
//           >
//             &lt;
//           </button>
//           <div style={styles.imagesWrapper}>
//             {visibleCarouselImages.map(image => (
//               <ImageCard
//                 key={image.id}
//                 imageUrl={image.url}
//                 altText={image.alt}
//               />
//             ))}
//           </div>
//           <button
//             style={styles.navArrow}
//             onClick={handleCarouselNext}
//             aria-label="Next Carousel Image"
//             disabled={carouselEndIdx >= CAROUSEL_IMAGES.length}
//           >
//             &gt;
//           </button>
//         </div>
//       )}
//       {/* Department images (only when a department is selected) */}
//       {selectedDept && (
//         <div style={styles.galleryContainer}>
//           <div style={styles.imagesWrapper}>
//             {imagesToShow.length === 0 ? (
//               <div style={{ fontSize: '1.2em', color: '#888', margin: 'auto' }}>No images found.</div>
//             ) : (
//               imagesToShow.map(image => (
//                 <ImageCard
//                   key={image.id}
//                   imageUrl={image.url}
//                   altText={image.alt}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };


// export default Gallery;

import React, { useState, useEffect } from "react";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase"; // modular database reference

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
};

const ImageCard = ({ imageUrl, altText }) => (
  <div style={styles.imageCard}>
    <img src={imageUrl} alt={altText} style={styles.galleryImage} />
  </div>
);

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const dbRef = ref(db); // root reference
        const snapshot = await get(child(dbRef, "images")); // fetch images node
        const data = snapshot.val() || {};

        // Convert object to array and filter for 'gallery' location
        const galleryImgs = Object.entries(data)
          .map(([id, img]) => ({
            id,
            url: img.url,
            alt: img.alt || "Gallery Image",
            locations: img.locations || [],
            createdAt: img.createdAt || 0,
          }))
          .filter(img => img.locations.includes("gallery"))
          .sort((a, b) => b.createdAt - a.createdAt); // optional: newest first

        setGalleryImages(galleryImgs);
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Gallery</h2>
      <div style={styles.galleryContainer}>
        <div style={styles.imagesWrapper}>
          {galleryImages.length === 0 ? (
            <div style={{ fontSize: "1.2em", color: "#888", margin: "auto" }}>No gallery images found.</div>
          ) : (
            galleryImages.map(img => (
              <ImageCard key={img.id} imageUrl={img.url} altText={img.alt} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;