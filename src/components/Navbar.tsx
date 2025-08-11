"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRentOpen, setMobileRentOpen] = useState(false);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileRentOpen(false);
  };

  return (
    <nav className={styles.navbar} aria-label="Hoofdnavigatie">
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.left}>
          <Link href="/" aria-label="TripTrek home" onClick={closeAll}>
            <Image
              src="/logo1.png"
              alt="TripTrek.nl"
              width={600}
              height={200}
              priority
              style={{ height: "var(--logo-height)", width: "auto" }}
            />
          </Link>
        </div>

        {/* Desktop rechts */}
        <div className={styles.right}>
          <div className={styles.dropdown}>
            <button type="button" className={styles.dropBtn} aria-haspopup="menu" aria-expanded="false">
              Huren
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div role="menu" className={styles.menu}>
              <Link href="#" className={styles.menuItem} role="menuitem">Dakkoffer</Link>
              <Link href="#" className={styles.menuItem} role="menuitem">Skidrager</Link>
              <Link href="#" className={styles.menuItem} role="menuitem">Dakdragers</Link>
              <span className={styles.menuItemDisabled} role="menuitem" aria-disabled="true" tabIndex={-1}>
                Fietsdragers <span className={styles.soonBadge}>binnenkort</span>
              </span>
              <span className={styles.menuItemDisabled} role="menuitem" aria-disabled="true" tabIndex={-1}>
                Binnenkort meer <span className={styles.soonBadge}>binnenkort</span>
              </span>
            </div>
          </div>

          <Link href="#" className={`${styles.link} ${styles.linkUnderline}`}>Webshop</Link>
          <Link href="#" className={`${styles.link} ${styles.linkUnderline}`}>Contact</Link>

          <Link href="#" className={styles.account} aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 20c1.8-3.5 5-5 8-5s6.2 1.5 8 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-panel"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && <div className={styles.backdrop} onClick={closeAll} aria-hidden="true" />}

      {/* Mobile panel */}
      <div id="mobile-panel" className={`${styles.mobilePanel} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <button
          className={styles.mobileDrop}
          aria-expanded={mobileRentOpen}
          onClick={() => setMobileRentOpen(v => !v)}
        >
          <span>Huren</span>
          <svg className={`${styles.mobileChev} ${mobileRentOpen ? styles.mobileChevOpen : ""}`} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <div className={`${styles.mobileSub} ${mobileRentOpen ? styles.mobileSubOpen : ""}`}>
          <Link href="#" className={styles.mobileLink} onClick={closeAll}>Dakkoffer</Link>
          <Link href="#" className={styles.mobileLink} onClick={closeAll}>Skidrager</Link>
          <Link href="#" className={styles.mobileLink} onClick={closeAll}>Dakdragers</Link>
          <div className={`${styles.mobileLink} ${styles.mobileDisabled}`} aria-disabled="true">
            Fietsdragers <span className={styles.soonBadge}>binnenkort</span>
          </div>
          <div className={`${styles.mobileLink} ${styles.mobileDisabled}`} aria-disabled="true">
            Binnenkort meer <span className={styles.soonBadge}>binnenkort</span>
          </div>
        </div>

        <Link href="#" className={styles.mobileLink} onClick={closeAll}>Webshop</Link>
        <Link href="#" className={styles.mobileLink} onClick={closeAll}>Contact</Link>
        <Link href="#" className={styles.mobileLink} onClick={closeAll}>Account</Link>
      </div>
    </nav>
  );
}
