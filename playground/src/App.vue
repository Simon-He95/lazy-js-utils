<script setup>
import {
  Button as TinyButton,
  Layout as TinyLayout,
  Row as TinyRow,
} from '@opentiny/vue'
import {
  iconDel,
  iconEdit,
  iconMail,
  iconSearch,
  iconStarO,
  iconYes,
} from '@opentiny/vue-icon'

const IconDel = iconDel()
const IconYes = iconYes()
const IconEdit = iconEdit()
const IconMail = iconMail()
const IconStarO = iconStarO()
const IconSearch = iconSearch()
</script>

<template>
  <TinyLayout>
    <TinyRow>
      <TinyButton>默认按钮</TinyButton>
      <TinyButton type="primary" native-type="submit">
        主要按钮
      </TinyButton>
      <TinyButton type="success">
        成功按钮
      </TinyButton>
      <TinyButton type="info">
        信息按钮
      </TinyButton>
      <TinyButton type="warning">
        警告按钮
      </TinyButton>
      <TinyButton type="danger">
        危险按钮
      </TinyButton>
    </TinyRow>
    <TinyRow>
      <TinyButton plain>
        朴素按钮
      </TinyButton>
      <TinyButton type="primary" plain>
        主要按钮
      </TinyButton>
      <TinyButton type="success" plain>
        成功按钮
      </TinyButton>
      <TinyButton type="info" plain>
        信息按钮
      </TinyButton>
      <TinyButton type="warning" plain>
        警告按钮
      </TinyButton>
      <TinyButton type="danger" plain>
        危险按钮
      </TinyButton>
    </TinyRow>
    <TinyRow>
      <TinyButton round>
        圆角按钮
      </TinyButton>
      <TinyButton type="primary" round>
        主要按钮
      </TinyButton>
      <TinyButton type="success" round>
        成功按钮
      </TinyButton>
      <TinyButton type="info" round>
        信息按钮
      </TinyButton>
      <TinyButton type="warning" round>
        警告按钮
      </TinyButton>
      <TinyButton type="danger" round>
        危险按钮
      </TinyButton>
    </TinyRow>
    <TinyRow>
      <TinyButton :icon="IconSearch" circle />
      <TinyButton type="primary" :icon="IconEdit" circle />
      <TinyButton type="success" :icon="IconYes" circle />
      <TinyButton type="info" :icon="IconMail" circle />
      <TinyButton type="warning" :icon="IconStarO" circle />
      <TinyButton type="danger" :icon="IconDel" circle />
    </TinyRow>
  </TinyLayout>
</template>

<style scoped>
.tiny-row {
  margin-bottom: 20px;
}
.tiny-button {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 24px;
}
</style>
