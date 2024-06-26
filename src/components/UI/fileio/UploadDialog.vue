<template>
  <v-dialog transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-upload" v-bind="props" @click="clear"></v-btn>
    </template>
    <template v-slot:default="{isActive}">
      <v-card class="dialog">

        <v-card-title>Please select file to Upload</v-card-title>

        <v-card-text>
          <v-file-input
            hide-details
            show-size
            class="input"
            label="Input File"
            variant="outlined"
            density="compact"
            accept=".json"
            :rules="rules"
            v-model="selectedFile"
            @change="readFile"
            @click:clear="clear"
            @click:append="clear"
          >
          </v-file-input>
        </v-card-text>

        <v-card-actions>
          <v-radio-group class="radio-btn" v-model="inline" column hide-details>
            <v-radio
              label="Replace all"
              value="replace"
              color="warning"
            ></v-radio>
            <v-radio
              label="Add to current"
              value="add"
              color="primary"
            ></v-radio>
          </v-radio-group>
          <v-btn class="btn" variant="text" @click="downloadTemplate">
            Template
          </v-btn>
          <v-btn class="btn" variant="outlined" color="error" @click="isActive.value = false">
            Close
          </v-btn>
          <v-btn class="btn" variant="outlined" color="primary" @click="apply">
            Apply
          </v-btn>
        </v-card-actions>

        <div v-if="inProcess">
          <v-progress-linear
            model-value="inProcess"
            color="primary"
            indeterminate
            rounded
          ></v-progress-linear>
        </div>

        <v-card-text v-if="errorMessage!==''">
          <v-textarea
            rows="2"
            variant="outlined"
            hide-details
            v-model="errorMessage">
          </v-textarea>
          <v-btn style="width: 100%" @click="clear">Clear</v-btn>
        </v-card-text>

        <v-card-text v-if="successMessage!==''">
          <v-textarea
            rows="1"
            variant="outlined"
            color="primary"
            hide-details
            v-model="successMessage">
          </v-textarea>
          <v-btn style="width: 100%" @click="clear">Clear</v-btn>
        </v-card-text>

      </v-card>
    </template>
  </v-dialog>
</template>

<script>

export default {
  name: "UploadDialog",
  data: () => ({
    selectedFile: [],
    inline: 'add',
    errorMessage: '',
    successMessage: '',
    inProcess: false,
    json: [],
    rules: [
      value => {
        return !value || !value.length || value[0].size < 2000000 || 'File Size exceeded"'
      },
    ],

    reader: new FileReader(),
  }),

  props: {
    service: {
      type: Object,
      required: true
    },
  },

  methods: {

    apply() {
      if (this.json !== undefined && this.selectedFile.length > 0) {
        this.save()
      } else {
        this.errorMessage = "Please select File first"
      }
    },

    readFile() {
      if (this.selectedFile[0] !== undefined) {
        this.inProcess = true
        this.reader.readAsText(this.selectedFile[0]);
        this.reader.addEventListener('load', (e) => {
          try {
            this.json = JSON.parse(e.target.result.toString())
          } catch (e) {
            this.errorMessage = e.toString()
          }
          this.inProcess = false
        })
      }
    },
    clear() {
      this.inProcess = false;
      this.errorMessage = ''
      this.successMessage = ''
      this.selectedFile = []
      this.json = {}
    },

    downloadTemplate() {
      let text = JSON.stringify(this.service.getTemplateObject());
      let filename = 'Template.json';
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },

    //needed inputProps service. caused usability this component in different components
    async save() {
      this.inProcess = true
      let result = this.service.convertAndValidateJson(this.json)
      if (typeof result === typeof JSON && result.length > 0) {
        let response = await this.service.uploadJSON(result, this.inline === 'replace')
        if (response.status !== undefined && response.status === 200) {
          await this.service.getUnits();
          this.successMessage = "Successfully added: " + response.data
        } else {
          this.errorMessage = "Somenthing Went Wrong"
        }
      } else {
        this.errorMessage = result
      }
      this.inProcess = false
    }
  },
}
</script>

<style lang="sass" scoped>

.dialog
  width: 600px

.input
  width: 100%

</style>
