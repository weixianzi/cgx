<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :default-active="path">
    <div class="logo">
      <img class="logo" src="@/assets/mailchimp-VLpRa5tFdNY-unsplash.jpg" alt="">
    </div>
    <asideCom :menuList="menuList"></asideCom>
  </el-menu>
</template>
<script setup>
import { ref, onMounted,computed } from 'vue'
import bus from "vue3-eventbus"
import asideCom from "./asideMenu.vue"
import usePermission from "@/stores/permission.js"
import { storeToRefs } from 'pinia'
import {useRoute} from "vue-router"

let route = useRoute()

let permissionStore = usePermission()

const isCollapse = ref(false)

let {menuList} = storeToRefs(permissionStore)

onMounted(() => {
  bus.on("show", res => {
    isCollapse.value = res
  })
})

let path = computed(()=>{
  let path = route.path.split("/")
  if(path.length>2){
    return path.pop()
  }
  return route.path
})

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-aside {
  overflow: hidden;
}

.logo {
  width: 200px;
  height: 60px;
  background-color: red;
}
</style>
