<template>
    <template v-for="(route, index) in menuList" :key="index">
        <el-sub-menu v-if="route.children?.length > 0" :index="route.path">
            <template #title>
                <el-icon>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="route.meta.iconFont"></use>
                    </svg>
                </el-icon>
                <span>{{ route.meta.name }}</span>
            </template>
            <lf-menu :menuList="route.children"></lf-menu>
        </el-sub-menu>
        <!-- 没有子级菜单的路由 -->
        <el-menu-item @click="routeJump" v-else :index="route.path">
            <template #title>
                <el-icon>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="route.meta.iconFont"></use>
                    </svg>
                </el-icon>
                <span>{{ route.meta.name }}</span>
            </template>
        </el-menu-item>
        <!-- 有子集菜单的路由 -->
    </template>
</template>

<script setup>
import { useRouter } from "vue-router"
import { computed } from "vue"

let router = useRouter()

let props = defineProps({
    menuList: {
        type: Array,
        default() {
            return []
        }
    }
})

let routeJump = (item) => {
    let path = item.indexPath
    let target = path.join("/")
    router.push(target)
}
</script>

<script>
export default {
    name: "lf-menu"
}
</script>