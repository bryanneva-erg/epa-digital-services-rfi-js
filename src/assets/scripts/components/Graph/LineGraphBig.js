import React, { Component } from 'react';
import d3 from 'd3';

const margin = {top:20,right:40,bottom:20,left:40};
const fullWidth = 900;
const fullHeight = 200;
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;
const xScale = d3.scale.linear().range([margin.left, width - margin.right]),
    yScale = d3.scale.linear().range([height - margin.top, margin.bottom]),
    xAxis = d3.svg.axis()
                .scale(xScale)
                .tickFormat(d3.format("d")),
    yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
const ANIM_SPEED = 250;

export class LineGraphBig extends Component {

    shouldComponentUpdate({data}) {
        xScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.year)},[])));
        yScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.cumulative_so2)},[])));
        
        var svg = d3.select(this.refs.chart)
                        .select("g")
                        .transition();

        svg.select(".overpayline")
                .duration(ANIM_SPEED)
                .attr("d",d3.svg.line(data));
        // svg.select(".baseline")
        //         .duration(ANIM_SPEED)
        //         .attr("d",baseline(data))

        svg.select(".x.axis")
                .duration(ANIM_SPEED)
                .call(xAxis);

        svg.select(".y.axis")
                .duration(ANIM_SPEED)
                .call(yAxis)

        var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.cumulative_so2);
            })
            .interpolate("basis");
        
        svg.select('.line')
            .duration(ANIM_SPEED)
            .attr('d',lineGen(data))
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        return false;
    }
    
    componentDidMount() {        
        var data = this.props.data;
        var data2 = this.props.data2;
        // console.log(data2);

        var svg = d3.select(this.refs.chart)
                        .attr('width','100%')
                        .attr('height','100%')
                        .attr("viewBox",`0 0 ${fullWidth} ${fullHeight}`)
                        .attr('preserveAspectRatio','xMidYMid')
                        .append('g')
                        .attr('transform',`translate(${margin.left},${margin.top})`);        
        xScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.year)},[])));
        yScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.cumulative_so2)},[])));
                
        svg.append("svg:g")
            .attr("class", "x axis")
            .attr('stroke','white')
            .attr('fill','white')
            .attr('stroke','white')
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(xAxis);
        svg.append("svg:g")
            .attr("class", "y axis")
            .attr('fill','white')
            .attr('stroke','white')
            .attr("transform", "translate(" + (margin.left) + ",0)")
            .call(yAxis);
        
        var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.cumulative_so2);
            })
            .interpolate("basis");
        
        svg.append('svg:path')
            .attr('class','line')
            .attr('d', lineGen(data))
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        svg.append('svg:path')
            .attr('class','line')
            .attr('d', lineGen(data2))
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

    }

    render() {
        return (
          <svg ref="chart"></svg>
        );    
    }
}