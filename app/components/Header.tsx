"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_ITEMS = ["침실", "거실/주방", "소품", "이벤트", "매거진"];

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            setIsScrolled(true);
            return;
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight * 0.85);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <h1 className={styles.logo}>HANSSEM</h1>
            <nav className={styles.nav}>
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}