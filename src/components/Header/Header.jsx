import {useEffect, useState} from 'react';
import style from './Header.module.css'
// import logo from "../../_img/logoHeader.svg";


function Header() {
    return <header >
        <div className={style.logoHeader}></div>
        <h1
            className= {style.mainName}
        >
            FakeGismetio
        </h1>
    </header>
}
export default Header