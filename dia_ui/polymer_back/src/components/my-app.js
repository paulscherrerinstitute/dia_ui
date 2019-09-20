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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            
            <a id="DiaConfig" name="config" href="[[rootPath]]config">Dashboard</a>
            <a id="LogViewer" name="logView" href="[[rootPath]]logView">Log viewer</a>
          </iron-selector>
          <div id="containerHigh"></div>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Detector integration API user interface</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <config-view name="config"></config-view>
            <log-view name="logView"></log-view>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      jsonState: {type: JSON, value:  store.getState().app.myJson}
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }



  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'config';
    } else if (['config', 'logView'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  connectedCallBack(){
    super.connectedCallBack();
    connectToRedux(this);    
  }

  ready(){
    super.ready();
          //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port);


    socket.on('newStatisticsWriterStart', function(msg) {
      store.dispatch({type:'UPDATE_STATISTICS_WRITER_START', payload:msg});
      const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
      configView.newStatisticsStart();
    });

    socket.on('newStatisticsWriterFinish', function(msg) {
      store.dispatch({type:'UPDATE_STATISTICS_WRITER_FINISH', payload:msg});
    });

    socket.on('newStatisticsWriterError', function(msg) {
      store.dispatch({type:'UPDATE_STATISTICS_WRITER_ERROR', payload:msg});
    });

    socket.on('newStatisticsWriterAdv', function(msg) {
      store.dispatch({type:'UPDATE_STATISTICS_WRITER_ADV', payload:msg});
    });

    socket.on('newConfigWriterData', function(msg) {
      store.dispatch({type:'UPDATE_WRITER_CONFIG', payload:msg});
    });

    socket.on('newConfigStatus', function(msg) {
      store.dispatch({type:'UPDATE_STATUS_CONFIG', payload:msg});
    });

    socket.on('newConfigDetectorData', function(msg) {
      store.dispatch({type:'UPDATE_DETECTOR_CONFIG', payload:msg});
    });

    socket.on('newConfigBackendData', function(msg) {
      store.dispatch({type:'UPDATE_BACKEND_CONFIG', payload:msg});
    });

    socket.on('problemLoadingConfig', function(msg){
      store.dispatch({type:'ERROR_LOADING_CONFIG', payload:msg});
    });

    socket.on('sendingDiaLog', function(msg){
      store.dispatch({type:'RECEIVED_DIA_LOG', payload:msg});
    });

    socket.on('problemWithRequest', function(msg){
      const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
      configView.problemStartRequest(msg, msg['start_dia_option']);
    })

    socket.on('finishedRequestSuccessfully', function(msg){
      if (msg['status']==='ok'){
        document.querySelector('my-app').hideProgressBar();
      }
    })
  }

  hideProgressBar(){
    // gets configView from shadowRoot
    const configView = document.querySelector('body > my-app').shadowRoot.querySelector('app-drawer-layout > app-header-layout > iron-pages > config-view')
    configView.hideProgressBar()
    configView.updateControlPanelButtons()
  }

  getCurrentPage(){
    return this.page;
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'config':
        import('./config-view.js');
        break;
      case 'logView':
        import('./log-view.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
