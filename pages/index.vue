<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <h1 class="main-title has-text-centered">
        ELEXTIVE!!
      </h1>
      <h2 class="main-subtitle has-text-centered is-hidden-mobile">
        An online Elective Management System
      </h2>
    <div class="buttons">
      <nuxt-link class="button is-link is-light is-rounded" to='/auth/register'>
        Sign Up
      </nuxt-link>
      <nuxt-link  class="button is-link is-light is-rounded" to='/auth/login'>
        Log In &rarr;
      </nuxt-link>
    </div>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .hero-body {
    flex-direction: column;
    justify-content: center;
  }
  .buttons {
    padding: 1rem 0;
  }

</style>
