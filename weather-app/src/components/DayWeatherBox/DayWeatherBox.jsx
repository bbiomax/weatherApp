import styles from "./DayWeatherBox.module.css";

export function DayWeatherBox({ dailyWeather }) {
  return (
    <div className={styles.dayWeatherBox}>
      <img
        src={`/img/${dailyWeather[0]?.weather[0].main}.gif`}
        alt="sun-gif"
        className={styles.weatherGif}
      />

      <div className={styles.dayWeatherInfo}>
        <div className={styles.dayOfWeekAndDegreeBox}>
          <span className={styles.dayWeatherDayOfWeek}>Сегодня</span>
          <span className={styles.dayWeatherDegree}>
            {dailyWeather[0]?.avgTemp}°
          </span>
        </div>

        <div className={styles.windAndHumidity}>
          <span>Скорость ветра: {dailyWeather[0]?.avgWind} м/с</span>
          <span>Влажность: {Math.round(dailyWeather[0]?.avgHumidity)}%</span>
        </div>
      </div>
    </div>
  );
}
