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
import { store } from '../store.js';
import '../highchart/highchart.js'
import '../highchart/exporting.js'
import '../highchart/export-data.js'
import './shared-styles.js';


class MyView2 extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      
      <div class="card">
          <div id="containerHighchart" style="min-width: 310px;height: 400px;margin: 0 auto;">
          </div>
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
          marginRight: 10,
          events: {
              load: function () {
  
                  // set up the updating of the chart each second
                  var series = this.series[0];
                  setInterval(function () {
                  if (self.newDataReceived === true){
                    var x = (new Date()).getTime(), // current time
                        y = self.beamEnergy;
                    series.addPoint([x, y], true, true);
                    self.newDataReceived = false;
                  }
                  }, 1000);
              }
          }
      },
  
      time: {
          useUTC: false
      },
  
      title: {
          text: 'Live beam energy'
      },
      xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
      },
      yAxis: {
          title: {
              text: 'Beam energy'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.5f}'
      },
      legend: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      series: [{
          name: 'Random data',
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
      }]
  });  
  }

  

  static get properties() {
    return {
      beamEnergy : Number,
      newDataReceived : Boolean,
      highchartElement : Object
    }
  }

  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    this.beamEnergy = state.app.beamEnergy;  
    this.newDataReceived = true;
  }
}

window.customElements.define('my-view2', MyView2);
