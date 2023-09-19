const weather = (() => {
  const update = async (location: any) => {
    let data: any = JSON;
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=93e4c072ced84c15b5761151231909&q=${location}&days=3&aqi=no&alerts=no`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! Status error : ${response.status}`);
      }
      data = await response.json();
      localStorage.setItem("data", JSON.stringify(data));
      return data;
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.error(`Custom error occurred: ${e.message}`);
        throw e;
      }
    }
  };
  const load = () => {
    let data: any = localStorage.getItem("data");
    data = JSON.parse(data);
    return data;
  };

  return { update, load };
})();

function epochToMinute(epoch1: number, epoch2: number) {
  return Math.round((epoch2 - epoch1) / 60000);
}

export { weather, epochToMinute };
