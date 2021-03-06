//Init var
let date;
const ctx = $('#chart'), 
modal = $('.modal-quote'),
modalClsBtn = $('.modal-close-btn'),
quote = $('#quote'),
searchField = $("#search-quote");


//Init new Chart
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Finished Tasks',
            data: [],
            backgroundColor: 'rgb(69, 37, 242, 02)',
            borderColor: 'rgb(69, 37, 242, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }]
        }
    }
});

//Call functions
getCurrentDay();
setChartValue();
checkForFinishedTasks();
displayQuote();
setStreak();
animateGrid();


quote.click(openModal);
modalClsBtn.click(closeModal);
searchField.keyup(searchQuotes);


function openModal() {
    modal.css({'visibility': 'visible'});
    insertQuoteTable();
    //Animate
    gsap.to(modal, {opacity:1, duration: 1, delay: .5})
}

function closeModal() {
    //Delay for animation
    setTimeout(function(){
    //Close Modal
    modal.css({'visibility': 'hidden'});
    }, 2000)
    //Animate
    gsap.to(modal, {opacity:0, duration: 1})
}

function getCurrentDay() {
        // Get current date
        let today = new Date;

        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
    
        //Set zero in front of day/month if 1 digit
        if (day < 10) {
            day = '0' + day;
            }
        // +1 cause cpu counts up from 0
        month = month + 1;
        if (month < 10){
            month = '0' + month;
        }
    
        date = `${month}.${day}.${year}`;
}




function setChartValue() {
    //Init var
   let data = myChart.config.data.datasets[0].data;

    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Applications/getChartValue',
        type: 'get',
        async: true,
        statusCode: {
            200: function(tasks){  
                // Set the fetched taks to ech specific day
                console.log(tasks[0].mon)   
                let mon = tasks[0].mon;    
                let tue = tasks[0].tue;    
                let wed = tasks[0].wed;    
                let thu = tasks[0].thu;    
                let fri = tasks[0].fri;    
                let sat = tasks[0].sat;    
                let sun = tasks[0].sun;   

                //Push the day var into the cahrt data
                data.push(mon, tue, wed, thu, fri, sat, sun);

                //Update the chart
                myChart.update();
            },
            422: function(){
                //failed
                console.log('error');
            }
        },
    })
    }

 function checkForFinishedTasks() {
    
    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Applications/checkForFinishedTasks',
        type: 'post',
        async: true,
        data: {
            'date': date
        },
        statusCode: {
            200: function(tasks){  
                console.log(tasks.length)
                // If User finished more than 4 task fetch new quote
                if (tasks.length > 4){
                // Call fetchquote function
                fetchQuote();
                }
            },
            422: function(){
                console.log('Quote has already been set');
            }
        },
    })
 }


function fetchQuote() {
    //Get data from quote Api
    $.ajax({
        jsonp: "jsonp",
        dataType: "jsonp",
        url: "http://api.forismatic.com/api/1.0/",
        contentType: "application/jsonp",
        data: {
          lang: "en",
          method: "getQuote",
          format: 'jsonp'
        },
        success(data){
            //Insert data into var
            const quote = data.quoteText;
            const author = data.quoteAuthor;
            // Call function with quote data
            setQuote(quote, author);
        }
    })
}

function setQuote(quote, author){
    //Set fetched quote into database
    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Applications/setQuote',
        type: 'post',
        async: true,
        data: {
            'date': date,
            'quote': quote,
            'author': author,
        },
        statusCode: {
            200: function(tasks){  
                //Call display Quote function
                displayQuote();
            },
            422: function(){
    
            }
        },
    })
}

function displayQuote() {
    //Init var
    // Get HTML element
    let quoteElement = $('#quote');

    // Clear element 
    quoteElement.text('');

    // Get quote from database
    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Applications/displayQuote',
        type: 'post',
        async: true,
        data: {
            'date': date,
        },
        statusCode: {
            200: function(quoteData){  
                console.log(quoteData)
                // Set fetched data into var
                let quote = quoteData[0].quote;
                let author = quoteData[0].author;

                // Display the quote
                quoteElement.text(
                    `Latest Quote: ${quote}  - ${author}`
                )
                
            },
            422: function(){
                // User haven't earned a task yet
                quoteElement.text(
                    `Latest Quote: You have not earned a quote yet`
                )
            }
        },
    })

}


function setStreak(){
    // Get current date
    let today = new Date;
    let dayBefore = new Date();
    dayBefore.setDate(dayBefore.getDate() - 1);

    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let yesterdayDay = dayBefore.getDate();
    let yesterdayMonth = dayBefore.getMonth();
    let yesterdayYear = dayBefore.getFullYear();

    //Set zero in front of day/month if 1 digit
    if (day < 10) {
        day = '0' + day;
        }
    // +1 cause cpu counts up from 0
    month = month + 1;
    if (month < 10){
        month = '0' + month;
    }

    //Set zero in front of day/month if 1 digit
    if (yesterdayDay < 10) {
        yesterdayDay = '0' + yesterdayDay;
        }
    // +1 cause cpu counts up from 0
    yesterdayMonth = yesterdayMonth + 1;
    if (yesterdayMonth < 10){
        yesterdayMonth = '0' + yesterdayMonth;
    }
    
    let currentDay = `${month}.${day}.${year}`;
    let yesterday = `${yesterdayMonth}.${yesterdayDay}.${yesterdayYear}`;
    


    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Applications/checkForStreak',
        type: 'post',
        async: true,
        dataTyp: "json",
        data: {
            'today': currentDay,
            'yesterday': yesterday,
        }
    })
    .done (function(streak){  
        //Get HTML element
        let streakElement = $('#streak');
        
        //Clear element
        streakElement.text('');

        //Display streak
        if (streak == 1){
            streakElement.text(`Current Streak: ${streak} Day!`);
        } else {
            streakElement.text(`Current Streak: ${streak} Days!`);
        }
    })  
}
    


function insertQuoteTable() {
    // Init var
    let modalBody = $('.modal-body');

    //Clear element
    modalBody.html('')


    $.ajax({
    url: 'https://focus-web-app.herokuapp.com/Applications/displayAllQuotes',
    type: 'get',
    async: true,
    statusCode: {
        200: function(quotes){  
            console.log(quotes);

            //Get HTML element
            let table = $('<table class="table-quotes" id="table-data"></table>');

            //Create table head
            let tableHead = $(`
            <tr class="tr-quotes">
                <th class="th-quotes">Quote</th>
                <th class="th-quotes">Author</th>
                <th class="th-quotes">Date</th>
            </tr>`)

            console.log(table);

            //append elements
            table.append(tableHead);

            //Insert quotes
            quotes.forEach(function(quote){
                let quoteElement =`
                <tr class="tr-quotes">
                    <td class="td-quotes">${quote.quote}</td>
                    <td class="td-quotes">${quote.author}</td>
                    <td class="td-quotes">${quote.date}</td>
                </tr>
                `
                //append quotes
                table.append(quoteElement)
            })

            // display table         
            modalBody.append(table);
        },
        422: function(){
            console.log('400');

        }
    },
})

}
    

function searchQuotes(){
    //Init var
    var search = $(this).val();
    
    $.ajax({
        url:'https://focus-web-app.herokuapp.com/Applications/quoteSearch',
        method: 'post',
        data:{
            query:search
        },
        success:function(response){
            //Searched output
            $(".modal-body").html(response);
        }
    });
};