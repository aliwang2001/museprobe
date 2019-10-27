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



function getAnalysis(id) {
  
  resetCanvas();

  //let query = '/features?id=' + id;
  let a_query = '/analysis?id=' + id;

  $.get(a_query, function(data) {
    
    console.log(data)
    
    let labels = [];
    //let values = [];
    let max1_values = [];
    let max2_values = [];
    let max3_values = [];
    let duration = [];
    
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
      let seg_list = feature[i]["pitches"]
      var max_value = Math.max(seg_list)
      var max_index = seg_list.indexOf(max_value)
      values.push(max_index)
      
      
    /**
      var index = 0;
      for (var j = 0; j < feature[i]["pitches"].length; j++){
        if (feature[i]["pitches"][index] < feature[i]["pitches"][j]) {
          index = j;
        }
      }
      values.push(index);
      duration.push(feature[i]["duration"])
    }
    **/
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
            label: "max1",
            type: "line",
            borderColor: "#000000",
            data: max1_values,
            fill: false
          }, {
            label: "max2",
            type: "line",
            borderColor: "#3e95cd",
            data: max2_values,
            fill: false
          }, {
            label: "max3",
            type: "line",
            borderColor: "#8e5ea2",
            data: max3_values,
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Top Three Notes in the Segments'
        },
        legend: { display: false }
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
        let newEl1 = $('<h2 class="text-salmon"></h2>').text(track.name + '   |   ' + track.artists[0].name);
        let newEl2 = $('<p class="text-salmon" onClick="getFeatures(&apos;' + track.id + '&apos;)"></p>').text('Click here to get basic track overview');
        let newEl3 = $('<p class="text-salmon" onClick="getFeatures(&apos;' + track.id + '&apos;)"></p>').text('See melody and chord progressions');
        $('#results').append(newEl);
        $('#results').append(newEl2);
        
      
      }); 
      
    });
    
  });

});
