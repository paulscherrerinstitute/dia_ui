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
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';
import './stats-highcharts.js';
import '../shared-styles.js';

class StatsConfig extends connect(store)(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        page {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #containerContent {
          height: 100%;
          width: 100%;
          display: flex;
        }
        #leftContent {
          width: 20%;
        }
        #rightContent {
          width: 80%;
          background-color:#f3f5f7;
        }

      </style>


    <vaadin-tabs selected="{{tab}}" theme="equal-width-tabs">
      <vaadin-tab id="writer_tab_title">
        <iron-icon icon="vaadin:pencil"></iron-icon>
        <span>Writer</span>
      </vaadin-tab>
      <paper-tooltip for="writer_tab_title" position="bottom" animation-delay="0">Shows statistics from the writer.</paper-tooltip>
      <vaadin-tab disabled id="detector_tab_title">
        <iron-icon icon="vaadin:compile"></iron-icon>
        <span>Detector</span>
      </vaadin-tab>
      <paper-tooltip for="detector_tab_title" position="bottom" animation-delay="0">Shows statistics from the detector.</paper-tooltip>
      <vaadin-tab disabled id="backend_tab_title">
        <iron-icon icon="vaadin:automation"></iron-icon>
        <span>Backend</span>
      </vaadin-tab>
      <paper-tooltip for="backend_tab_title" position="bottom" animation-delay="0">Shows statistics from the backend.</paper-tooltip>
    </vaadin-tabs>

    <iron-pages selected="[[tab]]" >
      <page> 
      <div id="containerContent">
        <div id="leftContent">
          <vaadin-tabs id="writerStatsTabs" orientation="vertical" theme="small" selected="{{subTab}}" :left >
            <vaadin-tab disabled id="writer_start_tab_title">Start</vaadin-tab>
            <paper-tooltip for="writer_start_tab_title" position="bottom" animation-delay="0">Shows the writer's start statistics.</paper-tooltip>
            <vaadin-tab disabled id="writer_adv_tab_title">Advanced</vaadin-tab>
            <paper-tooltip for="writer_adv_tab_title" position="bottom" animation-delay="0">Shows the writer's advanced statistics.</paper-tooltip>
            <vaadin-tab disabled id="writer_error_tab_title">Error</vaadin-tab>
            <paper-tooltip for="writer_error_tab_title" position="bottom" animation-delay="0">Shows the writer's error statistics.</paper-tooltip>
            <vaadin-tab disabled id="writer_finish_tab_title">Finish</vaadin-tab>
            <paper-tooltip for="writer_finish_tab_title" position="bottom" animation-delay="0">Shows the writer's finish statistics.</paper-tooltip>          
          </vaadin-tabs>
        </div>
        <div id="rightContent" class="card">
        <iron-pages selected="[[subTab]]" >
          <page>
            <vaadin-form-layout class="custom-steps" responsive-steps='[
              {"minWidth": 0, "columns": 1},
              {"minWidth": "600px", "columns": 3}
            ]'>
              <vaadin-text-field id="statistics_first_frame_id" label="First frame ID" theme="small" value=[[statistics_wr_start.first_frame_id]] readonly colspan="1"></vaadin-text-field>
              <vaadin-text-field id="statistics_n_frames" label="N frames" theme="small" value=[[statistics_wr_start.n_frames]] readonly colspan="1"></vaadin-text-field>
              <vaadin-text-field id="statistics_output_file" label="Output file" theme="small" value=[[statistics_wr_start.output_file]] readonly colspan="1"></vaadin-text-field>
              <vaadin-text-field id="statistics_user_id" label="User ID" theme="small" value=[[statistics_wr_start.user_id]] readonly colspan="1"></vaadin-text-field>
              <vaadin-text-field id="statistics_timestamp" label="Timestamp" theme="small" value=[[statistics_wr_start.timestamp]] readonly colspan="1"></vaadin-text-field>
              <vaadin-text-field id="statistics_compression_method" label="Compression method" theme="small" value=[[statistics_wr_start.compression_method]] readonly></vaadin-text-field>
            </vaadin-form-layout>
          </page>
          <page>
            <vaadin-form-layout responsive-steps='[
              {"minWidth": 0, "columns": 1},
              {"minWidth": "600px", "columns": 3}
            ]'>
              <vaadin-text-field id="statistics_n_written_frames" label="N written frames" theme="small" value=[[statistics_wr_adv.n_written_frames]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_n_received_frames" label="N received frames" theme="small" value=[[statistics_wr_adv.n_received_frames]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_n_free_slots" label="N free slots" theme="small" value=[[statistics_wr_adv.n_free_slots]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_processing_rate" label="Processing rate" theme="small" value=[[statistics_wr_adv.processing_rate]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_receiving_rate" label="Receiving rate" theme="small" value=[[statistics_wr_adv.receiving_rate]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_writting_rate" label="Writting rate" theme="small" value=[[statistics_wr_adv.writting_rate]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_avg_compressed_size" label="Avg compressed size" theme="small" value=[[statistics_wr_adv.avg_compressed_size]] readonly></vaadin-text-field>
            </vaadin-form-layout>
            <stats-adv-high></stats-adv-high>
          </page>
          <page>
            <vaadin-form-layout id="stat_error_id" disabled responsive-steps='[
              {"minWidth": 0, "columns": 1},
              {"minWidth": "600px", "columns": 3}
            ]'>
              <vaadin-text-field id="statistics_error_def" label="Error definition" theme="small" value=[[statistics_wr_error.error_def]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_stack_frame" label="Stack frame" theme="small" value=[[statistics_wr_error.stack_frame]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_user_msg" label="User msg" theme="small" value=[[statistics_wr_error.user_msg]] readonly></vaadin-text-field>
            </vaadin-form-layout>
          </page>
          
          <page>
            <vaadin-form-layout id="stat_finish_id" disabled responsive-steps='[
              {"minWidth": 0, "columns": 1},
              {"minWidth": "600px", "columns": 2}
            ]'>
              <vaadin-text-field id="statistics_n_total_written_frames" label="N total written frames" theme="small" value=[[statistics_wr_finish.n_total_written_frames]] readonly></vaadin-text-field>
              <vaadin-text-field id="statistics_end_time" label="End time" theme="small" value=[[statistics_wr_finish.end_time]] readonly></vaadin-text-field>
            </vaadin-form-layout>
          </page>
        </iron-pages>
        </div>
      </div>
      </page>
      <page>
      <div id="containerContent">
        <div id="leftContent">
          <vaadin-tabs orientation="vertical" theme="small" selected="{{subTab}}" :left >
            <vaadin-tab id="detector_tab_title">Detector stats</vaadin-tab>
          </vaadin-tabs>
        </div>
        <div id="rightContent" class="card">
        To be defined...
        </div>
      </div>
      </page>
      <page>
      <div id="containerContent">
        <div id="leftContent">
          <vaadin-tabs orientation="vertical" theme="small" selected="{{subTab}}" :left >
            <vaadin-tab id="backend_tab_title">Backend stats</vaadin-tab>
          </vaadin-tabs>
        </div>
        <div id="rightContent" class="card">
        To be defined...
        </div>
      </div>
      </page>
    </iron-pages>   
    `;
  }
  
  static get properties() {
    return {
      w : String,
      stats : String,
      newDataReceived : Boolean,
      highchartElement : Object
    };
  }
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    this.statistics_wr_start = state.app.statistics_wr_start;   
    this.statistics_wr_finish = state.app.statistics_wr_finish;
    this.statistics_wr_error = state.app.statistics_wr_error;
    this.statistics_wr_adv = state.app.statistics_wr_adv;
    this.status_config = state.app.status_config;
    this.newDataReceived = true;
    
    var startTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_start_tab_title");
    var advTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_adv_tab_title");
    var errorTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_error_tab_title");
    var finishTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_finish_tab_title");


    // enables/disables the start tab
    if (this.statistics_wr_start.enable == false){
      startTab.setAttribute("disabled", "disabled");
    }else{
      // enables the start statistics tab
      startTab.removeAttribute("disabled");
    }
    // enables/disables the adv tab
    if (this.statistics_wr_adv.enable == false){
      advTab.setAttribute("disabled", "disabled");
    }else{
      // enables the advanced statistics tab
      advTab.removeAttribute("disabled");
      // checks if starts is empty to request previous start statistics details
      if (this.statistics_wr_start.enable == false){
        var socket = io.connect('http://' + document.domain + ':' + location.port);
        const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
        socket.emit('emitGetStatisticsStart', {'det_api_address': configView.det_api_address});
      }
    }
    // enables/disables the error tab
    if (this.statistics_wr_error.enable == false){
      errorTab.setAttribute("disabled", "disabled");
    } else {
      // enables the error tab
      errorTab.removeAttribute("disabled");
      // turns progress bar to red
      var progressBarStatus = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#config_accordion > vaadin-vertical-layout > dia-config").shadowRoot.querySelector("#progress-bar-custom-bounds");
      progressBarStatus.setAttribute("theme","error");
    }
    // enables/disables the finish tab
    if (this.statistics_wr_finish.enable == false){
      finishTab.setAttribute("disabled", "disabled");
    } else {
      // enables the finish tab
      finishTab.removeAttribute("disabled");
    }

    // updates the progress bar
    const diaConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#config_accordion > vaadin-vertical-layout > dia-config");
    if (this.status_config.status == "IntegrationStatus.RUNNING"){
      if (this.statistics_wr_start.n_frames > 0){
        diaConfig.setProgressBarValue((this.statistics_wr_adv.n_written_frames+1) / this.statistics_wr_start.n_frames);
      }
    }else{
      diaConfig.setProgressBarValue(0.0);
    }
  }

  ready(){
    super.ready();
  }

  startStatisticsWorker() {
    if (typeof(Worker) !== "undefined") {
      if (typeof(this.w) == "undefined") {
        this.w = new Worker("static/src/components/dia_components/stats_worker.js");
      }
      // gets statistics from the client
      this.w.onmessage = function(event) {
        var socket = io.connect('http://' + document.domain + ':' + location.port);
        const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
        socket.emit('emitGetStatistics', {'det_api_address': configView.det_api_address});
      };
      // disables previous error or finish tabs
      var errorTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_error_tab_title");
      errorTab.setAttribute("disabled", "disabled");
      var finishTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_finish_tab_title");
      finishTab.setAttribute("disabled", "disabled");
    }
  };

  stopStatisticsWorker() {
    if (this.w != undefined){
      this.w.terminate();
      this.w = undefined;
      // clears buffer from possible old data
      var socket = io.connect('http://' + document.domain + ':' + location.port);
      const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
      socket.emit('emitClearStatisticsBuffer', {'det_api_address': configView.det_api_address});
    };

  };
}

window.customElements.define('stats-config', StatsConfig);
