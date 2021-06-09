import axios from 'axios';
import {myID} from './constants';

const getNowRequest = (data) => {
    console.log(data);
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${data.city}&lang=ru&appid=${myID}&lang=ru`
        )
        .then((res) => {
            // console.log(res);
            // setWeatherNow(res);
            // console.log(res.data);
            // setResponseErr('');
            // return res.data.name;
            return {data: res.data, error: null};
        })
        .then((town) => getFutureRequest(town))
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                setResponseErr(error.response);
                return {data: null, error: error.response};
            } else if (error.request) {
                console.log(error.request);
            }
        });
};

const getFutureRequest = (city) => {
    console.log(city);
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&appid=${myID}&lang=ru`
        )
        .then((res) => {
            console.log('obj2', res.data);
            // setWeatherLong(res.data.list);
            return res.data.list;
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            }
        });
};

const getCityWeatherData = (data) =>
    axios
        .get(
            `http://api.openweathermap.orgd/data/2.5/weather?q=${data.city}&lang=ru&appid=${myID}&lang=ru`
        )
        .then((res) => ({data: res.data, error: null}));

export {getNowRequest, getFutureRequest, getCityWeatherData};
