"use client";

import "../styles/Hero.css";

export default function Hero({
  videoSrc,
  text,
  overlayOpacity,
  viewportHeight, // 👈 new prop (number or string)
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black flex items-center justify-center"
      style={{
        height: viewportHeight
          ? typeof viewportHeight === "number"
            ? `${viewportHeight}vh`
            : viewportHeight
          : undefined,
      }}
    >
      {/* Background Video */}
      {videoSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {overlayOpacity !== undefined && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* FLOWING TEXT */}
      {text && (
        <div className="hero-marquee-wrapper">
          <div className="hero-marquee-text">{text}</div>
        </div>
      )}
    </section>
  );
}