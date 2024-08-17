import { useState } from "react";
import styles from "./Main.module.css";
import { rawWeatherData } from "../../data";
import { Search } from "../Search/Search";
import { WeekItem } from "../WeekItem/WeekItem";
import { DayWeatherBox } from "../DayWeatherBox/DayWeatherBox";
import { HourForecastItem } from "../HourForecastItem/HourForecastItem";

export function Main() {
  const [weatherData, setWeatherData] = useState(rawWeatherData);
  const [city, setCity] = useState("");
  //   console.log(weatherData);

  const getWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=49bd81db6f5b10dc4126cac69ef6e16c&units=metric`
      );

      if (!response.ok) {
        throw new Error("Ошибка получения данных о погоде");
      }

      const data = await response.json();
      //   console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDailyWeather = () => {
    if (!weatherData) return [];

    const dailyData = [];

    weatherData.list.forEach((item) => {
      const dateObj = new Date(item.dt * 1000);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");

      const date = `${day}.${month}`;

      if (!dailyData[date]) {
        dailyData[date] = {
          tempSum: 0,
          windSum: 0,
          humiditySum: 0,
          count: 0,
          weather: item.weather,
        };
      }

      dailyData[date].tempSum += item.main.temp;
      dailyData[date].windSum += item.wind.speed;
      dailyData[date].humiditySum += item.main.humidity;
      dailyData[date].count++;
    });

    return Object.keys(dailyData).map((date) => ({
      date,
      avgTemp: Math.round(
        (dailyData[date].tempSum / dailyData[date].count).toFixed(1)
      ),
      avgWind: (dailyData[date].windSum / dailyData[date].count).toFixed(1),
      avgHumidity: (
        dailyData[date].humiditySum / dailyData[date].count
      ).toFixed(1),
      weather: dailyData[date].weather,
    }));
  };

  const getHourlyForecast = () => {
    if (!weatherData) return [];

    return weatherData.list.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: item.main.temp,
      isNight:
        new Date(item.dt * 1000).getHours() >= 21 ||
        new Date(item.dt * 1000).getHours() <= 3,
    }));
  };

  const dailyWeather = getDailyWeather();
  const hourlyForecast = getHourlyForecast();

  // console.log(dailyWeather);

  return (
    <div className={styles.content}>
      <Search getWeather={getWeather} city={city} setCity={setCity} />

      <section className={styles.weatherContainer}>
        <span className={styles.cityName}>{weatherData?.city.name}</span>

        <div className={styles.weekItems}>
          {dailyWeather.map((item) => (
            <WeekItem key={item.date} item={item} />
          ))}
        </div>

        <DayWeatherBox dailyWeather={dailyWeather} />

        <div className={styles.hourForecastBox}>
          {hourlyForecast.map((item, index) => (
            <HourForecastItem key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
