<template>
  <div class="datePicker">
    <datePicker v-model="now" />
  </div>
</template>

<script>
import datePicker from '@/components/DatePicker'
export default {
  components: {
    datePicker
  },
  data() {
    return {
      now: new Date()
    }
  }

}
</script>

<style>

</style>
