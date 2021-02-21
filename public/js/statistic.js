let ctx = $('#chart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Week overview',
            data: [3, 5, 3, 5, 2, 3, 3],
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



// function setChartValue() {
//     // console.log(myChart.config.data.datasets[0].data[0]);
//     let data = myChart.config.data.datasets[0].data;
//     let sun = 4;
//     // data.push(sun);
// }

// set();