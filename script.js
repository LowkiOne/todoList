const todoInput = document.getElementById("todo");
const displayUl = document.getElementById("todolist");
const changeInput = document.getElementsByClassName("edit");
const todoMenu = document.getElementById("todomenu");
const marker = document.getElementById("markall");

const displaySwitch = document.getElementById("dispayswitch");
const viewAll = document.getElementById("viewall");
const viewActive = document.getElementById("viewactive");
const viewCompleted = document.getElementById("viewcompleted");
const allCompleted = document.getElementById("allcompleted");

let input = '';
let todocounter = 0;
let counter = 0;
let completeCheckedCounter = 0;

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
    labelTextElement.classList.add('labeledit');
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

};

displayUl.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('labeledit')) {
        const divElement = event.target.parentElement;
        const inputTextElement = divElement.nextElementSibling;
        inputTextElement.style.display = 'flex';
        divElement.style.display = 'none';
    }
});

displayUl.addEventListener('change', function(event) {
    if (event.target && event.target.classList.contains('edit')) {
        const inputTextElement = event.target;
        const divElement = inputTextElement.previousElementSibling;
        const labelTextElement = divElement.querySelector(".labeledit");
        input = inputTextElement.value;
        labelTextElement.textContent = input;
        inputTextElement.value = input;
        inputTextElement.style.display = 'none';
        divElement.style.display = 'flex';
    }
});




displaySwitch.addEventListener('click', function(event) {
    const clickedId = event.target.id;
    const listItems = displayUl.querySelectorAll('.list');
    
    switch (clickedId) {
        case 'viewall':
            listItems.forEach(function(li) {
                li.style.display = 'flex';
            });
            break;
        case 'viewactive':
            listItems.forEach(function(li) {
                const checkbox = li.querySelector('.check');
                li.style.display = checkbox && checkbox.checked ? 'none' : 'flex';
            });
            break;
        case 'viewcompleted':
            listItems.forEach(function(li) {
                const checkbox = li.querySelector('.check');
                li.style.display = checkbox && checkbox.checked ? 'flex' : 'none';
            });
            break;
        default:
            break;
    }
});

allCompleted.addEventListener('click', function (event) {
    displayUl.querySelectorAll('.list').forEach(function(li) {
        
        const checkbox = li.querySelector('.check');
        if (checkbox && checkbox.checked) {
            li.remove();
            counter--;
            completeCheckedCounter--;
        }
    });
   
    if (counter == 0) {
        todoMenu.style.display = 'none';
        marker.style.display = 'none';
        counter = 0;
        completeCheckedCounter = 0;
    }
    calculateList();
});

function removeListItem(listItem) {
    const checkbox = listItem.querySelector('.check');
    if (checkbox.checked) {
        completeCheckedCounter--;
    }
    listItem.remove();
    counter--;
}

displayUl.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove')) {
        const listItemToRemove = event.target.closest('.list');
        if (listItemToRemove) {
            removeListItem(listItemToRemove);

            if (counter == 0) {
                todoMenu.style.display = 'none';
                marker.style.display = 'none';
                counter = 0;
                completeCheckedCounter = 0;
            }
            calculateList();
        }
    }
});

function handleCheckboxChange(event) {
    const checkbox = event.target;
    if (checkbox.classList.contains('check')) {
        const listItem = checkbox.closest('.list');
        const labelTextElement = listItem.querySelector('label.labeledit');
        if (checkbox.checked) {
            labelTextElement.style.textDecoration = 'line-through';
            allCompleted.style.display = 'flex';
            completeCheckedCounter++;
        } else {
            labelTextElement.style.textDecoration = 'none';
            allCompleted.style.display = 'none';
            completeCheckedCounter--;
        }
        calculateList();
    }
};

displayUl.addEventListener('change', handleCheckboxChange);

marker.addEventListener('click', function () {
    const checkAll = document.querySelectorAll('.check');

    let allChecked = true;

    checkAll.forEach(function (checkbox) {
        const listItem = checkbox.closest('.list');
        const labelTextElement = listItem.querySelector('label.labeledit');
        if (!checkbox.checked) {
            allChecked = false;
            allCompleted.style.display = 'flex';
            labelTextElement.style.textDecoration = 'line-through';
            completeCheckedCounter++;
        }
    });

    checkAll.forEach(function (checkbox) {
        checkbox.checked = !allChecked;
        const listItem = checkbox.closest('.list');
        const labelTextElement = listItem.querySelector('label.labeledit');
        if (allChecked == true) {
            allCompleted.style.display = 'none';
            labelTextElement.style.textDecoration = 'none';
            completeCheckedCounter--;
        }
    });

    calculateList();
});

document.querySelectorAll('.viewlist').forEach(function(item) {
    item.addEventListener('click', function() {
        document.querySelectorAll('.viewlist').forEach(function(item) {
            item.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

function calculateList() {
    let totalToDoList = counter - completeCheckedCounter;
    console.log(counter);
    console.log(completeCheckedCounter);
    if(completeCheckedCounter < 0){
        completeCheckedCounter++;
    }

    if(completeCheckedCounter > counter){
        completeCheckedCounter = counter;
    }

    document.getElementById("items").textContent = totalToDoList + ' items left';
};