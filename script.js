const todoInput = document.getElementById("todo");
const displayUl = document.getElementById("todolist");
const changeInput = document.getElementsByClassName("edit");
const todoMenu = document.getElementById("todomenu");
const marker = document.getElementById("markall");

const viewAll = document.getElementById("viewall");
const viewActive = document.getElementById("viewactive");
const viewCompleted = document.getElementById("viewcompleted");
const allCompleted = document.getElementById("allcompleted");

let input = '';
let todocounter = 0;
let counter = 0;

function userInput(event) {
    if (event.key === "Enter") {
        input = todoInput.value;
        todocounter++;

        createList();
        counter++;
        calculateList();
        if (counter == 1) {
            marker.style.display = 'flex';
        }
        event.target.value = '';
    }
};

todoInput.addEventListener('keyup', userInput);

function createList() {
    const liElement = document.createElement("li");
    liElement.classList.add('list');
    liElement.id = 'list' + todocounter;
    displayUl.appendChild(liElement);

    const divElement = document.createElement("div");
    divElement.classList.add('display');
    liElement.appendChild(divElement);

    const inputCheckElement = document.createElement("input");
    inputCheckElement.type = 'checkbox';
    inputCheckElement.classList.add('check');
    inputCheckElement.id = 'check' + todocounter;
    divElement.appendChild(inputCheckElement);

    const labelTextElement = document.createElement("label");
    labelTextElement.textContent = input;
    labelTextElement.classList.add('edit');
    labelTextElement.setAttribute('for', 'edit' + todocounter);
    divElement.appendChild(labelTextElement);

    const inputTextElement = document.createElement("input");
    inputTextElement.type = 'text';
    inputTextElement.classList.add('edit');
    inputTextElement.value = input;
    liElement.appendChild(inputTextElement);

    const removeElement = document.createElement("label");
    removeElement.textContent = '❌';
    removeElement.classList.add('remove');
    removeElement.setAttribute('for', 'edit' + todocounter);
    divElement.appendChild(removeElement);

    inputTextElement.style.display = 'none';
    todoMenu.style.display = 'flex';

    removeElement.addEventListener('click', function (event) {
        const listItemToRemove = liElement;
        listItemToRemove.remove();
        counter--;
        calculateList();
        if (counter == 0) {
            todoMenu.style.display = 'none';
            marker.style.display = 'none';
        }
    });

    inputCheckElement.addEventListener('change', function (event) {

        if (event.target.checked) {
            labelTextElement.style.textDecoration = 'line-through';
            allCompleted.style.display = 'flex';
            counter--;
            calculateList();
        }
        else {
            labelTextElement.style.textDecoration = 'none';
            allCompleted.style.display = 'none';
            counter++;
            calculateList();
        }
    });

    labelTextElement.addEventListener('click', function (event) {
        inputTextElement.style.display = 'flex';
        divElement.style.display = 'none';
    });

    inputTextElement.addEventListener('change', function (event) {
        input = inputTextElement.value;
        labelTextElement.textContent = input;
        inputTextElement.value = input;
        inputTextElement.style.display = 'none';
        divElement.style.display = 'flex';
    });

    viewAll.addEventListener('click', function (event) {
        liElement.style.display = 'flex';
    });

    viewActive.addEventListener('click', function (event) {
        displayUl.querySelectorAll('.list').forEach(function (li) {

            const checkbox = li.querySelector('.check');
            if (checkbox && checkbox.checked) {
                li.style.display = 'none';
            } else {
                li.style.display = 'flex';
            }
        });
    });

    viewCompleted.addEventListener('click', function (event) {
        displayUl.querySelectorAll('.list').forEach(function (li) {

            const checkbox = li.querySelector('.check');
            if (checkbox && checkbox.checked) {
                li.style.display = 'flex';
            } else {
                li.style.display = 'none';
            }
        });
    });

    allCompleted.addEventListener('click', function (event) {
        displayUl.querySelectorAll('.list').forEach(function(li) {
            
            const checkbox = li.querySelector('.check');
            if (checkbox && checkbox.checked) {
                li.remove();
            }
        });
        calculateList();
        if (counter == 0) {
            todoMenu.style.display = 'none';
            marker.style.display = 'none';
        }
    });
};

marker.addEventListener('click', function () {
    const checkAll = document.querySelectorAll('.check');

    let allChecked = true;

    checkAll.forEach(function (checkbox) {
        if (!checkbox.checked) {
            allChecked = false;
            allCompleted.style.display = 'flex';
            counter--;
            calculateList();
        }
    });

    checkAll.forEach(function (checkbox) {
        checkbox.checked = !allChecked;
        if (allChecked == true) {
            allCompleted.style.display = 'none';
            counter++;
            calculateList();
        }
    });
});

function calculateList() {
    document.getElementById("items").textContent = counter + ' items left';
};

