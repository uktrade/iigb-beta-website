var d3 = require('d3');
module.exports = renderInvestmentChart

function renderInvestmentChart() {

  // set the dimensions of the canvas
  var margin = {top: 50, right: 5, bottom: 5, left: 5}
  var width = 500 - margin.left - margin.right;
  var height = 110 - margin.top - margin.bottom;


  // set the ranges
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.5);

  var y = d3.scaleLinear().range([height, 0]);

  // define the axis
  var xAxis = d3.axisBottom()
      .scale(x)

  var yAxis = d3.axisLeft()
      .scale(y)


  // add the SVG element
  var svg = d3.select('#investment-chart').append('svg')
      .attr( 'preserveAspectRatio','xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
    .append('g')
      .attr('transform', 
            'translate(' + margin.left + ',' + margin.top + ')');


  // load the data
  var build = document.iigbBuild ? document.iigbBuild + '/' : '';
  var chartDataUrl = '/assets/' + build + 'data.json';
  d3.json(chartDataUrl, function(error, data) {

      data.forEach(function(d) {
          d.Year = d.Year;
          d.Value = +d.Value;
      });
    
    // scale the range of the data
    x.domain(data.map(function(d) { return d.Year; }));
    y.domain([0, d3.max(data, function(d) { return d.Value; })]);


    // Add bar chart
    svg.selectAll('bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.Year); })
        .attr('width', '3px')
        .attr('y', function(d) { return y(d.Value); })
        .attr('height', function(d) { return height - y(d.Value); });


    // Add year labels
    svg.selectAll('text.year')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'year')
      .text(function(d) {
        return d.Year;
      })
      .attr('x', function(d) { return x(d.Year); })
      .attr('y', function(d) { return y(d.Value) - 15; })
      .attr('font-family', 'Roboto')
      .attr('font-size', '15px')
      .attr('fill', '#666')
      .attr('text-anchor', 'middle');

    
    // Add value labels
    svg.selectAll('text.value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value')
      .text(function(d) {
        return d.Value;
      })
      .attr('x', function(d) { return x(d.Year); })
      .attr('y', function(d) { return y(d.Value) - 35; })
      .attr('font-family', 'Roboto')
      .attr('font-weight', 'bold')
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle');

  });
  
}
