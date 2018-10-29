import React, { Component } from "react";
import paper from "paper";
import { config } from "./index";

export default class LineEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0
        }

        this.canvas = React.createRef();
        // this.draw();
    }

    componentDidMount() {
        // window.addEventListener('mousemove', this.onMouseMove);
        if (this.canvas.current)
            this.draw(this.canvas.current);
    }

    // Create a Paper.js Path to draw a line into it:
    draw = (canvas) => {
        paper.setup(canvas);
        let colorLines = 'rgba(0,0,0,0.1)';
        let { width, height } = canvas.getBoundingClientRect();
        let center = new paper.Point(width / 2, height / 2);


        var myPath = new paper.Path({ strokeWidth: 2, strokeCap: 'round' });
        myPath.strokeColor = config.color3;

        let points = this.props.points || [];

        let step = (width - 10) / (points.length - 1);
        let circles = [];

        for (var i = 0; i < points.length; i++) {
            let point = new paper.Point(5 + i * step, height - points[i]);
            myPath.add(point);
            let segment = myPath.segments[i];

            let circle = new paper.Path.Circle(point, 3)

            circle.fillColor = 'rgba(0,0,0,0.25)';

            circle.onMouseEnter = (event) => {
                event.target.fillColor = config.colorHigh;
            }

            circle.onMouseLeave = (event) => {
                event.target.fillColor = 'rgba(0,0,0,0.25)';
            }

            circle.onMouseUp = (event) => {
                event.target.fillColor = 'rgba(0,0,0,0.25)';
            }

            circle.onMouseDrag = (event) => {
                event.target.fillColor = config.colorHigh;
                pos = event.point;

                if (pos.y <= 0)
                    pos.y = 0;
                else if (pos.y >= height)
                    pos.y = height;

                event.target.position.y = pos.y;

                segment.point.y = pos.y;
                let x = pos.x / width - 0.5;
                let y = 0.5 - (pos.y / height);

                if (this.props.onChange)
                    this.props.onChange({ x, y, point: pos, segments: myPath.segments });

                this.setState({ x, y });
            }

            circles.push(circle);
        }

        myPath.smooth();
        var tool1 = new paper.Tool();
        let pos = center;


        paper.view.draw();
    }
    render() {
        let { x, y } = this.state;
        return <div className="line-editor">
            <canvas className="line-editor-canvas" ref={this.canvas} width={100}></canvas>
        </div>
    }
}