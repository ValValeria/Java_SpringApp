<template>
  <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
  >
    <v-list rounded>
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="action(index)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default{
  data:function(){
    return {
      showMenu: false,
      x: 0,
      y: 0,
      items: [
        { title: 'Delete the element' ,action:"delete"},
        { title: 'Bold the text' ,action:"bold"},
      ],
      elem:null
    }
  },
  methods:{
    show (e) {
      e.preventDefault();
      this.elem = document.elementFromPoint(e.clientX,e.clientY) || {};
      this.x = e.clientX;
      this.y = e.clientY;
    },
    action(index){
      const item = this.items[index];
      const elem = this.elem;
      const closest = elem && elem.closest("[role]");

      switch (item.action){
        case "delete":
          if(elem.hasAttribute("role")){
            elem.remove();
          } else if(closest){
            closest.remove();
          }

          break;
        case"bold":
          const range = window.getSelection().getRangeAt(0);
          range.surroundContents(document.createElement("strong"));

          elem.focus ? elem.focus() : closest.focus();

          const content = range.cloneContents();
          const txtNode = document.createElement("span");
          txtNode.classList.add("span--word");
          content.append(txtNode);

          range.deleteContents();
          range.insertNode(content);
          range.setStartAfter(txtNode);

          break;
      }
    }
  }
}
</script>

<style>
.span--word{
  display:inline-block;
  min-width:2px;
  min-height:20px;
}
</style>