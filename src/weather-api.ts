const Weather = () => {
  let data:any = JSON;

  const update = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=93e4c072ced84c15b5761151231909&q=London&days=3&aqi=no&alerts=no`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! Status error : ${response.status}`);
      }
      data = await response.json();
      return data;
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.error(`Custom error occurred: ${e.message}`);
        throw e;
      }
    }
  };

  const get = () => {
    if (data === JSON){
        throw new Error('Empty data!')
    }
    return data;
  };
  return { update, get };
};

const weather = Weather();

export { weather };
