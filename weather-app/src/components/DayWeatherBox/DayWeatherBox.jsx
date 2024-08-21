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
          <div className={styles.windAndHumidityItem}>
            <img
              src="/img/wind.png"
              alt="wind-img"
              className={styles.weekInfoImg}
            />
            <span>
              {currentWeather.wind.speed.toFixed(1)} м/с
            </span>
          </div>
          <div className={styles.windAndHumidityItem}>
            <img
              src="/img/humidity.png"
              alt="humidity-img"
              className={styles.weekInfoImg}
            />
            <span>{Math.round(currentWeather.main.humidity)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
