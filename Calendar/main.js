function makeDateItem(number, color = "black") {
    let dateItem = document.createElement("div"), content = document.createElement("p");
    dateItem.className = "date-col";
    content.innerHTML = number;
    content.style.color = color;

    dateItem.appendChild(content);

    return dateItem;
}

function makeCurCalendar(date) { // date-row가 7개 담긴 Array return
    let month = date.getMonth(), year = date.getFullYear();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    let calendar = [];
    let monthDateCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // date의 첫 번째 날부터 시작하기 위해서 date를 1로 설정
    date.setDate(1);

    // 윤년
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        monthDateCnt[1] = 29;
    }

    // cal에 date-row 7개 추가
    for (let i = 0; i < 7; i++) {
        let dateRow = document.createElement("div");
        dateRow.className = "date-row";

        calendar.push(dateRow);
    }
    
    // 첫 줄에 요일 추가
    days.forEach(d => {
        let dayItem = makeDateItem(d);

        if (d == "일") {
            dayItem.firstChild.style.color = "red";
        }

        else if (d == "토") {
            dayItem.firstChild.style.color = "blue";
        }

        calendar[0].appendChild(dayItem);
    });

    // 첫 줄 빈칸을 전월과 이어지게 채우기
    let prevMonDate = monthDateCnt[(date.getMonth() + 11) % 12];
    for (let i = date.getDay() - 1; i >= 0; i--) {
        let dateItem = makeDateItem(prevMonDate - i, "#eee");
        calendar[1].appendChild(dateItem);
    }

    // date의 날짜 채우기
    let start = date.getDay();
    for (let d = 1; d <= monthDateCnt[date.getMonth()]; start++, d++) {
        let dateItem = makeDateItem(d);

        if (d == curDate.getDate()) {
            dateItem.firstChild.style.backgroundColor = "rgb(69, 129, 213)";
        }

        calendar[parseInt(start / 7 + 1)].appendChild(dateItem);
    }

    // 마지막 줄 남은 칸이 있으면 다음달을 채우기
    for (let d = 1; start < 42; d++, start++) {
        let dateItem = makeDateItem(d, "#eee");

        calendar[parseInt(start / 7 + 1)].appendChild(dateItem);
    }

    return calendar;
}

// date-container에 date 캘린더 넣기
function setCalendar(date) {
    setDateTitle(date);

    $(".date-container").html("");

    makeCurCalendar(date).forEach((dateRow, idx) => {
        $(".date-container").append(dateRow);
    });
}

function setDateTitle(date) {
    $("#date-title").html(`${date.getFullYear()}년 ${date.getMonth() + 1}월`);
}

function makeMonthTable(year) {
    let monthContainer = $(".month-container");
    monthContainer.html("");
    $("#year-title").text(`${year}년`);

    for (let i = 0; i < 4; i++) {
        let row = document.createElement("div");
        row.className = "row";

        for (let j = 1; j <= 3; j++) {
            let col = document.createElement("div"), btn = document.createElement("button");
            let curMonth = i * 3 + j;
            col.className = "col-4", btn.className = "month-btn";
            btn.innerHTML = curMonth;

            if (year === curDate.getFullYear() && curMonth - 1 == curDate.getMonth()) {
                btn.style.backgroundColor = "rgb(69, 129, 213)";
            }

            col.appendChild(btn);
            row.appendChild(col);
        }

        monthContainer.append(row);
    }
}

let date = new Date();
const curDate = new Date();

setCalendar(date);
makeMonthTable(date.getFullYear());

$("#date-title").click(() => {
    $(".years-container").css("visibility", "visible");
});

$("#prev-btn").click(() => {
    let prevMonth = date.getMonth() - 1;
    date.setMonth(prevMonth);
    
    setDateTitle(date);
    setCalendar(date);
});

$("#next-btn").click(() => {
    let nextMonth = date.getMonth() + 1;
    date.setMonth(nextMonth);
    
    setDateTitle(date);
    setCalendar(date);
});

let yearTitle = $("#year-title");
$("#up-btn").click(() => {
    yearTitle.text(`${parseInt(yearTitle.text()) + 1}년`);
    makeMonthTable(parseInt(yearTitle.text()));
});

$("#down-btn").click(() => {
    yearTitle.text(`${parseInt(yearTitle.text()) - 1}년`);
    makeMonthTable(parseInt(yearTitle.text()));
});

$(".month-container").click(function(e) {
    let cur = e.target;

    if (cur.className === "month-btn") {
        date.setFullYear(parseInt(yearTitle.text()));
        date.setMonth(parseInt(cur.textContent) - 1);

        setCalendar(date);

        $(".years-container").css("visibility", "hidden");
    }
});