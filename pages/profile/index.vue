<template>
  <div class="hero has-navbar-fixed-top has-navbar-fixed-bottom">
    <div class="hero-body">
      <div class="columns">
        <!-- <div class="column is-3 banner"></div> -->
        <div class="column">
          <div class="container is-fluid center">

            <h1 class="main-title is-size-1 has-text-left capitalize">Hi, {{ this.$store.state.user.data.name.split(' ')[0] }}! </h1>

            <div class="panel">
                <div class="panel-block" v-for="(value, name) in this.$store.state.user.data" :key="name">
                  <div class="level">
                    <div class="level-left capitalize main-subtitle is-size-6 has-text-weight-bold">{{ name }}:</div>
                    <div class="level-right has-text-centered">{{ value }}</div>
                  </div>
                </div>
            </div>

            <div class="buttons">
              <div class="button is-info is-rounded is-light">Edit Details</div>
              <div class="button is-danger is-outlined is-rounded" :class="{ 'is-loading': delUser }"
                @click="confirmation">Delete Account</div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <modal name="delconfirm" classes="modal is-active" @before-close="delUser = false">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="section">
          <h3 class="title has-text-white">Confirmation</h3>
          <p class="subtitle is-size-4 has-text-white">Are you sure you want to delete your account? This action cannot be undone!</p>
          <div class="buttons">
            <button class="button is-danger is-rounded" :class="{ 'is-loading': confirmed }" @click="deleteUser">Yes,
              delete</button>
            <button class="button is-success is-rounded" @click="cancel">Nope, cancel</button>
          </div>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
  import {
    fireAuth, fireDb
  } from '@/services/firebase';


  export default {
    layout: 'student',
    middleware: 'auth',
    data() {
      return {
        confirmed: false,
        delUser: false
      }
    },
    methods: {
      confirmation() {
        this.delUser = true
        this.$modal.show('delconfirm')
      },
      cancel() {
        this.$modal.hide('delconfirm')
        this.delUser = false
      },
      deleteUser() {
        this.confirmed = true
        fireAuth.currentUser.delete()
        .then(() => {
          let email = this.$store.state.user.data.email
          fireDb.collection('users').doc(email).delete()
          .then(() => {
            console.log('User info wiped successfully!')
          })
          .catch((err) => {
            console.log('There was an error wiping database:', err)
          })
          this.$router.push('/')
        })
        .catch(error => {
          this.confirmed = false
          console.log('Error deleting user:', error)
          if (error.code == "auth/requires-recent-login") {
            let c = confirm('This action requires you to reauthenticate')
            if (c) {
              this.$router.push('/auth/login')
            } else {
              this.cancel()
            }
          } else {
            alert('Oh no: ', error.message)
          }
        });
      }
    }
  }

</script>

<style scoped>

  .capitalize {
    text-transform: capitalize;
  }

  .container {
    padding-bottom: 5rem;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 75vh;
  }

  .panel {
    width: 50%;
    margin-top: 2rem;
  }
  .level {
    width: 100%;
  }
  .level-right {
    justify-content: flex-start;
  }
  .panel-block {
    padding: 1.25rem 1rem;
  }

  .main-subtitle {
    padding-bottom: 0;
  }

  .capitalize {
    text-transform: capitalize;
  }


</style>
