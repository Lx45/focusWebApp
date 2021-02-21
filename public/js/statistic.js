let ctx = $('#chart');
var myChart = new Chart(ctx, {
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



 function setChartValue() {
//     // console.log(myChart.config.data.datasets[0].data[0]);
   let data = myChart.config.data.datasets[0].data;
//     let sun = 4;
//     // data.push(sun);

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
        },
        422: function(){

        }
    },
})
 }

setChartValue();