"use client";
import { useState } from "react";
import styles from "./navbar.module.css";
import { Bell, CircleUserRound, MessageCircleMore, Home, Users, Search } from "lucide-react";

const Navbar = () => {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className={styles.navbar}>
            {/* Search Bar */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                />
                <Search className={styles.searchIcon} />
            </div>

            {/* Center Navigation Icons */}
            <div className={styles.centerIcons}>
                <span 
                    className={`${styles.navIcon} ${activePage === "home" ? styles.active : ""}`} 
                    onClick={() => setActivePage("home")}>
                    <Home />
                    {activePage === "home" && <div className={styles.activeIndicator}></div>}
                </span>
                <span 
                    className={`${styles.navIcon} ${activePage === "group" ? styles.active : ""}`} 
                    onClick={() => setActivePage("group")}>
                    <Users />
                    {activePage === "group" && <div className={styles.activeIndicator}></div>}
                </span>
            </div>

            {/* Right Icons */}
            <div className={styles.icon}>
                <span className={styles.icons}><MessageCircleMore /></span>
                <span className={styles.icons}><Bell /></span>
                <span className={styles.icons}><CircleUserRound /></span>
            </div>
        </div>
    );
};

export default Navbar;
