import { weather } from "./weather-api";

import "./style.css";

document.body;

const ui = (() => {
  const update = async () => {
    let data: any = undefined;
    if (localStorage.getItem("data")) {
      data = weather.load();
    } else {
      data = await weather.update("London");
    }

    render(data);
  };
  const render = (data: any) => {
    const fData = dataFilter(data);
    const renderAppText = `
        <div id="current">
            <div class="current__location-data">
                <div class="current__location">
                    <input class="input-location" type="text" value="${fData.city}, ${fData.country}">
                </div>
                <div class="current__local-time">${fData.localTime}</div>
            </div>
            <div class="current__main-condition">
                <img class="current__condition-img" src=${fData.conditionImg}></img>
                <div class="current__condition">${fData.condition}</div>
                <div class="current__temp">${fData.temp} ℃</div>
            </div>
            <div class="current__secondary-condition">
                <div class="secondary__container">
                <div class="secondary-condition__title">Feels like</div>
                <div class="current__feel-c seconddary-condition__data">${fData.feelsLike} ℃</div>
                </div>
                <div class="secondary__container">
                <div class="secondary-condition__title">Wind</div>
                <div class="current__wind seconddary-condition__data">${fData.wind} kph</div>
                </div>
                <div class="secondary__container">
                <div class="secondary-condition__title">UV Index</div>
                <div class="current__uv seconddary-condition__data">${fData.uv}</div>
                </div>
            </div>
        </div>
        
        `;
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = renderAppText;
    locationInput();
  };

  const locationInput = () => {
    document
      .querySelector(".input-location")
      ?.addEventListener("change", async (e: any) => {
        const newData = await weather.update(e.target.value);
        render(newData);
      });
  };

  const dataFilter = (data: any) => {
    const filterData = {
      conditionImg: data.current.condition.icon,
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
