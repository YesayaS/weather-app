const weather = (() => {
  const update = async (location: any) => {
    console.log(location);

    let data: any = JSON;
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=93e4c072ced84c15b5761151231909&q=${location}&days=3&aqi=no&alerts=no`
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
  return { update };
})();

export { weather };
