import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const cols = {
    temp: {
        min: 35,
        max: 40,
        range: [0, 0.9],
    },
    date: {
        type: 'time',
        range: [0, 0.9],
        alias: '日期',
        tickCount: 6,
        mask: 'MM-DD'
    }
};

class TempChart extends Component {
    // componentDidMount() {
    //     // 手动触发resize方法
    //     window.dispatchEvent(new Event('resize'));
    // }

    render() {

        return (
            <div>
                <Chart height={260} data={this.props.data} scale={cols} autoFit>
                    <Axis name="date"/>
                    <Axis 
                        name="temp"
                        label={{
                            formatter: val => `${val} °C`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="date*temp" size={2}
                        shape={"smooth"}
                        tooltip={['date*temp', (date, temp) => {
                            return {
                                name: '体温', 
                                value: temp,
                                title: date
                            }
                        }]} 
                    />
                    <Geom type="point" position="date*temp" size={4}
                        shape={"circle"}
                        tooltip={['date*temp', (date, temp) => {
                            return {
                                name: '体温',
                                value: temp,
                                title: date
                            }
                        }]}
                    />
                </Chart>
            </div>
        )
    }
}

export default TempChart;