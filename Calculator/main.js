let calcBtnTexts = [
    ["AC", "f", "%", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "-"],
    ["0", ".", "="]
];

let calcBtnContainer = $(".calc-btn-container");

calcBtnTexts.forEach((arr) => {
    let btnRow = document.createElement("div");
    btnRow.className = "row";

    arr.forEach((item) => {
        let col = document.createElement("div");
        let btn = document.createElement("button");

        btn.className = "calc-btn";
        col.className = (item == "0" ? "col-6" : "col-3");

        btn.innerHTML = item;

        col.appendChild(btn);
        btnRow.appendChild(col);
    });

    document.getElementsByClassName("calc-btn-container")[0].appendChild(btnRow);
});