import React, { Component } from 'react';
import d3 from 'd3';

// const margin = {top:20,right:40,bottom:20,left:40};
const margin = {top:20,right:60,bottom:20,left:150};
const fullWidth = 1000;
const fullHeight = 250;
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;
const xScale = d3.scale.linear().range([margin.left, width - margin.right]),
    yScale = d3.scale.linear().range([height - margin.top, margin.bottom]),
    yScale2 = d3.scale.linear().range([height - margin.top, margin.bottom]),
    xAxis = d3.svg.axis()
                .scale(xScale)
                .tickFormat(d3.format("d")),
    yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left"),
    yAxis2 = d3.svg.axis()
                .scale(yScale2)
                .orient("right");
const ANIM_SPEED = 250;

export class LineGraphBig extends Component {

    shouldComponentUpdate({data, data2, yUnit, y2Unit}) {

        xScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.year)},[])));
        yScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.cumulative_emission)},[])));
        yScale2.domain(d3.extent(data2.reduce(function(a,b) { 
                        return a.concat(b.cumulative_emission)},[])));
        
        var svg = d3.select(this.refs.chart)
                        .select("g")
                        .transition();

        svg.select(".overpayline")
                .duration(ANIM_SPEED)
                .attr("d",d3.svg.line(data));

        svg.select(".x.axis")
                .duration(ANIM_SPEED)
                .call(xAxis);

        svg.select(".y.axis")
                .duration(ANIM_SPEED)
                .call(yAxis)

        svg.select(".y2.axis")
                .duration(ANIM_SPEED)
                .call(yAxis2)

        var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.cumulative_emission);
            })
            .interpolate("basis");

        var lineGen2 = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale2(d.cumulative_emission);
            })
            .interpolate("basis");
        
        svg.select('.line')
            .duration(ANIM_SPEED)
            .attr('d',lineGen(data))
            .attr('stroke', '#0071bc')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        svg.select('.line2')
            .duration(ANIM_SPEED)
            .attr('d',lineGen2(data2))
            .attr('stroke', '#e31c3d')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        svg.select('.y.label')
            .duration(ANIM_SPEED)
            .text(yUnit + " / year");

        svg.select('.y2.label')
            .duration(ANIM_SPEED)
            .text(y2Unit);

        return false;
    }
    
    componentDidMount() {        
        var data = this.props.data;
        var data2 = this.props.data2;
        var yUnit = this.props.yUnit;
        var y2Unit = this.props.y2Unit;

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
                        return a.concat(b.cumulative_emission)},[])));

        yScale2.domain(d3.extent(data2.reduce(function(a,b) {
                        return a.concat(b.cumulative_emission)}, [])));
                
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

        svg.append("svg:g")
            .attr("class", "y2 axis")
            .attr('fill','white')
            .attr('stroke','white')
            .attr("transform", "translate(" + (width) + ",0)")
            .call(yAxis2);
        
        var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.cumulative_emission);
            })
            .interpolate("basis");
        
        svg.append('svg:path')
            .attr('class','line')
            .attr('d', lineGen(data))
            .attr('stroke', '#0071bc')
            .attr('stroke-width', 2)
            .attr('fill', 'none');


        var lineGen2 = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale2(d.cumulative_emission);
            })
            .interpolate("basis");

        svg.append('svg:path')
            .attr('class','line2')
            .attr('d', lineGen2(data2))
            .attr('stroke', '#e31c3d')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        svg.append("text")
            .attr("class","y label")
            .attr("text-anchor","middle")
            .attr("transform","translate(" + (margin.left/4) + "," + (height/2) + ")rotate(-90)")
            .attr("dy",".65em")
            .attr("fill","white")
            .text(yUnit + " / Year");

        svg.append("text")
            .attr("class","y2 label")
            .attr("text-anchor","middle")
            .attr("transform","translate(" + (width + margin.right) + "," + (height/2) + ")rotate(90)")
            .attr("dy",".65em")
            .attr("fill","white")
            .text(y2Unit);

        svg.append("text")
            .attr('class','x label')
            .attr("text-anchor","middle")
            .attr("transform","translate(" + ((width + margin.left)/2) + "," + (height - (margin.bottom/3)) + ")")
            .attr("dy",".65em")
            .attr('y',15)
            .attr("fill","white")
            .text("Year");
    }

    render() {
        return (
          <svg ref="chart"></svg>
        );    
    }
}