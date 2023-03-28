// Load the CSV file
d3.csv("static/data/Kaggle_TwitterUSAirlineSentiment.csv").then(function(data) {

    // Define an object to store the counts for each airline
    var counts = {};
  
    // Loop through each row of the CSV data
    data.forEach(function(row) {
  
      // Get the airline name and sentiment from the row
      var airline = row.airline;
      var sentiment = row.airline_sentiment;
  
      // If the airline hasn't been seen before, initialize its counts
      if (!counts[airline]) {
        counts[airline] = {positive: 0, neutral: 0, negative: 0};
      }
  
      // Increment the appropriate sentiment count for the airline
      if (sentiment === "positive") {
        counts[airline].positive++;
      } else if (sentiment === "neutral") {
        counts[airline].neutral++;
      } else if (sentiment === "negative") {
        counts[airline].negative++;
      }
  
    });
    
    var legend = d3.select("#legend")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        .append("g")
        .attr("transform", "translate(" + 50 + "," + 50 + ")");
    
        legend.append("circle").attr("cx",0).attr("cy",0).attr("r", 6).style("fill", "#2ecc71");
        legend.append("circle").attr("cx",0).attr("cy",30).attr("r", 6).style("fill", "#3498db");
        legend.append("circle").attr("cx",0).attr("cy",60).attr("r", 6).style("fill", "#e74c3c");
        legend.append("text").attr("x", 12).attr("y", 0).text("Neutral").style("font-size", "15px").attr("alignment-baseline","middle");
        legend.append("text").attr("x", 12).attr("y", 30).text("Positive").style("font-size", "15px").attr("alignment-baseline","middle");
        legend.append("text").attr("x", 12).attr("y", 60).text("Negative").style("font-size", "15px").attr("alignment-baseline","middle");

    // Create a pie chart for each airline
    let loop_count = 0;
    Object.keys(counts).forEach(function(airline) {
        loop_count++;
        var data = [
            {label: "Positive", value: counts[airline].positive},
            {label: "Neutral", value: counts[airline].neutral},
            {label: "Negative", value: counts[airline].negative}
        ];
        var width = 300;
        var height = 300;
        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal()
            .domain(["Positive", "Neutral", "Negative"])
            .range(["#2ecc71", "#3498db", "#e74c3c"]);
        var svg = d3.select("#chart"+loop_count)
            .append("svg")
            .attr("width", width)
            .attr("height", height+40)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.value; });
        var path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);
        var label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);
        var arc = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");
        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.label); });
        svg.append("text")
            .attr("x", 0)
            .attr("y", 0 + (height / 2) + 15)
            .attr("text-anchor", "middle")
            .attr("class", "title")
            .text(airline);
    });
});
  
  