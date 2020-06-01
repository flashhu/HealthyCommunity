import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

const cols = {
    blodpres: {
        max: 150,
        min: 50
    },
    date: {
        type: 'time',
        range: [0, 0.9],
        alias: '日期',
        tickCount: 6,
        mask: 'MM-DD'
    }
};

class BloodChart extends Component {
    // componentDidMount() {
    //     // 手动触发resize方法
    //     window.dispatchEvent(new Event('resize'));
    // }

    convert(params) {
        let data = [];
        for ( let item of params) {
            let shrink = {
                date: item.date,
                type: "收缩压",
                blodpres: item.blodpres_shrink
            }
            let relax = {
                date: item.date,
                type: "舒张压",
                blodpres: item.blodpres_relax
            }
            data.push(shrink);
            data.push(relax);
        }
        return data;
    }

    render() {
        
        return (
            <div>
                <Chart height={260} data={this.convert(this.props.data)} scale={cols} autoFit>
                    <Legend />
                    <Axis name="date" />
                    <Axis
                        name="blodpres"
                        label={{
                            formatter: val => `${val} mmHg`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="date*blodpres"
                        size={2}
                        color={"type"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="point"
                        position="date*blodpres"
                        size={4}
                        shape={"circle"}
                        color={"type"}
                    />
                </Chart>
            </div>
        )
    }
}

export default BloodChart;