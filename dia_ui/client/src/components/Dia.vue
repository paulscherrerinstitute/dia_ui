<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Detector integration API</h1>
        <hr>
        <br>
        <div style="margin:auto;">
          <div style="float: left;width: 50%;">
            <b-card bg-variant="light">
              <h6>DIA CONTROL PANEL</h6>
              <button type="button"
                      class="btn btn-secondary btn-sm"
                      style="margin:2px;"
                      v-on:click="onDiaControlPanelClick($event)">Start</button>
              <button type="button"
                      class="btn btn-secondary btn-sm"
                      style="margin:2px;"
                      v-on:click="onDiaControlPanelClick($event)">Stop</button>
              <button type="button"
                      class="btn btn-secondary btn-sm"
                      style="margin:2px;"
                      v-on:click="onDiaControlPanelClick($event)">Reset</button>
              <button type="button"
                      class="btn btn-secondary btn-sm"
                      style="margin:2px;"
                      v-on:click="onDiaControlPanelClick($event)">Load config</button>
            </b-card>
          </div>
          <div style="float: right; width: 50%;">
            <b-card bg-variant="light">
              <h6>DETECTOR CONTROL PANEL</h6>
              <button type="button"
                      disabled
                      class="btn btn-secondary btn-sm"
                      style="margin:2px;"
                      v-on:click="onDetControlPanelClick($event)">Ping</button>
              <button type="button"
                      disabled
                      class="btn btn-secondary btn-sm"
                      style="margin:2px;"
                      v-on:click="onDetControlPanelClick($event)">Configure</button>
            </b-card>
          </div>
          <br><br>
        </div>
        <br><br>

        <div :key="componentKey">
          <table class="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th>
                  <div class="btn-group" role="group" style="margin:2px;">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="onDiaControlPanelClick($event)">
                    Refresh
                    </button>
                  </div>
                  <div class="btn-group"
                        role="group"
                        v-b-modal.edit-modal
                        style="margin:2px;">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm">
                    Set config
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(comp, index) in comps" :key="index">
                <td>{{ comp.name }}</td>
                <td>{{ comp.status }}</td>
                <td>
                  <template v-if="comp.name === 'DIA'">
                  </template>
                  <template v-else>
                    <div class="btn-group"
                        role="group"
                        v-b-modal.config-modal
                        style="margin:2px;">
                      <button type="button"
                              class="btn btn-primary btn-sm"
                              v-on:click="sendInfo(comp.name)">
                              details
                      </button>
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <alert :message=message :variant=variant v-if="showMessage"></alert>
      </div>
    </div>
    <b-modal ref="configDiaModal"
      id="config-modal"
      :title="selectedComponentTitle"
      hide-footer>
      <tr v-for="(comp, index) in comps" :key="index">
        <template v-if="comp.name === selectedComponent">
            <template v-if="comp.name === `writer`">
              <tr v-for="(entry, key, indexComp) in configForm.writer" :key="indexComp">
                <b-form-group
                  label-cols-sm="3"
                  label-align-sm="right"
                  >
                  <div style="margin:auto;">
                    <div style="float:left; width:50%;">{{key}}</div>
                    <div style="float:right;width:50%;">
                      <b-form-input v-model="comp[key]"
                                    disabled>
                      </b-form-input></div>
                  </div>
                </b-form-group>
              </tr>
            </template>
            <template v-if="comp.name === `backend`">
              <tr v-for="(entry, key, indexComp) in configForm.backend" :key="indexComp">
                <b-form-group
                  label-cols-sm="3"
                  label-align-sm="right"
                  >
                  <div style="margin:auto;">
                    <div style="float:left; width:50%;">{{key}}</div>
                    <div style="float:right;width:50%;">
                      <b-form-input v-model="comp[key]"
                                    disabled>
                      </b-form-input></div>
                  </div>
                </b-form-group>
              </tr>
            </template>
            <template v-if="comp.name === `detector`">
              <tr v-for="(entry, key, indexComp) in configForm.detector" :key="indexComp">
                <b-form-group
                  label-cols-sm="3"
                  label-align-sm="right"
                  >
                  <div style="margin:auto;">
                    <div style="float:left; width:50%;">{{key}}</div>
                    <div style="float:right;width:50%;">
                      <b-form-input
                        v-model="comp[key]"
                        disabled>
                      </b-form-input></div>
                  </div>
                </b-form-group>
              </tr>
            </template>
        </template>
      </tr>
    </b-modal>
    <b-modal ref="editDiaModal"
      id="edit-modal"
      title="Set configuration"
      hide-footer>
      <div>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="writer"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
            >
            <b-form-group
              label-cols-sm="4"
              label="n_frames:"
              label-align-sm="right"
              label-for="nested-n_frames"
              >
              <b-form-input id="nested-n_frames"
                            required
                            v-model="configForm.writer.n_frames">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="output_file:"
              label-align-sm="right"
              label-for="nested-output_file"
              >
              <b-form-input id="nested-output_file"
                            required
                            v-model="configForm.writer.output_file">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="user_id:"
              label-align-sm="right"
              label-for="nested-user_id"
              >
              <b-form-input id="nested-user_id"
                            required
                            v-model="configForm.writer.user_id">
              </b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>
      </div>
      <div>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="backend"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
            >
            <b-form-group
              label-cols-sm="4"
              label="bit_depth:"
              label-align-sm="right"
              label-for="nested-bit_depth"
              >
              <b-form-input id="nested-bit_depth"
                            required
                            v-model="configForm.backend.bit_depth">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="preview_modulo:"
              label-align-sm="right"
              label-for="nested-preview_modulo"
              >
              <b-form-input id="nested-preview_modulo"
                            required
                            v-model="configForm.backend.preview_modulo">
              </b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>
      </div>
      <div>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="detector"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
            >
            <b-form-group
              label-cols-sm="4"
              label="dr:"
              label-align-sm="right"
              label-for="nested-dr"
              >
              <b-form-input id="nested-dr"
                            required
                            v-model="configForm.detector.dr">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="frames:"
              label-align-sm="right"
              label-for="nested-frames"
              >
              <b-form-input id="nested-frames"
                            required
                            v-model="configForm.detector.frames">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="period:"
              label-align-sm="right"
              label-for="nested-period"
              >
              <b-form-input id="nested-period"
                            required
                            v-model="configForm.detector.period">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="exptime:"
              label-align-sm="right"
              label-for="nested-exptime"
              >
              <b-form-input id="nested-exptime"
                            required
                            v-model="configForm.detector.exptime">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="timing:"
              label-align-sm="right"
              label-for="nested-timing"
              >
              <select v-model="timingSelected">
                <option v-for="(option, index) in timingOptions" v-bind:key="index">
                  {{ option.text }}
                </option>
              </select>
              <!-- <b-form-input id="nested-timing"
                            required
                            v-model="configForm.detector.timing">
              </b-form-input> -->
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="cycle:"
              label-align-sm="right"
              label-for="nested-cycle"
              >
              <b-form-input id="nested-cycle"
                            required
                            v-model="configForm.detector.cycle">
              </b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>
      </div>
      <b-form @submit="onSubmitDiaConfig" class="w-100">
        <b-button-group>
          <b-button type="submit"
                    variant="primary">Submit
          </b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      componentKey: 0,
      selectedComponent: 'none',
      selectedComponentTitle: 'none',
      timingOptions: [
        { text: 'auto', value: 'auto' },
        { text: 'trigger', value: 'trigger' },
      ],
      timingSelected: 'auto',
      comps: [],
      configForm: {
        writer: {
          n_frames: '',
          output_file: '',
          user_id: '',
        },
        detector: {
          dr: '',
          frames: '',
          period: '',
          exptime: '',
          timing: '',
          cycles: '',
        },
        backend: {
          bit_depth: '',
          preview_modulo: '',
        },
      },
      message: '',
      showMessage: false,
      variant: '',
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    sendInfo(componentName) {
      const componentAdjusted = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      this.selectedComponentTitle = `${componentAdjusted} details`;
      this.selectedComponent = componentName;
    },
    getComps() {
      const path = 'http://localhost:5000/api/v1/DIA/comps';
      axios.get(path)
        .then((res) => {
          this.comps = res.data.comps;
          this.forceRerender();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    onDetControlPanelClick(e) {
      const cmd = String(e.target.textContent).replace(/\s+/g, '').toLowerCase();
      const path = 'http://localhost:5000/api/v1/DET/cmd/'.concat(cmd);
      axios.get(path)
        .then(() => {
          this.message = `Detector ${cmd} !`;
          this.showMessage = true;
          this.getComps();
          setTimeout(() => {
            this.showMessage = false;
          }, 5000);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    onDiaControlPanelClick(e) {
      const cmd = String(e.target.textContent).replace(/\s+/g, '').toLowerCase();
      const path = 'http://localhost:5000/api/v1/DIA/cmd/'.concat(cmd);
      axios.get(path)
        .then((response) => {
          if (response.data.status === 'danger') {
            this.message = `Error: ${response.data.error}`;
            this.showMessage = true;
            this.variant = 'danger';
          }
          if (response.data.status === 'success') {
            this.message = `DIA ${cmd} !`;
            this.variant = 'success';
            this.showMessage = true;
            this.getComps();
            setTimeout(() => {
              this.showMessage = false;
            }, 5000);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    onSubmitDiaConfig(evt) {
      evt.preventDefault();
      this.$refs.editDiaModal.hide();
      const payload = {
        writer: {
          n_frames: Number(this.configForm.writer.n_frames),
          output_file: String(this.configForm.writer.output_file),
          user_id: Number(this.configForm.writer.user_id),
        },
        backend: {
          bit_depth: Number(this.configForm.backend.bit_depth),
          preview_modulo: Number(this.configForm.backend.preview_modulo),
        },
        detector: {
          frames: Number(this.configForm.detector.frames),
          dr: Number(this.configForm.detector.dr),
          timing: String(this.timingSelected),
          exptime: Number(this.configForm.detector.exptime),
          cycles: Number(this.configForm.detector.cycles),
          period: Number(this.configForm.detector.period),
        },
      };
      this.submitConfig(payload);
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      let read = false;
      if (this.addBookForm.read[0]) read = true;
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read, // property shorthand
      };
      this.addBook(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      this.initForm();
    },
    editComponent(comp) {
      this.editForm = comp;
    },
    submitConfig(payload) {
      const path = 'http://localhost:5000/api/v1/DIA/cmd/newConfig';
      axios.put(path, payload)
        .then((response) => {
          if (response.data.status === 'danger') {
            this.message = `Error: ${response.data.error}`;
            this.showMessage = true;
            this.variant = 'danger';
          }
          if (response.data.status === 'success') {
            this.message = 'Configuration set!';
            this.variant = 'success';
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 5000);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getComps();
        });
    },
  },
  created() {
    this.getComps();
  },
};
</script>
