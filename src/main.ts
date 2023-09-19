import { weather } from "./weather-api";

// localStorage.clear();
let data: any = undefined;
if (localStorage.getItem("data")) {
  data = localStorage.getItem("data");
  data = JSON.parse(data)
  console.log("read from local Storage");
} else {
  data = await weather.update();
  localStorage.setItem("data", JSON.stringify(data));
  console.log("create new data");
}

console.log(data);

const condition = data.current.condition.text;
const conditionIcon = data.current.condition.icon;
const city = data.location.name;
const country = data.location.country;
const temp = data.current.feelslike_c;

const localTime = data.location.localtime;
const feelsLike = data.current.temp_c;
const wind = data.current.wind_kph;
const uv = data.current.uv;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div><img rel="image/png" src=${conditionIcon}> ${condition}</div>
  <div>${city}, ${country}</div>
  <div>${temp} ℃</div>
  <div>local time : ${localTime}</div>
  <div>feels like : ${feelsLike} ℃</div>
  <div>wind : ${wind} kph</div>
  <div>UV : ${uv}</div>
`;
