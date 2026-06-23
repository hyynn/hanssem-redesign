"use client";

import { useEffect, useRef } from "react";
import styles from "./ProductDetailSection.module.css";

export default function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loadedRef.current) {
            video.src = src;
            loadedRef.current = true;
          }
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      preload="none"
      muted
      playsInline
      loop
    />
  );
}
