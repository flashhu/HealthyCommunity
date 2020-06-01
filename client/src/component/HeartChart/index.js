import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const cols = {
    heartrat: {
        min: 50,
        max: 150,
        range: [0, 0.9],
    },
    date: {
        type: 'time',
        range: [0, 0.9],
        alias: '日期',
        mask: 'MM-DD',
        tickCount: 6
    }
};

class HeartChart extends Component {
    // componentDidMount() {
    //     // 手动触发resize方法
    //     window.dispatchEvent(new Event('resize'));
    // }

    render() {
        return (
            <div>
                <Chart height={260} data={this.props.data} scale={cols} autoFit>
                    <Axis name="date" />
                    <Axis
                        name="heartrat"
                        label={{
                            formatter: val => `${val} bpm`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="date*heartrat" size={2}
                        shape={"smooth"}
                        tooltip={['date*heartrat', (date, heartrat) => {
                            return {
                                name: '心率',
                                value: heartrat,
                                title: date
                            }
                        }]}
                    />
                    <Geom type="point" position="date*heartrat" size={4}
                        shape={"circle"}
                        tooltip={['date*heartrat', (date, heartrat) => {
                            return {
                                name: '心率',
                                value: heartrat,
                                title: date
                            }
                        }]}
                    />
                </Chart>
            </div>
        )
    }
}

export default HeartChart;