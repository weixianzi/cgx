<template>
    <el-input class="input" v-model="input" placeholder="写啊" />
    <el-button type="primary" :icon="Search" circle />
    <el-button type="primary" @click="showInp">点坤添加</el-button>
    <div class="dropdown">
        <el-select @clear="keyClear" v-model="searchKey" filterable remote placeholder="输入关键字"
            :remote-method="remoteMethod" @change="changeList" clearable>
            <el-option v-for="item in optaions" :key="item.name" :value="item.name" />
        </el-select>
    </div>
    <div class="daochu">
        <button class="button" @click="handClick">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Excel"></use>
            </svg>
            点击导出表格</button>
    </div>
    <el-table border :data="loginInfo" style="width: 100%">
        <el-table-column prop="headimgurl" label="头像" width="160">
            <template v-slot="{ row }">
                <el-avatar :src="row.headimgurl" />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="160" />
        <el-table-column prop="degree" label="学历" width="240" />
        <el-table-column prop="class" label="班级" width="240" />
        <el-table-column prop="productUrl" label="项目" width="240" />
        <el-table-column prop="cTime" label="创建时间" width="240" />
        <el-table-column prop="" label="操作">
            <template v-slot="{ row }">
                <el-button type="primary" round>查看</el-button>
                <el-button type="success" round @click="edit(row)">编辑</el-button>
                <el-button type="warning" round @click=del(row)>删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <formCom ref="form" :formData="formData" @postMes="postMes" @close="close">
        <template v-slot:upload>
            <el-upload class="avatar-uploader" action="/api/students/uploadStuAvatar" :show-file-list="false"
                name="headimgurl" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="headimgurl" :src="headimgurl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </template>
    </formCom>
    <div class="paging"><el-pagination :current-page="currentPage" @current-change="currentChange" background
            layout="prev, pager, next" :total=total></el-pagination></div>
</template>

<script setup>
import * as api from "@/api/userAuthority"
import { onMounted, ref, reactive } from "vue";
import useLoginStore from "@/stores/loginInfo.js"
import formCom from "@/components/table/form.vue"
import { Search } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox } from 'element-plus'
import qee from "qf-export-excel"

let optaions = ref([])

const input = ref('')

let form = ref()

const searchKey = ref("")

let total = ref(10)

let currentPage = ref(1)

let infoStore = useLoginStore()

let { loginInfo } = storeToRefs(infoStore)

let headimgurl = ref("")

let getLoginInfo = (page, count, classes) => api.getLoginInfo(page, count, classes)

let showInp = () => {
    form.value.showInp()
    let key = Object.keys(formData)
    key.forEach(key => {
        formData[key].value = ""
    })
}

// 页数开始改变的时候触发的事件
let currentChange = async (page) => {
    if (searchKey.value) {
        currentPage.value = page
        changeList(searchKey.value)
    } else {
        try {
            currentPage.value = page
            let res = await getLoginInfo(page, 5)
            infoStore.loginInfo = res.data.data
        } catch (e) {
            console.log(e)
        }
    }

}

// 关键字被删除后的方法
let keyClear = (page) => {
    currentPage.value = 1
}

// 封装一个方法，用于改变页码
let changePage = (current, totalPage) => {
    total.value = totalPage
}

// 输入完执行的方法
let remoteMethod = async (value) => {
    if (!value) {
        return
    } else {
        try {
            let res = await api.searchStu(value)
            let noRepeatArr = []
            for (let i = 0; i < res.data.data.length; i++) {
                let flag = true
                for (let j = 0; j < noRepeatArr.length; j++) {
                    if (res.data.data[i].name === noRepeatArr[j].name) {
                        flag = false
                        break
                    }
                }
                if (flag) {
                    noRepeatArr.push(res.data.data[i])
                }
            }
            optaions.value = noRepeatArr
        } catch (e) {
            console.log(e)
        }
    }
}

// 失焦执行的方法
let changeList = async (value) => {
    try {
        currentPage.value = 1
        let res = await api.searchStu(value)
        infoStore.loginInfo = res.data.data
        changePage("", res.data.total)
    } catch (e) {
        console.log(e)
    }
}

// 便利表单数据的属性
const formData = reactive({
    class: {
        label: "班级",
        value: ""
    },
    name: {
        label: "姓名",
        value: ""
    },
    age: {
        label: "年龄",
        value: ""
    },
    city: {
        label: "城市",
        value: ""
    },
    degree: {
        label: "学历",
        value: ""
    },
    productUrl: {
        label: "项目地址",
        value: ""
    },
    description: {
        label: "描述",
        value: ""
    }
})

// 校验通过后提交
let postMes = async (formEl) => {
    let params = {
        headimgurl: headimgurl.value,
        class: formData.class.value,
        name: formData.name.value,
        age: formData.age.value,
        city: formData.city.value,
        degree: formData.degree.value,
        productUrl: formData.productUrl.value,
        description: formData.description.value
    }
    try {
        let res = await api.addStuInfo(params)
        formEl.resetFields()
        form.value.showInp()
        getList()
    } catch (e) {
        console.log(e)
    }
}

// 获取表格
let getList = async () => {
    try {
        let res = await getLoginInfo("", 5)
        infoStore.loginInfo = res.data.data
        changePage("", res.data.total)
    } catch (e) {
        console.log(e)
    }
}

// 点击编辑
let edit = (row) => {
    form.value.showInp()
    let key = Object.keys(formData)
    key.forEach(item => {
        formData[item].value = row[item]
    })
}

let del = (row) => {
    // let row = row
    ElMessageBox.confirm(
        '确定删除吗',
        '警告',
        {
            confirmButtonText: '删',
            cancelButtonText: '不删了',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                let res = await api.delStu(row.sId)
                getList()
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            } catch (e) {
                console.log(e)
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })
        })
}

let titlelist = [
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '年龄',
        key: 'age'
    },
    {
        title: '头像地址',
        key: 'headimgurl'
    },
    {
        title: '学历',
        key: 'degree'
    },
    {
        title: '班级',
        key: 'class'
    },
]

let close = () => {
    form.value.showInp()
}

// 图片上传
const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    headimgurl.value = URL.createObjectURL(uploadFile.raw)
}

// 上传之前
const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

let handClick = () => {
    qee(titlelist, loginInfo, "这就是我最后的波纹了？")
}

onMounted(() => {
    getList()
})

</script>

<script>
export default {
    meta: {
        id: "8",
        name: "学员项目管理",
        title: "xyxmgl",
        routername: "stuProduct",
        iconFont: "#icon-xueyuan"
    }
}
</script>

<style scoped lang="less">
.input {
    width: 400px !important;
    height: 30px;
}

.dropdown {
    margin-bottom: 120px;
    margin-top: 50px;
}

.paging {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 100px;
}

.button {
    height: 20px;
    width: 120px;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.daochu {
    position: relative;
    left: 1386px;
}
</style>
