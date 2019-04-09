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
import './shared-styles.js';

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
      <div class="circle">2</div>
      <h1>JSON</h1>
        
        <div> Reading json: </div>
        <p> Name: [[json.name]] || Age: [[json.age]]</p>
        <dom-repeat items="[[json.food]]" restamp>
        <ul>
        <template>
          <li><paper-item> [[item]] <paper-item><br></li>
        </template>
        </ul>
        </dom-repeat>
        
      </div>
    `;
  }
  
  static get properties() {
    return {
      json : String
    }
  }
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  } 

  stateChanged(state){
    this.json = state.app.myJson;  
    
  }

}

window.customElements.define('my-view3', MyView3);
