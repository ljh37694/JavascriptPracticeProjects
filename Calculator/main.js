let calcBtnTexts = [
    ["AC", "f", "%", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "-"],
    ["0", ".", "="]
];

let calcBtnData = [
    [
        { text: "AC", size: 1, type: "func" },
        { text: "+/-", size: 1, type: "func" },
        { text: "bks", size: 1, type: "func" },
        { text: "÷", size: 1, type: "operator" },
    ],
    [
        { text: "7", size: 1, type: "number" },
        { text: "8", size: 1, type: "number" },
        { text: "9", size: 1, type: "number" },
        { text: "x", size: 1, type: "operator" },
    ],
    [
        { text: "4", size: 1, type: "number" },
        { text: "5", size: 1, type: "number" },
        { text: "6", size: 1, type: "number" },
        { text: "-", size: 1, type: "operator" },
    ],
    [
        { text: "1", size: 1, type: "number" },
        { text: "2", size: 1, type: "number" },
        { text: "3", size: 1, type: "number" },
        { text: "+", size: 1, type: "operator" },
    ],
    [
        { text: "0", size: 2, type: "number" },
        { text: ".", size: 1, type: "point" },
        { text: "=", size: 1, type: "equal" },
    ],
];

// global variable
const calcBtnContainer = $(".calc-btn-container");
const result = $("#result");
let existPoint = false, clickedOperator = false;
let accumulator = 0;
let operator = "";
const DIV = 10000000000.0;
const init = function() {
    $("#result").text("0");
    existPoint = false;
    accumulator = 0;
    operator = "";
}

calcBtnData.forEach((rowData) => {
    let btnRow = document.createElement("div");
    btnRow.className = "row mt-3";

    rowData.forEach((item) => {
        let { text, size, type } = item;
        let col = document.createElement("div");
        let btn = document.createElement("button");

        btn.className = `calc-btn ${type}`;
        col.className = `col-${size * 3}`;

        btn.innerHTML = text;

        col.appendChild(btn);
        btnRow.appendChild(col);
    });

    document.getElementsByClassName("calc-btn-container")[0].appendChild(btnRow);
});

$(".number").click((e) => {
    let num = e.currentTarget.textContent;

    if (clickedOperator) {
        result.text("0");
        clickedOperator = false;
    }

    if (result.text().length < 12) {
        result.text((result.text() == 0 ? "" : result.text()) + num);
    }
});

$(".func").click((e) => {
    let f = e.currentTarget.textContent;
    let num = result.text();

    if (f == "AC") {
        init();

    }

    else if (f == "+/-") {
        result.text((num[0] == "-" ? num.substring(1) : "-" + num));
    }

    else if (f == "bks") {
        result.text(num.slice(0, -1));

        if (result.text() == "") {
            result.text("0");
        }
    }
});

$(".point").click(function() {
    if (existPoint === false) {
        result.text(result.text() + ".");
        existPoint = true;
    }
});

$(".operator").click(function() {
    let oper = this.textContent;
    accumulator = parseFloat(result.text());

    operator = oper;
    clickedOperator = true;
});

$(".equal").click(function() {
    let curNum = parseFloat(result.text());

    if (operator) {
        switch (operator) {
            case "÷":
                accumulator /= curNum;
                break;
            case "x":
                accumulator *= curNum;
                break;
            case "-":
                accumulator -= curNum;
                break;
            case "+":
                accumulator += curNum;
                break;
        }

        result.text(parseFloat(accumulator.toFixed(11)));
    }
});