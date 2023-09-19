import { weather } from "./weather-api";

import "./style.css";

document.body;

const ui = (() => {
  const update = async () => {
    let data: any = undefined;
    if (localStorage.getItem("data")) {
      data = localStorage.getItem("data");
      data = JSON.parse(data);
      console.log("load from local Storage");
    } else {
      data = await weather.update("London");
      localStorage.setItem("data", JSON.stringify(data));
      console.log("create new data");
    }

    render(data);
  };
  const render = (data: any) => {
    const fData = dataFilter(data);
    const renderAppText = `
        <div><input class="location" type="text" value="${fData.city}, ${fData.country}"></div>
        <div>${fData.localTime}</div>

        <div class="main-condition">
        <div>${fData.condition}</div>
        <div>${fData.temp} ℃</div>
        </div>

        <div class="secondary-condition>
        <div>feels like : ${fData.feelsLike} ℃</div>
        <div>wind : ${fData.wind} kph</div>
        <div>UV Index: ${fData.uv}</div>
        </div>
        
        `;
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = renderAppText;
    locationInput();
  };

  const locationInput = () => {
    document
      .querySelector(".location")
      ?.addEventListener("change", async (e: any) => {
        console.log("location Change");
        const newData = await weather.update(e.target.value);
        localStorage.setItem("data", JSON.stringify(newData));
        render(newData);
      });
  };

  const dataFilter = (data: any) => {
    const filterData = {
      condition: data.current.condition.text,
      city: data.location.name,
      country: data.location.country,
      temp: data.current.feelslike_c,
      localTime: data.location.localtime,
      feelsLike: data.current.temp_c,
      wind: data.current.wind_kph,
      uv: data.current.uv,
    };
    return filterData;
  };
  return { update };
})();

export { ui };
