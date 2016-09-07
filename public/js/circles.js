function addCommas( nStr ) {
    nStr += '';
    x = nStr.split( '.' );
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while ( rgx.test( x1 ) ) {
        x1 = x1.replace( rgx, '$1' + ',' + '$2' );
    }
    return x1 + x2;
};

try {
    var movie = $('#moviehours').text();
    var tvshow = $('#tvshowhours').text();
    var book = $('#bookpages').text();
    var game = $('#gamehours').text();
}
catch(err) {
    console.error("Totals were not scraped from the footer.");
    var movie = 0;
    var tvshow = 0;
    var book = 0;
    var game = 0;
}

movie = (movie * 60).toFixed(0);
tvshow = (tvshow * 60).toFixed(0);
game = (game * 60).toFixed(0);

var data = {
    datasets: [{
        data: [
            game,
            book,
            tvshow,
            movie
        ],
        backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#36A2EB"
        ],
        label: 'Chunks'
    }],
    labels: [
        "Game (minutes)",
        "Book (pages)",
        "TV Shows (minutes)",
        "Movies (minutes)"
    ]
};

var ctx = document.getElementById("polar").getContext("2d");

var myChart = new Chart(ctx, {
    data: data,
    type: 'polarArea',
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});[0]

$('#homeButton').click(function() {
  var movie = $('#moviehours').text();
  var tvshow = $('#tvshowhours').text();
  var book = $('#bookpages').text();
  var game = $('#gamehours').text();
  myChart.update();
});
