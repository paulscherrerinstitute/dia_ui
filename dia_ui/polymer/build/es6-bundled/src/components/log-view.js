define(["exports","./my-app.js"],function(_exports,_myApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.TextAreaElement=_exports.$vaadinTextArea=void 0;class TextAreaElement extends(0,_myApp.ElementMixin$1)((0,_myApp.TextFieldMixin)((0,_myApp.ThemableMixin)(_myApp.PolymerElement))){static get template(){return _myApp.html`
    <style include="vaadin-text-field-shared-styles">
      .vaadin-text-area-container {
        flex: auto;
        max-height: inherit; /* MSIE 11 */
        min-height: inherit; /* MSIE 11 */
      }

      /* The label and the error message should neither grow nor shrink. */
      [part="label"],
      [part="error-message"] {
        flex: none;
      }

      [part="input-field"] {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      [part="value"] {
        resize: none;
      }

      [part="value"],
      [part="input-field"] ::slotted(*) {
        align-self: flex-start;
      }

      @keyframes vaadin-text-area-appear {
        to {
          opacity: 1;
        }
      }

      :host {
        animation: 1ms vaadin-text-area-appear;
      }
    </style>

    <div class="vaadin-text-area-container">

      <label part="label" on-click="focus" id="[[_labelId]]">[[label]]</label>

      <div part="input-field" id="[[_inputId]]">

        <slot name="prefix"></slot>

        <slot name="textarea">
          <textarea part="value"></textarea>
        </slot>

        <div part="clear-button" id="clearButton" role="button" aria-label\$="[[i18n.clear]]"></div>
        <slot name="suffix"></slot>

      </div>

      <div part="error-message" id="[[_errorId]]" aria-live="assertive" aria-hidden\$="[[_getErrorMessageAriaHidden(invalid, errorMessage, _errorId)]]">[[errorMessage]]</div>

    </div>
`}static get is(){return"vaadin-text-area"}static get version(){return"2.4.7"}static get observers(){return["_textAreaValueChanged(value)"]}ready(){super.ready();this._updateHeight();this.addEventListener("animationend",this._onAnimationEnd)}_onAnimationEnd(e){if(0===e.animationName.indexOf("vaadin-text-area-appear")){this._updateHeight()}}get _slottedTagName(){return"textarea"}_textAreaValueChanged(value){this._updateHeight()}_updateHeight(){const inputField=this.root.querySelector("[part=input-field]"),scrollTop=inputField.scrollTop,input=this.inputElement,inputWidth=getComputedStyle(input).width,valueLength=this.value?this.value.length:0;if(this._oldValueLength>=valueLength){input.style.maxWidth=inputWidth;input.style.height="auto";inputField.style.display="block"}this._oldValueLength=valueLength;const inputHeight=input.scrollHeight;if(inputHeight>input.clientHeight){input.style.height=inputHeight+"px"}input.style.removeProperty("max-width");inputField.style.removeProperty("display");inputField.scrollTop=scrollTop;this._dispatchIronResizeEventIfNeeded("InputHeight",inputHeight)}}_exports.TextAreaElement=TextAreaElement;customElements.define(TextAreaElement.is,TextAreaElement);var vaadinTextArea={TextAreaElement:TextAreaElement};_exports.$vaadinTextArea=vaadinTextArea;const $_documentContainer=_myApp.html`<dom-module id="lumo-text-area" theme-for="vaadin-text-area">
  <template>
    <style include="lumo-text-field">
      [part="input-field"],
      [part="input-field"] ::slotted(textarea) {
        /* Equal to the implicit padding in vaadin-text-field */
        padding-top: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
        padding-bottom: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
        height: auto;
        box-sizing: border-box;
        transition: background-color 0.1s;
        line-height: var(--lumo-line-height-s);
      }

      :host(:not([readonly])) [part="input-field"]::after {
        display: none;
      }

      :host([readonly]) [part="input-field"] {
        border: 1px dashed var(--lumo-contrast-30pct);
      }

      :host([readonly]) [part="input-field"]::after {
        border: none;
      }

      :host(:hover:not([readonly]):not([focused])) [part="input-field"] {
        background-color: var(--lumo-contrast-20pct);
      }

      @media (pointer: coarse) {
        :host(:hover:not([readonly]):not([focused])) [part="input-field"] {
          background-color: var(--lumo-contrast-10pct);
        }

        :host(:active:not([readonly]):not([focused])) [part="input-field"] {
          background-color: var(--lumo-contrast-20pct);
        }
      }

      [part="value"],
      [part="input-field"] ::slotted(textarea) {
        line-height: inherit;
        --_lumo-text-field-overflow-mask-image: none;
      }

      /* Vertically align icon prefix/suffix with the first line of text */
      [part="input-field"] ::slotted(iron-icon) {
        margin-top: calc((var(--lumo-icon-size-m) - 1em * var(--lumo-line-height-s)) / -2);
      }

      [part="input-field"] [part="value"],
      [part="input-field"] ::slotted(textarea) {
        white-space: pre-wrap; /* override \`nowrap\` from <vaadin-text-field> */
        align-self: stretch; /* override \`baseline\` from <vaadin-text-field> */
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer.content);class LogView extends(0,_myApp.connect)(_myApp.store)(_myApp.PolymerElement){static get template(){return _myApp.html$1`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
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
        
        .dialog-message {
          background-color:white;
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
                      <vaadin-dialog id="dialog" no-close-on-esc no-close-on-outside-click></vaadin-dialog>
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
    `}static get properties(){return{dia_log:String}}connectedCallBack(){super.connectedCallBack();connectToRedux(this)}ready(){super.ready();const loadLogButton=document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > log-view").shadowRoot.querySelector("#loadConfigButton");loadLogButton.addEventListener("click",function(){var socket=io.connect("http://"+document.domain+":"+location.port);const configView=document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > config-view");socket.emit("requestDiaLog",{det_api_address:configView.det_api_address})})}stateChanged(state){this.dia_log=state.app.dia_log;if("--"!=this.dia_log){const textAreaField=document.querySelector("body > my-app").shadowRoot.querySelector("app-drawer-layout > app-header-layout > iron-pages > log-view").shadowRoot.querySelector("#dia_log_textarea");textAreaField.value=this.dia_log;textAreaField.scrollTop=textAreaField.scrollHeight;textAreaField.setAttribute("readonly","readonly")}}}window.customElements.define("log-view",LogView)});