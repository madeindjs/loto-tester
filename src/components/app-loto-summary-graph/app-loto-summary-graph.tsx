import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import Chartist from 'chartist';
import { GameGraphData } from '../../models';

@Component({
  tag: 'app-loto-summary-graph',
  styleUrl: 'app-loto-summary-graph.css',
  // shadow: true,
})
export class AppLotoSummaryGraph implements ComponentInterface {
  @Prop() points: GameGraphData[] = [];

  initializeChart(element: HTMLElement): void {
    new Chartist.Line(
      element,
      {
        series: [
          {
            name: 'series-1',
            data: this.points,
          },
        ],
      },
      {
        showArea: true,
        showPoint: false,
        axisX: {
          showGrid: false,
          //   // type: Chartist.FixedScaleAxis,
          //   // divisor: 100,
          //   // labelInterpolationFnc: function(value) {
          //   //   return moment(value).format('MMM D');
          //   // }
        },
        axisY: {
          showGrid: false,
        },
      },
    );
  }

  render() {
    return <div ref={el => this.initializeChart(el)}></div>;
  }
}
