function makeDateItem(number, color = "black") {
    let dateItem = document.createElement("p");
    dateItem.innerHTML = number;
    dateItem.style.color = color;

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
        let dayItem = document.createElement("p");
        dayItem.innerHTML = d;

        if (d == "일") {
            dayItem.style.color = "red";
        }

        else if (d == "토") {
            dayItem.style.color = "blue";
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
    $(".date-container").html("");

    makeCurCalendar(date).forEach((dateRow, idx) => {
        $(".date-container").append(dateRow);
    });
}

function setDateTitle(date) {
    $("#date-title").html(`${date.getFullYear()}년 ${date.getMonth() + 1}월`);
}

let date = new Date();

setDateTitle(date);
setCalendar(date);

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