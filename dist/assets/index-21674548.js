(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const a=(()=>({update:async n=>{let c=JSON;try{const t=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=93e4c072ced84c15b5761151231909&q=${n}&days=3&aqi=no&alerts=no`);if(!t.ok)throw new Error(`HTTP Error! Status error : ${t.status}`);return c=await t.json(),localStorage.setItem("data",JSON.stringify(c)),c}catch(t){if(t instanceof ReferenceError)throw console.error(`Custom error occurred: ${t.message}`),t}},load:()=>{let n=localStorage.getItem("data");return n=JSON.parse(n),n}}))();function l(r,i){return Math.round((i-r)/6e4)}const u="/weather-app/assets/bg-3-f46b02c6.jpg";document.body.style.backgroundImage=`url(${u})`;const d=(()=>{const r=async()=>{let e;localStorage.getItem("data")?(e=a.load(),l(e.location.localtime_epoch,Date.now())>=5&&i()):e=await a.update("London"),n(e)},i=async()=>{const e=a.load().location.name,o=await a.update(e);n(o)},n=e=>{const o=t(e),s=`
        <div id="current">
            <div class="current__location-data">
                <div class="current__location">
                    <input class="input-location" type="text" value="${o.city}, ${o.country}">
                </div>
                <div class="current__local-time">${o.localTime}</div>
            </div>
            <div class="current__main-condition">
                <img class="current__condition-img" src=${o.conditionImg}></img>
                <div class="current__condition">${o.condition}</div>
                <div class="current__temp">${o.temp} ℃</div>
            </div>
            <div class="current__secondary-condition">
                <div class="secondary__container">
                <div class="secondary-condition__title">Feels like</div>
                <div class="current__feel-c seconddary-condition__data">${o.feelsLike} ℃</div>
                </div>
                <div class="secondary__container">
                <div class="secondary-condition__title">Wind</div>
                <div class="current__wind seconddary-condition__data">${o.wind} kph</div>
                </div>
                <div class="secondary__container">
                <div class="secondary-condition__title">UV Index</div>
                <div class="current__uv seconddary-condition__data">${o.uv}</div>
                </div>
            </div>
        </div>
        `;document.querySelector("#app").innerHTML=s,c()},c=()=>{var e;(e=document.querySelector(".input-location"))==null||e.addEventListener("change",async o=>{const s=await a.update(o.target.value);n(s)})},t=e=>({conditionImg:e.current.condition.icon,condition:e.current.condition.text,city:e.location.name,country:e.location.country,temp:e.current.feelslike_c,localTime:e.location.localtime,feelsLike:e.current.temp_c,wind:e.current.wind_kph,uv:e.current.uv});return{load:r,update:i}})();d.load();window.setTimeout(()=>{d.update(),window.location.reload()},30*6e4);
