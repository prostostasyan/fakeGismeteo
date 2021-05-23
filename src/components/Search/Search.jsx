import {Component, useState} from 'react';
import style from './Search.module.css'

let Form= (props) => {
    let [value, setValue] = useState('Москва');
    let [check, setCheck] = useState('true');

    let handleSubmit = (e) => {
        e.preventDefault();
        props.onFormSubmit(value);
    }

    let handleChangeCity = (e) => {
        setValue(e.target.value);
        // setCheck('false')
    }
    let handleChangeCountry = (e) => {
        setValue(e.target.value);
        // setCheck('false')
    }
    let handleChangeState = (e) => {
        setValue(e.target.value);
        // setCheck('false')
    }



    console.log(props.cod)

    return <form onSubmit={handleSubmit}>
        {props.cod == '404' && <p>{props.message}</p>}
            <input  name="searchCity"   onChange={handleChangeCity()} placeholder ='Введите город'/>
            <input  name="searchState"   onChange={handleChangeCountry} placeholder ='Введите область'/>
            <input  name="searchCountry"   onChange={handleChangeState} placeholder ='Введите страну'/>
            <div className={style.btnSearch}><input type="submit"   value='Выбрать'/></div>
    </form>
}


let Search =(props)=>{
    return<div className={style.searchContainer}>
        <Form onFormSubmit= {(city)=>props.onFormSubmit(city)}  {...props.data}/>
    </div>
}
export default Search