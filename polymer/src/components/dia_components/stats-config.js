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
import '../shared-styles.js';

class StatsConfig extends connect(store)(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
    <h4>General configuration</h4>

    <vaadin-form-layout>
    <vaadin-horizontal-layout size-full :expand>
          <label part="label" id="vaadin-text-field-label-1">Control panel</label>
    </vaadin-horizontal-layout>
    <vaadin-horizontal-layout size-full :expand style="width=100%">
          <vaadin-button id="getStatisticsButton" :middle><iron-icon icon="vaadin:download-alt"></iron-icon>Get Statistics</vaadin-button>
          <paper-tooltip for="getStatisticsButton"  position="right" animation-delay="0">Requests statistics from server.</paper-tooltip>
    </vaadin-horizontal-layout>
    </vaadin-form-layout>
    <vaadin-form-layout>
        <vaadin-text-field id="statisticsField" label="Statistics" theme="small" value=[[statistics.statistics]] readonly></vaadin-text-field>
        
    </vaadin-form-layout>

    `;
  }
  
  static get properties() {
    return {
      statistics : String
    }
  }
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    this.statistics = state.app.statistics;   
  }
  ready(){
    super.ready()
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    const view3 = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > my-view3')

    this.$.getStatisticsButton.addEventListener('click', function() {
      socket.emit('emitGetStatistics', {'det_api_address': view3.det_api_address});
    });
  }


  
}

window.customElements.define('stats-config', StatsConfig);
