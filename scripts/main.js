/* --Menu code start-- */
const hamburger = document.querySelector('.hamburger');
const menuWrapper = document.querySelector('.menu-wrapper');
let totalMoneyBacked = 89914;
let totablBackers = 5007;

// Click event for Hamburger
hamburger.addEventListener('click', () => {
    menuWrapper.classList.toggle('active');
    if (menuWrapper.classList.contains('active')) {
        hamburger.firstChild.setAttribute('src', 'images/icon-close-menu.svg');
    } else {
        hamburger.firstChild.setAttribute('src', 'images/icon-hamburger.svg');
    }
});

// closing menu on clicking outside of the manu
document.addEventListener('click', e => {
    if (menuWrapper.classList.contains('active')) {

        // get the bubbled elements to check wheather the click is on menu element
        const elements = e.composedPath();
        let isClickedMenu = false;

        // checking the click is on or inside the menu container
        if (document.documentElement.clientWidth <= 848) {
            if (document.querySelector('.menu-wrapper').classList.contains('active')) {
                // here the 'elements.length - 2' is for ignoring last two element (document and window) 
                for (let index = 0; index < elements.length - 2; index++) {
                    if (elements[index].classList.contains('menu-wrapper') || elements[index].classList.contains('hamburger')) {
                        isClickedMenu = true;
                        break;
                    }
                }
            }

            // if not clicked on menu then changes to close the menu
            if (!isClickedMenu) {
                document.querySelector('.menu-wrapper').classList.remove('active');
                // Changing close icon to hamburger back
                hamburger.firstChild.setAttribute('src', 'images/icon-hamburger.svg');
            }
        }
    }
});

/* --Menu code end-- */

// Modal success button click
const successButton = document.querySelector('.modal-success button');
const modalSuccess = document.querySelector('.modal-success');
successButton.addEventListener('click', () => {
    modalSuccess.classList.remove('active');
    form.reset();
    if (selectedBackOption !== null && typeof selectedBackOption !== 'undefined') {
        selectedBackOption.parentNode.parentNode.classList.remove('active');
    }
});

// Radio button change - selecting backing option
const backOptionRadios = document.querySelectorAll('.modal-select input[type="radio"]');
let selectedBackOption;
for (const backOptionRadio of backOptionRadios) {
    backOptionRadio.addEventListener('change', () => {
        if (selectedBackOption !== null && typeof selectedBackOption !== 'undefined') {
            selectedBackOption.parentNode.parentNode.classList.remove('active');
        }
        selectedBackOption = backOptionRadio;
        backOptionRadio.parentNode.parentNode.classList.add('active');
    });
}

// Modal select close button click
const modalSelectClose = document.querySelector('.modal-select .top-bar img');

modalSelectClose.addEventListener('click', () => {
    closeModalSelect(false);
});

function closeModalSelect(submitClose) {
    const modalSelect = document.querySelector('.modal-select');

    // Scroll to top on close
    if(submitClose) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;    
    }
    modalSelect.scrollTop = 0;

    modalSelect.classList.remove('active');
    form.reset();
    if (selectedBackOption !== null && typeof selectedBackOption !== 'undefined') {
        selectedBackOption.parentNode.parentNode.classList.remove('active');
    }
}

// Add invalid state on incorrect inputting
const pledgeAmtElements = document.querySelectorAll('.modal-select input[type="number"]');
for (const pledgeAmtElement of pledgeAmtElements) {
    pledgeAmtElement.addEventListener('input', () => {
        if (!pledgeAmtElement.validity.valid) {
            pledgeAmtElement.classList.add('invalid');
        } else {
            pledgeAmtElement.classList.remove('invalid');
            // Remove error message if pressent
            const errorMsgElement = pledgeAmtElement.parentNode.nextElementSibling.nextElementSibling;
            if (errorMsgElement.classList.contains('error')) {
                errorMsgElement.classList.remove('error');
                errorMsgElement.firstElementChild.textContent = '';
            }
        }
    });
}

// Modal select backing option submit click
const form = document.querySelector('.modal-select form');
form.setAttribute('novalidate', '');
form.addEventListener('submit', event => {
    event.preventDefault();
    const pledgeAmtElement = document.querySelector('.modal-select .back-option.active input[type="number"]');

    // Checking wheather the selected pledge have input option
    if (pledgeAmtElement !== null && typeof pledgeAmtElement !== 'undefined' && !pledgeAmtElement.validity.valid) {
        const errorMsgElement = document.querySelector('.modal-select .back-option.active .error-wrapper');
        pledgeAmtElement.classList.add('invalid');
        errorMsgElement.classList.add('error');

        if (pledgeAmtElement.validity.valueMissing) {
            errorMsgElement.firstElementChild.textContent = 'Amount require';
        } else if (pledgeAmtElement.validity.typeMismatch) {
            errorMsgElement.firstElementChild.textContent = 'Amount invalid';
        } else if (pledgeAmtElement.validity.rangeUnderflow) {
            errorMsgElement.firstElementChild.textContent = `Invalid (minimum $${pledgeAmtElement.min})`;
        }
    } else if (pledgeAmtElement !== null && pledgeAmtElement !== 'undefined') {
        /* --Update Stats stars-- */
        const moneyBackedElement = document.querySelector('.stats .money-backed span');
        totalMoneyBacked = Number(pledgeAmtElement.value) + totalMoneyBacked;
        // Formatting number to local format
        moneyBackedElement.textContent = `$${totalMoneyBacked.toLocaleString('en-US')}`
    } else {
        /* --Update Stats stars-- */
        const backersElement = document.querySelector('.stats .backers span');
        totablBackers++;
        backersElement.textContent = totablBackers.toLocaleString('en-US');
    }
    closeModalSelect(true);
    const modalSuccessElement = document.querySelector('.modal-success');
    modalSuccessElement.classList.add('active');
});

// Event to select backing option from about component
const backOptions = document.querySelectorAll('.about button');
for (const backOption of backOptions) {
    backOption.addEventListener('click', () => {
        let backOptionRadio;
        if (backOption.parentNode.classList.contains('bamboo-edition')) {
            backOptionRadio = document.getElementById('bamboo_stand');
        } else if (backOption.parentNode.classList.contains('black-edition')) {
            backOptionRadio = document.getElementById('black_edition');
        }
        const modalSelect = document.querySelector('.modal-select');
        modalSelect.classList.add('active');
        backOptionRadio.checked = true;
        selectedBackOption = backOptionRadio;
        backOptionRadio.parentNode.parentNode.classList.add('active');
        backOptionRadio.parentNode.parentNode.scrollIntoView();
    });
}

// Back this project action
const projectBackElement = document.querySelector('.fundraise button');
projectBackElement.addEventListener('click', () => {
    const modalSelect = document.querySelector('.modal-select');
    modalSelect.classList.add('active');
});

const bookmarkElement = document.querySelector('.fundraise .bookmark-wrapper');
bookmarkElement.addEventListener('click', () => {
    bookmarkElement.classList.add('active');
});