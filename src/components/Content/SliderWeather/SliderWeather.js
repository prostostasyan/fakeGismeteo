import style from './SliderWeather.module.css';
import moment from 'moment';
import {convertKelvinToCelsius} from '../../../lib/convertKelvinToCelsius';
import React, {useEffect, useState} from 'react';

let SliderWeather = ({coord, list}) => {
    const second = 1000;
    const hour = 3600000;
    const ElemSliderPerDay = 8;
    const [amountElemSlider, setAmountElemSlider] = useState(ElemSliderPerDay);
    useEffect(() => {
        if (screen.width < 800) setAmountElemSlider(6);
        if (screen.width < 600) setAmountElemSlider(3);
    }, [screen.width]);

    const listLength = 40;
    const finishCurrentSliderWeatherBlock =
        amountElemSlider - moment(list[0].dt * 1 * second).format('HH') / 3;
    const finishListSliderWeather =
        listLength - moment(list[0].dt * 1 * second).format('HH') / 3;
    const dayNow = new Date().getTime();

    const [startBlockSlider, setStartBlockSlider] = useState(0);
    const dayOfWeekCurrent = Number(
        moment(list[startBlockSlider].dt * 1 * second).format('e')
    );
    const [currentDateWeather, setCurrentDateWeather] = useState(
        moment().format('MMMM Do YYYY')
    );
    const [finishBlockSlider, setFinishBlockSlider] = useState(
        finishCurrentSliderWeatherBlock
    );
    const [getTime, setGetTime] = useState(dayNow);

    useEffect(() => {
        setFinishBlockSlider(finishCurrentSliderWeatherBlock);
        setStartBlockSlider(0);
        setGetTime(dayNow);
    }, [coord, finishCurrentSliderWeatherBlock]);

    useEffect(() => {
        setCurrentDateWeather(moment(getTime).format('MMMM Do, YYYY'));
    }, [getTime]);

    const handleNextBlockSliderWeather = () => {
        setGetTime(getTime + 24 * hour * (amountElemSlider / ElemSliderPerDay));
        if (finishBlockSlider + amountElemSlider < finishListSliderWeather) {
            setStartBlockSlider(finishBlockSlider);
            setFinishBlockSlider(finishBlockSlider + amountElemSlider);
        } else {
            setStartBlockSlider(finishListSliderWeather - amountElemSlider);
            setFinishBlockSlider(finishListSliderWeather);
        }
    };

    const handlePrevBlockSliderWeather = () => {
        setGetTime(getTime - 24 * hour * (amountElemSlider / ElemSliderPerDay));
        if (startBlockSlider - amountElemSlider < 0) {
            setStartBlockSlider(0);
            setFinishBlockSlider(finishCurrentSliderWeatherBlock);
        } else {
            setStartBlockSlider(startBlockSlider - amountElemSlider);
            setFinishBlockSlider(finishBlockSlider - amountElemSlider);
        }
    };

    const setTodayOrTomorrow = () => {
        if (
            moment(dayNow).format('D') ===
            moment(list[startBlockSlider].dt * second).format('D')
        )
            return 'сегодня';
        else if (
            1 + +moment(dayNow).format('D') ===
            +moment(list[startBlockSlider].dt * second).format('D')
        )
            return 'завтра';
        else return <span>&#8291;</span>;
    };

    return (
        <div className={style.sliderWeatherContent}>
            <div
                className={style.currentDateWeather}
                style={
                    dayOfWeekCurrent === 5 || dayOfWeekCurrent === 6
                        ? {color: 'red'}
                        : {color: 'black'}
                }
            >
                {currentDateWeather}
            </div>
            <div className={style.today}>{setTodayOrTomorrow()}</div>
            <div className={style.longWeather}>
                {startBlockSlider !== 0 && (
                    <button onClick={handlePrevBlockSliderWeather}>
                        &#10094;
                    </button>
                )}
                {list
                    .slice(startBlockSlider, finishBlockSlider)
                    .map((pieceTime, index) => {
                        const match = moment(pieceTime.dt * second).format(
                            'ddd, D MMM'
                        );
                        const time = moment(pieceTime.dt * second).format(
                            'HH:mm'
                        );
                        return (
                            <div
                                key={index}
                                className={style.elementSliderBlock}
                            >
                                <div>{match}</div>
                                <div>{time}</div>
                                <div>
                                    t:{' '}
                                    {convertKelvinToCelsius(
                                        pieceTime.main.temp
                                    )}{' '}
                                </div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${pieceTime.weather[0].icon}@2x.png`}
                                    className={style.miniIconImg}
                                    alt={pieceTime.weather[0].description}
                                />
                            </div>
                        );
                    })}
                {finishBlockSlider !== finishListSliderWeather && (
                    <button onClick={handleNextBlockSliderWeather}>
                        &#10095;
                    </button>
                )}
            </div>
        </div>
    );
};

export default SliderWeather;
