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
import '@vaadin/vaadin-button/vaadin-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '../shared-styles.js';


class ControlConfig extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      
    `;
  }
  
  static get properties() {
    return {
    }
  }
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    
  }

}

window.customElements.define('control-config', ControlConfig);
