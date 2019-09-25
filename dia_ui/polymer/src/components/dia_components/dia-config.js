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
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';
import '../shared-styles.js';

class DiaConfig extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
          :host {
              display: block;
              padding: 10px;
          }
          .column {
            float: left;
            width: 23% !important;
            opacity: 1;
            border: 1px dashed var(--lumo-contrast-30pct);
            padding: 5px;
            margin: 5px;
            position: relative;
            border-radius: var(--lumo-border-radius);
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

          .progressDiv{
            opacity: 1;
            border: 1px dashed var(--lumo-contrast-30pct);
            padding: 5px;
            margin: 5px;
            position: relative;
            border-radius: var(--lumo-border-radius);
          }

      </style>
      <div class="row">
        <div class="column">
          <h2>DIA Status</h2>
          <vaadin-form-layout>
            <vaadin-text-field id="state" label="State" theme="small" value=[[status_config.state]] readonly></vaadin-text-field>
            <vaadin-text-field id="status" label="Status" theme="small" value=[[status_config.status]] readonly></vaadin-text-field>
            <div>
              <span style="align-self: flex-start;color: var(--lumo-secondary-text-color);font-weight: 400;font-size: var(--lumo-font-size-xs);margin-left: calc(var(--lumo-border-radius-m) / 4);transition: color 0.2s;line-height: 1;padding-bottom: 0.5em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative;max-width: 100%;box-sizing: border-box;">Progress</span>
              <vaadin-progress-bar disabled id="progress-bar-custom-bounds" min="0" max="1"></vaadin-progress-bar>
            </div>
          </vaadin-form-layout>
        </div> 
        <div class="column">
          <h2>Writer</h2>
          <vaadin-form-layout>
              <vaadin-text-field id="output_file" label="output_file" theme="small" value=[[writerconfig_json.output_file]] readonly></vaadin-text-field>
              <vaadin-text-field id="nFrames" label="N_frames" theme="small" value=[[writerconfig_json.n_frames]] readonly></vaadin-text-field>
              <vaadin-text-field id="user_id" label="user_id" theme="small" value=[[writerconfig_json.user_id]] readonly></vaadin-text-field>
          </vaadin-form-layout>
        </div>
        <div class="column">
          <h2>Detector</h2>
          <vaadin-form-layout responsive-steps='[
            {"minWidth": 0, "columns": 1},
            {"minWidth": "100px", "columns": 2}
          ]'>
              <vaadin-text-field id="period" label="Period" theme="small" value=[[detectorconfig_json.period]] readonly></vaadin-text-field>
              <vaadin-text-field id="frames" label="Frames" theme="small" value=[[detectorconfig_json.frames]] readonly></vaadin-text-field>
              <vaadin-text-field id="exptime" label="Exptime" theme="small" value=[[detectorconfig_json.exptime]] readonly></vaadin-text-field>
              <vaadin-text-field id="dr" label="Dr" theme="small" value=[[detectorconfig_json.dr]] readonly></vaadin-text-field>
              <vaadin-text-field id="cycles" label="Cycles" theme="small" value=[[detectorconfig_json.cycles]] readonly></vaadin-text-field>
              <vaadin-text-field id="timing" label="Timing" theme="small" value=[[detectorconfig_json.timing]] readonly></vaadin-text-field>
          </vaadin-form-layout>
        </div>
        <div class="column">
          <h2>Backend</h2>
          <vaadin-form-layout>
              <vaadin-text-field id="bitdepth" label="bit_depth" theme="small" value=[[backendconfig_json.bit_depth]] readonly></vaadin-text-field>
              <vaadin-text-field id="n_frames" label="n_frames" theme="small" value=[[backendconfig_json.n_frames]] readonly></vaadin-text-field>
          </vaadin-form-layout>
        </div>
      </div>
    `;
  }
  
  static get properties() {
    return {
      writerconfig_json : String,
      detectorconfig_json : String,
      backendconfig_json : String,
      progressBarStatusValue : Number,
      status_config : String
    }
  }

  ready(){
    super.ready();
    var progressBarStatus = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#config_accordion > vaadin-vertical-layout > dia-config").shadowRoot.querySelector("#progress-bar-custom-bounds");
    if (progressBarStatus != undefined){
      progressBarStatus.value = 0;
      progressBarStatus.removeAttribute("theme");
    }
  }

  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    this.writerconfig_json = state.app.writer_config;
    this.detectorconfig_json = state.app.detector_config;
    this.backendconfig_json = state.app.backend_config;
    this.status_config = state.app.status_config;
    var progressBarStatus = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#config_accordion > vaadin-vertical-layout > dia-config").shadowRoot.querySelector("#progress-bar-custom-bounds");    
    if (this.status_config.status != "IntegrationStatus.RUNNING" && progressBarStatus != undefined){
        progressBarStatus.value = 0;
        progressBarStatus.removeAttribute("theme");
    }
  }

  disableEditField(){
    this.$.period.setAttribute("readonly", "readonly");
    this.$.frames.setAttribute("readonly", "readonly");
    this.$.exptime.setAttribute("readonly", "readonly");
    this.$.dr.setAttribute("readonly", "readonly");
    this.$.cycles.setAttribute("readonly", "readonly");
    this.$.timing.setAttribute("readonly", "readonly");
    this.$.bitdepth.setAttribute("readonly", "readonly");
    this.$.n_frames.setAttribute("readonly", "readonly");
    this.$.output_file.setAttribute("readonly", "readonly");
    this.$.nFrames.setAttribute("readonly", "readonly");
  }

  enableEditField(){
      this.$.period.removeAttribute("readonly");
      this.$.frames.removeAttribute("readonly");
      this.$.exptime.removeAttribute("readonly");
      this.$.dr.removeAttribute("readonly");
      this.$.timing.removeAttribute("readonly");
      this.$.cycles.removeAttribute("readonly");
      this.$.bitdepth.removeAttribute("readonly");
      this.$.n_frames.removeAttribute("readonly");
      this.$.output_file.removeAttribute("readonly");
      this.$.nFrames.removeAttribute("readonly");
  }

  getWriterConfig(){
    const writer_config = {'output_file': this.$.output_file.value,
        'n_frames': this.$.nFrames.value,
        'user_id': this.$.user_id.value};
    return writer_config;
  }

  getDetectorConfig(){
    const detector_config = {'period': this.$.period.value,
        'frames': this.$.frames.value,
        'exptime': this.$.exptime.value,
        'cycles': this.$.cycles.value,
        'timing': this.$.timing.value,
        'dr': this.$.dr.value};
    return detector_config;
  }

  getBackendConfig(){
    const backend_config = {'bit_depth': this.$.bitdepth.value,
        'n_frames': this.$.n_frames.value}; 
    return backend_config;
  }

  getStatus(){
    return this.$.status.value;
  }

  setProgressBarValue(value){
    var progressBarStatus = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#config_accordion > vaadin-vertical-layout > dia-config").shadowRoot.querySelector("#progress-bar-custom-bounds");
    if (progressBarStatus != undefined){
      progressBarStatus.value = value;
      if (value == 1.0){
        progressBarStatus.setAttribute("theme","success");
      };
    }
  }
}

window.customElements.define('dia-config', DiaConfig);
