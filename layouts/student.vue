<template>
  <div>
    <Nav/>
    <div class="has-navbar-fixed-top has-navbar-fixed-bottom">
      <div class="pad-top">
      <nuxt />
      </div>
    </div>
    <Bottomnav/>
  </div>
</template>

<style>
</style>

<script>
import Nav from '~/components/Nav.vue'
import Bottomnav from '~/components/Bottomnav.vue'
export default {
  components: {
    Nav,
    Bottomnav
  }
}
</script>

<style scoped>
.pad-top {
  padding-top: 3.5rem;
}
</style>