let curDate = new Date();

curDate.setDate(1);

let lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let year = curDate.getFullYear();
let cal = [[], [], [], [], [], []];

if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    lastDays[1] = 29;
}

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
        cal[i].push(null);
    }
}

for (let i = curDate.getDay() - 1, prevMonDate = lastDays[(curDate.getMonth() + 11) % 12]; i >= 0; i--, prevMonDate--) {
    let tmp = `<p style="color: #eee">${prevMonDate}</p>`;
    cal[0][i] = tmp;
}

let start = curDate.getDay();
for (let date = 1; date <= lastDays[curDate.getMonth()]; start++, date++) {
    let tmp = `<p>${date}</p>`;
    cal[parseInt(start / 7)][start % 7] = tmp;
}

for (let i = 1; start < 42; i++, start++) {
    let tmp = `<p style="color: #eee">${i}</p>`;
    cal[parseInt(start / 7)][start % 7] = tmp;
}

cal.forEach((arr) => {
    console.log(arr);
});