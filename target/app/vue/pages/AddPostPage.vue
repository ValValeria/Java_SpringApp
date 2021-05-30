<template>
  <div class="add-post section">
    <AddPostMenuComponent ref="menu"/>

    <v-snackbar
        v-model="snackbar"
        class="txt-light"
    >
      <span class="txt-light h5">{{ messageForUser }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <AddPostOverlayComponent ref="overlay" @change="imageIsSpecified=true;file=$event;" title="Specify the image" :showOverlay="showOverlay"/>

    <BasicLayout :title="pageTitle" css__class="add-post">
      <template #items>
        <div class="add-post__area w-100">
          <div class="add-post__container w-100">
            <v-tabs v-model="tab" centered color="#212121">
              <v-tab>
                The Setting
              </v-tab>
              <v-tab>
                The content of post
              </v-tab>
            </v-tabs>

            <v-tabs-items  v-model="tab">
              <v-tab-item>
                <div class="add-post__body section__body">
                  <v-card outlined class="add-post__setup shadow">
                    <v-card-text>
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="h5">
                            Headline
                          </v-subheader>
                        </v-col>
                        <v-col cols="10">
                          <v-text-field
                              label="Type..."
                              color="#424242"
                              v-model="setting.title"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="h5">
                            Main image
                          </v-subheader>
                        </v-col>
                        <v-col cols="10">
                          <LoadImageComponent @change="setting.image=$event" :srcImage="setting.image"/>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="h5">
                            Excerpt
                          </v-subheader>
                        </v-col>
                        <v-col cols="10">
                          <v-text-field
                              label="Type..."
                              color="#424242"
                              v-model="setting.description"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="h5">
                            Categories
                          </v-subheader>
                        </v-col>
                        <v-col cols="10">
                          <v-select
                              :items="categories"
                              label="Available categories"
                              color="#424242"
                              v-model="setting.category"
                              multiple
                              deletable-chips
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text class="center">
                      <ButtonComponent color="dark" txt="Submit" @click="submit"/>
                    </v-card-text>
                  </v-card>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div class="add-post__body section__body">
                  <div class="add-post__options">
                    <v-card class="shadow" outlined>
                      <v-card-text>
                        <GridLayout grid="repeat(auto-fit, minmax(190px,1fr))">
                          <div class="add-post__option w-100" v-for="item in options" :key="Math.random()">
                            <ButtonComponent class="w-100" v-on:click="addElem(item)" :txt="item"/>
                          </div>
                        </GridLayout>
                        <div class="d-flex justify-content-end w-100">
                          <v-checkbox
                              v-model="isHtmlCode"
                              label="Insert html code"
                              color="#212121"
                              hide-details
                          ></v-checkbox>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>

                  <div class="add-post__area">
                    <v-card class="shadow" outlined>
                      <v-card-subtitle>Your post</v-card-subtitle>
                      <v-card-text id="xml" ref="xml" @contextmenu="showMenu($event)">
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <div hidden id="templates">
            <div class="add-post__h3 h3 text-left w-100 templates-item" contenteditable="true" role="title">Title</div>
            <div class="add-post__h5 h5 text-left w-100 templates-item" contenteditable="true" role="description">Text</div>
            <textarea class="add-post__h5 h5 text-left w-100 templates-item" role="code">Code</textarea>
            <img class="w-100 templates-item" role="image" src="" alt="..."/>
          </div>
        </div>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import GridLayout from "../layouts/GridLayout";
import {getAllowedTags, getRandomInt, isAllowedTags} from "../functions";
import LoadImageComponent from "../components/LoadImageComponent";
import AddPostOverlayComponent from "../components/AddPostOverlayComponent";
import AddPostMenuComponent from "../components/AddPostMenuComponent";
import ButtonComponent from "../components/ButtonComponent";
import BasicLayout from "../layouts/BasicLayout";
import {mapState} from 'vuex';
import {updatePost$} from "../router";
import {skipWhile, take} from "rxjs/operators";
import {interval} from 'rxjs';

export default{
  components: {
    BasicLayout, ButtonComponent,
    AddPostMenuComponent, GridLayout,
    LoadImageComponent, AddPostOverlayComponent},
  data:function(){
    return {
      options:["Title","Code","Description","Image","Video","Youtube"],
      isHtmlCode:false,
      setting:{
        title:"",
        description:"",
        category:[],
        image:""
      },
      snackbar:false,
      messageForUser:"",
      rules: {
        h1:[
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ]
      },
      allowedRoles:["title","description","image","code"],
      allowedHtmlInsert:["description"],
      tab:null,
      clicks:1,
      file:null,
      showOverlay:false,
      categories:["js","html","java","php"],
      allowedTags:[...getAllowedTags()],
      unInsertedClone:null,
      imageIsSpecified: false,
      doc1:(new DOMParser()).parseFromString(`<root><body id="div_container"></body></root>`,"application/xml")
    }
  },
  props:{
    isUpdatePage:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    async submit(){
      if(!this.setting.image || this.setting.description || this.setting.title || this.setting.category){
        this.snackbar = true;
        this.messageForUser = "Please, fill in all fields";
        return;
      }

      this.doc1 = (new DOMParser()).parseFromString(`<root><body id="div_container"></body></root>`,"application/xml");

      this.updateXml();

      const xmlSer = new XMLSerializer();
      const string = xmlSer.serializeToString(this.doc1);
      const formData = new FormData();

      formData.append("content",string);

      Object.entries(this.setting).forEach(([k,v])=>{
          if(typeof v === "string"){
            formData.append(k,v)
          } else if(Array.isArray(v)){
            formData.append(k, JSON.stringify(v));
          }
      });

      formData.set("image",this.setting.image,this.setting.image.name);

      let url = "/admin/savePost";

      if(this.isUpdatePage){
        url = "/api/blog/update/"+this.postToUpdate.id;
      }

      try{
        const response = await fetch(url,{
          method:"POST",
          body:formData,
          headers:{
            Auth: localStorage.getItem("user")
          }
        });

        if(response.ok){
          this.snackbar = true;
          this.messageForUser = "The post has been added";
        } else{
          throw new Error();
        }
      }catch(e){
        this.snackbar = true;
        this.messageForUser = "Some errors has happened";
      }
    },
    addElem(type = "", children = [], hasChildren = false){
      type = type.toLowerCase();

      let container = document.querySelector("#templates");
      let elem = container.querySelector(`[role='${type}']`);
      let allowedTypes = this.allowedRoles;
      let forBiddenListeners = ["description","image","code"];
      let srcTypes = ["image"];

      if(allowedTypes.includes(type)){
        let clone = elem.cloneNode(true);
        let eventHandler = ()=>{};

        clone.setAttribute("id","ID"+getRandomInt(0,69000));

        if(hasChildren){
          Array.from(clone.childNodes).forEach(v=>v.parentNode.removeChild(v));
          clone.append(...children);
        }

        if(!forBiddenListeners.includes(type)){
          eventHandler = ($event)=>{
            if($event.key === "Enter"){
              $event.preventDefault();
              $event.stopPropagation();

              let newClone = clone.cloneNode(true);
              let height = newClone.clientHeight;
              newClone.style.minHeight = `${height*2}px`;
              clone.parentElement.appendChild(newClone);

              let range = new Range();
              range.selectNodeContents(clone);

              window.getSelection().removeAllRanges();
              window.getSelection().addRange(range);
            }};

        } else if(!srcTypes.includes(type)){
          eventHandler = (event)=>{
            if(event.key === "Enter" && event.keyCode === 13){
              this.clicks++;
              let height = parseInt(getComputedStyle(clone).getPropertyValue('font-size'),10)+12;
              clone.style.minHeight = `${height*this.clicks}px`;
            }
          };
        }

        clone.addEventListener("keydown",eventHandler.bind(this));

        if(srcTypes.includes(type)){
          this.showOverlay = true;
          this.unInsertedClone = clone;
        } else{
          if(this.$refs.xml){
            this.$refs.xml.append(clone);
          }
        }

        clone.addEventListener("paste",($event)=>{
            this.handlePasteEvent($event,type,clone);
        });
      }
    },
    handlePasteEvent($event,type,clone){
      $event.preventDefault();

      if(this.allowedHtmlInsert.includes(type) && this.isHtmlCode){
        const txt = $event.clipboardData.getData("text/html");
        const dom = new DOMParser();
        const domElements = dom.parseFromString(txt,"text/html");
        const body = domElements.body;
        const elem = document.createElement("div");
        elem.append(...body.childNodes);
        const isValid = isAllowedTags(elem,this.allowedTags);

        if(isValid){
          const range = window.getSelection().getRangeAt(0);
          range.insertNode(elem);

          window.getSelection().removeAllRanges();
        } else{
          this.snackbar = true;
          this.messageForUser = "There are some html tags, which are not allowed";
        }
      } else if(!this.allowedHtmlInsert.includes(type) && this.isHtmlCode){
        this.snackbar = true;
        this.messageForUser = "You can't insert html code into " + type;
      } else {
        const txt = $event.clipboardData.getData("text/plain");
        const txtNode =  document.createTextNode(txt);
        const range = window.getSelection().getRangeAt(0);
        range.insertNode(txtNode);

        window.getSelection().removeAllRanges();
      }
    },
    updateXml(){
      const container = document.querySelector("#xml");
      const isValid = isAllowedTags(container, this.allowedTags);

      if(!isValid) return null;

      let doc1 = this.doc1.getRootNode().querySelector('#div_container');

      Array.from(container.children).forEach(v=>{
        const role = v.getAttribute("role");
        v.className = "";

        if(v.hasAttribute("role") && this.allowedRoles.includes(role)){
          const clone = v.cloneNode(true);
          doc1.appendChild(clone);
        }
      });
    },
    showMenu(event){
      this.$refs.menu.showMenu = true;
      this.$refs.menu.show(event);
    }
  },
  created() {
    this.$watch("imageIsSpecified",(cur,prev)=>{
       if(!cur || !this.unInsertedClone) return false;

       this.showOverlay = false;
       this.unInsertedClone.src = this.$refs.overlay.src;
       this.$refs.xml.append(this.unInsertedClone);

       setTimeout(()=>{
         this.unInsertedClone = null;
         this.imageIsSpecified = false;
       },0)
    })
  },
  mounted(){
    updatePost$.subscribe(()=>{
      if(this.isUpdatePage){
        this.doc1 = (new DOMParser()).parseFromString(this.postToUpdate.content,"application/xml");
        this.setting.category = JSON.parse(this.postToUpdate.category);
        this.setting.title = this.postToUpdate.title;
        this.setting.image = this.postToUpdate.image;
        this.setting.description = this.postToUpdate.description;

        const doc1 = this.doc1;
        const body = doc1.querySelector('#div_container');

        interval(100)
            .pipe(
                skipWhile(()=>!this.$refs.xml),
                take(1)
            )
            .subscribe(v=>{
              if(body){
                const container = Array.from(body.children);

                container.forEach(v=>{
                  const type = v.getAttribute("role");
                  const children = v.childNodes;

                  this.addElem(type, [...children], true);
                });
              }
            });
      }
    });
  },
  computed:{
    pageTitle(){
      return this.isUpdatePage ? "Update a post" : "Add a post";
    },
    ... mapState({
    postToUpdate: state=>state.updatedPost.post
  })
  }
}
</script>

<style lang="scss">
.add-post__area div[contenteditable="true"]{
  color: rgba(0,0,0,.87);
  outline: none;
}

.add-post .theme--light.v-tabs-items {
  background-color: transparent !important;
}

.add-post .h5 :not(textarea) {
  text-transform: capitalize !important;
}
textarea{
  outline: none;
  text-transform: none !important;
}

@media(max-width:900px){
  .add-post__setup{
     .v-card__text > .row{
       flex-direction: column;
       align-items: center;
       text-align: center;
     }
    .v-card__text > .row > .col-2{
       width:100%;
       max-width:100%;
       display: flex;
       justify-content: center;
     }
  }
}
</style>

<style scoped lang="scss">
@import '../styles/_variables.scss';

textarea.templates-item[role="code"]{
  box-shadow: inset 8px 8px 16px #f5f5f5, inset -8px -8px 16px #ffffff;
  border-radius: 15px;
  padding: $margin-sm;
  background: #ffffff;
  border: thin solid rgba(0,0,0,.12);
}

.templates-item[role="title"]{
  padding: $margin-sm 0;
}

</style>
