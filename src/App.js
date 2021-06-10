import React, {useState} from 'react';
import './App.css';
import Search from './components/Search/Search';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import {getCityWeatherData, getCityWeatherFutureData} from './api';

function App() {
    const [weatherNow, setWeatherNow] = useState({});
    const [weatherLong, setWeatherLong] = useState('');
    const [responseErr, setResponseErr] = useState('');

    const handleSearchFormSubmit = async (data) => {
        try {
            console.log(data);
            const getWeatherNow = getCityWeatherData(data);
            const responseWeatherNow = await getWeatherNow;
            setResponseErr('');
            console.log(responseWeatherNow);
            if (responseWeatherNow.data === null) {
                throw new responseWeatherNow.error();
            }
            setWeatherNow(responseWeatherNow.data);
            const getWeatherFuture = getCityWeatherFutureData(
                responseWeatherNow.data.name
            );
            const responseWeatherFuture = await getWeatherFuture;
            console.log(responseWeatherFuture);
            setWeatherLong(responseWeatherFuture.data);
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response);
                setResponseErr(error.response);
            } else if (error.request) {
                console.log(error.request);
            }
        }
    };

    return (
        <div className="App">
            <Header />
            <Search
                onFormSubmit={handleSearchFormSubmit}
                data={responseErr.data || {}}
            />
            {weatherLong && <Content {...weatherNow} list={weatherLong} />}
        </div>
    );
}

export default App;
