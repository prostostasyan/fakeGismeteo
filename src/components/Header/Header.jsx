import {useEffect, useState} from 'react';
import style from './Header.module.css'


// import logo from "../../_img/logoHeader.svg";
function Header() {
    return <header >
        <div className={style.logoHeader}></div>
        <a
            className= {style.link}
            // href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
        >
            FakeGismetio
        </a>
    </header>
}
export default Header