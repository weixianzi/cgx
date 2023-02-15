<template>
</template>

<script setup>
import useLoginStore from "@/stores/loginInfo.js"
import { storeToRefs } from "pinia";

let infoStore = useLoginStore()

let {loginInfo} = storeToRefs(infoStore)

</script>