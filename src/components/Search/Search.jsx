import {useEffect, useState} from 'react';
import style from './Search.module.css'

let Form= (props) => {
    const [value, setValue] = useState({city:'', state:'', country:''});
    const [check, setCheck] = useState('true');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onFormSubmit(value);
        setValue({city:'', state:'', country:''})
    }

    const handleChangeCity = (e) => {
        setValue({...value, city:e.target.value});
    }

    // const handleChangeState = (e) => {
    //     setValue({...value, state:e.target.value});
    // }
    //
    // const handleChangeCountry = (e) => {
    //     setValue({...value, country:e.target.value});
    // }

    return <form onSubmit={handleSubmit}>
        {props.cod == '404' && <span className={style.error}>{props.message}</span>}
            <input  name="searchCity" type="text" value ={value.city} onChange={handleChangeCity} placeholder ='Введите город'/>
            {/*<input  name="searchState"  value ={value.state} onChange={handleChangeState} placeholder ='Введите область'/>*/}
            {/*<input  name="searchCountry" value ={value.country}  onChange={handleChangeCountry} placeholder ='Введите страну'/>*/}
        {value.city&&<div className={style.btnSearch}><input type="submit"   value='Выбрать'/></div>}
    </form>
}


const Search =(props)=>{
    return<div className={style.searchContainer}>
        <Form onFormSubmit= {(city)=>props.onFormSubmit(city)}  {...props.data}/>
    </div>
}
export default Search