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
import './dia_components/control-config.js'
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



class MyView3 extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      
      <div class="card">
      
      <vaadin-form-layout>
        <vaadin-text-field label="Detector API Address" value="http://0.0.0.0:10000" id="det_api_field"></vaadin-text-field>
        <paper-tooltip for="det_api_field" offset="0" position="right" animation-delay="0">Address of the DIA interface</paper-tooltip>
        <div class="vaadin-text-field-container" style="padding-top: var(--lumo-space-m);align-self: flex-start;color: var(--lumo-secondary-text-color);font-weight: 500;font-size: var(--lumo-font-size-s);margin-left: calc(var(--lumo-border-radius-m) / 4);transition: color 0.2s;line-height: 1;padding-bottom: 0.5em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative;max-width: 100%;box-sizing: border-box;">
        <vaadin-horizontal-layout size-full :expand>
          <label part="label" id="vaadin-text-field-label-1">Control panel</label>
          <vaadin-progress-bar hidden id="progressBar" indeterminate value="0" style="float:right;margin-right: calc(var(--lumo-border-radius-m) / 4);max-width: 65%;"></vaadin-progress-bar>
          <div part="error-message" aria-live="assertive" aria-hidden="true" id="vaadin-text-field-error-1"></div>
          <vaadin-dialog no-close-on-esc no-close-on-outside-click></vaadin-dialog>
        </vaadin-horizontal-layout>
          
          <vaadin-horizontal-layout size-full :expand style="width=100%">
          <vaadin-button id="loadConfigButton" :middle description="teste">Load</vaadin-button>
          <paper-tooltip for="loadConfigButton" offset="0" position="right" animation-delay="0">Loads configuration from DIA address</paper-tooltip>
          <vaadin-button id="editConfigButton" :middle disabled>Edit</vaadin-button>
          <paper-tooltip for="editConfigButton" offset="0" position="right" animation-delay="0">Enable editting the configuration values</paper-tooltip>
          <vaadin-button id="submitConfigButton" :middle disabled>Submit</vaadin-button>
          <paper-tooltip for="submitConfigButton" offset="0" position="right" animation-delay="0">Submits configuration the DIA address</paper-tooltip>
          <vaadin-button id="startConfigButton" :middle disabled>Start</vaadin-button>
          <paper-tooltip for="startConfigButton" offset="0" position="right" animation-delay="0">Starts the DIA</paper-tooltip>
          <vaadin-button id="stopConfigButton" :middle disabled>Stop</vaadin-button>
          <paper-tooltip for="stopConfigButton" offset="0" position="right" animation-delay="0">Stop the DIA</paper-tooltip>
          <vaadin-button id="resetConfigButton" :middle disabled>Reset</vaadin-button>
          <paper-tooltip for="resetConfigButton" offset="0" position="right" animation-delay="0">Resets the DIA</paper-tooltip>
          <vaadin-notification id="notify" duration="1500" position="top-end"></vaadin-notification>
        </vaadin-horizontal-layout>
        </div>
      </vaadin-form-layout>
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
      
    `;
  }
  
  static get properties() {
    return {
      json : String,
      loaded_config : Boolean,
      det_api_address : String,
      state : String,
      status : String
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
    const view3 = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > my-view3')
  
    // if input field was editted turn load button enabled and disable others
    this.$.det_api_field.addEventListener("change", function(){
      view3.$.loadConfigButton.removeAttribute("disabled");
      // disables all the other buttons and configuration accordion
      view3.$.startConfigButton.setAttribute("disabled", "disabled");
      view3.$.editConfigButton.setAttribute("disabled", "disabled");
      view3.$.submitConfigButton.setAttribute("disabled", "disabled");
      view3.$.stopConfigButton.setAttribute("disabled", "disabled");
      view3.$.resetConfigButton.setAttribute("disabled", "disabled");
      view3.$.config_accordion.setAttribute("disabled", "disabled");
    });


    // load button clicked
    this.$.loadConfigButton.addEventListener('click', function() {
      notification.open();
      view3.loaded_config = true;
      view3.det_api_address = view3.$.det_api_field.value;
      
      socket.emit('emitLoad', {'det_api_address': view3.det_api_address});
      // presents the configuration
      view3.$.config_accordion.removeAttribute("disabled");
      // disable the load button
      this.setAttribute("disabled", "disabled");
      // enables the other buttons
      view3.$.startConfigButton.removeAttribute("disabled");
      view3.$.editConfigButton.removeAttribute("disabled");
      view3.$.stopConfigButton.removeAttribute("disabled");
      view3.$.resetConfigButton.removeAttribute("disabled");
      // view3.$.submitConfigButton.removeAttribute("disabled");
      // disable edit fields
      view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();

      // enables the progress bar
      view3.$.progressBar.removeAttribute("hidden");
      // updates the notification text
      notification.renderer = function(root) {
        root.textContent = 'Loading configuration from server '+ view3.$.det_api_field.value +'.';
      };
      document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > my-view3').shadowRoot.querySelector('#config_accordion').setAttribute("opened", "opened")
    });



    // edit button
    this.$.editConfigButton.addEventListener('click', function() {
      notification.open();
      if (view3.loaded_config === true){
        // enables the progress bar
        view3.$.progressBar.removeAttribute("hidden");
        // enable editting on the fields inside configuration accordion
        view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').enableEditField();
        // disables the other buttons and input field
        // view3.$.det_api_field.setAttribute("disabled", "disabled");
        view3.$.loadConfigButton.setAttribute("disabled", "disabled");
        view3.$.startConfigButton.setAttribute("disabled", "disabled");
        view3.$.editConfigButton.setAttribute("disabled", "disabled");
        view3.$.stopConfigButton.setAttribute("disabled", "disabled");
        view3.$.resetConfigButton.setAttribute("disabled", "disabled");
        // enables submit button
        view3.$.submitConfigButton.removeAttribute("disabled");
        view3.$.progressBar.setAttribute("hidden", "hidden");
      }
      
      notification.renderer = function(root) {
        root.textContent = 'Editing configuration from server '+ view3.$.det_api_field.value +'.';
      };
    });

    // start button
    this.$.startConfigButton.addEventListener('click', function() {
      notification.open();
      if (view3.loaded_config === true){
        socket.emit('emitStart', {'det_api_address': view3.det_api_address});
      }
      // disable edit fields
      view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      // disable start button
      view3.$.startConfigButton.setAttribute("disabled", "disabled");
      // enables stop button
      view3.$.stopConfigButton.removeAttribute("disabled");
      notification.renderer = function(root) {
        root.textContent = 'Starting server '+ view3.$.det_api_field.value +'.';
      };
      // enables the progress bar
      view3.$.progressBar.removeAttribute("hidden");
    });

    // reset button
    this.$.resetConfigButton.addEventListener('click', function() {
      notification.open();
      if (view3.loaded_config === true){
        socket.emit('emitReset', {'det_api_address': view3.det_api_address});
      }
      // disable edit fields
      view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      // enable start button
      view3.$.startConfigButton.removeAttribute("disabled");
      // disable stop button
      view3.$.stopConfigButton.setAttribute("disabled", "disabled");
      notification.renderer = function(root) {
        root.textContent = 'Resetting server '+ view3.$.det_api_field.value +'.';
      };
      // enables the progress bar
      view3.$.progressBar.removeAttribute("hidden");
    });

    // stop button
    this.$.stopConfigButton.addEventListener('click', function() {
      notification.open();
      if (view3.loaded_config === true){
        socket.emit('emitStop', {'det_api_address': view3.det_api_address});
      }
      // disable edit fields
      view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      // disable stop button
      view3.$.stopConfigButton.setAttribute("disabled", "disabled");
      // enable start button
      view3.$.startConfigButton.removeAttribute("disabled");
      notification.renderer = function(root) {
        root.textContent = 'Stopping server '+ view3.$.det_api_field.value +'.';
      };
      // enables the progress bar
      view3.$.progressBar.removeAttribute("hidden");
    });

    // submit button clicked
    this.$.submitConfigButton.addEventListener('click', function() {
      notification.open();
      // gets configuration from input fields and saves them
      this.writer_config = view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').getWriterConfig()
      this.backend_config = view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').getBackendConfig()
      this.detector_config = view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').getDetectorConfig()
      // creates the json to submit to the server 
      const submitJson = {'det_api_address': view3.det_api_address,'configuration': {'writer': this.writer_config,
                 'backend': this.backend_config,
                 'detector': this.detector_config}};

      socket.emit('newConfigurationFromClient', submitJson);
      // adjusts the buttons
      view3.$.startConfigButton.removeAttribute("disabled");
      view3.$.resetConfigButton.removeAttribute("disabled");
      view3.$.editConfigButton.removeAttribute("disabled");
      view3.$.stopConfigButton.removeAttribute("disabled");
      view3.$.submitConfigButton.setAttribute("disabled", "disabled");
      // adjusts the text fields
      view3.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
      notification.renderer = function(root) {
        root.textContent = 'Submitting configuration to server '+ view3.$.det_api_field.value +'.';
      }; 
      // enables the progress bar
      view3.$.progressBar.removeAttribute("hidden");
    });
  }

  hideProgressBar(){
    this.$.progressBar.setAttribute("hidden", "hidden");
  }

  stateChanged(state){
    this.json = state.app.myJson;  
    this.writer_config = state.app.writer_config;
    this.detector_config = state.app.detector_config;
    this.backend_config = state.app.backend_config;
    this.problemLoadingConfig = state.app.problemLoadingConfig;
  };

  problemStartRequest(msg){
    

  customElements.whenDefined('vaadin-dialog').then(function() {
    const dialog = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > my-view3').shadowRoot.querySelector('div > vaadin-form-layout > div > vaadin-horizontal-layout:nth-child(1) > vaadin-dialog')
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

window.customElements.define('my-view3', MyView3);
