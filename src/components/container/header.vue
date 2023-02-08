<template>
  <el-row class="row-bg" justify="space-between">
  <el-col :span="8"><div class="grid-content ep-bg-purple left">对他使用炎拳吧</div></el-col>
  <el-col :span="8"><div class="grid-content ep-bg-purple-light">男同交友后台管理系统</div></el-col>
  <el-col :span="8"><div @click="quit" class="grid-content ep-bg-purple right">退出</div></el-col>
</el-row>
</template>

  <script setup>
    let quit = () =>{
      sessionStorage.removeItem("lf-token")
    }
</script>

<style>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 60px;
  text-align: center;
}
.left{
  text-align: left;
}
.right{
  text-align: right;
}
</style>