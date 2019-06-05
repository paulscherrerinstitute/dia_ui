/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import '../../highchart/highchart.js'
import '../../highchart/exporting.js'
import '../../highchart/export-data.js'
import '../../highchart/series-label.js'
import '../shared-styles.js';


class StatsAdvHigh extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          
          display: block;

          padding: 10px;
        }
        .row{
          width:100%;
          margin: 0 auto;
        }
        .column {
            float: left;
            width: 100%;
          }
 
          @media screen and (max-width: 600px) {
            .column {
              width: 100%;
            }
          }

          /* Clear floats after the columns */
          .row:after {
            content: "";
            display: table;
            clear: both;
          }

          #containerHighchart{
            min-width: 310px; 
            height: 400px; 
            margin: 0 auto;
          }
      </style>
      
        <div class="card">
            <div id="containerHighchart"></div>
        </div>   
      


    `;
  }

  ready(){
    super.ready()
    this.newDataReceived = false;
    var $elementToHigh = this.shadowRoot.querySelector('#containerHighchart')
    var self = this;

    this.highchartElement = new Highcharts.chart($elementToHigh, {
      chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 60,
          marginRight: 60,
          events: {
              load: function () {
  
                  // set up the updating of the chart each second
                  var seriesRecFrame = this.series[0];
                  var seriesWrittingRate = this.series[1];
                  setInterval(function () {
                  if (self.newDataReceived === true){
                    var x = (new Date()).getTime(), // current time
                        y = self.n_received_frames;
                    seriesRecFrame.addPoint([x, y], true, true);
                    var x = (new Date()).getTime(), // current time
                        y = self.writtingRate;
                    seriesWrittingRate.addPoint([x, y], true, true);
                    self.newDataReceived = false;
                  }
                  }, 500);
              }
          }
      },
  
      time: {
          useUTC: false
      },
  
      title: {
          text: 'Statistics monitor data',
          align: 'left'
      },
      xAxis: {
          type: 'datetime',
          crosshair: true,
          tickPixelInterval: 150
      },
      yAxis: [{// Primary yAxis
          title: {
              text: 'Received frames',
              style: {
                color: Highcharts.getOptions().colors[0]
            }
          },
          opposite: false,
          labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
          },
      },{ // Secondary yAxis
        title: {
            text: 'Writting rate',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true,
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
      }],
      tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.5f}'
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 50,
        verticalAlign: 'top',
        y: 50,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
      series: [{
          name: 'Received frame',
          type: 'spline',
          tooltip: {
            valueSuffix: ' frame id'
          },
          data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;
  
              for (i = -99; i <= 0; i += 1) {
                  data.push({
                      x: time + i * 1000,
                      y: 0.0
                  });
              }
              return data;
          }())
      },{
        name: 'Writting rate',
        type: 'spline',
        yAxis: 1,
        tooltip: {
          valueSuffix: ' rate'
        },
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -99; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: 0.0
                });
            }
            return data;
        }())
    }],
  });  
  }

  

  static get properties() {
    return {
      n_received_frames : Number,
      writtingRate : Number,
      newDataReceived : Boolean,
      highchartElement : Object
    }
  }

  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    this.n_received_frames = state.app.statistics_wr_adv.n_received_frames;
    this.writtingRate = state.app.statistics_wr_adv.writting_rate;
    this.newDataReceived = true;
  }
}

window.customElements.define('stats-adv-high', StatsAdvHigh);
