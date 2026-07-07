"use client";

import { useEffect, useRef, useState } from "react";
import Img from "./Img";
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
    const heroRef = useRef<HTMLElement>(null);

    // 인앱 웹뷰(카카오톡 등)는 스크롤로 브라우저 UI가 접힐 때 vh/svh를 동적으로
    // 재계산해 hero 높이가 변하고, object-fit: cover가 이미지를 재크롭하며
    // 확대되는 것처럼 보임 — 터치 기기에서만 마운트 시 px로 고정하고, UI 접힘으로
    // 높이만 변하는 리사이즈는 무시(가로 폭이 바뀌는 회전 시에만 갱신).
    // 데스크톱(hover 가능 기기)은 개입하지 않음 — 창 리사이즈 시 CSS 100svh가
    // 그대로 풀스크린을 유지해야 하므로
    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
        let lastWidth = window.innerWidth;
        const lockHeight = () => { el.style.height = `${window.innerHeight}px`; };
        lockHeight();
        const handleResize = () => {
            if (window.innerWidth === lastWidth) return;
            lastWidth = window.innerWidth;
            lockHeight();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            el.style.height = "";
        };
    }, []);

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
            ref={heroRef}
            className={styles.hero}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {banners.map((banner, i) => (
                <div key={banner.id} className={`${styles.slide} ${i === index ? styles.active : ""}`}>
                    <Img
                        src={banner.image}
                        alt={banner.title}
                        className={styles.slideImage}
                        priority={i === 0}
                    />
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