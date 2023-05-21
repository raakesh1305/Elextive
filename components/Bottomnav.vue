<template>
  <nav class="navbar is-fixed-bottom is-light is-hidden-mobile" role="navigation" aria-label="main navigation">
    <div id="bottom-nav" class="navbar-menu">
      <div class="navbar-start">

        <nuxt-link to="/dashboard" class="navbar-item is-family-monospace">
          Dashboard
        </nuxt-link>
        <nuxt-link to="/profile" class="navbar-item is-family-monospace">
          My Profile
        </nuxt-link>
        <nuxt-link to="/grades" class="navbar-item is-family-monospace">
          Grades
          <span class="tag is-success is-rounded left-pad">3</span>
        </nuxt-link>
        <nuxt-link to="/attendance" class="navbar-item is-family-monospace">
          Attendance
        </nuxt-link>
        <nuxt-link to="/timetable" class="navbar-item is-family-monospace">
          Timetable
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <a class="button is-dark is-rounded">
            <strong>Settings</strong>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .left-pad {
    margin-left: 0.5rem;
  }

  .right-pad {
    margin-right: 0.5rem;
  }

</style>
