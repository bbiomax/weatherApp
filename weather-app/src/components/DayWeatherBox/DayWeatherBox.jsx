import styles from "./DayWeatherBox.module.css";

export function DayWeatherBox({ currentWeather }) {
  return (
    <div className={styles.dayWeatherBox}>
      <img
        src={`/img/${currentWeather.weather[0].main}.gif`}
        alt="weather-gif"
        className={styles.weatherGif}
      />

      <div className={styles.dayWeatherInfo}>
        <div className={styles.dayOfWeekAndDegreeBox}>
          <span className={styles.dayWeatherDayOfWeek}>Сейчас</span>
          <span className={styles.dayWeatherDegree}>
            {Math.round(currentWeather.main.temp)}°
          </span>
        </div>

        <div className={styles.windAndHumidity}>
          <span>Скорость ветра: {(currentWeather.wind.speed).toFixed(1)} м/с</span>
          <span>Влажность: {Math.round(currentWeather.main.humidity)}%</span>
        </div>
      </div>
    </div>
  );
}
