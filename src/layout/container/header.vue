<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple left">
        <svg class="icon" aria-hidden="true" @click="changeIcon">
          <use :xlink:href="icon"></use>
        </svg>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content ep-bg-purple-light">男同交友后台管理系统</div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple right">
        <span class="block">
          <el-avatar :size="50" :src="headimgurl" />
          <svg class="icon" aria-hidden="true" v-if="vipLevel">
          <use :xlink:href="vip"></use>
        </svg>
        </span>
        <b class="nickname">{{ nickname }}</b>
        <el-dropdown>
          <span class="el-dropdown-link">
            ▼
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="vip">
                VIP到期时间
                <br />
                {{ vipExpires }}
              </el-dropdown-item>
              <el-dropdown-item divided>VIP重置</el-dropdown-item>
              <el-dropdown-item divided>账号信息</el-dropdown-item>
              <el-dropdown-item divided>账号管理</el-dropdown-item>
              <el-dropdown-item divided @click="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, computed, toRefs } from "vue"
import bus from "vue3-eventbus"
import useUserInfoStore from "@/stores/userInfo.js"
import { useRouter } from "vue-router"
import usePermission from "@/stores/permission"
import router from "@/router/index.js"

let permissionStore = usePermission()

let userInfo = useUserInfoStore()

let $router = useRouter()

let { nickname, headimgurl, vipExpires, vipLevel } = toRefs(userInfo.userInfo)

let show = ref(false)

let changeIcon = () => {
  show.value = !show.value
  bus.emit("show", show.value)
}

let quit = () => {
  if (permissionStore.isQuit) {
    router.removeRoute("home")
    sessionStorage.removeItem("lf-token")
    $router.push("/login")
    permissionStore.menuList = []
    location.reload()
  }
}

let icon = computed(() => {
  return show.value ? "#icon-fold-right" : "#icon-shouqi1"
})

let vip = computed(() => {
  switch (vipLevel.value) {
    case 1:
      return "#icon-vip"
    case 2:
      return "#icon-VIP"
    case 3:
      return "#icon-VIP1"
  }
})

</script>

<style>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 40px;
  text-align: center;
  overflow: hidden;
}

.left {
  text-align: left;
}

.nickname {
  margin-left: 20px;
  position: absolute;
}

.el-dropdown-link {
  line-height: 60px;
  position: absolute;
  left: 110px;
  cursor: pointer;
}

.vip {
  text-align: center;
}

.el-dropdown-menu {
  background-color: #abc270;
}
</style>