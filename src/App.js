import {useState, useEffect} from 'react'
import './App.css';
import Search from "./components/Search/Search";
import Content from "./components/Content/Content";
import axios from 'axios'
import Header from "./components/Header/Header";





const myID='4319e25fb7c3d02491092a7b206ffc8c';

function App() {
    const [myState,setMyState] = useState('');
    const [response,setResponse] = useState('');
    const [responseErr,setResponseErr]= useState('')
    const getRequest = (data)=>{
        console.log(data)
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${data.city}&lang=ru&appid=${myID}&lang=ru`)
            .then(res=> {
                setResponse(res);
                console.log(res.data);
                setResponseErr('');
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    setResponseErr(error.response);
                } else if (error.request) {
                    console.log(error.request)
                }
            })
    }

    return (

        <div className="App">
            <Header/>
            <Search onFormSubmit={(city) => getRequest(city) } data = {responseErr.data}/>
            {response && <Content {...response.data}/>}
        </div>
    );
}

export default App;
