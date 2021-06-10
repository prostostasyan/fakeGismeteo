import axios from 'axios';
import {myID} from './constants';

const getCityWeatherFutureData = (city) =>
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&appid=${myID}&lang=ru`
        )
        .then((res) => {
            console.log(res);
            return {data: res.data.list, error: null};
        })
        .catch((error) => {
            return {data: null, error: error};
        });

const getCityWeatherData = (data) =>
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${data.city}&lang=ru&appid=${myID}&lang=ru`
        )
        .then((res) => {
            console.log(res.data);
            return {data: res.data, error: null};
        })
        .catch((error) => {
            return {data: null, error: error};
        });

export {getCityWeatherFutureData, getCityWeatherData};
