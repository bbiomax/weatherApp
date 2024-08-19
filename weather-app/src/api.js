const tkn = "49bd81db6f5b10dc4126cac69ef6e16c";

export const fetchCurrentWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${tkn}&units=metric`
  );
  if (!response.ok) {
    console.log(response.status);
    throw {
      message: "Ошибка при получении данных о погоде",
      status: response.status,
    };
  }
  return response.json();
};

export const fetchForecastWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${tkn}&units=metric`
  );
  if (!response.ok) {
    throw {
      message: "Ошибка при получении данных о погоде",
      status: response.status,
    };
  }
  return response.json();
};
