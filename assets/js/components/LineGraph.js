var d3 = require('d3');

var LineGraph = (function() {
    'use strict';

    function build(data) {

        var vis = d3.select("#visualisation"),
            WIDTH = 350,
            HEIGHT = 200,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            },
            xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain(
                d3.extent(data.reduce(function(a,b) { 
                    return a.concat(b.year) 
                }, []))
            ),
            yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
                d3.extent(data.reduce(function(a,b) { 
                    return a.concat(b.cumulative_so2) 
                }, []))
            ),
            xAxis = d3.svg.axis()
                        .scale(xScale)
                        .tickFormat(d3.format("d")),
            yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
        
        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);
        vis.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);
        
        var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.cumulative_so2);
            })
            .interpolate("basis");
        
        
        vis.append('svg:path')
            .attr('d', lineGen(data))
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        // vis.append('svg:path')
        //     .attr('d', lineGen(data2))
        //     .attr('stroke', 'blue')
        //     .attr('stroke-width', 2)
        //     .attr('fill', 'none');

    }

    return {
        build:build
    };
}());

module.exports = LineGraph;