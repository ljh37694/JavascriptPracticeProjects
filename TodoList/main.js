let todoLists = [];

$("#add-btn").click(() => {
    let input = $("#todo-input");


    if (input.val()) {
        console.log(input.val());
        $(".todo-lists-container").append(makeTodoList(input.val()));
    }
});

function makeTodoList(text) {
    let list = `                
        <div class="todo-list">
            <div class="row">
                <div class="col-2">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="col-8">
                    <p class="text-start">${text}</p>
                </div>
                <div class="col-2">
                    <button class="btn">x</button>
                </div>
            </div>
        </div>`;

    return list;
}