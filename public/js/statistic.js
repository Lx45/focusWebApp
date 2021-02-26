
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
        // let num = Math.floor(Math.random() * Math.floor(1643));
        // console.log(num);


        const settings = {
            "async": true,
            "crossDomain": true,
            //  "url": "https://type.fit/api/quotes",
            "url": "https://random-math-quote-api.herokuapp.com/",
            "method": "GET",
            
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            // const data = JSON.parse(response);
             const data = response;
            // let quote = data[num].text;
            // let author = data[num].author;
            let quote = data.quote;
            let author = data.author;
            // console.log(data[num]);
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

    function setStreak(){
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
        
        let currentDay = `${month}.${day}.${year}`;
        let yesterday = `${month}.${day - 1}.${year}`;

        console.log(yesterday);

        $.ajax({
            url: '/focusWebApp/Applications/checkForStreak',
            type: 'post',
            async: true,
            data: {
                'today': currentDay,
                'yesterday': yesterday,
            },
            statusCode: {
                200: function(streak){  
                    console.log(streak);
                    console.log('200');
                    
                    let streakElement = $('#streak');
                    streakElement.text('');
                    if (streak == 1){
                        streakElement.text(`Current Streak: ${streak} Day!`);
                    } else {
                        streakElement.text(`Current Streak: ${streak} Days!`);
                    }
                },
                422: function(){
                    console.log('400');
                }
            },
        })
        
    }
    setStreak();

    let modal = $('.modal');
    $('#quote').click(openModal);
    let modalClsBtn = $('.modal-close-btn');
    modalClsBtn.click(closeModal);
    
    function openModal() {
        modal.css({'visibility': 'visible'});
        insertQuoteTable();
    }
    
    function closeModal() {
        modal.css({'visibility': 'hidden'});
    }



     function insertQuoteTable() {
         // Init var
         let modalBody = $('.modal-body');

         $.ajax({
            url: '/focusWebApp/Applications/displayAllQuotes',
            type: 'get',
            async: true,
            statusCode: {
                200: function(quotes){  
                    console.log(quotes);

                    let table = $('<table class="table-quotes" id="table-data"></table>');
                    let tableHead = $(`
                    <tr class="tr-quotes">
                        <th class="th-quotes">Quote</th>
                        <th class="th-quotes">Author</th>
                        <th class="th-quotes">Date</th>
                    </tr>`)

                    console.log(table);

                    table.append(tableHead);

                    quotes.forEach(function(quote){
                        let quoteElement =`
                        <tr class="tr-quotes">
                            <td class="td-quotes">${quote.quote}</td>
                            <td class="td-quotes">${quote.author}</td>
                            <td class="td-quotes">${quote.date}</td>
                        </tr>
                        `
                        table.append(quoteElement)
                    })

                    
                    modalBody.append(table);

                    console.log('what is going on')

                },
                422: function(){
                    console.log('400');

                }
            },
        })

     }
    


        $("#search-quote").keyup(function(){
        console.log('test1.5');
        var search = $(this).val();
        console.log('test2');
        $.ajax({
          url:'/focusWebApp/Applications/quoteSearch',
          method: 'post',
          data:{query:search},
          success:function(response){
            console.log(response);
            $(".modal-body").html(response);
          }
        });
      });