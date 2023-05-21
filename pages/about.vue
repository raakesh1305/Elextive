<template>

  <main class="hero is-fullheight">

    <div class="hero-body">
      <h1 class="is-size-1 has-text-centered main-title">Hello World!. I'm Julius the App.</h1>

      <p class="is-size-4 has-text-centered is-family-monospace">Speed one terahertz, memory one gigabyte.</p>

      <div class="content is-size-5 pad-top has-text-centered pad-top-xl">

        <p>This is the all new elective management system that we've all been waiting for.</p>

        <p>Now you can apply for an elective change at your fingertips and also track the status of your elective change
          request.</p>

        <p>Julius also brings to your notice the upcoming assesments in the respective electives and also resource
          materials
          for you to prepare well ;)</p>

        <p>Julius also provides you the list of available electives and we are also currently working on a recommendation
          system
          that'd help you choose the best elective for you according to your preference and previous marks :)</p>
      </div>
    </div>

  </main>

</template>

<script>
  export default {
    layout: 'student'

  }

</script>

<style>
  .pad-top {
    padding-top: 1rem;
  }

  .pad-top-xl {
    padding-top: 3rem;
  }

  .hero-body {
    flex-direction: column;
  }

</style>
