let todoLists = [];

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
                    <button class="del-btn">x</button>
                </div>
            </div>
        </div>`;

    return list;
}

function pushTodoList() {
    let input = $("#todo-input");

    if (input.val()) {
        $(".todo-lists-container").append(makeTodoList(input.val()));
        todoLists.push(input.val());
        input.val("");
    }

    $(".del-btn").click(function() {
        this.parentElement.parentElement.parentElement.remove();
    });
}

$("#add-btn").click(function() {
    pushTodoList();
});

$("#todo-input").on("keypress", function(e) {
    if (e.keyCode == 13) {
        pushTodoList();
    }
})