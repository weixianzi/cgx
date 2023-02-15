<template>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass"></h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button>
      </div>
    </template>
    <el-form ref="ruleFormRef" :model="formData" status-icon label-width="120px" class="demo-ruleForm">
        <el-form-item>
      <slot name="upload">
      </slot>
    </el-form-item>
      <el-form-item v-for="(k,v) in formData" :key="k" :label=k.label :prop="v+'.value'" :rules="{ required: true, message:`必填`,trigger: 'blur' }">
        <el-input v-model="k.value" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handClick(ruleFormRef)" >提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

  let props = defineProps({
    formData:{
      type:Object,
      default(){
        return {}
      }
    }
  })

  let emit = defineEmits(["postMes","close"])

let ruleFormRef= ref()

let handClick = async(ruleFormRef)=>{
  if (!ruleFormRef) return
  ruleFormRef.validate((valid) => {
    if (valid) {
      emit("postMes",ruleFormRef)
    } else {
      return false
    }
  })
}

let close= ()=>{
  emit("close")
}

defineExpose({
   showInp(){
  visible.value = !visible.value
}
})

const visible = ref(false)
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>