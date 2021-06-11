import React, {useState} from 'react';
import style from './Search.module.css';

const Search = ({onFormSubmit, data}) => {
    const [value, setValue] = useState({city: ''});
    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(value);
        setValue({city: ''});
    };

    const handleChangeCity = (e) => {
        setValue({city: e.target.value});
    };
    return (
        <div className={style.searchContainer}>
            <form onSubmit={handleSubmit}>
                {data.cod === '404' && (
                    <span className={style.error}>{data.message}</span>
                )}
                <input
                    name="searchCity"
                    type="text"
                    value={value.city}
                    onChange={handleChangeCity}
                    placeholder="Введите город"
                />
                {value.city && (
                    <div className={style.btnSearch}>
                        <input type="submit" value="Выбрать" />
                    </div>
                )}
            </form>
        </div>
    );
};
export default Search;
