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
import './dia_components/dia-config.js'
import './dia_components/stats-config.js'
import './shared-styles.js';
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



class ConfigView extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        #det_api_field{
          width:100%;
        }
        #containerContent {
          height: 100%;
          width: 100%;
          display: flex;
        }

        .columnLeft {
            float: left;
            padding: 10px;
          }
        .columnRight {
            float: left;
            padding: 10px;
          }
 
        @media screen and (max-width: 930px) {
          .columnRight {
            width: 100%;
          }
          .columnLeft {
            width: 100%;
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
          <vaadin-text-field label="Detector API Address" value="http://0.0.0.0:10000" id="det_api_field" ></vaadin-text-field>
          <paper-tooltip for="det_api_field" position="bottom" animation-delay="0">Address of the DIA interface</paper-tooltip>
        </div>
        <div class="columnRight">
        <div class="vaadin-text-field-container" style="padding-top: var(--lumo-space-m);align-self: flex-start;color: var(--lumo-secondary-text-color);font-weight: 500;font-size: var(--lumo-font-size-s);margin-left: calc(var(--lumo-border-radius-m) / 4);transition: color 0.2s;line-height: 1;padding-bottom: 0.5em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative; width: 100%;box-sizing: border-box;">
                <vaadin-horizontal-layout size-full :expand>
                    <label part="label" id="vaadin-text-field-label-1">Control panel</label>
                    <vaadin-progress-bar hidden id="progressBar" indeterminate value="0" style="float:right;margin-right: calc(var(--lumo-border-radius-m) / 4);max-width: 65%;"></vaadin-progress-bar>
                    <div part="error-message" aria-live="assertive" aria-hidden="true" id="vaadin-text-field-error-1"></div>
                    <vaadin-dialog no-close-on-esc no-close-on-outside-click></vaadin-dialog>
                </vaadin-horizontal-layout>
            </div>
            <vaadin-horizontal-layout id="control_panel_field">
                <vaadin-button id="loadConfigButton" :middle>
                    <iron-icon icon="vaadin:download-alt"></iron-icon>Load</vaadin-button>
                <paper-tooltip for="loadConfigButton" position="bottom" animation-delay="0">Loads configuration from DIA address</paper-tooltip>
                <vaadin-button id="editConfigButton" :middle disabled>
                    <iron-icon icon="vaadin:edit"></iron-icon>Edit</vaadin-button>
                <paper-tooltip for="editConfigButton" position="bottom" animation-delay="0">Enable editting the configuration values</paper-tooltip>
                <vaadin-button id="submitConfigButton" :middle disabled>
                    <iron-icon icon="icons:send"></iron-icon>Submit</vaadin-button>
                <paper-tooltip for="submitConfigButton" position="bottom" animation-delay="0">Submits configuration the DIA address</paper-tooltip>
                <vaadin-button id="startConfigButton" :middle disabled>
                    <iron-icon icon="vaadin:start-cog"></iron-icon>Start</vaadin-button>
                <paper-tooltip for="startConfigButton" position="bottom" animation-delay="0">Starts the DIA</paper-tooltip>
                <vaadin-button id="stopConfigButton" :middle disabled>
                    <iron-icon icon="vaadin:stop-cog"></iron-icon>Stop</vaadin-button>
                <paper-tooltip for="stopConfigButton" position="bottom" animation-delay="0">Stop the DIA</paper-tooltip>
                <vaadin-button id="resetConfigButton" :middle disabled>
                    <iron-icon icon="vaadin:refresh"></iron-icon>Reset</vaadin-button>
                <paper-tooltip for="resetConfigButton" position="bottom" animation-delay="0">Resets the DIA</paper-tooltip>
                <vaadin-notification id="notify" duration="1500" position="top-end"></vaadin-notification>
            </vaadin-horizontal-layout>
        </div>
      </div>
    </div>

    <div class="card">
        <vaadin-vertical-layout>
            <vaadin-acoordion>
                <vaadin-accordion-panel disabled id="config_accordion">
                    <div slot="summary">Configuration</div>
                    <vaadin-vertical-layout>
                        <dia-config></dia-config>
                    </vaadin-vertical-layout>
                </vaadin-accordion-panel>
            </vaadin-acoordion>
        </vaadin-vertical-layout>
    </div>
    <div class="card">
        <vaadin-vertical-layout>
            <vaadin-acoordion>
                <vaadin-accordion-panel disabled id="stats_accordion">
                    <div slot="summary">Statistics</div>
                    <vaadin-vertical-layout>
                        <stats-config></stats-config>
                    </vaadin-vertical-layout>
                </vaadin-accordion-panel>
            </vaadin-acoordion>
        </vaadin-vertical-layout>
    </div>
      
    `;
  }
  
  static get properties() {
    return {
      json : String,
      loaded_config : Boolean,
      det_api_address : String,
      status_config : String
    }
  }
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  ready(){
    super.ready()
    this.loaded_config = false;
    const notification = this.$.notify;
    // requests configuration from server
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    // gets view3 from shadowRoot
    const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
  
    // if input field was editted turn load button enabled and disable others
    this.$.det_api_field.addEventListener("change", function(){
      configView.$.loadConfigButton.removeAttribute("disabled");
      // closes accordion
      configView.$.config_accordion.removeAttribute("opened");
      configView.$.stats_accordion.removeAttribute("opened");
      // stops the stats monitor
      // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config")
      // statsConfig.stopStatisticsWorker()

      // disables all the other buttons and configuration accordion
      configView.$.startConfigButton.setAttribute("disabled", "disabled");
      configView.$.editConfigButton.setAttribute("disabled", "disabled");
      configView.$.submitConfigButton.setAttribute("disabled", "disabled");
      configView.$.stopConfigButton.setAttribute("disabled", "disabled");
      configView.$.resetConfigButton.setAttribute("disabled", "disabled");
      configView.$.config_accordion.setAttribute("disabled", "disabled");
      configView.$.stats_accordion.setAttribute("disabled", "disabled");
      
    });


    // load button clicked
    this.$.loadConfigButton.addEventListener('click', function() {
      notification.open();
      configView.loaded_config = true;
      configView.det_api_address = configView.$.det_api_field.value;
      
      socket.emit('emitLoad', {'det_api_address': configView.det_api_address});
      // presents the configuration
      configView.$.config_accordion.removeAttribute("disabled");
      // enables the statistics accordion
      configView.$.stats_accordion.removeAttribute("disabled");
      // starts the statistics worker
      const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config")
      statsConfig.startStatisticsWorker()
      // disable the load button
      this.setAttribute("disabled", "disabled");

      // enables the other buttons
      configView.$.startConfigButton.removeAttribute("disabled");
      configView.$.editConfigButton.removeAttribute("disabled");
      configView.$.stopConfigButton.removeAttribute("disabled");
      configView.$.resetConfigButton.removeAttribute("disabled");
      // view3.$.submitConfigButton.removeAttribute("disabled");
      // disable edit fields
      configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();

      // enables the progress bar
      configView.$.progressBar.removeAttribute("hidden");
      // updates the notification text
      notification.renderer = function(root) {
        root.textContent = 'Loading configuration from server '+ configView.$.det_api_field.value +'.';
      };
      document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view').shadowRoot.querySelector('#config_accordion').setAttribute("opened", "opened")
      
    });



    // edit button
    this.$.editConfigButton.addEventListener('click', function() {
      notification.open();
      if (configView.loaded_config === true){
        // enables the progress bar
        configView.$.progressBar.removeAttribute("hidden");
        // enable editting on the fields inside configuration accordion
        configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').enableEditField();
        // disables the other buttons and input field
        // view3.$.det_api_field.setAttribute("disabled", "disabled");
        configView.$.loadConfigButton.setAttribute("disabled", "disabled");
        configView.$.startConfigButton.setAttribute("disabled", "disabled");
        configView.$.editConfigButton.setAttribute("disabled", "disabled");
        configView.$.stopConfigButton.setAttribute("disabled", "disabled");
        configView.$.resetConfigButton.setAttribute("disabled", "disabled");
        // enables submit button
        configView.$.submitConfigButton.removeAttribute("disabled");
        configView.$.progressBar.setAttribute("hidden", "hidden");
      }
      
      notification.renderer = function(root) {
        root.textContent = 'Editing configuration from server '+ configView.$.det_api_field.value +'.';
      };
    });

    // start button
    this.$.startConfigButton.addEventListener('click', function() {
      notification.open();
      if (configView.loaded_config === true){
        socket.emit('emitStart', {'det_api_address': configView.det_api_address});
      }
      // disable edit fields
      configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      // disable start button
      configView.$.startConfigButton.setAttribute("disabled", "disabled");
      // enables stats accordion
      configView.$.stats_accordion.removeAttribute("disabled");
      // enables stop button
      configView.$.stopConfigButton.removeAttribute("disabled");
      notification.renderer = function(root) {
        root.textContent = 'Starting server '+ configView.$.det_api_field.value +'.';
      };
      // enables the progress bar
      configView.$.progressBar.removeAttribute("hidden");
    });

    // reset button
    this.$.resetConfigButton.addEventListener('click', function() {
      notification.open();
      if (configView.loaded_config === true){
        socket.emit('emitReset', {'det_api_address': configView.det_api_address});
      }
      // disable edit fields
      configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      // enable start button
      configView.$.startConfigButton.removeAttribute("disabled");
      // disable stop button
      configView.$.stopConfigButton.setAttribute("disabled", "disabled");
      notification.renderer = function(root) {
        root.textContent = 'Resetting server '+ configView.$.det_api_field.value +'.';
      };
      // enables the progress bar
      configView.$.progressBar.removeAttribute("hidden");
    });

    // stop button
    this.$.stopConfigButton.addEventListener('click', function() {
      notification.open();
      if (configView.loaded_config === true){
        socket.emit('emitStop', {'det_api_address': configView.det_api_address});
      }
      // closes stat accordion
      configView.$.stats_accordion.removeAttribute("opened");
      // disable edit fields
      configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      // disable stop button
      configView.$.stopConfigButton.setAttribute("disabled", "disabled");
      // enable start button
      configView.$.startConfigButton.removeAttribute("disabled");
      // disable the statistics accordion
      configView.$.stats_accordion.setAttribute("disabled", "disabled");
      notification.renderer = function(root) {
        root.textContent = 'Stopping server '+ configView.$.det_api_field.value +'.';
      };
      // enables the progress bar
      configView.$.progressBar.removeAttribute("hidden");
    });

    // submit button clicked
    this.$.submitConfigButton.addEventListener('click', function() {
      notification.open();
      // gets configuration from input fields and saves them
      this.writer_config = configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').getWriterConfig()
      this.backend_config = configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').getBackendConfig()
      this.detector_config = configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').getDetectorConfig()
      // creates the json to submit to the server 
      const submitJson = {'det_api_address': configView.det_api_address,'configuration': {'writer': this.writer_config,
                 'backend': this.backend_config,
                 'detector': this.detector_config}};

      socket.emit('newConfigurationFromClient', submitJson);
      // adjusts the buttons
      configView.$.startConfigButton.removeAttribute("disabled");
      configView.$.resetConfigButton.removeAttribute("disabled");
      configView.$.editConfigButton.removeAttribute("disabled");
      configView.$.stopConfigButton.removeAttribute("disabled");
      configView.$.submitConfigButton.setAttribute("disabled", "disabled");
      // adjusts the text fields
      configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      notification.renderer = function(root) {
        root.textContent = 'Submitting configuration to server '+ configView.$.det_api_field.value +'.';
      }; 
      // enables the progress bar
      configView.$.progressBar.removeAttribute("hidden");
    });
  }

  updateControlPanelButtons(){
    status = this.status_config['status']
    const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
    if (status == "IntegrationStatus.RUNNING" && this.loaded_config == true) {
      configView.$.startConfigButton.setAttribute("disabled","disabled");
      configView.$.stopConfigButton.removeAttribute("disabled");
      configView.$.resetConfigButton.removeAttribute("disabled");
    }else{
      if (status == "IntegrationStatus.READY"){
        configView.$.stopConfigButton.setAttribute("disabled","disabled");
        configView.$.startConfigButton.removeAttribute("disabled");
        configView.$.resetConfigButton.removeAttribute("disabled");
      }
    }
  };

  hideProgressBar(){
    this.$.progressBar.setAttribute("hidden", "hidden");
  }

  updateStartButton(status){
  const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
  if (status != "IntegrationStatus.RUNNING" && this.loaded_config == true) {
    configView.$.startConfigButton.removeAttribute("disabled");
  }else{  
    configView.$.startConfigButton.setAttribute("disabled", "disabled");
  }};

  stateChanged(state){
    this.json = state.app.myJson;  
    this.writer_config = state.app.writer_config;
    this.detector_config = state.app.detector_config;
    this.backend_config = state.app.backend_config;
    this.problemLoadingConfig = state.app.problemLoadingConfig;
    this.status_config = state.app.status_config;
  };

  problemStartRequest(msg){
  customElements.whenDefined('vaadin-dialog').then(function() {
    const dialog = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view').shadowRoot.querySelector('div > vaadin-form-layout > div > vaadin-horizontal-layout:nth-child(1) > vaadin-dialog')
    dialog.renderer = function(root, dialog) {
      // Check if there is a DOM generated with the previous renderer call to update its content instead of recreation
      if (root.firstElementChild) {
        return;
      }
      const div = window.document.createElement('div');
      div.textContent = msg['status'];

      const br = window.document.createElement('br');

      const okButton = window.document.createElement('vaadin-button');
      okButton.setAttribute('theme', 'primary');
      okButton.textContent = 'OK';
      okButton.setAttribute('style', 'margin-right: 1em');
      okButton.addEventListener('click', function() {
        dialog.opened = false;
      });

      root.appendChild(div);
      root.appendChild(br);
      root.appendChild(okButton);
    };
    dialog.opened = true;
    
  });

  };

}

window.customElements.define('config-view', ConfigView);
