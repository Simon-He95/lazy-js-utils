<script setup>
const str = 'asdsa'

onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <el-form :model="formModel" gap5>
    <el-form-item prop="string" label="string">
      <el-input v-model="formModel.inputVModel" placeholder="string" />
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
