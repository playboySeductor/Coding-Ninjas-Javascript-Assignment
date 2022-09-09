// Here we’re making use of the document.querySelector method to retrieve an element reference to the form element. Next we’re we’re calling addEventListener to register the handleSubmitForm event handler function to handle the submit event of the form.

document.querySelector('form').addEventListener('submit',handleformsubmit);

// Implement handleformsubmit function

function handleformsubmit(e){
    e.preventDefault();
    let input= document.querySelector('input');
    if(input.value!='')
        addTodo(input.value);
    input.value= '';
}

// Inside this function we’re first making sure that the default form submit behaviour of the browser is not taking place by calling e.preventDefault(). 

// Next we’re retrieving an reference to the input element by using the querySelector method once again. 
// We’re storing that element reference in input, so that we’re able to access the input value by using input.value.

// If the input value if not empty the addTodo helper function is called and the current input value is passed into that function as a parameter.

// Finally the input value is reset to an empty string.
count=0;

function addTodo(todo)
{
    let ul= document.querySelector('ul');
    let li=document.createElement('li');
    let taskcount=document.getElementById('counttot');

    li.innerHTML=`
    <span class="todo-item">${todo}</span>
    <button name="checkButton"><i class="fas fa-check-square"></i></button>
    <button name="deleteButton" ><i class="fas fa-trash"></i></button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
    count++;
    taskcount.innerText=count+" ";
}

// First of all a reference to the ul element is retrieved. Next a new li element is created by using the document.createElement method. This is new element is stored in the variable li. 

// This is the list element which is containing the output which is done for every todo element. Therefore we’re inserting the inner HTML code of the li element by assigning the code string to property innerHTML of the li element.

// The output consists of the todo text, a check button and a delete button.

// Finally the new li element is added as a child to the ul element, so that it becomes visible in the browser.

document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);

// Everytime the user clicks anywhere in the list output the handleClickDeleteOrCheck function will be executed:


function handleClickDeleteOrCheck(e) {
    if (e.target.name == 'checkButton')
        checkTodo(e);

    if (e.target.name == 'deleteButton')
        deleteTodo(e);
}

// Inside that function it needs to be distinguished if the click comes from a check button or from a delete button.

// In case a check button is clicked, the checkTodo helper function is called in case a delete button is clicked the deleteTodo helper function is executed:


complete=0;
function checkTodo(e)
{
    let item=e.target.parentNode;
    let comp=document.getElementById('countdone');
    if (item.style.textDecoration == 'line-through')
        {
            item.style.textDecoration = 'none';
            complete--;
            comp.innerText=complete-" ";
        }
    else
        {
            item.style.textDecoration = 'line-through';
            complete++;
            comp.innerText=complete+" ";
        }

    
}

// Inside the checkTodo function we need to retrieve a reference to the parent node (list item), so that we’re able to apply a text decoration style of line-through to this item.

// Furthermore we’re registering an event handler function for the transitionend event of this node. This is needed due to the fact that a CSS transition should be applied when a todo element is removed from the list.


function deleteTodo(e){
    let item = e.target.parentNode;
    let taskcount=document.getElementById('counttot');
    let comp=document.getElementById('countdone');
    
    item.addEventListener('transitionend', function () {
        item.remove(); 
    });

    item.classList.add('todo-list-item-fall');
    count--;
    if (item.style.textDecoration == 'line-through')
    {
        complete--;
        comp.innerText=complete-" ";
    }
    
    taskcount.innerText=count-" ";
    
}


// Finally we’re registering and implementing another click event handler function for the Clear All link.

// In making sure to clear the complete list inside the event handler function by selecting the ul element and then setting the innerHTML property to an empty string:

document.getElementById('clearAll').addEventListener('click', handleClearAll);

function handleClearAll(e) {
    document.querySelector('ul').innerHTML = '';
    let taskcount=document.getElementById('counttot');
    let comp=document.getElementById('countdone');
    comp.innerText=0;
    taskcount.innerText=0;
}