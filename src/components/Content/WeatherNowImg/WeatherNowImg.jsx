import React from 'react';
import style from './WeatherNowImg.module.css';

const WeatherNowImg = ({weather}) => {
    return (
        <div className={style.iconContent}>
            <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                className={style.iconImg}
                alt={'Нет картинки'}
            />
            <div className={style.textImg}>{weather.description}</div>
        </div>
    );
};

export default WeatherNowImg;
