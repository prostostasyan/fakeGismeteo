import style from './SliderWeather.module.css';
import moment from 'moment';
import {convertKelvinToCelsius} from '../../../lib/convertKelvinToCelsius';
import React, {useEffect, useState} from 'react';

let SliderWeather = ({coord, list}) => {
    const finishToday = 8 - moment(list[0].dt * 1000).format('HH') / 3;
    const finishMax = 40 - moment(list[0].dt * 1000).format('HH') / 3;
    const dayNow = new Date().getTime();

    const [start, setStart] = useState(0);
    const [currentDateWeather, setCurrentDateWeather] = useState(
        moment().format('MMMM Do YYYY')
    );
    const [finish, setFinish] = useState(finishToday);
    const [getTime, setGetTime] = useState(dayNow);

    const handleNextWeather = () => {
        setGetTime(getTime + 24 * 3600 * 1000);
        if (finish + 8 < finishMax) {
            setStart(finish);
            setFinish(finish + 8);
        } else {
            setStart(finishMax - 8);
            setFinish(finishMax);
        }
    };

    const handlePrevWeather = () => {
        setGetTime(getTime - 24 * 3600 * 1000);
        if (start - 8 < 0) {
            setStart(0);
            setFinish(finishToday);
        } else {
            setStart(start - 8);
            setFinish(finish - 8);
        }
    };

    useEffect(() => {
        setFinish(finishToday);
        setStart(0);
        // console.log(moment(dayWeather).format('e'));
    }, [coord, finishToday]);

    useEffect(() => {
        setCurrentDateWeather(moment(getTime).format('MMMM Do, YYYY'));
    }, [getTime]);

    const setTodayOrTomorrow = () => {
        if (
            moment(dayNow).format('D') ===
            moment(list[start].dt * 1000).format('D')
        )
            return 'сегодня';
        else if (
            1 + +moment(dayNow).format('D') ===
            +moment(list[start].dt * 1000).format('D')
        )
            return 'завтра';
        else return '&#8291;';
    };

    return (
        <div className={style.sliderWeatherContent}>
            <div
                className={style.currentDateWeather}
                style={
                    +moment(list[start].dt * 1000).format('e') === 6 ||
                    +moment(list[start].dt * 1000).format('e') === 0
                        ? {color: 'red'}
                        : {color: 'black'}
                }
            >
                {currentDateWeather}
            </div>
            <div className={style.today}>{setTodayOrTomorrow()}</div>
            <div className={style.longWeather}>
                {start !== 0 && (
                    <button onClick={handlePrevWeather}>&#10094;</button>
                )}
                {list.slice(start, finish).map((pieceTime, index) => {
                    const match = moment(pieceTime.dt * 1000).format(
                        'ddd, D MMM'
                    );
                    const time = moment(pieceTime.dt * 1000).format('HH:mm');
                    return (
                        <div key={index} className={style.futureWeather}>
                            <div>{match}</div>
                            <div>{time}</div>
                            <div>
                                t: {convertKelvinToCelsius(pieceTime.main.temp)}{' '}
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
                    <button onClick={handleNextWeather}>&#10095;</button>
                )}
            </div>
        </div>
    );
};

export default SliderWeather;
