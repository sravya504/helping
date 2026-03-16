import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./adminDashboard.css";

function SortableItem({ id, file, index }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="drag-item"
      {...attributes}
      {...listeners}
    >
      <span className="number">{index + 1}</span>

      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        width="80"
      />

      <p>{file.name}</p>
    </div>
  );
}

function AdminDashboard() {

  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [carousel, setCarousel] = useState(false);
  const [gallery, setGallery] = useState(false);

  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadMessageType, setUploadMessageType] = useState("");

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files).map((file, index) => ({
      id: (Date.now() + "-" + index).toString(),
      file
    }));

    setFiles(selectedFiles);
  };

  const handleDragEnd = (event) => {

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setFiles((items) => {

      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);

    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const locations = [];

    if (carousel) locations.push("carousel");
    if (gallery) locations.push("gallery");

    if (files.length === 0 || locations.length === 0) {

      setUploadMessage("Please select a file and at least one location");
      setUploadMessageType("error");
      return;
    }

    setShowPopup(true);
  };

  const confirmUpload = async () => {

    const locations = [];

    if (carousel) locations.push("carousel");
    if (gallery) locations.push("gallery");

    const formData = new FormData();

    // send images in arranged order
    files.forEach((f, index) => {
  formData.append("images", f.file);
  formData.append("orders", index); 
});

    formData.append("locations", JSON.stringify(locations));

    try {

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {

        setUploadMessage("Images uploaded successfully!");
        setUploadMessageType("success");

        setFiles([]);
        setCarousel(false);
        setGallery(false);

      } else {

        setUploadMessage(data.message || "Upload failed");
        setUploadMessageType("error");
      }

    } catch (err) {

      setUploadMessage("Upload failed: " + err.message);
      setUploadMessageType("error");
    }

    setShowPopup(false);
  };

  return (

    <div className="admin-dashboard-page">

      {/* Top Bar */}
      <div className="top-bar">

        <h1>Welcome to Admin Portal</h1>

        {/* <button
          className="logout-btn"
          onClick={() => {
            sessionStorage.removeItem("isAdmin");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button> */}

      </div>

      <hr style={{ width: "100%", margin: "20px 0" }} />

      {/* Upload Form */}
      <div className="upload-form-wrapper">

        <form className="upload-form-container" onSubmit={handleSubmit}>

          <h2 align="center">Upload Image</h2>

          <label>Choose Images:</label>
          <br />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <div style={{ marginTop: "15px" }}>

            <label>
              <input
                type="checkbox"
                checked={carousel}
                onChange={(e) => setCarousel(e.target.checked)}
              />
              Carousel
            </label>

            <label style={{ marginLeft: "15px" }}>
              <input
                type="checkbox"
                checked={gallery}
                onChange={(e) => setGallery(e.target.checked)}
              />
              Gallery
            </label>

          </div>

          <button type="submit" className="my-button">
            Upload Image
          </button>

          {uploadMessage && (
            <p className={uploadMessageType === "success" ? "success-msg" : "error-msg"}>
              {uploadMessage}
            </p>
          )}

        </form>

      </div>

      {/* Popup for Drag & Drop */}
      {showPopup && (

        <div className="popup-overlay">

          <div className="popup-box">

            <h3>Arrange Images (Drag & Drop)</h3>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >

              <SortableContext
                items={files.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >

                  {files.map((item, index) => (

                    <SortableItem
                      key={item.id}
                      id={item.id}
                      file={item.file}
                      index={index}
                    />

                  ))}

                </div>

              </SortableContext>

            </DndContext>

            <div style={{ marginTop: "20px" }}>

              <button
                className="my-button"
                onClick={confirmUpload}
              >
                Confirm Upload
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;