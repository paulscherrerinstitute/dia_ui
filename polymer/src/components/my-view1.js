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
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';

import './shared-styles.js';


class MyView1 extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        <iron-input>
          <input id="todoInput" type="text" value="{{tempTodo::input}}"><paper-button raised on-click="_addItem">Add</paper-button><br> 
        </iron-input>
        
        <paper-toast id="toast" text={{currentClick}}></paper-toast>
      </div>
      <div id="container" style='position: fixed; left:50%; top:50px; width: 100%;'></div>
      <div class="card">
        <div class="circle">2</div>
        <h1>TODOS COUNT {{todos.length}}</h1>
        
        <div> Employee list: </div>
        
        <dom-repeat items="[[todos]]" restamp>
          <template>
            <paper-item> [[index]] : [[item]] <paper-item>
            
            <paper-button raised on-click="_removeItem">Remove</paper-button><br>
          </template>
        </dom-repeat>
        
      </div>
      
    `;
  }

  static get properties() {
    return {
      todos: {type: Array, value:store.getState().app.todos},
      currentClick : String
    }
  }

  _openToast() {
    this.$.toast.fitInto = this.$.container;
    this.$.toast.open();
  }
 
  
  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this); 
  }

  ready() {
    super.ready();
  }

  stateChanged(state){
    this.todos = state.app.todos;  
  }

  _removeItem(e){
    this.currentClick = 'Removed item: '+e.model.item
    this._openToast()
    store.dispatch({type:'REMOVE', payload:e.model.index});
  }

  _addItem(){
    this.currentClick = 'Added item: '+this.tempTodo
    this._openToast()
    store.dispatch({type:'ADD', payload:this.tempTodo});
    this.tempTodo = '';
  }

}

window.customElements.define('my-view1', MyView1);
