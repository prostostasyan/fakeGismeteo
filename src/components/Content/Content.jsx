import style from './Content.module.css'
import icon from './icon/weatherIcon.png';

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const dayWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ',];
const dayNow = new Date().getDay();


let Context = ({main, weather, name, sys, wind}) => {
    const convertKtoC = T => {
        const temp = Math.ceil((T - 273.15) * 10) / 10;
        return (temp < 0) ? temp : "+" + temp
    };
    const directWind=(deg)=>{
        if(deg<22.5 || deg>337.5){
            return 'С'
        }else if( deg>22.5 && deg<=67.5 ){
            return  'СВ'
        }else if( deg>67.5 && deg<=112.5){
            return  'В'
        } else if( deg>112.5 && deg<=157.5){
            return  'ЮВ'
        } else if( deg>157.5 && deg<=202.5){
            return  'Ю'
        } else if( deg>202.5 &&  deg<=247.5){
            return  'ЮЗ'
        } else if( deg>247.5 &&  deg<=292.5){
            return  'З'
        } else if( deg>292.5 &&  deg<=337.5){
            return  'СЗ'
        } else
            return  'штиль'

    }

    return <div className={style.contentContainer}>

        <div className={style.mainContent}>
            <div className={style.text}> Страна: {sys.country} Город: {name} </div>
            <div className={style.data}
                 style={(dayNow === 0 || dayNow === 6) ? {color: 'red'} : {color: 'black'}}>{dayWeek[dayNow]}, {new Date().getDate()} {months[new Date().getMonth()]}</div>
            <div className={style.today}>сегодня</div>
            <div className={style.text}>Ветер: {wind.speed} м/с,  {directWind(wind.deg)} </div>
            <div className={style.text}>Давление: {Math.floor(main.pressure*0.75)} мм рт. ст.</div>
            <div className={style.text}>Влажность: {main.humidity} %</div>
            <div className={style.text}>Температура:</div>
            <div className={style.temperature}><span className={style.minTemp}>{convertKtoC(main.temp_min)}</span><span
                className={style.maxTemp}>{convertKtoC(main.temp_max)}</span></div><br/>
            <div className={style.text}>Чувствуется: {convertKtoC(main.feels_like)}</div>
        </div>

        <div className={style.iconContent}>
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`} className={style.iconImg}/>
            <div className={style.textImg}>{weather[0].description}</div>
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
