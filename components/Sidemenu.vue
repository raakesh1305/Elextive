<template>
  <aside class="menu sidenav">
    <p class="menu-label">
      Elective System
    </p>
    <ul class="menu-list">
      <li><a>Overview</a></li>
      <li>
        <a>Assesments</a>
        <ul>
          <li><a>Periodical 1</a></li>
          <li><a>Periodical 2</a></li>
          <li><a>End Semester</a></li>
        </ul>
      </li>
      <li><a>Course Materials</a></li>
      <li><a>Assignments</a></li>
      <li><a>FAQ</a></li>
    </ul>
    <p class="menu-label">
      Contact
    </p>
    <ul class="menu-list">
      <li><a>Coordinator</a></li>
      <li><a>Sysadmin</a></li>
    </ul>
  </aside>
</template>

<script>
  export default {
      name: 'Sidemenu'
  }

</script>

<style scoped>
.sidenav {
    position: sticky;
    position: -webkit-sticky;
    top: 5rem;
}
.menu-list a {
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
}
.menu-list a:hover {
  background: #00ffff1a;
}
</style>
