"use client";

import { useState } from "react";
import type { EventStatus, EventWithStatus } from "@/app/lib/events";
import Img from "@/app/components/Img";
import styles from "./EventList.module.css";

const FILTERS = ["전체", "진행중", "종료"] as const;
type Filter = (typeof FILTERS)[number];

function formatPeriod(period: { start: string; end: string }): string {
  return `${period.start.replaceAll("-", ".")} - ${period.end.replaceAll("-", ".")}`;
}

export default function EventList({ events }: { events: EventWithStatus[] }) {
  const [filter, setFilter] = useState<Filter>("전체");

  const filtered =
    filter === "전체" ? events : events.filter((e) => e.status === (filter as EventStatus));

  return (
    <>
      <div className={styles.filterRow}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={filter === f ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>해당하는 이벤트가 없습니다.</p>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((event) => (
            <li key={event.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Img src={event.image} alt="" className={styles.image} />
                {event.status === "종료" && <span className={styles.endedBadge}>종료</span>}
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{event.title}</h2>
                <p className={styles.cardDesc}>{event.description}</p>
                <p className={styles.period}>{formatPeriod(event.period)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
