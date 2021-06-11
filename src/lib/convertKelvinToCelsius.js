export const convertKelvinToCelsius = (temperature) => {
    const temp = Math.ceil((temperature - 273.15) * 10) / 10;
    return temp < 0 ? (
        <span>{Math.ceil((temperature - 273.15) * 10) / 10}&deg;</span>
    ) : (
        <span>+{Math.ceil((temperature - 273.15) * 10) / 10}&deg;</span>
    );
};
