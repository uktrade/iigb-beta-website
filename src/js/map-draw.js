var d3 = require('d3');
module.exports = mapDraw

function mapDraw() {
  var filter;

  var file = $('#mapCanvas')[0].dataset.file;
  var build = document.iigbBuild ? document.iigbBuild + '/' : '';
  var mapDataUrl = '/assets/' + build + file;

  d3.json(mapDataUrl, function(error, data) {
    var gridBaseValue = data.baseValue;
    var dotRadius = data.radius;
    var dotData = data.points;
    var pathData = data.paths;
    var clickable = data.clickable;

    var width = (Math.max.apply(Math,dotData.map(function(o){return o.x_axis;})) + 1) * gridBaseValue;
    var height = (Math.max.apply(Math,dotData.map(function(o){return o.y_axis;})) + 1) * gridBaseValue;

    var mapCanvas = d3.select('#mapCanvas').append('svg')
                                            .attr( 'preserveAspectRatio','xMinYMin meet')
                                            .attr('viewBox', '0 0 ' + width + ' ' + height)
                                            .attr('class', file.split('.')[0])


    var paths = mapCanvas.selectAll('paths')
                          .data(pathData)
                          .enter()
                          .append('path');

    var pathAttributes = paths
                          .attr('d', function(d) { return d.drawPoints })
                          .attr('class', function(d) {return d.class })
                          .attr('transform', 'scale(' + gridBaseValue + ')')
                          .on('click', function(d, i) {
                            if (clickable) {
                              window.location.href = window.location.href + d.region;
                            }
                          });

    // 'vector-effect: non-scaling-stroke;' in CSS prevents stroke to be too thick once scaled but this isn't supported by older IE
    // Instead we apply the inverse value of scale transform to stoke-with to end up with a 1px stroke-width
    mapCanvas.selectAll('path')
     .style('stroke-width', 1/gridBaseValue);

    var dots = mapCanvas.selectAll('circle')
                            .data(dotData)
                            .enter()
                            .append('circle');

    var dotAttributes = dots
                         .attr('cx', function (d) { return (d.x_axis * gridBaseValue); })
                         .attr('cy', function (d) { return (d.y_axis * gridBaseValue); })
                         .attr('r', function (d) { return dotRadius; })
                         .attr('class', function(d) { return d.class + ' ' + d.region; })
                         .attr('data-automotive', function(d) { return d.automotive })
                         .attr('data-aerospace', function(d) { return d.aerospace })
                         .attr('data-energy', function(d) { return d.energy })
                         .attr('data-creative', function(d) { return d.creative })
                         .attr('data-health', function(d) { return d.health })
                         .attr('data-manufacturing', function(d) { return d.manufacturing })
                         .attr('data-retail', function(d) { return d.retail })
                         .attr('data-food', function(d) { return d.food })
                         .attr('data-financial', function(d) { return d.financial })
                         .attr('data-technology', function(d) { return d.technology })
                         .on('click', function(d, i) { 
                            if (clickable) {
                              window.location.href = window.location.href + d.region;
                            }
                          });
  });

  var filters = $('.sector-filter');
  for (var i = 0; i < filters.length; i++) {
    $(filters[i]).on('change', function(e) {
      filter = e.target.value;
      var mapPoints = $('.uk-dot');
      mapPoints.hide();
      for(var j = 0; j < mapPoints.length; j++) {
        if (mapPoints[j].dataset[filter] && mapPoints[j].dataset[filter] > 0) {
          $(mapPoints[j]).show();
        }
      };
    });
  };
}