// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

function getFeatures(id) {
  console.log('hi');

  let query = '/features?id=' + id;

  $.get(query, function(data) {
    console.log(data)
    $('#features').text(JSON.stringify(data, null, 4));
    
    let labels = [];
    let values = [];
    
    for (var feature in data) {
      if (data.hasOwnProperty(feature)) {
        labels.push(feature);
        values.push(data[feature]);
      }
    }
    
    var ctx = $("#features-chart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Value',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  });
  

}

$(function() {
  console.log('hello world :o');
  
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
        let newEl = $('<li onClick="getFeatures(&apos;' + track.id + '&apos;)"></li>').text(track.name + '   |   ' + track.artists[0].name);
        $('#results').append(newEl);
      }); 
      
    });
    
  });

});
