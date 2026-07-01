"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export interface HeroBanner {
    id: string;
    image: string;
    logoText?: string;
    title: string;
    subTitle?: string;
}

interface HeroProps {
    banners: HeroBanner[];
    autoPlayMs?: number;
}

export default function Hero({ banners, autoPlayMs = 5000 }: HeroProps) {
    const [index, setIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % banners.length);
        }, autoPlayMs);
        return () => clearTimeout(timer);
    }, [index, banners.length, autoPlayMs]);

    const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);
    const next = () => setIndex((i) => (i + 1) % banners.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const SWIPE_THRESHOLD = 50;

        if (deltaX > SWIPE_THRESHOLD) {
            prev();
        } else if (deltaX < -SWIPE_THRESHOLD) {
            next();
        }
        setTouchStartX(null);
    };

    return (
        <section
            className={styles.hero}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {banners.map((banner, i) => (
                <div key={banner.id} className={`${styles.slide} ${i === index ? styles.active : ""}`}>
                    <img src={banner.image} alt={banner.title} className={styles.slideImage} />
                    <div className={styles.overlay} />
                    <div className={styles.content}>
                        <p className={styles.brand}>{banner.logoText ?? "HANSSEM"}</p>
                        <h2 className={styles.title}>{banner.title}</h2>
                        <p className={styles.subTitle}>{banner.subTitle}</p>
                    </div>
                </div>
            ))}

            <button className={styles.clickZoneLeft} onClick={prev} aria-label="이전 배너" />
            <button className={styles.clickZoneRight} onClick={next} aria-label="다음 배너" />

            <div className={styles.dots}>
                {banners.map((banner, i) => (
                    <button
                        key={banner.id}
                        className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                        onClick={() => setIndex(i)}
                        aria-label={`${i + 1}번 배너로 이동`}
                    />
                ))}
            </div>
        </section>
    );
}