import React, { useState, useEffect } from "react";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase";

const styles = {
  section: { textAlign: "center", padding: "40px 0", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "2em", color: "#c90000ff", marginBottom: "20px", fontWeight: "bold" },
  subTitle: { fontSize: "1.5em", color: "#7f1d1d", marginBottom: "15px", fontWeight: "bold" },
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
  deleteButtonsContainer: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  deleteButton: {
    background: "#8b2323",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.8em"
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },
  modalButtons: { display: "flex", justifyContent: "space-around", marginTop: "15px" },
  modalButton: { padding: "8px 16px", borderRadius: "5px", cursor: "pointer", border: "none" }
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, location: null });

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "images"));
        const data = snapshot.val() || {};

        const allImgs = Object.entries(data)
          .map(([id, img]) => ({
            id,
            url: img.url,
            alt: img.alt || "Image",
            locations: img.locations || [],
            createdAt: img.createdAt || 0,
            order: img.order || 0
          }))
          .sort((a, b) => {
            if (b.createdAt !== a.createdAt) return b.createdAt - a.createdAt;
            return a.order - b.order;
          });

        setImages(allImgs);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    fetchImages();
  }, []);

  const deleteImage = async (id, location) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/delete-image/${id}?location=${location}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Delete failed");
        return;
      }

      // Update state
      setImages(prev => prev.filter(img => !(img.id === id && img.locations.includes(location))));
      setActiveImage(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Open confirmation modal
  const handleDeleteClick = (id, location) => {
    setConfirmDelete({ show: true, id, location });
  };

  // Confirm deletion
  const confirmDeletion = () => {
    deleteImage(confirmDelete.id, confirmDelete.location);
    setConfirmDelete({ show: false, id: null, location: null });
  };

  const cancelDeletion = () => {
    setConfirmDelete({ show: false, id: null, location: null });
  };

  const galleryImages = images.filter(img => img.locations.includes("gallery"));
  const carouselImages = images.filter(img => img.locations.includes("carousel"));

  return (
    <section style={styles.section}>
      {/* Gallery Section */}
      <h2 style={styles.title}>Gallery Images</h2>
      <div style={styles.galleryContainer}>
        <div style={styles.imagesWrapper}>
          {galleryImages.length === 0 ? (
            <div style={{ fontSize: "1.2em", color: "#888", margin: "auto" }}>No gallery images found.</div>
          ) : (
            galleryImages.map(img => (
              <div
                key={img.id}
                style={styles.imageCard}
                onClick={() => { if (!isAdmin) return; setActiveImage(img.id); }}
                onDoubleClick={() => { if (!isAdmin) return; setActiveImage(null); }}
              >
                <img src={img.url} alt={img.alt} style={styles.galleryImage} />
                {isAdmin && activeImage === img.id && (
                  <div style={styles.deleteButtonsContainer}>
                    <button style={styles.deleteButton} onClick={e => { e.stopPropagation(); handleDeleteClick(img.id, "gallery"); }}>
                      Delete
                    </button>
                    {img.locations.includes("carousel") && (
                      <button style={styles.deleteButton} onClick={e => { e.stopPropagation(); handleDeleteClick(img.id, "carousel"); }}>
                        Remove from Carousel
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Carousel Section */}
      <h2 style={{ ...styles.title, marginTop: "40px" }}>Home Carousel Images</h2>
      <div style={styles.galleryContainer}>
        <div style={styles.imagesWrapper}>
          {carouselImages.length === 0 ? (
            <div style={{ fontSize: "1.2em", color: "#888", margin: "auto" }}>No carousel images found.</div>
          ) : (
            carouselImages.map(img => (
              <div
                key={img.id}
                style={styles.imageCard}
                onClick={() => { if (!isAdmin) return; setActiveImage(img.id); }}
                onDoubleClick={() => { if (!isAdmin) return; setActiveImage(null); }}
              >
                <img src={img.url} alt={img.alt} style={styles.galleryImage} />
                {isAdmin && activeImage === img.id && (
                  <div style={styles.deleteButtonsContainer}>
                    {img.locations.includes("gallery") && (
                      <button style={styles.deleteButton} onClick={e => { e.stopPropagation(); handleDeleteClick(img.id, "gallery"); }}>
                        Delete
                      </button>
                    )}
                    <button style={styles.deleteButton} onClick={e => { e.stopPropagation(); handleDeleteClick(img.id, "carousel"); }}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDelete.show && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>Are you sure you want to delete this image?</p>
            <div style={styles.modalButtons}>
              <button
                style={{ ...styles.modalButton, backgroundColor: "#8b2323", color: "#fff" }}
                onClick={confirmDeletion}
              >
                Yes
              </button>
              <button
                style={{ ...styles.modalButton, backgroundColor: "#ccc", color: "#000" }}
                onClick={cancelDeletion}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;