<template>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-sheet :rounded="true" class="pa-2">
          <h3>{{ $t("psdPageHeadline") }}</h3>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-sheet :rounded="true" class="pa-2">
          {{ $t("psdPageDescription") }}
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-file-input
          filled
          prepend-icon="mdi-file-image"
          @update:modelValue="handleFileSelect"
          accept=".psd"
          name="files[]"
          label="Select PSD Files"
          multiple
          @click:clear="clearFiles"
        >
          <template v-slot:selection="{ fileNames }"> {{ fileNames.length }} files selected </template>
        </v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="photo in photos" :key="photo.id" cols="12" sm="4" md="3" lg="2" xl="1" style="position: relative">
        <v-img v-if="!photo.isPreviewReady && photo.src" eager contain :aspect-ratio="aspectRatio" :src="photo.src"> </v-img>

        <v-img v-if="photo.isPreviewReady" eager contain :aspect-ratio="aspectRatio" :src="photo.previewSrc"> </v-img>

        <span v-if="photo.isExtracting">extracting...</span>
        <span v-if="!photo.isExtracting && !photo.isPreviewReady">no preview found</span>
        <div v-if="photo.isPreviewReady">
          <p style="font-size: 0.8em">{{ photo.file.name }}&nbsp;({{ (photo.file.size / (1024 * 1024)).toFixed(2) }}&nbsp;MB)</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimpleTaskQueue from "../services/simple-queue.js";
import { extractPsdThumbnail } from "../services/psd-tools.js";
import { reactive } from "@vue/reactivity";

export default {
  name: "PsdViewer",
  data() {
    return {
      photos: [],
      extractorQueue: new SimpleTaskQueue(),
    };
  },
  computed: {
    aspectRatio() {
      return undefined;
    },
  },
  methods: {
    addPhoto(file) {
      let fileNameWithoutExtension = file.name.substr(0, file.name.lastIndexOf(".")) || file.name;
      let photo = reactive({
        id: Date.now() + file.name,
        file: file,
        src: window.URL.createObjectURL(file),
        isPreviewReady: false,
        previewSrc: null,
        isExtracting: null,
      });
      this.photos.push(photo);
      return photo;
    },

    async clearFiles() {
      this.photos = [];
      this.extractorQueue.stop();
      this.extractorQueue.clear();
    },

    async handleFileSelect(files) {
      this.extractorQueue.run();
      this.workFiles(files);
    },

    async workFiles(files) {
      for (let i = 0, f; (f = files[i]); i++) {
        let photo = this.addPhoto(f);

        photo.isExtracting = true;

        this.extractorQueue.addTask(async (extractorFinished) => {
          try {
            const blob = await extractPsdThumbnail(f);
            photo.previewSrc = window.URL.createObjectURL(blob);
            photo.isPreviewReady = true;
          } catch (error) {
            console.error(error.message);
          }

          photo.isExtracting = false;
          extractorFinished();
        });
      }
    },
  },
};
</script>
