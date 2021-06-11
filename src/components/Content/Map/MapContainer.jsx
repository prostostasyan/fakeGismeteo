import React from 'react';
import style from './Map.module.css';
import {Map, YMaps} from 'react-yandex-maps';

const MapContainer = ({coord}) => {
    return (
        <div className={style.mapContent}>
            <YMaps>
                <div>
                    <Map
                        className={style.map}
                        state={{center: [coord.lat, coord.lon], zoom: 11}}
                        defaultState={{center: [55.75, 37.57], zoom: 9}}
                    />
                </div>
            </YMaps>
        </div>
    );
};

export default MapContainer;
