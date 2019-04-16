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
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';
import '../shared-styles.js';

class DiaConfig extends connect(store)(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
    <h4>Status</h4>
    <vaadin-form-layout>
        <vaadin-text-field id="state" label="State" theme="small" value=[[status_config.state]] readonly></vaadin-text-field>
        <vaadin-text-field id="status" label="Status" theme="small" value=[[status_config.status]] readonly></vaadin-text-field>
    </vaadin-form-layout>
    
    <h4>Detector</h4>
    <vaadin-form-layout>
        <vaadin-text-field id="period" label="Period" theme="small" value=[[detectorconfig_json.period]] readonly></vaadin-text-field>
        <vaadin-text-field id="frames" label="Frames" theme="small" value=[[detectorconfig_json.frames]] readonly></vaadin-text-field>
        <vaadin-text-field id="exptime" label="Exptime" theme="small" value=[[detectorconfig_json.exptime]] readonly></vaadin-text-field>
        <vaadin-text-field id="dr" label="Dr" theme="small" value=[[detectorconfig_json.dr]] readonly></vaadin-text-field>
    </vaadin-form-layout>
    <h4>Backend</h4>
    <vaadin-form-layout>
        <vaadin-text-field id="bitdepth" label="bit_depth" theme="small" value=[[backendconfig_json.bit_depth]] readonly></vaadin-text-field>
        <vaadin-text-field id="n_frames" label="n_frames" theme="small" value=[[backendconfig_json.n_frames]] readonly></vaadin-text-field>
    </vaadin-form-layout>
    <h4>Writer</h4>
    <vaadin-form-layout>
        <vaadin-text-field id="output_file" label="output_file" theme="small" value=[[writerconfig_json.output_file]] readonly></vaadin-text-field>
        <vaadin-text-field id="nFrames" label="N_frames" theme="small" value=[[writerconfig_json.n_frames]] readonly></vaadin-text-field>
        <vaadin-text-field id="user_id" label="user_id" theme="small" value=[[writerconfig_json.user_id]] readonly></vaadin-text-field>
    </vaadin-form-layout>
    `;
  }
  
  static get properties() {
    return {
      writerconfig_json : String,
      detectorconfig_json : String,
      backendconfig_json : String,
      status_config : String
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
  }

  disableEditField(){
    this.$.period.setAttribute("readonly", "readonly");
    this.$.frames.setAttribute("readonly", "readonly");
    this.$.exptime.setAttribute("readonly", "readonly");
    this.$.dr.setAttribute("readonly", "readonly");
    this.$.bitdepth.setAttribute("readonly", "readonly");
    this.$.n_frames.setAttribute("readonly", "readonly");
    this.$.output_file.setAttribute("readonly", "readonly");
    this.$.nFrames.setAttribute("readonly", "readonly");
  }

  enableEditField(){
      //this.$.state.removeAttribute("readonly");
      //this.$.status.removeAttribute("readonly");
      this.$.period.removeAttribute("readonly");
      this.$.frames.removeAttribute("readonly");
      this.$.exptime.removeAttribute("readonly");
      this.$.dr.removeAttribute("readonly");
      this.$.bitdepth.removeAttribute("readonly");
      this.$.n_frames.removeAttribute("readonly");
      this.$.output_file.removeAttribute("readonly");
      this.$.nFrames.removeAttribute("readonly");
      //this.$.user_id.removeAttribute("readonly");
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
        'dr': this.$.dr.value};
    return detector_config;
  }

  getBackendConfig(){
    const backend_config = {'bit_depth': this.$.bitdepth.value,
        'n_frames': this.$.n_frames.value}; 
    return backend_config;
  }
}

window.customElements.define('dia-config', DiaConfig);
