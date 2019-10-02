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
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
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
    :host([theme~="error"]) [part="overlay"] {
        background-color: white;
      }
    
    #det_api_field {
        width: 100%;
    }

    #containerContent {
        height: 100%;
        width: 100%;
        display: flex;
    }

    .groupBorderLine {
      opacity: 1;
      border: 1px dashed var(--lumo-contrast-30pct);
      position: relative;
      border-radius: var(--lumo-border-radius);
    }
    
    .columnLeft {
        float: left;
        padding: 2px;
        width: 17%;
    }
    
    .columnRight {
        float: left;
        padding: 2px;
        width: 50%;
    }
    .columnRight2 {
        float: left;
        padding: 2px;
        width: 30%;
    }

    .small_icon {
      --iron-icon-height: 17px!important;
      --iron-icon-width: 17px!important; 
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
              <vaadin-text-field label="DIA API Address" value="http://xbl-daq-29:10000" id="det_api_field"></vaadin-text-field>
              <paper-tooltip for="det_api_field" position="bottom" animation-delay="0">Address of the DIA interface</paper-tooltip>
          </div><!-- columnLeft -->
          <div class="columnRight">
              <div class="vaadin-text-field-container" style="padding-top: var(--lumo-space-m);align-self: flex-start;color: var(--lumo-secondary-text-color);font-size: var(--lumo-font-size-s);margin-left: calc(var(--lumo-border-radius-m) / 4);transition: color 0.2s;line-height: 1;padding-bottom: 0.25em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative; width: 100%;box-sizing: border-box;">
                  <vaadin-horizontal-layout size-full :expand>
                      <label part="label" id="vaadin-text-field-label-1">DIA Control panel</label>
                      <vaadin-progress-bar hidden id="progressBar" indeterminate value="0" style="float:right;margin-right: calc(var(--lumo-border-radius-m) / 4);max-width: 65%;"></vaadin-progress-bar>
                      <div part="error-message" aria-live="assertive" aria-hidden="true" id="vaadin-text-field-error-1"></div>
                      <vaadin-dialog id="dialog" no-close-on-esc no-close-on-outside-click theme="error"></vaadin-dialog>
                  </vaadin-horizontal-layout>
              </div> <!-- vaadin-text-field-container -->
              <vaadin-horizontal-layout id="control_panel_field">
                  <vaadin-button id="loadConfigButton" :middle>
                      <iron-icon class="small_icon" icon="vaadin:download-alt"></iron-icon>Load</vaadin-button>
                  <paper-tooltip for="loadConfigButton" position="bottom" animation-delay="0">Loads configuration from DIA address</paper-tooltip>
                  <vaadin-button class="small_icon" id="editConfigButton" :middle disabled>
                      <iron-icon icon="vaadin:edit"></iron-icon>Edit</vaadin-button>
                  <paper-tooltip for="editConfigButton" position="bottom" animation-delay="0">Enable editting the configuration values</paper-tooltip>
                  <vaadin-button class="small_icon" id="submitConfigButton" :middle disabled>
                      <iron-icon icon="icons:send"></iron-icon>Submit</vaadin-button>
                  <paper-tooltip for="submitConfigButton" position="bottom" animation-delay="0">Submits configuration the DIA address</paper-tooltip>
                  <vaadin-button class="small_icon" id="startConfigButton" :middle disabled>
                      <iron-icon icon="vaadin:start-cog"></iron-icon>Start</vaadin-button>
                  <paper-tooltip for="startConfigButton" position="bottom" animation-delay="0">Starts the DIA</paper-tooltip>
                  <vaadin-button class="small_icon" id="stopConfigButton" :middle disabled>
                      <iron-icon icon="vaadin:stop-cog"></iron-icon>Stop</vaadin-button>
                  <paper-tooltip for="stopConfigButton" position="bottom" animation-delay="0">Stop the DIA</paper-tooltip>
                  <vaadin-button class="small_icon" id="resetConfigButton" :middle disabled>
                      <iron-icon icon="vaadin:refresh"></iron-icon>Reset</vaadin-button>
                  <paper-tooltip for="resetConfigButton" position="bottom" animation-delay="0">Resets the DIA</paper-tooltip>
                  <vaadin-notification id="notify" duration="1500" position="top-end"></vaadin-notification>
              </vaadin-horizontal-layout>
          </div> <!-- columnRight -->
          <div class="columnRight2">
              <div class="vaadin-text-field-container" style="padding-top: 13px;align-self: flex-start;color: var(--lumo-secondary-text-color);font-size: var(--lumo-font-size-s);margin-left: calc(var(--lumo-border-radius-m) / 4);transition: color 0.2s;line-height: 1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative; width: 100%;box-sizing: border-box;">
                  <vaadin-horizontal-layout size-full :expand>
                      <vaadin-checkbox></vaadin-checkbox>
                      <label part="label" id="vaadin-text-field-label-1">Detector configuration</label>
                  </vaadin-horizontal-layout>
              </div><!-- vaadin-text-field-container -->
              <vaadin-horizontal-layout id="det_config_field">
                  <vaadin-combo-box disabled name="name"></vaadin-combo-box>
                  <vaadin-button disabled id="submitDetConfigButton" :middle>
                      <iron-icon class="small_icon" icon="icons:send"></iron-icon>Submit</vaadin-button>
                  <paper-tooltip for="submitDetConfigButton" position="bottom" animation-delay="0">Runs script with predefined detector configuration.</paper-tooltip>
              </vaadin-horizontal-layout>
          </div><!-- columnRight2 -->
      </div><!-- row -->
    </div><!-- card -->

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
    </div><!-- card -->
    <!--div class="card">
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
    </div--><!-- card -->
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
    super.ready();
    this.loaded_config = false;
    const notification = this.$.notify;
    // requests configuration from server
    const socket = io.connect('http://' + document.domain + ':' + location.port);
    // gets configView from shadowRoot
    const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view');
    // if input field was editted turn load button enabled and disable others
    this.$.det_api_field.addEventListener("change", function(){

      if (configView != undefined){
        configView.$.loadConfigButton.removeAttribute("disabled");
        // closes accordion
        configView.$.config_accordion.removeAttribute("opened");
        // configView.$.stats_accordion.removeAttribute("opened");
        // stops the stats monitor
        // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config");
        // if (statsConfig != undefined){
        //   statsConfig.stopStatisticsWorker();
        // }
        // disables all the other buttons and configuration accordion
        configView.$.startConfigButton.setAttribute("disabled", "disabled");
        configView.$.editConfigButton.setAttribute("disabled", "disabled");
        configView.$.submitConfigButton.setAttribute("disabled", "disabled");
        configView.$.stopConfigButton.setAttribute("disabled", "disabled");
        configView.$.resetConfigButton.setAttribute("disabled", "disabled");
        configView.$.config_accordion.setAttribute("disabled", "disabled");
        // configView.$.stats_accordion.setAttribute("disabled", "disabled");
      }
    });

    customElements.whenDefined('vaadin-combo-box').then(function() {
      const comboBox = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#det_config_field > vaadin-combo-box");
      const button = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#submitDetConfigButton");
      if (comboBox != undefined && button != undefined){
        comboBox.items = ['Eiger9M', 'Eiger4M'];
        button.addEventListener('click', function() {
          var arraycontainsturtles = (comboBox.items.indexOf(comboBox.value) > -1);
          if (arraycontainsturtles){
            notification.open()
            // submit signal to run detector config script
            var socket = io.connect('http://' + document.domain + ':' + location.port);
            socket.emit('setDetectorConfigScript', {'detector_model': comboBox.value, 'det_api_address': configView.det_api_address});
            // disables the field again
            const checkbox = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("div:nth-child(2) > div > div.columnRight2 > div > vaadin-horizontal-layout > vaadin-checkbox");
            if (checkbox != undefined){
              checkbox.removeAttribute("checked");
            }
            comboBox.setAttribute("disabled", "disabled");
            button.setAttribute("disabled", "disabled");
            // shows notification
            notification.renderer = function(root) {
              root.textContent = 'Running detector configuration script on server '+ configView.$.det_api_field.value +'.';
            };
          }else{
            configView.problemStartRequest({'status':'Configuration script not found, please select one of the valid options from the dropdown menu.'}, false);
          }
        });
      }
    });
    customElements.whenDefined('vaadin-checkbox').then(function() {
      const checkbox = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("div:nth-child(2) > div > div.columnRight2 > div > vaadin-horizontal-layout > vaadin-checkbox");
      if (checkbox != undefined){
        checkbox.addEventListener('click', function(event) {
          notification.open()
          const comboBox = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#det_config_field > vaadin-combo-box");
          const button = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#submitDetConfigButton");
          var checkBoxValue = checkbox.getAttribute("aria-checked");
          if (checkBoxValue == "false" && comboBox != undefined && button != undefined){
            comboBox.setAttribute("disabled", "disabled")
            button.setAttribute("disabled", "disabled")
            notification.renderer = function(root) {
              root.textContent = 'Disabling the detector configuration panel.';
            };
          }else if (checkBoxValue == "true" && comboBox != undefined && button != undefined){
            comboBox.removeAttribute("disabled")
            button.removeAttribute("disabled")
            notification.renderer = function(root) {
              root.textContent = 'Enabling the detector configuration panel.';
            };
          }
        });
      }
    });

    // enter pressed while input field was focused -> loads config
    this.$.det_api_field.addEventListener('keypress', function (e) {
      if (e.keyCode == 13) {
        configView.loadsConfigurationFromDIA(notification, configView, socket);
      }
    });


    // load button clicked
    this.$.loadConfigButton.addEventListener('click', function() {
      configView.loadsConfigurationFromDIA(notification, configView, socket);
    });



    // edit button
    this.$.editConfigButton.addEventListener('click', function() {
      configView.editsConfigurationFromDIA(notification, configView, socket);
    });

    // start button
    this.$.startConfigButton.addEventListener('click', function() {
      configView.startConfigButtonDia(notification, configView, socket);
    });

    // reset button
    this.$.resetConfigButton.addEventListener('click', function() {
      configView.resetConfigButtonDia(notification, configView, socket);
    });

    // stop button
    this.$.stopConfigButton.addEventListener('click', function() {
      configView.stopConfigButtonDia(notification, configView, socket);
    });

    // submit button clicked
    this.$.submitConfigButton.addEventListener('click', function() {
      configView.submitConfigButtonDia(notification, configView, socket);
    });

    // focus on the input field
    this.$.det_api_field.focus()
  }

  submitConfigButtonDia(notification, configView, socket){
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
  }

  resetConfigButtonDia(notification, configView, socket){
    configView.disableStatsWriterTabs();
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
    // closes stat accordion
    // configView.$.stats_accordion.removeAttribute("opened");
    // disable the statistics accordion
    // configView.$.stats_accordion.setAttribute("disabled", "disabled");
    // enables the progress bar
    configView.$.progressBar.removeAttribute("hidden");
    // stops the stats monitor
    // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config")
    // if (statsConfig != undefined){
    //   statsConfig.stopStatisticsWorker();
    // }
  }

  stopConfigButtonDia(notification, configView, socket){
    notification.open();
    if (configView.loaded_config === true){
      socket.emit('emitStop', {'det_api_address': configView.det_api_address});
    }
    // closes stat accordion
    // configView.$.stats_accordion.removeAttribute("opened");
    // disable edit fields
    configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
    // disable stop button
    configView.$.stopConfigButton.setAttribute("disabled", "disabled");
    // enable start button
    configView.$.startConfigButton.removeAttribute("disabled");
    // disable the statistics accordion
    // configView.$.stats_accordion.setAttribute("disabled", "disabled");
    notification.renderer = function(root) {
      root.textContent = 'Stopping server '+ configView.$.det_api_field.value +'.';
    };
    // enables the progress bar
    configView.$.progressBar.removeAttribute("hidden");

    // stops the stats monitor
    // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config")
    // if (statsConfig != undefined){
    //   statsConfig.stopStatisticsWorker();
    // }
  };

  startConfigButtonDia(notification, configView, socket){
    // stops the stats monitor
    // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config");
    // if (statsConfig != undefined){
    //  statsConfig.stopStatisticsWorker();
    // }
    notification.open();
    if (configView.loaded_config === true){
      socket.emit('emitStart', {'det_api_address': configView.det_api_address});
    }
    // disable edit fields
    configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();
    // disable start button
    configView.$.startConfigButton.setAttribute("disabled", "disabled");
    // enables stats accordion
    // configView.$.stats_accordion.removeAttribute("disabled");
    // enables stop button
    configView.$.stopConfigButton.removeAttribute("disabled");
    notification.renderer = function(root) {
      root.textContent = 'Starting server '+ configView.$.det_api_field.value +'.';
    };
    // start the statistics worker
    // if (statsConfig != undefined){
    //  statsConfig.startStatisticsWorker();
    // }
    // enables the progress bar
    configView.$.progressBar.removeAttribute("hidden");
  }

  loadsConfigurationFromDIA(notification, configView, socket){
    // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config");
    // if (statsConfig != undefined){
    //  statsConfig.stopStatisticsWorker();
    // }
    notification.open();
    if (configView != undefined){
      configView.loaded_config = true;
      configView.det_api_address = configView.$.det_api_field.value;

      socket.emit('emitLoad', {'det_api_address': configView.det_api_address});
      // presents the configuration
      configView.$.config_accordion.removeAttribute("disabled");
      // enables the statistics accordion
      // configView.$.stats_accordion.removeAttribute("disabled");

      // disable the load button
      configView.$.loadConfigButton.setAttribute("disabled", "disabled");

      // enables the other buttons
      configView.$.startConfigButton.removeAttribute("disabled");
      configView.$.editConfigButton.removeAttribute("disabled");
      configView.$.stopConfigButton.removeAttribute("disabled");
      configView.$.resetConfigButton.removeAttribute("disabled");
      // disable edit fields
      configView.shadowRoot.querySelector('#config_accordion > vaadin-vertical-layout > dia-config').disableEditField();

      // enables the progress bar
      configView.$.progressBar.removeAttribute("hidden");
      // updates the notification text
      notification.renderer = function(root) {
        root.textContent = 'Loading configuration from server '+ configView.$.det_api_field.value +'.';
      };
      document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view').shadowRoot.querySelector('#config_accordion').setAttribute("opened", "opened");
    }
  }

  editsConfigurationFromDIA(notification, configView, socket){
    notification.open();
    if (configView.loaded_config === true && configView != undefined){
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
  }

  updateControlPanelButtons(){
    status = this.status_config['status']
    const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
    if (configView != undefined){
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
    }
  };

  hideProgressBar(){
    this.$.progressBar.setAttribute("hidden", "hidden");
  }

  disableStatsWriterTabs(){
    // disables previous error or finish tabs
    var errorTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_error_tab_title");
    var finishTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_finish_tab_title");
    var advTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_adv_tab_title");
    var startTab = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config").shadowRoot.querySelector("#writer_start_tab_title");
    if (errorTab != undefined && finishTab != undefined && advTab != undefined && startTab != undefined){
      errorTab.setAttribute("disabled", "disabled");
      finishTab.setAttribute("disabled", "disabled");
      advTab.setAttribute("disabled", "disabled");
      startTab.setAttribute("disabled", "disabled");
    };
  }

  updateStartButton(status){
  const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
  if (status != "IntegrationStatus.RUNNING" && this.loaded_config == true && configView != undefined) {
    configView.$.startConfigButton.removeAttribute("disabled");
  }else if (configView != undefined){
    configView.$.startConfigButton.setAttribute("disabled", "disabled");
  }};

  stateChanged(state){
    this.json = state.app.myJson;  
    this.writer_config = state.app.writer_config;
    this.detector_config = state.app.detector_config;
    this.backend_config = state.app.backend_config;
    this.problemLoadingConfig = state.app.problemLoadingConfig;
    this.status_config = state.app.status_config;
    this.statistics_wr_finish = state.app.statistics_wr_finish;
    this.statistics_wr_error = state.app.statistics_wr_error;
  };

  newStatisticsStart(){
    this.statistics_wr_error.enable = false;
    this.statistics_wr_finish.enable = false;
    // removes progress bar color
    const progressBar = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#config_accordion > vaadin-vertical-layout > dia-config").shadowRoot.querySelector("#progress-bar-custom-bounds");
    if (progressBar != undefined){
      progressBar.removeAttribute("theme");
    }
  }

  problemStartRequest(msg, startDiaButton){
  customElements.whenDefined('vaadin-dialog').then(function() {
    const dialog = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("div:nth-child(2) > div > div.columnRight > div > vaadin-horizontal-layout > vaadin-dialog");
    dialog.renderer = function(root, dialog) {
      // Check if there is a DOM generated with the previous renderer call to update its content instead of recreation
      if (root.firstElementChild) {
        return;
      };
      const div = window.document.createElement('div');
      div.textContent = msg['status'];
      const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view');

      // if connection was not made, stop statistics and disables config/statistics
      if (div.textContent.includes("Failed to establish a new connection")){
        // stops the stats monitor
        // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config");
        // if (statsConfig != undefined){
        //  statsConfig.stopStatisticsWorker();
        // }
        if (configView != undefined){
          // closes accordions
          configView.$.config_accordion.removeAttribute("opened");
          // configView.$.stats_accordion.removeAttribute("opened");
          // disables accordions
          configView.$.config_accordion.setAttribute("disabled", "disabled");
          // configView.$.stats_accordion.setAttribute("disabled", "disabled");
          // enable the load
          configView.$.loadConfigButton.removeAttribute("disabled");
          // disables control pannel buttons
          configView.$.startConfigButton.setAttribute("disabled", "disabled");
          configView.$.editConfigButton.setAttribute("disabled", "disabled");
          configView.$.submitConfigButton.setAttribute("disabled", "disabled");
          configView.$.stopConfigButton.setAttribute("disabled", "disabled");
          configView.$.resetConfigButton.setAttribute("disabled", "disabled");
        }
      }

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
      if (startDiaButton == 'yes'){
        const startServiceButton = window.document.createElement('vaadin-button');
        if (startServiceButton != undefined){
          startServiceButton.setAttribute('theme', 'primary');
          startServiceButton.textContent = 'Start DIA service';
          startServiceButton.setAttribute('style', 'margin-right: 1em');
          startServiceButton.addEventListener('click', function() {
              // emits the signal to start the DIA service on desired host machine
              const submitJson = {'det_api_address': configView.det_api_address};
              // connects to the socket to request the start of the dia service
              var socket = io.connect('http://' + document.domain + ':' + location.port);
              socket.emit('emitStartDiaService', submitJson);
              // closes the dialog message
              dialog.opened = false;
              // stops the stats monitor
              // const statsConfig = document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view").shadowRoot.querySelector("#stats_accordion > vaadin-vertical-layout > stats-config");
              // if (statsConfig != undefined){
              //  statsConfig.stopStatisticsWorker();
              // }

            });
          root.appendChild(startServiceButton);
        }
      }
    };
    
    dialog.opened = true;
  });

  };

}

window.customElements.define('config-view', ConfigView);
