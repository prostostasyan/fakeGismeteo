export const directWind = (deg) => {
    if (deg < 22.5 || deg > 337.5) {
        return 'С';
    } else if (deg > 22.5 && deg <= 67.5) {
        return 'СВ';
    } else if (deg > 67.5 && deg <= 112.5) {
        return 'В';
    } else if (deg > 112.5 && deg <= 157.5) {
        return 'ЮВ';
    } else if (deg > 157.5 && deg <= 202.5) {
        return 'Ю';
    } else if (deg > 202.5 && deg <= 247.5) {
        return 'ЮЗ';
    } else if (deg > 247.5 && deg <= 292.5) {
        return 'З';
    } else if (deg > 292.5 && deg <= 337.5) {
        return 'СЗ';
    } else return 'штиль';
};
