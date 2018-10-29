import React, { Component } from "react";
import paper from "paper";

export default class Slider2D extends Component {
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

        var pathY = new paper.Path();
        pathY.strokeColor = colorLines;
        var start = new paper.Point(center.x, 0);
        pathY.moveTo(start);
        pathY.lineTo(start.add([0, height]));

        var pathX = new paper.Path();
        pathX.strokeColor = colorLines;
        var start = new paper.Point(0, center.y);
        pathX.moveTo(start);
        pathX.lineTo(start.add([width, 0]));

        var axisX = new paper.Path();
        axisX.strokeColor = 'black';
        var start = new paper.Point(0, center.y);
        axisX.moveTo(start);
        axisX.lineTo(start.add([width, 0]));

        var axisY = new paper.Path();
        axisY.strokeColor = 'black';
        var start = new paper.Point(center.x, 0);
        axisY.moveTo(start);
        axisY.lineTo(start.add([0, height]));

        //myCircle.selected = true;
        var tool1 = new paper.Tool();
        let pos = center;
        var myCircle = new paper.Path.Circle(pos, 5);
        myCircle.strokeColor = 'black';
        myCircle.fillColor = 'black';

        myCircle.onMouseEnter = (event) => {
            myCircle.fillColor = 'white';

        }

        myCircle.onMouseLeave = (event) => {
            myCircle.fillColor = 'black';

        }

        myCircle.onMouseDrag = (event) => {
            myCircle.fillColor = 'white';
            pos = event.point;
            if (pos.x <= 0)
                pos.x = 0;
            else if (pos.x >= width)
                pos.x = width;
            if (pos.y <= 0)
                pos.y = 0;
            else if (pos.y >= height)
                pos.y = height;

            myCircle.position = pos;
            axisX.position.y = pos.y;
            axisY.position.x = pos.x;

            let x = pos.x / width - 0.5;
            let y = 0.5 - (pos.y / height);
            if (this.props.onChange)
                this.props.onChange({ x, y, point: pos });

            this.setState({ x, y });
        }

        paper.view.draw();
    }
    render() {
        let { x, y } = this.state;
        return <div className="slider-2d-container">
            <canvas className="slider-2d-canvas" ref={this.canvas}></canvas>
            <div>x: {x.toFixed(2)} </div>
            <div>y: {y.toFixed(2)}</div>
        </div>
    }
}