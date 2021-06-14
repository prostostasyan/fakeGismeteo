import style from './Content.module.css';
import moment from 'moment'; // подключаем библиотеку для удобной работы с датой
import 'moment/locale/ru';

import MapContainer from './Map/MapContainer';
import SliderWeather from './SliderWeather/SliderWeather';

import CurrentWeatherInfo from './CurrentWeatherInfo/CurrentWeatherInfo';
import React from 'react';
import WeatherNowImg from './WeatherNowImg/WeatherNowImg';

moment.locale('ru'); // выбираем нужный язык momentJS

let Context = ({main, weather, name, sys, wind, list, coord}) => {
    return (
        <div className={style.contentContainer}>
            <div className={style.main}>
                <MapContainer coord={coord} />
                <CurrentWeatherInfo
                    main={main}
                    name={name}
                    sys={sys}
                    wind={wind}
                />
                <WeatherNowImg weather={weather[0]} />
            </div>
            <SliderWeather coord={coord} list={list} />
        </div>
    );
};
export default Context;
