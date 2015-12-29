import React, { Component } from 'react';
import d3 from 'd3';

// const margin = {top:20,right:40,bottom:20,left:40};
// const fullWidth = 450;
// const fullHeight = 200;
// const width = fullWidth - margin.left - margin.right;
// const height = fullHeight - margin.top - margin.bottom;
// const xScale = d3.scale.linear().range([margin.left, width - margin.right]),
//     yScale = d3.scale.linear().range([height - margin.top, margin.bottom]),
//     xAxis = d3.svg.axis()
//                 .scale(xScale)
//                 .tickFormat(d3.format("d")),
//     yAxis = d3.svg.axis()
//                 .scale(yScale)
//                 .orient("left");
// const ANIM_SPEED = 250;

export class LineGraphResizable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            margin: {top:20,right:40,bottom:20,left:40},
            fullWidth: 450,
            fullHeight: 200,
            ANIM_SPEED: 250
        };
    }

    shouldComponentUpdate({data}) {

        const width  = this.state.fullWidth - this.state.margin.left - this.state.margin.right,
              height = this.state.fullHeight - this.state.margin.top - this.state.margin.bottom,
              xScale = d3.scale.linear().range([this.state.margin.left, this.width - this.state.margin.right]),
              yScale = d3.scale.linear().range([height - this.state.margin.top, this.state.margin.bottom]),
              xAxis = d3.svg.axis()
                        .scale(xScale)
                        .tickFormat(d3.format("d")),
              yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");        


        xScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.year)},[])));
        yScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.cumulative_so2)},[])));
        
        let svg = d3.select(this.refs.chart)
                        .select("g")
                        .transition();

        svg.select(".overpayline")
                .duration(this.state.ANIM_SPEED)
                .attr("d",d3.svg.line(data));
        // svg.select(".baseline")
        //         .duration(ANIM_SPEED)
        //         .attr("d",baseline(data))

        svg.select(".x.axis")
                .duration(this.state.ANIM_SPEED)
                .call(xAxis);

        svg.select(".y.axis")
                .duration(this.state.ANIM_SPEED)
                .call(yAxis)

        let lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.cumulative_so2);
            })
            .interpolate("basis");
        
        svg.select('.line')
            .duration(this.state.ANIM_SPEED)
            .attr('d',lineGen(data))
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        return false;
    }
    
    componentDidMount() {
        const width  = this.state.fullWidth - this.state.margin.left - this.state.margin.right,
              height = this.state.fullHeight - this.state.margin.top - this.state.margin.bottom,
              xScale = d3.scale.linear().range([this.state.margin.left, this.width - this.state.margin.right]),
              yScale = d3.scale.linear().range([height - this.state.margin.top, this.state.margin.bottom]),
              xAxis = d3.svg.axis()
                        .scale(xScale)
                        .tickFormat(d3.format("d")),
              yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left"); 

        let data = this.props.data;

        let svg = d3.select(this.refs.chart)
                        .attr('width','100%')
                        .attr('height','100%')
                        .attr("viewBox",`0 0 ${this.state.fullWidth} ${this.state.fullHeight}`)
                        .attr('preserveAspectRatio','xMidYMid')
                        .append('g')
                        .attr('transform',`translate(${this.state.margin.left},${this.state.margin.top})`);        
        xScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.year)},[])));
        yScale.domain(d3.extent(data.reduce(function(a,b) { 
                        return a.concat(b.cumulative_so2)},[])));
                
        svg.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - this.state.margin.bottom) + ")")
            .call(xAxis);
        svg.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (this.state.margin.left) + ",0)")
            .call(yAxis);
        
        let lineGen = d3.svg.line()
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
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

    }

    render() {
        return (
            <svg ref="chart"></svg>
        );    
    }
}