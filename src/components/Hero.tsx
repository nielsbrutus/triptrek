"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Cat = "dakkoffer" | "skidrager" | "dakdragers";
type AnyCat = Cat | "fietsdragers" | "meer";

const CAT_OPTS: {
  value: AnyCat;
  label: string;
  disabled?: boolean;
  soon?: boolean;
}[] = [
  { value: "dakkoffer", label: "Dakkoffers" },
  { value: "skidrager", label: "Skidragers" },
  { value: "dakdragers", label: "Dakdragers" },
    { value: "fietsdragers", label: "Fietsdragers", disabled: true, soon: true },
  { value: "meer", label: "Binnenkort meer", disabled: true, soon: true },
];

const SIZES: Record<Cat, string[] | null> = {
  dakkoffer: ["M", "L", "XL"],
  skidrager: ["S", "M", "L"],
  dakdragers: null, // geen maat
};

export default function Hero() {
  // product dropdown
  const [catOpen, setCatOpen] = useState(false);
  const [category, setCategory] = useState<Cat>("dakkoffer");
  const catRef = useRef<HTMLDivElement | null>(null);

  // maat dropdown (afhankelijk van category)
  const [sizeOpen, setSizeOpen] = useState(false);
  const [size, setSize] = useState<string | null>("M");
  const sizeRef = useRef<HTMLDivElement | null>(null);

  // overige opties
  const [clean, setClean] = useState<"none" | "later">("none");
  const [bars, setBars] = useState<"no" | "yes">("no");

  // klik buiten → alle popups dicht
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (catRef.current && !catRef.current.contains(t)) setCatOpen(false);
      if (sizeRef.current && !sizeRef.current.contains(t)) setSizeOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // reset size wanneer category verandert
  useEffect(() => {
    const list = SIZES[category];
    setSize(list ? list[0] : null);
    setSizeOpen(false);
  }, [category]);

  function onReserve() {
    alert(
      `Gekozen:\nProduct: ${category}\nMaat: ${
        size ?? "n.v.t."
      }\nSchoonmaak: ${clean}\nDakdragers toevoegen: ${bars}`
    );
  }

  const sizeList = SIZES[category];

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Voor elke trip, <span className={styles.accent}>de juiste trek!</span>
        </h1>
        <p className={styles.subtitle}>
          Huur dakkoffers, dakdragers of skidragers — snel geregeld, scherp
          geprijsd en veilig gemonteerd.
        </p>

        <div className={styles.box} aria-label="Snel huren">
          <h2 className={styles.boxTitle}>Huur nu</h2>

          {/* Kies product (zelfde als navbar dropdown) */}
          <label className={styles.label} htmlFor="catBtn">
            Kies product
          </label>
          <div className={styles.selectWrap} ref={catRef}>
            <button
              id="catBtn"
              type="button"
              className={styles.selectBtn}
              aria-haspopup="listbox"
              aria-expanded={catOpen}
              onClick={() => setCatOpen((o) => !o)}
            >
              <span>
                {CAT_OPTS.find((o) => o.value === category)?.label ??
                  "Kies product"}
              </span>
              <svg
                className={styles.selectChevron}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {catOpen && (
              <ul
                className={styles.selectMenu}
                role="listbox"
                aria-label="Productcategorie"
              >
                <li className={styles.hoverBridge} aria-hidden="true"></li>
                {CAT_OPTS.map((o) => {
                  if (o.disabled) {
                    return (
                      <li
                        key={o.value}
                        className={`${styles.selectItem} ${styles.selectItemDisabled}`}
                        role="option"
                        aria-disabled
                      >
                        <span>{o.label}</span>
                        {o.soon && (
                          <span className={styles.soonBadge}>binnenkort</span>
                        )}
                      </li>
                    );
                  }
                  return (
                    <li
                      key={o.value}
                      className={styles.selectItem}
                      role="option"
                      onClick={() => {
                        setCategory(o.value as Cat);
                        setCatOpen(false);
                      }}
                    >
                      <span>{o.label}</span>
                      {o.soon && (
                        <span className={styles.soonBadge}>binnenkort</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <p className={styles.help}>Wat wilt u huren?</p>

          {/* Maat — segmented radio pills i.p.v. dropdown */}
          {sizeList && (
            <fieldset className={styles.group}>
              <legend className={styles.legend}>Maat</legend>
              <div className={styles.segment}>
                {sizeList.map((v) => (
                  <label key={v} className={styles.option}>
                    <input
                      type="radio"
                      name="size"
                      value={v}
                      checked={size === v}
                      onChange={() => setSize(v)}
                    />
                    <span className={styles.dot} aria-hidden />
                    <span className={styles.optText}>{v}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Schoonmaakservice */}
          <label className={styles.label}>Schoonmaakservice</label>
          <div className={styles.segmentWide}>
            <label className={styles.optionWide}>
              <input
                type="radio"
                name="clean"
                value="none"
                checked={clean === "none"}
                onChange={() => setClean("none")}
              />
              <span className={styles.dot} aria-hidden />
              <span className={styles.optText}>Geen schoonmaak</span>
            </label>
            <label className={styles.optionWide}>
              <input
                type="radio"
                name="clean"
                value="later"
                checked={clean === "later"}
                onChange={() => setClean("later")}
              />
              <span className={styles.dot} aria-hidden />
              <span className={styles.optText}>
                Ja, schoonmaken bij inleveren
              </span>
            </label>
          </div>

          {/* Dakdragers toevoegen — alleen tonen als het product géén 'dakdragers' is */}
          {category !== "dakdragers" && (
            <>
              <label className={styles.label}>Dakdragers toevoegen</label>
              <div className={styles.segmentWide}>
                <label className={styles.optionWide}>
                  <input
                    type="radio"
                    name="bars"
                    value="no"
                    checked={bars === "no"}
                    onChange={() => setBars("no")}
                  />
                  <span className={styles.dot} aria-hidden />
                  <span className={styles.optText}>Nee</span>
                </label>
                <label className={styles.optionWide}>
                  <input
                    type="radio"
                    name="bars"
                    value="yes"
                    checked={bars === "yes"}
                    onChange={() => setBars("yes")}
                  />
                  <span className={styles.dot} aria-hidden />
                  <span className={styles.optText}>
                    Ja, dakdragers meenemen
                  </span>
                </label>
              </div>
            </>
          )}

          <button type="button" className={styles.button} onClick={onReserve}>
            Reserveren
          </button>
        </div>
      </div>
    </section>
  );
}
