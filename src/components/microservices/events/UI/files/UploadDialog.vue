<template>
  <v-dialog transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi mdi-upload" v-bind="props"></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="dialog">

        <v-card-title>Upload</v-card-title>

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
          <v-btn class="btn" variant="text" @click="getTemplate">
            GetTemplate
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

        <v-card-text
          v-if="errorMessage!==''">
          <v-textarea
            rows="2"
            variant="outlined"
            v-model="errorMessage">
          </v-textarea>
        </v-card-text>

      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";

export default {
  name: "UploadDialog",
  data: () => ({
    selectedFile: [],
    inline: 'add',
    errorMessage: '',
    inProcess: false,
    json: [],
    rules: [
      value => {
        return !value || !value.length || value[0].size < 2000000 || 'File Size exceeded"'
      },
    ],

    reader: new FileReader(),
  }),
  props:{
    service:{
      type: Object,
      required: true
    }
  },
  methods: {
    useBirthdaysStore,

    getTemplate() {
      console.log(this.reader.result)
      console.log(this.inProcess)
    },

    apply() {
      if(this.json !== undefined){
        console.log(this.json)
        this.convertAndValidateJson()
      }else{
        console.log('undefined')
      }
    },

    readFile() {
      this.clear()
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
    },
    clear(){
      this.inProcess = false;
      this.errorMessage = ''
      this.reader.abort()
    },
    convertAndValidateJson(){
      this.inProcess = true

      this.service.validateUploadJson()

      this.inProcess = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.dialog
  width: 600px

.input
  width: 100%

</style>
