import logo from './logo.svg';
import {useState, useEffect} from 'react'
import './App.css';
import Search from "./components/Search/Search";
import Content from "./components/Content/Content";
import axios from 'axios'
const myID='4319e25fb7c3d02491092a7b206ffc8c';


function Header() {
    return <header className="App-header">
        <a
            className="App-link"
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
        >
            FakeGismetio
        </a>
    </header>
}

function App() {
    const [myState,setMyState] = useState('');
    const [response,setResponse] = useState('');
    const [responseErr,setResponseErr]= useState('')
    const getRequest = (city)=>{
        console.log(city)
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myID}&lang=ru`)
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
    useEffect(() => response);
    useEffect(() => responseErr);
    return (

        <div className="App">
            <Header/>
            <Search onFormSubmit={(city) => getRequest(city) } data = {responseErr.data}/>
            {response && <Content {...response.data}/>}
        </div>
    );
}

export default App;
