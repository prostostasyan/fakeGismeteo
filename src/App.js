import {useState, useEffect} from 'react'
import './App.css';
import Search from "./components/Search/Search";
import Content from "./components/Content/Content";
import axios from 'axios'
import Header from "./components/Header/Header";
import { YMaps, Map } from 'react-yandex-maps';

const myID='4319e25fb7c3d02491092a7b206ffc8c';








function App() {
    const [myState,setMyState] = useState('');
    const [weatherNow,setWeatherNow] = useState('');
    const [weatherLong,setWeatherLong] = useState('');
    const [responseErr,setResponseErr]= useState('');
    const [selectTown,setSelectTown] = useState('')

    const getRequest = (data)=>{
        console.log(data)
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${data.city}&lang=ru&appid=${myID}&lang=ru`)
            .then(res=> {
                setWeatherNow(res);
                console.log(res.data);
                setResponseErr('');
                setSelectTown(res.data.name);
                return res.data.name
            })
            .then(town =>getRequest2(town))
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    setResponseErr(error.response);
                } else if (error.request) {
                    console.log(error.request)
                }
            })

    }
    const getRequest2 = (city)=>{
        console.log(city)
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&appid=${myID}&lang=ru`)
            .then(res=> {
                console.log('obj2',res.data);
                setWeatherLong(res.data.list)
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                } else if (error.request) {
                    console.log(error.request)
                }
            })
    }


    return (

        <div className="App">
            <Header/>
            <Search onFormSubmit={(city) => getRequest(city) } data = {responseErr.data}/>
            {weatherLong && <Content {...weatherNow.data} list={weatherLong}/>}
        </div>
    );
}

export default App;
