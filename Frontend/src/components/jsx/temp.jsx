import React, { Component } from 'react';
import * as d3 from "d3";

class Temp extends Component {

    componentDidMount() {
        this.drawChart();
    }


    drawChart() {
        const data = this.props.data;

        var w = window.innerWidth;
        var h = window.innerHeight;

        const svg = d3.select("#temp_circle").append("svg")
            .attr("width", w*0.6)
            .attr("height", w*0.6);
        var margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        var color = d3.scaleLinear()
            .domain([5, 4, 3, 2, 1, 0, -1])
            .range(["#3B28CC", "#2667FF", "#3F8EFC", "#87BFFF", "#ADD7F6"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(10);


            var root = d3.hierarchy(data)
                .sum(function (d) { return d.size; })
                .sort(function (a, b) { return b.value - a.value; });

            var focus = root,
                nodes = pack(root).descendants(),
                view;

            var circle = g.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function (d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
                .style("fill", function (d) { return d.children ? color(d.depth) : "#ADD7F6"; })
                .on("click", function (d) { if (focus !== d && d.depth < 3) zoom(d), d3.event.stopPropagation(); });

            var text = g.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
                .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
                .style("font-size", function (d) { return (d.r > 20) ? '20px' : '15px' })
                .attr("dx", "-.8em")
                .text(function (d) { return d.data.name; });

            var node = g.selectAll("circle,text");

            svg
                .style("background", color(-1))
                .on("click", function () { zoom(root); });

            zoomTo([root.x, root.y, root.r * 2 + margin]);

            function zoom(d) {
                var focus0 = focus; focus = d;

                var transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function (d) {
                        var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function (t) { zoomTo(i(t)); };
                    });

                transition.selectAll("text")
                    .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
                    .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
                    .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
                    .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
            }

            function zoomTo(v) {
                var k = diameter / v[2]; view = v;
                node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
                circle.attr("r", function (d) { return d.r * k; });
            }
    }

    render() {
        return <div id={this.props.id} ></div>
    }
}

export default Temp;