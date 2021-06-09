import style from './Content.module.css';
import React, {useState, useEffect} from 'react';

import moment from 'moment'; // подключаем библиотеку для удобной работы с датой
import 'moment/locale/ru';
import {Map, YMaps} from 'react-yandex-maps';
// подключаем язык
moment.locale('ru'); // выбираем нужный язык

const countryObj = require('../../сountryBase/countryBase.json'); //подключаем базу стран в JSON

let Context = ({main, weather, name, sys, wind, list, coord}) => {
    const finishToday = 8 - moment(list[0].dt * 1000).format('HH') / 3;
    const finishMax = 40 - moment(list[0].dt * 1000).format('HH') / 3;
    const dayNow = new Date().getTime();

    const [start, setStart] = useState(0);
    const [dayWeather, setDayWeather] = useState(
        moment().format('MMMM Do YYYY')
    );
    const [finish, setFinish] = useState(finishToday);
    const [getTime, setGetTime] = useState(dayNow);
    // const [_coord, setCoord] = useState(coord);

    useEffect(() => {
        setFinish(finishToday);
        setStart(0);
        // console.log(moment(dayWeather).format('e'));
    }, [coord, finishToday]);

    useEffect(() => {
        setDayWeather(moment(getTime).format('MMMM Do, YYYY'));
    }, [getTime]);

    const day = () => {
        if (
            moment(dayNow).format('D') ===
            moment(list[start].dt * 1000).format('D')
        )
            return 'сегодня';
        if (
            1 + +moment(dayNow).format('D') ===
            +moment(list[start].dt * 1000).format('D')
        )
            return 'завтра';
        return ' ';
    };

    const nextPrevWeather = (btn) => {
        switch (btn) {
            case 'prev':
                setGetTime(getTime - 24 * 3600 * 1000);
                if (start - 8 < 0) {
                    setStart(0);
                    setFinish(finishToday);
                } else {
                    setStart(start - 8);
                    setFinish(finish - 8);
                }
                break;
            case 'next':
                setGetTime(getTime + 24 * 3600 * 1000);
                if (finish + 8 < finishMax) {
                    setStart(finish);
                    setFinish(finish + 8);
                } else {
                    setStart(finishMax - 8);
                    setFinish(finishMax);
                }
                break;
            default:
                console.log('Нет таких значений');
        }
    };
    // console.log('start:', start)
    // console.log('finish:', finish)
    const countryName = () => {
        console.log(countryObj.country[0]);
        let objCont = countryObj.country.find(
            (country) => country.alpha2 === sys.country
        );
        return objCont ? objCont.name : 'Неизвестно';
    };
    // console.log(list);
    const convertKtoC = (T) => {
        const temp = Math.ceil((T - 273.15) * 10) / 10;
        return temp < 0 ? (
            <span>{Math.ceil((T - 273.15) * 10) / 10}&deg;</span>
        ) : (
            <span>+{Math.ceil((T - 273.15) * 10) / 10}&deg;</span>
        );
    };
    const directWind = (deg) => {
        if (deg < 22.5 || deg > 337.5) {
            return 'С';
        } else if (deg > 22.5 && deg <= 67.5) {
            return 'СВ';
        } else if (deg > 67.5 && deg <= 112.5) {
            return 'В';
        } else if (deg > 112.5 && deg <= 157.5) {
            return 'ЮВ';
        } else if (deg > 157.5 && deg <= 202.5) {
            return 'Ю';
        } else if (deg > 202.5 && deg <= 247.5) {
            return 'ЮЗ';
        } else if (deg > 247.5 && deg <= 292.5) {
            return 'З';
        } else if (deg > 292.5 && deg <= 337.5) {
            return 'СЗ';
        } else return 'штиль';
    };

    return (
        <div className={style.contentContainer}>
            <div className={style.mapContent}>
                <YMaps>
                    <div className={style.map}>
                        <Map
                            className={style.map}
                            state={{center: [coord.lat, coord.lon], zoom: 11}}
                            defaultState={{center: [55.75, 37.57], zoom: 9}}
                        />
                    </div>
                </YMaps>
            </div>

            <div className={style.mainContent}>
                <div className={style.text}>
                    {' '}
                    Страна: {countryName()} &emsp; Город: {name}{' '}
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
                        {convertKtoC(main.temp_min)}
                    </span>
                    <span className={style.maxTemp}>
                        {convertKtoC(main.temp_max)}
                    </span>
                </div>
                <br />
                <div className={style.text}>
                    Чувствуется: {convertKtoC(main.feels_like)}{' '}
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

            <div className={style.longWeatherContent}>
                <div
                    className={style.dayWeather}
                    style={
                        +moment(list[start].dt * 1000).format('e') === 6 ||
                        +moment(list[start].dt * 1000).format('e') === 0
                            ? {color: 'red'}
                            : {color: 'black'}
                    }
                >
                    {dayWeather}
                </div>
                <div className={style.today}>{day()}</div>
                <div className={style.longWeather}>
                    {start !== 0 && (
                        <button onClick={() => nextPrevWeather('prev')}>
                            &#10094;
                        </button>
                    )}
                    {list.slice(start, finish).map((pieceTime, index) => {
                        const match = moment(pieceTime.dt * 1000).format(
                            'ddd, D MMM'
                        );
                        const time = moment(pieceTime.dt * 1000).format(
                            'HH:mm'
                        );
                        return (
                            <div key={index} className={style.futureWeather}>
                                <div>{match}</div>
                                <div>{time}</div>
                                <div>
                                    t: {convertKtoC(pieceTime.main.temp)}{' '}
                                </div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${pieceTime.weather[0].icon}@2x.png`}
                                    className={style.miniIconImg}
                                    alt={pieceTime.weather[0].description}
                                />
                            </div>
                        );
                    })}
                    {finish !== finishMax && (
                        <button onClick={() => nextPrevWeather('next')}>
                            &#10095;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Context;

// const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
// const dayWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ',];
// const dayNow = new Date().getDay();

// const weatherPic = {
//     'clear sky': {backgroundPosition: '90% 16.6%'},
//     'few clouds': {backgroundPosition: '2% 66.6%'},
//     'scattered clouds': {backgroundPosition: '-2% -2.2%'},
//     'broken clouds': {backgroundPosition: '90% -5.4%'},
//     'overcast clouds': {backgroundPosition: '90% -5.4%'},
//     'light rain': {backgroundPosition: '0 16.6%'},
//     'heavy intensity rain': {backgroundPosition: '90% 39%'},
//     'rain': {backgroundPosition: '0% 41%'},
//     'thunderstorm': {backgroundPosition: '93% 67%'},
//     'shower rain': {backgroundPosition: '93% 95.0%'},
//     'snow': {backgroundPosition: '2% 96.0%'},
// }
