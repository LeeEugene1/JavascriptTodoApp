// CODE EXPLAINED channel

//select elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//variables
let LIST = []
    , id = 0;

//get item from localstorage
let data = localStorage.getItem('TODO')//key는 TODO
console.log(data);

//clear localstrage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

//if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

//show today's date
let today = new Date();
let option = {weekday:'long', month:'short', day:'numeric'};
dateElement.innerHTML = today.toLocaleDateString('en-US', option);

//add to do function
function addToDo(toDo, id, done, trash){
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, item);
}
// addToDo("drink Coffee", 1, true, false);

//Enter key : add an item to the list 
document.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        const Todo = input.value;
        //if the input isn't empty
        if(Todo){
            addToDo(Todo, id, false, false);
            LIST.push({
                name:Todo,
                id:id,
                done:false,
                trash:false
            })
            //add item to localstorage
localStorage.setItem('TODO', JSON.stringify(LIST))//LIST array

            id++;
        }
        //if done
        input.value = "";
    }
})

//plus button : add an item to the list2
const plusBtn = document.querySelector('.add-to-do');
plusBtn.firstElementChild.addEventListener('click', function(){
    const Todo = input.value;
    if(Todo){
        addToDo(Todo, id, false, false);
        LIST.push({
            name:Todo,
            id:id,
            done:false,
            trash:false
        })
        localStorage.setItem('TODO', JSON.stringify(LIST))
        id++;
    }
    input.value="";
})
        
//complete todo
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true; 
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener('click', function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == 'complete'){
        completeToDo(element);
    }else if(elementJob == 'delete'){
        removeToDo(element);
    }
    //add item to localstorage
    localStorage.setItem('TODO', JSON.stringify(LIST))//LIST array


})