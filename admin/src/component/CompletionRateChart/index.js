// data-set 可以按需引入，除此之外不要引入别的包
import React, { Component } from 'react';
import {
    Chart,
    registerShape,
    Axis,
    Tooltip,
    Interval,
    Interaction,
    Coordinate,
} from "bizcharts";

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值

const sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

registerShape("interval", "sliceShape", {
    draw(cfg, container) {
        const points = cfg.points;
        let path = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y - sliceNumber]);
        path.push(["L", points[2].x, points[2].y - sliceNumber]);
        path.push(["L", points[3].x, points[3].y]);
        path.push("Z");
        path = this.parsePath(path);
        return container.addShape("path", {
            attrs: {
                fill: cfg.color,
                path: path
            }
        });
    }
});

class CompletionRateChart extends Component {
    render() {
        return (
            <Chart data={this.props.data} height={200} autoFit >
                <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
                <Axis visible={false} />
                <Tooltip showTitle={false} />
                <Interval
                    adjust="stack"
                    position="value"
                    color="type"
                    shape="sliceShape"
                />
                <Interaction type="element-single-selected" />
            </Chart>
        );
    }
}

// CDN END
export default CompletionRateChart;
