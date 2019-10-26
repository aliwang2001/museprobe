// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var ctx;

function resetCanvas() {
  $('#features-chart').remove(); // this is my <canvas> element
  $('#features-chart-container').append('<canvas id="features-chart"><canvas>');
  ctx = document.querySelector('#features-chart');
};

function getFeatures(id) {
  
  resetCanvas();

  //let query = '/features?id=' + id;
  let a_query = '/analysis?id=' + id;

  $.get(a_query, function(data) {
    //console.log(data)
    
    let labels = [];
    let values = [];
    
    let pitches = data["segments"]["pitches"]
    console.log(pitches)
    
    /*
    for (var feature in data) {
      if (data.hasOwnProperty(feature) && feature !== 'key' && feature !== 'mode') {
        if(data[feature] <= 1 && data[feature] >= 0) {
          labels.push(feature);
          values.push(data[feature]);
        }
      }
    }
    */
    
    /*
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
          datasets: [{
            data: values,
            backgroundColor: [
              'rgba(30,215,96, 0.9)',
              'rgba(245,115,160, 0.9)',
              'rgba(80,155,245, 0.9)',
              'rgba(255,100,55, 0.9)',
              'rgba(180,155,200, 0.9)',
              'rgba(250,230,45, 0.9)',
              'rgba(0,100,80, 0.9)',
              'rgba(175,40,150, 0.9)',
              'rgba(30,50,100, 0.9)'
            ],
                borderColor: [
                    'rgba(30,215,96, 1)',
                    'rgba(245,115,160, 1)',
                    'rgba(80,155,245, 1)',
                    'rgba(255,100,55, 1)',
                    'rgba(180,155,200, 1)',
                    'rgba(250,230,45, 1)',
                    'rgba(0,100,80, 1)',
                    'rgba(175,40,150, 1)',
                    'rgba(30,50,100, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
              display: false
           },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        max: 1
                    }
                }]
            }
        }
    });
    */
  });
  

}

$(function() {
  //console.log('hello world :o');
  
  let trackID = '';
  let searchQuery = '';
  let resultIDs = [];
  
  $('form').submit(function(event) {
    
    event.preventDefault();
    
    searchQuery = '/search?query=' + $('input').val();
    
    $.get(searchQuery, function(data) {
      
      $('#results').empty();
    
      data.tracks.items.forEach(function(track, index) {
        resultIDs.push(track.id);
        let newEl = $('<li class="text-salmon" onClick="getFeatures(&apos;' + track.id + '&apos;)"></li>').text(track.name + '   |   ' + track.artists[0].name);
        $('#results').append(newEl);
      }); 
      
    });
    
  });

});
