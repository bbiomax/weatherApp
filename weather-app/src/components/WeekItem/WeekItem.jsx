import styles from "./WeekItem.module.css";

export function WeekItem({ item }) {
  return (
    <div className={styles.weekItem}>
      <span className={styles.weekDayName}>{item.date}</span>
      <img
        src={`/img/${item.weather[0].main}.png`}
        alt="sun"
        className={styles.weekImg}
      />
      <span className={styles.weekDegree}>{item.avgTemp}°</span>
    </div>
  );
}
