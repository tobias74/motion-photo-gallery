<template>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-sheet :rounded="true" class="pa-2">
          <h3>{{ $t("startPageHeadline") }}</h3>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-sheet :rounded="true" class="pa-2">
          {{ $t("startPageDescription") }}
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
          prepend-icon="mdi-camera"
          @update:modelValue="handleAnotherFileSelect"
          accept="image/*"
          name="files[]"
          label="Select Images"
          multiple
          @click:clear="clearFiles"
        >
          <template v-slot:selection="{ fileNames }"> {{ fileNames.length }} files selected </template>
        </v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="motionPhoto in motionPhotos" v-bind:key="motionPhoto.id" cols="12" sm="6" md="4" lg="3" xl="2" style="position: relative">
        <div
          v-if="!motionPhoto.isTranscodedVideoReady && motionPhoto.hasVideo"
          style="position: absolute; z-index: 2; right: 16px; top: 16px; background-color: white; padding: 4px; border-radius: 2px; font-size: 12px"
        >
          <v-progress-circular v-if="motionPhoto.isTranscoding" :size="15" :width="1" indeterminate color="primary"></v-progress-circular>

          <v-icon small v-if="!motionPhoto.isTranscoding" color="primary"> mdi-chat-sleep-outline </v-icon>
        </div>

        <v-img v-if="!motionPhoto.isTranscodedVideoReady" eager contain :aspect-ratio="aspectRatio" :src="motionPhoto.src"> </v-img>

        <video
          v-if="motionPhoto.isTranscodedVideoReady"
          controls
          :src="motionPhoto.transcodedVideoSrc"
          style="max-width: 100%"
          @mouseover="imageHovered"
          :download="motionPhoto.downloadVideoFileName"
        ></video>

        <span v-if="motionPhoto.isExtracting">extracting...</span>
        <span v-if="!motionPhoto.hasVideo && !motionPhoto.isExtracting">no video found</span>
        <a v-if="motionPhoto.isOriginalVideoReady" :href="motionPhoto.originalVideoSrc" :download="motionPhoto.downloadVideoFileName"
          >download original video</a
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { findSequence } from "@/services/findSequence.js";
import SimpleTaskQueue from "../services/simple-queue.js";
import { reactive } from "@vue/reactivity";

export default {
  name: "MotionPhotoViewer",
  mounted() {
    //console.log('found sequence ',findSequence([7,9,6],[1,5,3,7,9,7,5,1,3,6,23,4,5,66,7,9,6]));
  },
  data() {
    return {
      motionPhotos: [],
      extractorQueue: new SimpleTaskQueue(),
    };
  },
  computed: {
    aspectRatio: function () {
      return undefined;

      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return undefined;
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return 16 / 9;
      }
    },
  },

  methods: {
    imageHovered(event) {
      event.target.play();
    },

    addMotionPhoto(file) {
      let fileNameWithoutExtension = file.name.substr(0, file.name.lastIndexOf(".")) || file.name;
      let motionPhoto = reactive({
        id: Date.now() + file.name,
        downloadVideoFileName: fileNameWithoutExtension + ".mp4",
        file: file,
        src: window.URL.createObjectURL(file),
        originalVideoFile: null,
        originalVideoSrc: null,
        isOriginalVideoReady: false,
        transcodedVideoSrc: null,
        isTranscodedVideoReady: false,
        hasVideo: null,
        isExtracting: null,
        isTranscoding: null,
      });
      this.motionPhotos.push(motionPhoto);
      return motionPhoto;
    },

    async clearFiles() {
      this.motionPhotos = [];
      this.extractorQueue.stop();
      this.extractorQueue.clear();
    },

    async handleAnotherFileSelect(files) {
      this.extractorQueue.run();
      this.workFiles(files);
    },

    async workFiles(files) {
      // files is a FileList of File objects. List some properties.
      for (let i = 0, f; (f = files[i]); i++) {
        let motionPhoto = this.addMotionPhoto(f);

        console.log(f.name);

        motionPhoto.isExtracting = true;

        this.extractorQueue.addTask(async (extractorFinished) => {
          let fileTextArrayBuffer = await motionPhoto.file.arrayBuffer();
          let uintArray = new Uint8Array(fileTextArrayBuffer);

          var enc = new TextEncoder();

          let markerPosition = findSequence(enc.encode("MotionPhoto_Data"), uintArray);

          console.log("setting isextracting to false");
          motionPhoto.isExtracting = false;

          if (markerPosition !== -1) {
            motionPhoto.hasVideo = true;

            let mp4VideoFile = motionPhoto.file.slice(markerPosition + 16, uintArray.length, "video/mp4");

            motionPhoto.originalVideoFile = mp4VideoFile;
            motionPhoto.originalVideoSrc = window.URL.createObjectURL(mp4VideoFile);
            motionPhoto.isOriginalVideoReady = true;

            motionPhoto.transcodedVideoSrc = motionPhoto.originalVideoSrc;
            motionPhoto.isTranscodedVideoReady = true;
            motionPhoto.isTranscoding = false;
          } else {
            motionPhoto.hasVideo = false;
          }

          extractorFinished();
        });
      }
      console.log("all done with the files");
    },
  },
};
</script>
