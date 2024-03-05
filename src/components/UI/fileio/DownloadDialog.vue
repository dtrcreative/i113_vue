<template>
  <v-btn
    icon="mdi-download"
    @click="downloadBackUp"
  ></v-btn>
</template>

<script>
export default {
  name: "DownloadDialog",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods:{
    async downloadBackUp(){
      let json = await this.service.getBackUp()
      let text = JSON.stringify(json);
      let filename = this.service.getBackUpFileName();
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    }
  }
}
</script>

<style scoped>
</style>
