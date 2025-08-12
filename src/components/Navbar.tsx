"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileRentOpen, setMobileRentOpen] = useState(false);

  // body no-scroll wanneer drawer open is
  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [drawerOpen]);

  // ESC sluit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => { setDrawerOpen(false); setMobileRentOpen(false); };

  return (
    <nav className={styles.navbar} aria-label="Hoofdnavigatie">
      <div className={styles.inner}>
        {/* Logo links */}
        <div className={styles.left}>
          <Link href="/" aria-label="TripTrek home" onClick={closeAll}>
            <Image
              src="/logo1.png"
              alt="TripTrek.nl"
              width={600}
              height={200}
              priority
              className={styles.logoImg}
            />
          </Link>
        </div>

        {/* Rechts: links + actions SAMEN (blijven bij elkaar) */}
        <div className={styles.group}>
          {/* Desktop links */}
          <div className={styles.right}>
            <div className={styles.dropdown}>
              <button type="button" className={`${styles.dropBtn} ${styles.navText}`} aria-haspopup="menu" aria-expanded="false">
                Huren
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <div role="menu" className={styles.menu}>
                <Link href="#" className={`${styles.menuItem} ${styles.navText}`} role="menuitem">Dakkoffer</Link>
                <Link href="#" className={`${styles.menuItem} ${styles.navText}`} role="menuitem">Skidrager</Link>
                <Link href="#" className={`${styles.menuItem} ${styles.navText}`} role="menuitem">Dakdragers</Link>
                <span className={`${styles.menuItemDisabled} ${styles.navText}`} role="menuitem" aria-disabled tabIndex={-1}>
                  Fietsdragers <span className={styles.soonBadge}>binnenkort</span>
                </span>
                <span className={`${styles.menuItemDisabled} ${styles.navText}`} role="menuitem" aria-disabled tabIndex={-1}>
                  Binnenkort meer <span className={styles.soonBadge}>binnenkort</span>
                </span>
              </div>
            </div>

            <Link href="#" className={`${styles.link} ${styles.linkUnderline} ${styles.navText}`}>Webshop</Link>
            <Link href="#" className={`${styles.link} ${styles.linkUnderline} ${styles.navText}`}>Contact</Link>
          </div>

          {/* Acties: account + hamburger (blijven naast de links) */}
          <div className={styles.actions}>
            <Link href="#" className={styles.account} aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 20c1.8-3.5 5-5 8-5s6.2 1.5 8 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </Link>

            <button
              className={`${styles.hamburger} ${drawerOpen ? styles.hamburgerOpen : ""}`}
              aria-label="Menu"
              aria-expanded={drawerOpen}
              aria-controls="drawer"
              onClick={() => setDrawerOpen(v => !v)}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop: klik buiten = sluit */}
      {drawerOpen && <div className={styles.backdrop} onClick={closeAll} aria-hidden="true" />}

      {/* Sidebar drawer — NU LINKS */}
      <aside id="drawer" className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`} aria-hidden={!drawerOpen}>
        <button className={styles.drawerClose} aria-label="Sluit menu" onClick={closeAll}>×</button>

        <button
          className={`${styles.mobileDrop} ${styles.navText}`}
          aria-expanded={mobileRentOpen}
          onClick={() => setMobileRentOpen(v => !v)}
        >
          <span>Huren</span>
          <svg className={`${styles.mobileChev} ${mobileRentOpen ? styles.mobileChevOpen : ""}`} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <div className={`${styles.mobileSub} ${mobileRentOpen ? styles.mobileSubOpen : ""}`}>
          <Link href="#" className={`${styles.mobileLink} ${styles.navText}`} onClick={closeAll}>Dakkoffer</Link>
          <Link href="#" className={`${styles.mobileLink} ${styles.navText}`} onClick={closeAll}>Skidrager</Link>
          <Link href="#" className={`${styles.mobileLink} ${styles.navText}`} onClick={closeAll}>Dakdragers</Link>
          <div className={`${styles.mobileLink} ${styles.mobileDisabled} ${styles.navText}`} aria-disabled="true">
            Fietsdragers <span className={styles.soonBadge}>binnenkort</span>
          </div>
          <div className={`${styles.mobileLink} ${styles.mobileDisabled} ${styles.navText}`} aria-disabled="true">
            Binnenkort meer <span className={styles.soonBadge}>binnenkort</span>
          </div>
        </div>

        <Link href="#" className={`${styles.mobileLink} ${styles.navText}`} onClick={closeAll}>Webshop</Link>
        <Link href="#" className={`${styles.mobileLink} ${styles.navText}`} onClick={closeAll}>Contact</Link>
      </aside>
    </nav>
  );
}
