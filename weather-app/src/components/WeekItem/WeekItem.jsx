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
      <div className={styles.weekInfoBox}>
        <div className={styles.weekInfo}>
          <img src="/img/wind.png" alt="wind-img" className={styles.weekInfoImg} />
          <span className={styles.weekWind}>{item.avgWind} м/с</span>
        </div>
        <div className={styles.weekInfo}>
          <img
            src="/img/humidity.png"
            alt="humidity-img"
            className={styles.weekInfoImg}
          />
          <span className={styles.weekHumidity}>
            {Math.round(item.avgHumidity)}°%
          </span>
        </div>
      </div>
    </div>
  );
}
