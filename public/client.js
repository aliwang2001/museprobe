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
  let query = '/features?id=' + id;
  
  $.get(query, function(data) {
    //let labels = ["keys", "tempo", "time signature"];
    var key = data["key"];
    var tempo = data["tempo"];
    var time_signature = data["time_signature"];
    
    //let values = [key, tempo, time_signature];
});
}



function getAnalysis(id) {
  
  resetCanvas();

  let a_query = '/analysis?id=' + id;

  $.get(a_query, function(data) {
    
    console.log(data)
    
    let max_labels = [];
    let max1_indices = [];
    let max1_values = [];
    let max2_indices = [];
    let max2_values = [];
    let max3_indices = [];
    let max3_values = [];
    let duration = [];
    
    var feature = data["segments"];

    for (var i = 0; i < 10; i++) {
      max_labels.push(i);
      let seg_list = feature[i]["pitches"];
      var max1_index = seg_list.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      max1_indices.push(max1_index);
      max1_values.push(seg_list[max1_index]);
      seg_list[max1_index] = 0;
      var max2_index = seg_list.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      max2_indices.push(max2_index);
      max2_values.push(seg_list[max2_index]);
      seg_list[max2_index] = 0;
      var max3_index = seg_list.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      max3_indices.push(max3_index);
      max3_values.push(seg_list[max3_index]);
    }
    
    let bubble_data = []
    var k = 20;
    for (var i = 0; i < max_labels.length; i++) {
      var dict = {};
      dict.x = i;
      dict.y = max1_indices[i];
      dict.r = Math.sqrt(max1_values[i]) * k;
      bubble_data.push(dict);
    }
    
    for (var i = 0; i < max_labels.length; i++) {
      var dict = {};
      dict.x = i;
      dict.y = max2_indices[i];
      dict.r = Math.sqrt(max2_values[i]) * k;
      bubble_data.push(dict);
    }
    
    for (var i = 0; i < max_labels.length; i++) {
      var dict = {};
      dict.x = i;
      dict.y = max3_indices[i];
      dict.r = Math.sqrt(max3_values[i]) * k;
      bubble_data.push(dict);
    }
    
    /*
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: max1_values,
            ticks: {
                min: 0
            }
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
        }
      }
    });
  });
  */
    
    var options = {responsive: true, // Instruct chart js to respond nicely.
};
    
    var myChart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
                data: bubble_data, // Specify the data values array
                borderColor: '#2196f3', // Add custom color border            
                backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            }]
      },
      options: options
});
    /*
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: max_labels,
        datasets: [{
            label: "max1",
            type: "bar",
            borderColor: "#000000",
            data: max1_values,
          }, {
            label: "max2",
            type: "bar",
            borderColor: "#3e95cd",
            data: max2_values,
          }, {
            label: "max3",
            type: "bar",
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
        let newEl1 = $('<li class="text-salmon" onClick="getAnalysis(&apos;' + track.id + '&apos;)"></li>').text(track.name + '   |   ' + track.artists[0].name);
        //let newEl2 = $('<li class="text-salmon" onClick="getFeatures(&apos;' + track.id + '&apos;)"></li>').text('Click here to get basic track overview');
        //let newEl3 = $('<li class="text-salmon" onClick="getAnalysis(&apos;' + track.id + '&apos;)"></li>').text('See melody and chord progressions');
        $('#results').append(newEl1);
        //$('#results').append(newEl2);
        //$('#results').append(newEl2);
        
      
      }); 
      
    });
    
  });

});
