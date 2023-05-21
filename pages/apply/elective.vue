<template>
  <section class="hero">
    <div class="hero-body">

      <div class="columns">
        <div class="column is-2 sidenav is-hidden-touch">
          <Sidemenu />
        </div>
        <div class="column dash" v-if="this.$store.state.user.chosenCourse">
          <div class="box">
            <div class="main-title is-size-3">Applying to: {{ this.$store.state.user.chosenCourse }} -
              {{ electiveData.title }}</div>

            <div class="tags">
              <span class="tag is-warning is-light is-rounded">3 credits</span>
              <span class="tag is-warning is-light is-rounded">Theory</span>
            </div>

            <div class="pad-top subtitle is-family-monospace is-size-5">Course details:</div>
            <p class="content is-size-5">
              {{ electiveData.course_details ? electiveData.course_details : 'Details unavailable :(' }}
            </p>

            <div class="pad-top subtitle is-family-monospace is-size-5">Textbook and References:</div>
            <p class="content is-size-5">
              {{ electiveData.textbook ? electiveData.textbook : 'Textbooks unavailable :(' }}
            </p>

            <div class="pad-top subtitle is-family-monospace is-size-5">Syllabus:</div>
            <h6 class="is-size-6 has-text-weight-bold">UNIT 1</h6>
            <p class="content is-size-5">
              {{ electiveData.unit1 ? electiveData.unit1 : 'Unit 1 details unavailable :(' }}
            </p>
            <h6 class="is-size-6 has-text-weight-bold">UNIT 2</h6>
            <p class="content is-size-5">
              {{ electiveData.unit2 ? electiveData.unit2 : 'Unit 2 details unavailable :(' }}
            </p>

            <h6 class="is-size-6 has-text-weight-bold">AVAILABLE SEATS: {{this.$store.state.user.chosenCourseCount}}/60</h6>
            <progress class="progress is-success pad-top-s" :value="this.$store.state.user.chosenCourseCount" max="60">{{this.$store.state.user.chosenCourse/60 * 100}}</progress>

            <div class="buttons">
              <button class="button is-rounded is-light is-primary" :class="{ 'is-loading': applying }"
                @click="apply">Apply now</button>
              <nuxt-link to="/dashboard" class="button is-rounded is-light is-info ">
                Go back
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="application" classes="modal is-active" @before-close="signIn = false">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="section">
          <p class="subtitle is-size-4 has-text-white">{{ this.status }}</p>
          <div class="buttons">
            <button class="button is-danger is-rounded" @click="cancel">Close</button>
          </div>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
  import Sidemenu from '~/components/Sidemenu.vue';
  import {
    fireDb,
    fireAuth
  } from '@/services/firebase';

  export default {
    layout: 'student',
    middleware: ['auth', 'electiveChosen'],
    components: {
      Sidemenu
    },
    data() {
      return {
        electiveData: {
          title: 'loading..',
          course_code: 'loading..'
        },
        applying: false,
        status: ""
      }
    },
    mounted() {
      let me = this

      fireDb.collection("depts")
        .doc(this.$store.state.user.data.department)
        .collection(String(this.$store.state.user.data.semester))
        .doc(this.$store.state.user.chosenCourse)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            me.electiveData = doc.data()
          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
    },
    methods: {
      modalizer() {
        this.$modal.show('application')
      },
      cancel() {
        this.$modal.hide('application')
        this.$router.push('/dashboard')
      },
      apply() {
        this.applying = true
        let course_id = this.$store.state.user.chosenCourse
        let currentUser = fireAuth.currentUser.email
        let timestamp = Date.now()
        let applicationData = {}
        applicationData[currentUser] = {
          "course_id": course_id,
          "timestamp": timestamp
        }
        let me = this
        fireDb.collection('applications').doc('pending').set({
            applicationData
          }, {
            merge: true
          })
          .then(() => {
            console.log('Applied succesfully to:', me.$store.state.user.chosenCourse)
            this.status = 'Application successfull!'
            fireDb.collection("users").doc(currentUser).update({
              applicationStatus: 1
            }).then(() => {
              fireDb.collection("users").doc(currentUser).get()
                .then(doc => {
                  this.$store.commit('user/setUserData', doc.data())
                })
            })
          })
          .catch(function (error) {
            console.log("Error applying to elective:", error);
            this.status = 'Oh no! There was an error :('
          })
          .finally(() => {
            this.modalizer()
            this.applying = false
          });

      }
    },
  }

</script>

<style scoped>
  .tags {
    margin-top: 0.5rem;
  }

  .dash {
    /* height: 300vh; */
    padding-bottom: 5rem;
  }

  .pad-top {
    margin-top: 2.5rem;
  }

  .pad-top-s {
    margin-top: 1rem;
  }

  .name {
    text-transform: capitalize;
  }

  .sidenav {
    padding-left: 0;
    padding-right: 0;
  }

</style>
