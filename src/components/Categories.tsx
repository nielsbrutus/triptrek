"use client";

import Link from "next/link";
import styles from "./Categories.module.css";

type Item = {
  key: string;
  title: string;
  href?: string;
  size: "lg" | "sm";
  disabled?: boolean;
  soon?: boolean;
};

const ITEMS: Item[] = [
  { key: "dakkoffer",  title: "Dakkoffers",  href: "#", size: "lg" },
  { key: "skidrager",  title: "Skidragers",  href: "#", size: "lg" },
  { key: "dakdragers", title: "Dakdragers",  href: "#", size: "lg" },
  { key: "fiets",      title: "Fietsdragers",             size: "sm", disabled: true, soon: true },
  { key: "meer",       title: "Binnenkort meer",          size: "sm", disabled: true, soon: true },
];

function CardInner({ title, soon }: { title: string; soon?: boolean }) {
  return (
    <>
      <div className={styles.image} aria-hidden="true">
        <div className={styles.imageHint}>Afbeelding</div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {soon && <span className={styles.soonBadge}>binnenkort</span>}
      </div>
    </>
  );
}

export default function Categories() {
  return (
    <section className={styles.section} aria-labelledby="cat-heading">
      <div className={styles.inner}>
        <h2 id="cat-heading" className={styles.heading}>Populaire categorieën</h2>

        <div className={styles.grid} role="list">
          {ITEMS.map((it) => {
            const cls = [
              styles.card,
              it.size === "lg" ? styles.lg : styles.sm,
              it.disabled ? styles.disabled : ""
            ].join(" ");

            if (it.disabled || !it.href) {
              return (
                <div key={it.key} className={cls} role="listitem" aria-disabled="true">
                  <CardInner title={it.title} soon={it.soon} />
                </div>
              );
            }

            return (
              <Link key={it.key} href={it.href} className={cls} role="listitem">
                <CardInner title={it.title} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
