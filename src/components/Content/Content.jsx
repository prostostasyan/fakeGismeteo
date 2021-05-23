import {Component, useState, useEffect} from 'react';
import axios from "axios";
import style from './Content.module.css'
import icon from './icon/weatherIcon.png';

const monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']



let Context = ({main,weather,name, sys}) => {
    const convK = T => Math.ceil((T - 273.15)*10)/10;
    return <div className={style.contentContainer}>

       <div className={style.mainContent}>
           <div> Страна:{sys.country}  Город: {name} </div>

            <div className={style.data}> {new Date().getDate()} {monthes[new Date().getMonth()]}</div>
            <div>сегодня</div>
            <div>{convK(main.temp_min)}-{convK(main.temp_max)}</div>
        </div>


        <div className={style.iconContent} >
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`} className={style.iconImg} />
        </div>
    </div>
}
export default Context



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
