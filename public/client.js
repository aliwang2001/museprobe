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

  let query = '/features?id=' + id;
  let a_query = '/analysis?id=' + id;

  $.get(a_query, function(data) {
    
    console.log(data)
    
    let labels = [];
    let values = [];
    
    var feature = data["segments"];
    var pitch = {
      0: "C",
      1: "C#",
      2: "D",
      3: "D#",
      4: "E",
      5: "F",
      6: "F#",
      7: "G",
      8: "G#",
      9: "A",
      10: "A#",
      11: "B"
    }
    
    for (var i = 0; i < 50; i++) {
      labels.push(i);
      
      var index = 0;
      for (var j = 0; j < feature[i]["pitches"].length; j++){
        if (feature[i]["pitches"][index] < feature[i]["pitches"][j]) {
          index = j;
        }
      }
      values.push(pitch[index]);
    }
    
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
          datasets: [{
            data: values,
            }]
        },
        options: {
            legend: {
              display: false
           },
            scales: {
                xAxes: [{
                type: 'category',
                labels: values
              }]
            }
        }
    });
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
