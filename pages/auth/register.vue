<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-4 banner">
          <h1 class="is-size-1 has-text-centered">Register</h1>
          <p class="content has-text-centered is-size-5 is-hidden-mobile">Prepare to supercharge your education by
            choosing the right electives.</p>
        </div>
        <form class="column form" @submit="handleSubmit">
          <label class="label">Details</label>

          <div class="field">
            <!-- <label class="label">Name</label> -->
            <div class="control">
              <input name="name" required class="input" type="text" placeholder="Your name" v-model="name">
            </div>
          </div>

          <div class="field">
            <!-- <label class="label">Username</label> -->
            <div class="control">
              <input name="username" required class="input" type="text" placeholder="Username" v-model="username">
            </div>
          </div>

          <div class="field">
            <!-- <label class="label">Email</label> -->
            <div class="control">
              <input name="email" required class="input" type="email" placeholder="Email " v-model="email">
            </div>
          </div>

          <div class="field">
            <!-- <label class="label">Email</label> -->
            <div class="control">
              <input name="password" required class="input" type="password" placeholder="Password " v-model="password">
            </div>
          </div>

          <div class="field">
            <!-- <label class="label">Email</label> -->
            <div class="control">
              <input name="rollno" required class="input" type="text" placeholder="Roll Number " v-model="rollno">
            </div>
          </div>

          <div class="control pad-top">
            <div class="cntr">

              <label for="opt1" class="radio">
                <input type="radio" required name="category" v-model="category" value="student" id="opt1"
                  class="hidden" />
                <span class="label"></span>Student
              </label>

              <label for="opt2" class="radio">
                <input type="radio" required name="category" id="opt2" v-model="category" value="teacher"
                  class="hidden" />
                <span class="label"></span>Teacher
              </label>

            </div>
          </div>

          <div class="field is-grouped pad-top" v-if="category == 'student'">

            <div class="control">
              <div class="dropdown is-up" :class="dept_toggle?'is-active':''" @click="dept_toggle = !dept_toggle">
                <div class="dropdown-trigger">
                  <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{{ department }}</span>
                    <span class="icon is-small">
                      &darr;
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item hoverable" v-for="i in ['CSE', 'ECE', 'EEE', 'Mech', 'Chem', 'Math']" :key="i">
                      <p @click="department = i">{{ i }}</p> 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="control">
              <div class="dropdown is-up"  :class="sem_toggle?'is-active':''" @click="sem_toggle = !sem_toggle">
                <div class="dropdown-trigger">
                  <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{{semester}}</span>
                    <span class="icon is-small">
                      &darr;
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item hoverable" v-for="i in [1,2,3,4,5,6,7,8]" :key="i">
                      <p @click="semester = i">{{ i }}</p> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field pad-top">
            <div class="control">
              <label class="form-switch">
                <input type="checkbox" v-model="checked">
                <i></i>
                I agree to the <a href="#" class="has-text-weight-normal">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-link is-light is-rounded" :disabled="!formComplete"
                :class="{ 'is-loading': submitted }">Submit &rarr;</button>
            </div>
            <div class="control">
              <nuxt-link class="button is-danger is-light is-rounded" to='/'>
                Cancel
              </nuxt-link>
            </div>
          </div>
        </form>
      </div>
    </div>
    <modal name="error" classes="modal is-active" @before-close="signIn = false">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="section">
          <h3 class="title has-text-white">Oh no!</h3>
          <p class="subtitle is-size-4 has-text-white">{{ err }}</p>
          <div class="buttons">
            <button class="button is-danger is-rounded" @click="cancel">Close</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import {
    fireAuth,
    fireDb
  } from '@/services/firebase';

  export default {
    data() {
      return {
        name: null,
        username: null,
        email: null,
        password: null,
        rollno: null,
        category: null,
        submitted: false,
        err: null,
        checked: false,
        dept_toggle: false,
        sem_toggle: false,
        semester: 'Semester',
        department: 'Department'
      }
    },
    methods: {
      error() {
        this.submitted = true
        this.$modal.show('error')
      },
      cancel() {
        this.$modal.hide('error')
        this.submitted = false
        this.err = null
      },
      handleSubmit(event) {
        event.preventDefault()
        this.submitted = true
        if (this.password.length > 6 && (this.name != null || this.email != null || this.username != null || this.rollno != null || this.category != null || this.semester != null || this.department != null)) {
          fireAuth.createUserWithEmailAndPassword(this.email, this.password)
            .then(res => {
              console.log("Registered!", res)
              fireAuth.currentUser.updateProfile({
                  displayName: this.name,
                  email: this.email
                })
                .then(() => {
                  console.log("Update successful")
                })
                .catch(error => {
                  this.err = error
                  this.error()
                  console.err(error)
                });
              fireDb.collection("users").doc(this.email).set({
                  name: this.name,
                  username: this.username,
                  rollno: this.rollno,
                  category: this.category,
                  semester: this.semester,
                  department: this.department,
                  applicationStatus: 0
                })
                .then(() => {
                  console.log("Details stored!");
                  this.$router.push("/dashboard")
                })
                .catch((error) => {
                  this.err = error
                  this.error()
                  console.error("Error writing document: ", error);
                });
            })
            .catch((err) => {
              this.err = err
              this.error()
              console.log(err);
            })
        } else {
          this.err = "Enter details correctly!"
          this.error()
        }
      }
    },
    computed: {
      formComplete: function () {
        return this.checked
      }
    }
  }

</script>

<style scoped>
  .banner {
    background: #C4CCD4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* max-height: 100vh; */
  }

  .hero-body {
    padding: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5rem 0;
  }

  .field {
    padding-top: 1.5vw;
  }

  h1,
  p {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 300;
    color: #35495e;

  }

  .columns {
    min-height: 100vh;
    margin: 0;
  }

  .form {
    padding: 3vh 5vw;
  }

  .input {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid lightgray;
    box-shadow: none;
  }

  .input:active,
  .input:focus {
    border-color: none;
    box-shadow: none;
    border-bottom: 1px solid grey;
  }

  .pad-top {
    padding-top: 1.5rem;
  }

  .hoverable {
    cursor: pointer;
  }

</style>
