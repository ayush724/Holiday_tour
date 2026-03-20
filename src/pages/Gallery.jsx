import React, { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const openImage = (index) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  // preload next/prev images
  useEffect(() => {
    if (currentIndex !== null) {
      const next = new Image();
      const prev = new Image();

      next.src = images[(currentIndex + 1) % images.length];
      prev.src =
        images[
          currentIndex === 0 ? images.length - 1 : currentIndex - 1
        ];
    }
  }, [currentIndex]);

  // 🎨 styles
  const styles = {
    container: {
      padding: "20px",
      background: "#0f0f0f",
      minHeight: "100vh",
      fontFamily: "sans-serif",
    },

    // 🔥 Gradient Title
    title: {
      textAlign: "center",
      fontSize: "38px",
      fontWeight: "700",
      marginBottom: "30px",
      background: "linear-gradient(90deg, #ffffff, #888888)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "15px",
    },

    card: {
      borderRadius: "16px",
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },

    img: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
    },

    modal: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },

    modalImg: {
      maxWidth: "80%",
      maxHeight: "80%",
      borderRadius: "12px",
      opacity: loading ? 0 : 1,
      transition: "opacity 0.3s ease",
    },

    loader: {
      position: "absolute",
      color: "#fff",
      fontSize: "18px",
    },

    arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "40px",
      color: "#fff",
      cursor: "pointer",
      userSelect: "none",
      padding: "10px",
    },

    left: { left: "20px" },
    right: { right: "20px" },

    close: {
      position: "absolute",
      top: "20px",
      right: "30px",
      color: "#fff",
      fontSize: "30px",
      cursor: "pointer",
    },

    counter: {
      position: "absolute",
      bottom: "20px",
      color: "#fff",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Our Gallery</h2>

      {/* GRID */}
      <div style={styles.grid}>
        {images.map((img, i) => (
          <div
            key={i}
            style={styles.card}
            onClick={() => openImage(i)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img src={img} alt={`img-${i}`} style={styles.img} loading="lazy" />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {currentIndex !== null && (
        <div style={styles.modal}>
          <span style={styles.close} onClick={closeImage}>
            ✕
          </span>

          <span
            style={{ ...styles.arrow, ...styles.left }}
            onClick={() => {
              setLoading(true);
              prevImage();
            }}
          >
            ❮
          </span>

          {loading && <div style={styles.loader}>Loading...</div>}

          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt=""
            style={styles.modalImg}
            onLoad={() => setLoading(false)}
          />

          <span
            style={{ ...styles.arrow, ...styles.right }}
            onClick={() => {
              setLoading(true);
              nextImage();
            }}
          >
            ❯
          </span>

          <div style={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;