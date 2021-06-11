import style from './Content.module.css';
import React, {useState, useEffect} from 'react';
import moment from 'moment'; // подключаем библиотеку для удобной работы с датой
import 'moment/locale/ru';
import {convertKelvinToCelsius} from '../../lib/convertKelvinToCelsius';
import {directWind} from '../../lib/windDirect';
import MapContainer from './Map/MapContainer';
import SliderWeather from './SliderWeather/SliderWeather';
import {getFullCountryName} from '../../lib/getFullContryName';

moment.locale('ru'); // выбираем нужный язык momentJS

const countryObj = require('../../сountryBase/countryBase.json'); //подключаем базу стран JSON

let Context = ({main, weather, name, sys, wind, list, coord}) => {
    return (
        <div className={style.contentContainer}>
            <MapContainer coord={coord} />

            <div className={style.mainContent}>
                <div className={style.text}>
                    {' '}
                    Страна: {getFullCountryName(countryObj, sys.country)} &emsp;
                    Город: {name}{' '}
                </div>
                <div
                    className={style.data}
                    style={
                        +moment().format('e') === 5 ||
                        +moment().format('e') === 6
                            ? {color: 'red'}
                            : {color: 'black'}
                    }
                >
                    {moment().format('MMMM Do YYYY, HH:mm')}
                </div>
                <div className={style.today}>сейчас</div>
                <div className={style.text}>
                    Ветер: {wind.speed} м/с, {directWind(wind.deg)}{' '}
                </div>
                <div className={style.text}>
                    Давление: {Math.floor(main.pressure * 0.75)} мм рт. ст.
                </div>
                <div className={style.text}>Влажность: {main.humidity} %</div>
                <div className={style.text}>Температура:</div>
                <div className={style.temperature}>
                    <span className={style.minTemp}>
                        {convertKelvinToCelsius(main.temp_min)}
                    </span>
                    <span className={style.maxTemp}>
                        {convertKelvinToCelsius(main.temp_max)}
                    </span>
                </div>
                <br />
                <div className={style.text}>
                    Чувствуется: {convertKelvinToCelsius(main.feels_like)}{' '}
                </div>
            </div>

            <div className={style.iconContent}>
                <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                    className={style.iconImg}
                    alt={'Нет картинки'}
                />
                <div className={style.textImg}>{weather[0].description}</div>
            </div>

            <SliderWeather coord={coord} list={list} />
        </div>
    );
};
export default Context;
