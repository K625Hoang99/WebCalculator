const display = document.getElementById('display');
let errorMessage, errorDivideMessage;

/*
we have three functions to create
one for append to display,

another for clear display,

and one for calculating.
*/

function appendToDisplay(input) {
    display.value += input;
    hideErrorMessages();
}
function clearDisplay() {
    display.value = ''; //in the tut he set it to an empty string, char prob same here
    hideErrorMessages();
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
        if (result === Infinity || result === -Infinity) {
            display.value = 'Error';
            showErrorMessage('divide');
        } else if (isNaN(result)) {
            display.value = 'Error';
            showStandardErrorAnimation();
        } else {
            display.value = result;
            hideErrorMessages();
        }
    } catch (error) {
        display.value = 'Error';
        showErrorMessage('general');
    }
}

function showErrorMessage(type) {
    if (type === 'divide') {
        errorDivideMessage.classList.remove('hidden');
        errorDivideMessage.classList.add('visible');
    } else {
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('visible');
    }
}

function hideErrorMessages() {
    errorMessage.classList.remove('visible');
    errorMessage.classList.add('hidden');
    errorDivideMessage.classList.remove('visible');
    errorDivideMessage.classList.add('hidden');
}

function showStandardErrorAnimation() {
    fetch('ErrorAnimation-vanish.html')
        .then(response => response.text())
        .then(data => {
            const errorContainer = document.createElement('div');
            errorContainer.innerHTML = data;
            document.body.appendChild(errorContainer);
            setTimeout(() => {
                document.body.removeChild(errorContainer);
            }, 5000); // Remove the animation after it completes
        });
}

// Load error messages from external HTML file
fetch('error-messages.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('error-messages-container').innerHTML = data;
        errorMessage = document.getElementById('error-message');
        errorDivideMessage = document.getElementById('error-divide-message');
    });

// Adjust font size to fit the display
display.addEventListener('input', function() {
    const maxFontSize = 5; // in rem
    const minFontSize = 1.5; // in rem
    let fontSize = maxFontSize;
    while (display.scrollWidth > display.clientWidth && fontSize > minFontSize) {
        fontSize -= 0.1;
        display.style.fontSize = fontSize + 'rem';
    }
});
