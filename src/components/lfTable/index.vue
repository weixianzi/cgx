<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column v-for="item in columns" :label="item.label" :prop="item.prop" align="center">
      <template v-slot="{ row }">
        <slot :name="item.prop" :row="row">
          {{getProp(row,item)}}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
let props = defineProps({
  columns: {
    type: Array
  },
  tableData: {
    type: Array
  }
})
let getProp = (row, item) => {
  let reg = /^(.+)\[(\d+)\]\.?(.*)$/
  let matched = item.prop.match(reg)
  if (matched) {
    let arr = row[matched[1]]
    let prop = arr[matched[2]]
    let prop2 = prop[matched[3]]
    return prop2
  }
  return row[item.prop]
}
</script>