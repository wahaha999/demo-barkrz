import { Astrology } from './constants';

export const getAge = (ageStr) => {
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let ageYear = parseInt(ageStr.substr(0,4)) ;
    let ageMonth = parseInt(ageStr.substr(5,2));

    let year = currentMonth + 1 >= ageMonth ? currentYear - ageYear : currentYear - ageYear - 1;

    if (year === 0) {
        let month = currentMonth + 1 >= ageMonth ? (currentMonth + 1 - ageMonth) : (currentMonth + 13 - ageMonth);
        return (month === 1) ? `${month} month old` : `${month} months old`;
    }

    return (year === 1) ? `${year} year old` : `${year} years old`;
}

export const getAstrology = (dateStr) => {
    const D_3 = dateStr.split("-");

    var d1 = new Date(2018, 3 - 1, 21);
    var d2 = new Date(2018, 4 - 1, 20);
    var d3 = new Date(2018, parseInt(D_3[1]) - 1, D_3[2]);

    if (d3 >= d1 && d3 <= d2) {
        return Astrology[0];
    }

    d1 = new Date(2018, 4 - 1, 21);
    d2 = new Date(2018, 5 - 1, 20);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[1];
    }

    d1 = new Date(2018, 5 - 1, 21);
    d2 = new Date(2018, 6 - 1, 21);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[2];
    }

    d1 = new Date(2018, 6 - 1, 22);
    d2 = new Date(2018, 7 - 1, 22);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[3];
    }

    d1 = new Date(2018, 7 - 1, 23);
    d2 = new Date(2018, 8 - 1, 23);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[4];
    }

    d1 = new Date(2018, 8 - 1, 24);
    d2 = new Date(2018, 9 - 1, 23);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[5];
    }

    d1 = new Date(2018, 9 - 1, 24);
    d2 = new Date(2018, 10 - 1, 23);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[6];
    }

    d1 = new Date(2018, 10 - 1, 24);
    d2 = new Date(2018, 11 - 1, 22);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[7];
    }

    d1 = new Date(2018, 11 - 1, 23);
    d2 = new Date(2018, 12 - 1, 21);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[8];
    }

    d1 = new Date(2018, 12 - 1, 22);
    d2 = new Date(2018, 1 - 1, 20);
    if ((d3 >= d1 && parseInt(D_3[1]) === 12) || (d3 <= d2 && parseInt(D_3[1]) === 1)) {
        return Astrology[9];
    }

    d1 = new Date(2018, 1 - 1, 21);
    d2 = new Date(2018, 2 - 1, 18);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[10];
    }

    d1 = new Date(2018, 2 - 1, 19);
    d2 = new Date(2018, 3 - 1, 20);
    if (d3 >= d1 && d3 <= d2) {
        return Astrology[11];
    }
}