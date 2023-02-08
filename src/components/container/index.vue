<template>
    <div class="common-layout">
      <el-container class="box">
        <el-aside width="200px">
          <asideCom></asideCom>
        </el-aside>
        <el-container>
          <el-header>
            <headerCom></headerCom>
          </el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script setup>
  import "@/golobal/index.less"
  import headerCom from "./header.vue"
  import asideCom from "./aside.vue"
</script>

<style scoped>
*{
    padding: 0 !important;
    margin: 0 !important;
    list-style: none !important;
  }
  html, body, #app, .common-layout, .el-container{
    height: 100%;
  }
  .el-aside{
    background-color: red;
  }
  .el-header{
    background-color: green;
  }
  .el-main{
    background-color: #bfa;
  }
</style>

  