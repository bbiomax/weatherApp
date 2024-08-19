import { useState } from "react";
import styles from "./Main.module.css";
import { rawCurrentWeather, rawWeatherData } from "../../data";
import { Search } from "../Search/Search";
import { WeekItem } from "../WeekItem/WeekItem";
import { DayWeatherBox } from "../DayWeatherBox/DayWeatherBox";
import { HourForecastItem } from "../HourForecastItem/HourForecastItem";
import { fetchCurrentWeather, fetchForecastWeather } from "../../api";
import { ErrorModal } from "../ErrorModal/ErrorModal";

export function Main() {
  const [weatherData, setWeatherData] = useState(rawWeatherData);
  const [currentWeather, setCurrentWeather] = useState(rawCurrentWeather);
  const [city, setCity] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  //   console.log(weatherData);

  const getCurrentWeather = async (city) => {
    try {
      const data = await fetchCurrentWeather(city);
      setCurrentWeather(data);
    } catch (error) {
      console.log(error.message);
      setErrorModal(true);
    }
  };

  const getWeather = async (city) => {
    try {
      const data = await fetchForecastWeather(city);
      setWeatherData(data);
    } catch (error) {
      console.log(error.message);
      setErrorModal(true);
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

  const dailyWeather = getDailyWeather().slice(1);
  console.log(dailyWeather);
  const hourlyForecast = getHourlyForecast();

  // console.log(dailyWeather);

  return (
    <div className={styles.content}>
      <Search
        getWeather={getWeather}
        getCurrentWeather={getCurrentWeather}
        city={city}
        setCity={setCity}
      />

      <section className={styles.weatherContainer}>
        <span className={styles.cityName}>{weatherData?.city.name}</span>

        <DayWeatherBox currentWeather={currentWeather} />

        <div className={styles.hourForecastBox}>
          {hourlyForecast.map((item, index) => (
            <HourForecastItem key={index} item={item} />
          ))}
        </div>
      </section>

      <div className={styles.weekItems}>
        {dailyWeather.map((item) => (
          <WeekItem key={item.date} item={item} />
        ))}
      </div>

      {errorModal && <ErrorModal setErrorModal={setErrorModal} />}
    </div>
  );
}
