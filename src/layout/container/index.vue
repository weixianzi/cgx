<template>
  <div class="common-layout">
    <el-container class="box">
      <el-aside width="200">
        <asideCom></asideCom>
      </el-aside>
      <el-container>
        <el-header>
          <headerCom></headerCom>
        </el-header>
        <el-main>
          <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item to="/welcome">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(route,index) in newRoute" :key="index" :to="{ path: route.path}">{{ route.meta.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import "@/golobal/index.less"
import headerCom from "./header.vue"
import asideCom from "./aside.vue"
import useBreadStore from "../../stores/breadCrumb";
import { storeToRefs } from "pinia";
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from "vue";

let breadStore = useBreadStore()

let { datas } = storeToRefs(breadStore)

let newRoute = computed(()=>{
  return datas.value.filter(item=>item.path!=="/")
})

</script>

<style scoped>
* {
  padding: 0 !important;
  margin: 0 !important;
  list-style: none !important;
}

html,
body,
#app,
.common-layout,
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #abc270;
}

.el-header {
  background-color: #fec869;
}

.el-main {
  background-color: #483d34;
}
</style>

