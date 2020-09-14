//this creates a connetion to the DOM from JS for this particular element
var dropdownMenu = d3.select("#selDataset");
//place holder for global variables
var globalData;
var sampleValues;
var otuIds;
var otuId;
var otuLabels;

//This is an initialization function
// Fetch the JSON data and console log it
function init() {
    d3.json("../samples.json").then(function (data) {
        console.log(data);
        globalData = data;
        var names = globalData.names;

        names.forEach(name => {
            dropdownMenu.append("option").text(name).property("value", name)
        })
        barChart("940");
        bubbleChart("940");
        metaData("940");
    });
}

// Function to generate a bar chart
function barChart(name) {
    name = parseInt(name);
    //filter samples by ID
    var sampleFiltered = globalData.samples.filter(sample => parseInt(sample.id) === name)[0];
    // Getting the top 10 
    var sampleValues = sampleFiltered.sample_values.slice(0, 10).reverse();
    // get only top 10 otu ids for the plot OTU and reversing it. 
    var otuIds = (sampleFiltered.otu_ids.slice(0, 10)).reverse();
    // get the otu id's to the desired form for the plot
    var otuId = otuIds.map(x => "OTU " + x)
    //get the top 10 labels
    var otuLabels = (sampleFiltered.otu_labels.slice(0, 10)).reverse();
    // Create your trace.
    var trace1 = {
        x: sampleValues,
        y: otuId,
        text: otuLabels,
        type: "bar",
        orientation: 'h'
    };
    // Create the data array for our plot
    var data = [trace1];
    // Define our plot layout
    var layout = {
        title: "Top 10 OTUs",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);
}

//Function to generate a Bubble Chart
function bubbleChart(name) {
    name = parseInt(name);
    //filter samples by ID
    var sampleFiltered = globalData.samples.filter(sample => parseInt(sample.id) === name)[0];
    // Getting the top 10 
    var sampleValues = sampleFiltered.sample_values.slice(0, 10).reverse();
    // get only top 10 otu ids for the plot OTU and reversing it. 
    var otuIds = (sampleFiltered.otu_ids.slice(0, 10)).reverse();

    //get the top 10 labels
    var otuLabels = (sampleFiltered.otu_labels.slice(0, 10)).reverse();
    // Create your trace.
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        mode: 'markers',
        marker: {
            size: [40, 60, 80, 100]
        }
    };
    var trace1 = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        text: otuLabels,
        marker: {
            color: otuIds,
            size: sampleValues
        }
    };
    // Create the data array for our plot
    var data = [trace1];
    // Define our plot layout
    var layout = {
        title: "Top 10 OTUs",
        height: 600,
        width: 1000
    };
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", data, layout);
}

function metaData(name) {
    name = parseInt(name);
    //filter samples by ID
    var sampleFiltered = globalData.metadata.filter(sample => parseInt(sample.id) === name)[0];
    // select demographic panel to put data
    var demographicData = d3.select("#sample-metadata");
    // empty the demographic info panel each time before getting new id info
    demographicData.html("");
    // grab the necessary demographic data data for the id and append the info to the panel
    Object.entries(sampleFiltered).forEach((key) => {
        demographicData.append("h5").text(key[0] + ": " + key[1] + "\n");
    });
}

function optionChanged(name) {
    barChart(name);
    bubbleChart(name);
    metaData(name);
}

init();