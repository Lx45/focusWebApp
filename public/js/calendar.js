

// Init var
const modal = $('.modal-bg');
const calendarButtons = $('.calendar-buttons');
const dateBtn = $('.date-button');
const weekBtn = $('.week-button');
const modalCloseBtn = $('.modal-close-btn');
let currentWeekDays = [];


let nav = 0;
let clicked = null;


const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

initButtons();
loadStuff();
setDateButton();
dateBtn.click(openModal);
modalCloseBtn.click(closeModal);

function openModal() {
    currentWeekDays = [];
    modal.css({'visibility': 'visible'});
}

function closeModal() {
    modal.css({'visibility': 'hidden'});
}


// Set the date button to current or choosen Date
function setDateButton(currentMonth = new Date().getMonth(), currentDay = new Date().getDate(), currentYear = new Date().getFullYear(),) {
    
    let choosenDate = new Date();
    choosenDate.setDate(currentDay);
    choosenDate.setMonth(currentMonth);
    choosenDate.setYear(currentYear);

    // Get Week
    let currentWeek = choosenDate.getWeek();
    // console.log('hier '+choosenDate);

    // Empty array, if function was already called
    currentWeekDays= [];
    // Get Weekdays // Stackoverflow
    let first = choosenDate.getDate() - choosenDate.getDay();
    let firstDay = (new Date(choosenDate.setDate(first+1))).toString();
    for(let i = 1; i < 8; i++) {
        let next = new Date(choosenDate.getTime());
        next.setDate(first+i);

        let day = next.getDate();
        let month = next.getMonth();
        let year = next.getFullYear();

            //Set zero in front of day/month if 1 digit
            if (day < 10) {
            day = '0' + day;
            }
            // +1 cause cpu counts up from 0
            month = month + 1;
            if (month < 10){
                month = '0' + month;
            }

        next = `${month}.${day}.${year}`;
        

        currentWeekDays.push(next);
        
        // console.log(next);
        // console.log(next.toString());
    }
    console.log('fired'+currentWeekDays);
    // console.log(first);
    // console.log(firstDay);
    

    //Set zero in front of day/month if 1 digit
    if (currentDay < 10) {
        currentDay = '0' + currentDay;
    }
    // +1 cause cpu counts up from 0
    currentMonth = currentMonth + 1;
    if (currentMonth < 10){
        currentMonth = '0' + currentMonth;
    }

    // 
    if (currentWeek < 10){
        currentWeek = '0' + currentWeek;
    }


    dateBtn.text(`${currentMonth}.${currentDay}.${currentYear}`);
    weekBtn.text(`Week ${currentWeek}`);

    closeModal();
};
// console.log(currentWeekDays);

function loadStuff() {
    //Current date
    const dt = new Date();

    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    // Get day/month/year
    let day = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    


    // Get first day of month
    const firstDayofMonth = new Date(year, month, 1);

    // How many days are in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // display fist day of month in another way
    const dateString = firstDayofMonth.toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })


    // amount of blank days at the beginning of calendar
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    // console.log(paddingDays);
    // Set name of viewed month on top of calendar
    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    // Clear calender for next Month
    calendar.innerHTML = '';

    for(let i = 1; i<= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        //  console.log('daystring ' + dayString);

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            // Mark current day in calender
            if(i - paddingDays === day && nav === 0){
                daySquare.id = 'currentDay';
            }
            
            

            daySquare.addEventListener('click', (e) => {
                clickedDay = e.target.innerText;
                // console.log(day);
                getClickedDate(month, clickedDay, year)
            })
        } else {
            daySquare.classList.add('padding');
        }


        calendar.appendChild(daySquare);
    }
    // console.log(paddingDays);
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    })
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    })
 }

function getClickedDate(month, clickedDay, year) {
    setDateButton(month, clickedDay, year);
}



  let test = new Date();
// console.log(test.getWeek());