<template>
  <div class="text-center">
    <v-dialog
        v-model="showOverlay"
        class="bg-light"
        width="60vw"
        @close="handleClose"
    >
      <v-card outlined class="shadow">
        <v-card-title>
          <div class="h5 text-center" v-text="title"></div>
        </v-card-title>
        <v-card-text>
          <v-file-input
              accept="image/*"
              label="File input"
              v-model="file"
          ></v-file-input>
        </v-card-text>
        <v-card-actions class="center">
          <v-btn @click="handleClose">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default{
  props:{
    showOverlay:{
      type:Boolean,
      default:false
    },
    title:{
      type:String
    }
  },
  data:function(){
    return {
      src:"",
      file:null
    }
  },
  methods:{
    handleClose(){
      this.showOverlay = false;
      this.src = URL.createObjectURL(this.file);
      this.$emit('change',this.file);
    }
  }
}
</script>