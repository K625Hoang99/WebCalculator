//calculator program
/*first we must get display element,
    its id was [display] in this case

*/


const display = document.getElementById('display');

/*
we have three functions to create
one for append to display,

another for clear display,

and one for calculating.
*/

function appendToDisplay(input){
    display.value += input;
}
function clearDisplay(){
    display.value = ''; //in the tut he set it to an empty string, char prob same here
}

/*
as a beginner we are going to directly use the eval() function
this is dangerous code
for example: the buttons "7" and "plus"
gives us uncaught syntax error. see: "direct eval function is evil .png"
also this reflects in the last lesson on error handling : link here <whenever i find it>
lets surround this code with a try-catch block
*/
function calculate() {
    try {
        const result = eval(display.value);
        if (result === undefined || isNaN(result)) {
            display.value = 'INFINITE ERROR';
        } else {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = 'Error u messed up bro (︶︹︺)';
    }
}