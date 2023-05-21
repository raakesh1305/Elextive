<template>
  <div class="hero is-fullheight">
    <div class="columns">
      <div class="column is-4 banner">
        <h1 class="is-size-1 has-text-centered">Login</h1>
        <p class="content has-text-centered is-size-5 is-hidden-mobile">
          Welcome back to ELEXTIVE! 👋</p>
      </div>
      <div class="column form">
        <label class="label">Your Credentials:</label>

        <div class="field">
          <!-- <label class="label">Email</label> -->
          <div class="control">
            <input class="input" type="text" placeholder="Username/Email " v-model="email">
          </div>
        </div>

        <div class="field">
          <!-- <label class="label">Email</label> -->
          <div class="control">
            <input class="input" type="password" placeholder="Password" v-model="password" @keyup.enter="login">
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link is-light is-rounded" :class="{ 'is-loading': signIn }" @click="login">Login
              &rarr;</button>
          </div>
          <div class="control">
            <nuxt-link class="button is-danger is-light is-rounded" to='/'>
              Cancel
            </nuxt-link>
          </div>
          <div class="control float-right">
            <nuxt-link to='/auth/reset' class="button is-light is-warning is-outlined is-rounded">Forgot Password?</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <modal name="error" classes="modal is-active" @before-close="signIn = false">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="section">
          <h3 class="title has-text-white">Oh no!</h3>
          <p class="subtitle is-size-4 has-text-white">{{ this.err }}</p>
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
     fireAuth
   } from '@/services/firebase';

  export default {
    data() {
      return {
        email: "",
        password: "",
        signIn: false,
        forgot: false,
        err: null
      }
    },
    methods: {
      error() {
        this.signIn = true
        this.$modal.show('error')
      },
      cancel() {
        this.$modal.hide('error')
        this.signIn = false
      },
      login() {
        this.signIn = true
        fireAuth.signInWithEmailAndPassword(this.email, this.password)
           .then(data => {
             console.log('Sign in successful!');
             this.$router.push('/dashboard')
           })
           .catch(err => {
             this.err = err
             console.log(err)
             this.error()
           })
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
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    padding-top: 2rem;
  }

  .float-right {
    margin-left: auto;
  }

</style>
