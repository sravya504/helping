
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