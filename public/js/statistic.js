
let ctx = $('#chart');

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Week overview',
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

setChartValue();

 function setChartValue() {

   let data = myChart.config.data.datasets[0].data;



$.ajax({
    url: '/focusWebApp/Applications/getChartValue',
    type: 'post',
    async: true,
    data: {

    },
    statusCode: {
        200: function(tasks){  
            console.log(tasks[0].mon)   
            let mon = tasks[0].mon;    
            let tue = tasks[0].tue;    
            let wed = tasks[0].wed;    
            let thu = tasks[0].thu;    
            let fri = tasks[0].fri;    
            let sat = tasks[0].sat;    
            let sun = tasks[0].sun;   
            data.push(mon, tue, wed, thu, fri, sat, sun);
            myChart.update();
        },
        422: function(){

        }
    },
})
 }

 function checkForFinishedTasks() {
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

    let date = `${month}.${day}.${year}`;

    console.log(date);
    
    $.ajax({
        url: '/focusWebApp/Applications/checkForFinishedTasks',
        type: 'post',
        async: true,
        data: {
            'date': date
        },
        statusCode: {
            200: function(tasks){  
                console.log(tasks.length)
                if (tasks.length > 4){
                    console.log('test')
                fetchQuote(date);
                }
            },
            422: function(){
    
            }
        },
    })

 }

 checkForFinishedTasks();

    function fetchQuote(date) { 
        let num = Math.floor(Math.random() * Math.floor(1643));
        console.log(num);
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://type.fit/api/quotes",
            "method": "GET"
        }
        
        $.ajax(settings).done(function (response) {
            const data = JSON.parse(response);
            let quote = data[num].text;
            let author = data[num].author;
            console.log(data[num]);
            setQuote(date, quote, author);
        });
    }

    function setQuote(date, quote, author){

        $.ajax({
            url: '/focusWebApp/Applications/setQuote',
            type: 'post',
            async: true,
            data: {
                'date': date,
                'quote': quote,
                'author': author,
            },
            statusCode: {
                200: function(tasks){  
                    console.log(tasks)
                    displayQuote();
                },
                422: function(){
        
                }
            },
        })
    }

    function displayQuote() {
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
    
        let date = `${month}.${day}.${year}`;

        $.ajax({
            url: '/focusWebApp/Applications/displayQuote',
            type: 'post',
            async: true,
            data: {
                'date': date,
            },
            statusCode: {
                200: function(quoteData){  
                    console.log(quoteData)
                    let quote = quoteData[0].quote;
                    let author = quoteData[0].author;
                    let quoteElement = $('#quote');
                    quoteElement.text('');
                    quoteElement.text(
                        `Latest Quote: ${quote}  - ${author}`
                    )
                    
                },
                422: function(){
        
                }
            },
        })

    }



    displayQuote();