import React from 'react';
import style from './CurrentWeatherInfo.module.css';
import {getFullCountryName} from '../../../lib/getFullContryName';
import moment from 'moment';
import {directWind} from '../../../lib/windDirect';
import {convertKelvinToCelsius} from '../../../lib/convertKelvinToCelsius';

moment.locale('ru'); // выбираем нужный язык momentJS
const countryObj = require('../../../сountryBase/countryBase.json'); //подключаем базу стран JSON

const CurrentWeatherInfo = ({main, name, sys, wind}) => {
    const dayOfWeekNow = Number(moment(moment().format('e')));
    return (
        <div className={style.mainContent}>
            <div className={style.text}>
                {' '}
                Страна: {getFullCountryName(countryObj, sys.country)} &emsp;
                Город: {name}{' '}
            </div>
            <div
                className={style.data}
                style={
                    dayOfWeekNow === 5 || dayOfWeekNow === 6
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
    );
};

export default CurrentWeatherInfo;
