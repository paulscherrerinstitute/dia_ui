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
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import '@vaadin/vaadin-notification/vaadin-notification.js';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import './shared-styles.js';


class LogView extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
        :host([theme~="error"]) [part="overlay"] {
        background-color: hsl(3, 100%, 61%);
        color: #fff;
        }

        #det_api_field{
          width:100%;
        }

        #dia_log_textarea{
          overflow-y: scroll; 
          height:300px; 
          width:100%; 
          display: inline-block;
          resize: none;
          border: 1px dashed var(--lumo-contrast-30pct);
          border-radius: var(--lumo-border-radius);
        }

        .columnLeft {
            float: left;
            padding: 10px;
            width: 25%;
          }
        .columnRight {
            float: left;
            padding: 10px;
            width: 65%;
          }
      
 
        @media screen and (max-width: 930px) {
          .columnRight {
            width: 100%;
            padding: 10px;
          }
          .columnLeft {
            width: 100%;
            padding: 10px;
          }
        }

        /* Clear floats after the columns */
        .row:after {
          content: "";
          display: table;
          clear: both;
        }
      </style>

          
    <div class="card">
      <div class="row">
          <div class="columnLeft">
            <vaadin-text-field label="DIA API Address" value="http://xbl-daq-29:10000" id="det_api_field" ></vaadin-text-field>
            <paper-tooltip for="det_api_field" position="bottom" animation-delay="0">Address of the DIA interface</paper-tooltip>
          </div>
          <div class="columnRight">
          <div class="vaadin-text-field-container" style="padding-top: var(--lumo-space-m);align-self: flex-start;color: var(--lumo-secondary-text-color);font-size: var(--lumo-font-size-s);margin-left: calc(var(--lumo-border-radius-m) / 4);transition: color 0.2s;line-height: 1;padding-bottom: 0.25em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative; width: 100%;box-sizing: border-box;">
                  <vaadin-horizontal-layout size-full :expand>
                      <label part="label" id="vaadin-text-field-label-1">Control panel</label>
                      <vaadin-progress-bar hidden id="progressBar" indeterminate value="0" style="float:right;margin-right: calc(var(--lumo-border-radius-m) / 4);max-width: 65%;"></vaadin-progress-bar>
                      <div part="error-message" aria-live="assertive" aria-hidden="true" id="vaadin-text-field-error-1"></div>
                      <vaadin-dialog id="dialog" no-close-on-esc no-close-on-outside-click theme="error"></vaadin-dialog>
                  </vaadin-horizontal-layout>
              </div>
              <vaadin-horizontal-layout id="control_panel_field">
                  <vaadin-button id="loadConfigButton" :middle>
                      <iron-icon icon="vaadin:download-alt"></iron-icon>Load log</vaadin-button>
                  <paper-tooltip for="loadConfigButton" position="bottom" animation-delay="0">Loads DIA log</paper-tooltip>
              </vaadin-horizontal-layout>
          </div>
        </div>
        <div class="card">
          <textarea id="dia_log_textarea"></textarea>
        </div>
    </div>
    `;
  }

  static get properties() {
    return {
      dia_log : String
    }
  }
 
  
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  }


  ready(){
    super.ready();
    // load button clicked
    const loadLogButton = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > log-view").shadowRoot.querySelector("#loadConfigButton");
    loadLogButton.addEventListener('click', function() {
      var socket = io.connect('http://' + document.domain + ':' + location.port);
      // gets configView from shadowRoot
      const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view');
      socket.emit('requestDiaLog', {'det_api_address': configView.det_api_address});
    });
  }

  stateChanged(state){
    this.dia_log = state.app.dia_log;  
    if (this.dia_log != "--"){
      const textAreaField = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > log-view").shadowRoot.querySelector("#dia_log_textarea");
      textAreaField.value = this.dia_log;
      textAreaField.scrollTop = textAreaField.scrollHeight;
      textAreaField.setAttribute("readonly", "readonly");
    }
  }

}

window.customElements.define('log-view', LogView);
