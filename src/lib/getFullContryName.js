export const getFullCountryName = (countryObj, shotCountryName) => {
    console.log(countryObj.country[0]);
    let objCont = countryObj.country.find(
        (country) => country.alpha2 === shotCountryName
    );
    return objCont ? objCont.name : 'Неизвестно';
};
