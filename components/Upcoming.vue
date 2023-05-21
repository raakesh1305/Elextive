<template>
  <div class="upcoming">
    <h2 class="is-size-3 main-title">Upcoming assessments</h2>
    <div class="columns pad-top-s">
      <div class="column is-4">
        <div class="box">
          <p class="name has-text-weight-bold">
            Case Study report
          </p>
          <p class="subtitle is-family-monospace has-text-grey is-size-6">GA Dhanush</p>
          <p class="has-text-weight-normal">A short description about the test, the deadline, the topics involved and
            other notes from the professor</p>
          <div class="buttons pad-top-s">
            <div class="button is-light is-rounded is-primary">View</div>
            <div class="button is-rounded is-primary">Submit</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <p class="name has-text-weight-bold">
            Periodical Lab 1
          </p>
          <p class="subtitle is-family-monospace has-text-grey is-size-6">Ram Newton</p>
          <p class="has-text-weight-normal">This is completely optional, and can be ommitted too, as evidenced in the
            next
            card.</p>
          <div class="buttons pad-top-s">
            <div class="button is-light is-rounded is-primary">View</div>
            <div class="button is-rounded is-primary">Submit</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <p class="name has-text-weight-bold">
            Quiz 3
          </p>
          <p class="subtitle is-family-monospace has-text-grey is-size-6">Kiran S Raj</p>
          <div class="buttons pad-top-s">
            <div class="button is-light is-rounded is-primary">View</div>
            <div class="button is-rounded is-primary">Submit</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Upcoming'
  }

</script>

<style scoped>
.pad-top-s {
  padding-top: 1rem;
}
</style>
