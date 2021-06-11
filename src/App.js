import React, {useState} from 'react';
import './App.css';
import Search from './components/Search/Search';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import {getCityWeatherData, getCityWeatherFutureData} from './api';

function App() {
    const [weatherNowData, setWeatherNow] = useState({});
    const [weatherFutureData, setWeatherLong] = useState('');
    const [responseErr, setResponseErr] = useState({});

    const handleSearchFormSubmit = async (data) => {
        console.log(data);
        const getWeatherNow = getCityWeatherData(data);
        const responseWeatherNow = await getWeatherNow;
        setResponseErr(null);
        console.log(responseWeatherNow);
        if (responseWeatherNow.data === null) {
            const error = responseWeatherNow.error;
            if (error.response) {
                setResponseErr(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            }
            return;
        }
        setWeatherNow(responseWeatherNow.data);
        const getWeatherFuture = getCityWeatherFutureData(
            responseWeatherNow.data.name
        );
        const responseWeatherFuture = await getWeatherFuture;
        console.log(responseWeatherFuture);
        setWeatherLong(responseWeatherFuture.data);
    };

    return (
        <div className="App">
            <Header />
            <Search
                onFormSubmit={handleSearchFormSubmit}
                data={responseErr || {}}
            />
            {weatherFutureData && (
                <Content {...weatherNowData} list={weatherFutureData} />
            )}
        </div>
    );
}

export default App;
