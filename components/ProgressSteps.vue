<template>
  <div class="container">
    <h3 class="is-size-5 status">Your application status:</h3>
    <ul class="steps">
      <li class="steps-segment" :class=" this.$store.state.user.data.applicationStatus == 0 ? 'is-active': '' ">
        <a href="#" class="steps-marker">1</a>
        <div class="steps-content is-divider-content">
          <p class="is-size-5">Applied</p>
        </div>
      </li>
      <li class="steps-segment" :class=" this.$store.state.user.data.applicationStatus == 1 ? 'is-active': '' ">
        <a href="#" class="steps-marker">2</a>
        <div class="steps-content is-divider-content">
          <p class="is-size-5">Approved</p>
        </div>
      </li>
      <li class="steps-segment" :class=" this.$store.state.user.data.applicationStatus == 2 ? 'is-active': '' ">
        <span class="steps-marker">3</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ProgressSteps'
  }

</script>

<style>
  @import '../node_modules/bulma-o-steps/bulma-steps.min.css';

  .status {
    margin-bottom: 1rem;
  }

  .pad-bottom {
    padding-bottom: 1rem;
  }

</style>
