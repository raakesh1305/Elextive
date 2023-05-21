<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/dashboard">
        <span class="main-title is-size-3 pad">Elextive</span>
      </nuxt-link>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <input class="input" type="text" placeholder="Search">
        </div>
      </div>

      <div class="navbar-end">
        <nuxt-link class="navbar-item" to="/about">
          About
        </nuxt-link>

        <a class="navbar-item">
          Help
        </a>
        <div class="navbar-item">
          <button @click="confirmation" class="button is-danger is-outlined" :class="{ 'is-loading': exit }">
            Log Out
          </button>
        </div>
      </div>
    </div>
    <modal name="confirm" classes="modal is-active" @before-close="exit = false">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="section">
          <h3 class="title has-text-white">Confirmation</h3>
          <p class="subtitle is-size-4 has-text-white">Are you sure you want to exit?</p>
          <div class="buttons">
            <button class="button is-success is-rounded" :class="{ 'is-loading': confirmed }" @click="logout">Yes, I
              want to sign-out</button>
            <button class="button is-danger is-rounded" @click="cancel">Nope, cancel</button>
          </div>
        </div>
      </div>
    </modal>
  </nav>
</template>

<script>
  import {
    fireAuth
  } from '@/services/firebase';

  export default {
    name: 'Nav',
    data() {
      return {
        exit: false,
        confirmed: false
      }
    },
    methods: {
      confirmation() {
        this.exit = true
        this.$modal.show('confirm')
      },
      cancel() {
        this.$modal.hide('confirm')
        this.exit = false
      },
      logout() {
        this.confirmed = true
        fireAuth.signOut()
          .then(() => {
            console.log('User signed out!')
            this.$router.push('/auth/login')
          })
          .catch(err => console.log(err))
      }
    }

  }

</script>

<style scoped>
  .pad {
    padding: 0rem 1rem;
  }

</style>
