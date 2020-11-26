<template>
  <div>
    <div v-if="variant === 'success'">
      <b-alert dismissible variant='success' show>{{ message }} </b-alert>
    </div>
    <div v-else-if="variant === 'danger'">
      <b-alert dismissible variant='danger' show>{{ message }} </b-alert>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: ['message', 'variant'],
};
</script>
