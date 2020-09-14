var dropdownMenu = d3.select("#selDataset");
var zipCode;
var zipList = [];
var totalCase;
var totalDeath;
var totalTest;
var testPosRate;
var deathRate;
var caseDensity;
var povertyRate;

function unpack(rows, key) {
  return rows.map(function (row) { return row[key]; }
  )};
 
function init(){

  Plotly.d3.json("http://127.0.0.1:5000/covid", function (err, rows){
    // console.log(rows);
    zipCode = unpack(rows, 'ZIP Code');
    // console.log(zipCode);
    zipCode.forEach(zip => {
         if (!zipList.includes(zip)) {
                zipList.push(zip);
                dropdownMenu.append("option").text(zip).property("value", zip);
              };
            });
    barChart(zipCode[0]);
    doughnutChart(zipCode[0]);
    lineChart(zipCode[0]);
    metaData(zipCode[0]);
});
};

function barChart(zip){
  
  Plotly.d3.json("http://127.0.0.1:5000/covid", function (err, rows){
    console.log(zip);
    rows = rows.filter(d => d['ZIP Code'] === zip);
    console.log(rows);

  var trace1 = {
    type: "bar",
    name: 'Total Cases',
    x: unpack(rows, 'Week Start'),
    y: unpack(rows, 'Cases - Cumulative'),
    transforms: [
      {
        type: 'aggregate',
        groups: unpack(rows, 'Week Start'),
        aggregations: [
          { target: 'y', func: 'sum', enabled: true }
        ]
      }
    ],
    line: { color: '#17BECF' }
  };

  var trace2 = {
    type: "bar",
    name: 'Weekly Cases',
    x: unpack(rows, 'Week Start'),
    y: unpack(rows, 'Cases - Weekly'),
    transforms: [
      {
        type: 'aggregate',
        groups: unpack(rows, 'Week Start'),
        aggregations: [
          { target: 'y', func: 'sum', enabled: true }
        ]
      }
    ],
    line: { color: '#3CB043' }
  };

  var trace3 = {
    type: "bar",
    name: 'Total Deaths',
    x: unpack(rows, 'Week Start'),
    y: unpack(rows, 'Deaths - Cumulative'),
    transforms: [
      {
        type: 'aggregate',
        groups: unpack(rows, 'Week Start'),
        aggregations: [
          { target: 'y', func: 'sum', enabled: true }
        ]
      }
    ],
    line: { color: '#7F7F7F' }
  };

  var trace4 = {
    type: "bar",
    name: 'Weekly Deaths',
    x: unpack(rows, 'Week Start'),
    y: unpack(rows, 'Deaths - Weekly'),
    transforms: [
      {
        type: 'aggregate',
        groups: unpack(rows, 'Week Start'),
        aggregations: [
          { target: 'y', func: 'sum', enabled: true }
        ]
      }
    ],
    line: { color: '#800080' }
  };

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
 // title: 'COVID-19 Progression in Chicago',
  xaxis: {
    tickangle: 45,
  },
  };
  
  d3.select('#bar').html('');

  Plotly.newPlot('bar', data, layout);
  });
};

function lineChart(zip){
  Plotly.d3.json("http://127.0.0.1:5000/covid", function (err, rows){
    // console.log(rows);

    rows = rows.filter(d => d['ZIP Code'] === zip);
  
    var trace1 = {
      name: 'Percent Tested Positive',
      x: unpack(rows, 'Week Start'),
      y: unpack(rows, 'Positive Test Rate'),
      type: "scatter+lines"
    };
    
    // Create our second trace
    var trace2 = {
      name: 'Death Rate',
      x: unpack(rows, 'Week Start'),
      y: unpack(rows, 'Death Rate'),
      type: "scatter+lines"
    };

    var layout = {
   //   title:'Postive Tested Rate And Death Rate',
      xaxis: {
        title: 'Week Starting',
        tickangle:45
      },
      yaxis: {
        title: '% of Test Positive/Death Rate'
      }
    };
    

    var data = [trace1, trace2];

    // Note that we omitted the layout object this time
    // This will use default parameters for the layout
    Plotly.newPlot("bubble", data, layout);

  });
};

function doughnutChart (zip){
  Plotly.d3.json("http://127.0.0.1:5000/census", function (err, rows){
    rows = rows.filter(d => d['ZIP Code'] === zip);
    var population = parseInt(unpack(rows, 'Population'));
    var white = parseInt(unpack(rows, 'White'));
    var black = parseInt(unpack(rows, 'Black or African American'));
    var asian = parseInt(unpack(rows, 'Asian'));
    var native = parseInt(unpack(rows, 'American Indian and Alaska Native'));
    var hawaiian = parseInt(unpack(rows, 'Hawaiian and Other Pacific Islander'));
    var mix = parseInt(unpack(rows, 'Two or More Mixed'));
    var other = parseInt(unpack(rows, 'Other'));

    var myDoughnutChart = new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      data: {
        labels: ["White", "African American", "Asian", "Native American", "Hawaiian"],
        datasets: [
          {
            label: "Population",
            backgroundColor: ["#3E95CD", "#8E5EA2","#3CBA9F","#E8C3B9","#C45850"],
            data: [white, black, asian, native, hawaiian]
          }
        ]
      },
      // options: {
      //   title: {
      //     display: true,
      //     text: 'Race distribution by Zipcode'
      //   }
      // }
  });
    myDoughnutChart;
  });
};

function metaData (zip) {
  
 
  var demographicInfo = d3.select("#sample-metadata");
  demographicInfo.html("");

  Plotly.d3.json("http://127.0.0.1:5000/covid", function (err, rows){
   
    rows = rows.filter(d => d['ZIP Code'] === zip);

  //   var demographicInfo = d3.select("#sample-metadata");
  // demographicInfo.html("");
  
    totalCase = (unpack(rows, 'Cases - Cumulative')).reverse()[0];
    // console.log(totalCase);

    totalDeath = (unpack(rows, 'Deaths - Cumulative')).reverse()[0];
    // console.log(totalDeath);

    testPosRate = (unpack(rows, 'Positive Test Rate')).reverse()[0];
    // console.log(testPosRate);

    deathRate = (unpack(rows, 'Death Rate')).reverse()[0];

    caseDensity = (unpack(rows, 'Case Rate - Cumulative')).reverse()[0];

    
    demographicInfo.append("h6").text( "Total Cases: " + totalCase+ ";"+"\n"); 
    demographicInfo.append("h6").text( "Total Deaths: " + totalDeath+ ";"+"\n"); 
    demographicInfo.append("h6").text( "Percent Tested Positive: " + testPosRate+ "%;"+"\n"); 
    demographicInfo.append("h6").text( "Death Rate: " + deathRate+ "%;"+"\n"); 
    demographicInfo.append("h6").text( "Cases Per 100k Population: " + caseDensity+ ";"+"\n"); 

    
  });

  Plotly.d3.json("http://127.0.0.1:5000/census", function (err, rows){
   
    rows = rows.filter(d => d['ZIP Code'] === zip);

    povertyRate = (unpack(rows, 'Poverty Rate')).reverse()[0];
    // console.log(totalCase);
    
 
  });

  // var demographicInfo = d3.select("#sample-metadata");
  // demographicInfo.html("");

    // demographicInfo.append("h5").text( "Total Cases: " + totalCase+ ";"+"\n"); 
    // demographicInfo.append("h5").text( "Total Deaths: " + totalDeath+ ";"+"\n"); 
    // demographicInfo.append("h5").text( "Percent Test Positive: " + testPosRate+ "%;"+"\n"); 
    // demographicInfo.append("h5").text( "Death Rate: " + deathRate+ "%;"+"\n"); 
    // demographicInfo.append("h5").text( "Cases Per 100k Population: " + caseDensity+ ";"+"\n"); 
    // demographicInfo.append("h5").text( "Poverty Rate: " + povertyRate+ "%;"+"\n"); 
};


function optionChanged(zip) {
  zip=+zip;
  console.log(zip);
  barChart(zip);
  doughnutChart(zip);
  metaData(zip);
  lineChart(zip);

};

init();



