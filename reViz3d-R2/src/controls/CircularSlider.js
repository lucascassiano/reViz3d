import React, { Component } from "react";
import paper from "paper";
import { config } from "./index";
import { start } from "repl";

export default class CircularSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            angle: 0
        }

        this.canvas = React.createRef();
        // this.draw();
    }

    componentDidMount() {
        // window.addEventListener('mousemove', this.onMouseMove);
        if (this.canvas.current)
            this.draw(this.canvas.current);
    }

    /*
 var mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
               var atan = Math.atan2(mPos.x-radius, mPos.y-radius);
               deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                
               X = Math.round(radius* Math.sin(deg*Math.PI/180));    
               Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
    */
    // Create a Paper.js Path to draw a line into it:
    draw = (canvas) => {
        paper.setup(canvas);

        let { width, height } = canvas.getBoundingClientRect();

        let center = new paper.Point(width / 2, height / 2);
        let radius = this.props.radius || height / 2 - 20;

        let bgcircle = new paper.Path.Circle(center, radius)
        bgcircle.strokeWidth = 5;
        bgcircle.strokeColor = config.color1;

        let circleSize = 6;
        let startPos = new paper.Point(center.x, 14 + circleSize);

        var line = new paper.Path.Line(center, startPos);
        line.strokeColor = config.color1;
        line.strokeCap = 'round';
        line.strokeWidth = 5;

        let circle = new paper.Path.Circle(startPos, circleSize);
        circle.fillColor = config.color3;

        var through = new paper.Point(60, 20);
        var to = new paper.Point(80, 80);
        var arc = new paper.Path.Arc(startPos, startPos, startPos);


        //arc.add(startPos);
        arc.strokeColor = 'black';

        circle.onMouseEnter = (event) => {
            event.target.fillColor = config.colorHigh;
        }

        circle.onMouseLeave = (event) => {
            event.target.fillColor = config.color3;
        }
        circle.onMouseUp = (event) => {
            event.target.fillColor = config.color3;
        }

        circle.onMouseDrag = (event) => {
            event.target.fillColor = config.colorHigh;

            let point = event.point;
            var atan = Math.atan2(point.x - width / 2, point.y - height / 2);

            var deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position 
            var X = Math.round(radius * Math.sin(deg * Math.PI / 180));
            var Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
            circle.position.x = X + center.x;
            circle.position.y = Y + center.y;

            var halfX = Math.round(radius * Math.sin((deg * 0.5) * Math.PI / 180));
            var halfY = Math.round(radius * -Math.cos((deg * 0.5) * Math.PI / 180));
            //arc
            var throughPoint = new paper.Point(halfX + center.x, halfY + center.y);
            var toPoint = new paper.Point(X + center.x, Y + center.y);

            line.lastSegment.point = new paper.Point(circle.position.x, circle.position.y);
            this.setState({ angle: deg });

            if (this.props.onChange)
                this.props.onChange(deg);
        }

        paper.view.draw();
    }
    render() {
        let { x, y } = this.state;
        return <div className="circular-slider">
            <canvas className="circular-slider-canvas" ref={this.canvas}></canvas>
            <div className="angle">{this.state.angle.toFixed(2)}</div>
        </div>
    }
}