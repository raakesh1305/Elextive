<template>
    <div class="hero is-fullheight">
        <div class="columns">
            <div class="column is-4 banner">
                <h1 class="is-size-1 has-text-centered">Reset password</h1>
                <p class="content has-text-centered is-size-5 is-hidden-mobile">
                    Worry not, we are here to help!</p>
            </div>
            <div class="column form">
                <label class="label">Your Email ID:</label>

                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Username/Email " v-model="email">
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link is-light is-rounded" :class="{ 'is-loading': reset }"
                            @click="login">Reset Password &rarr;</button>
                    </div>
                    <div class="control">
                        <nuxt-link class="button is-danger is-light is-rounded" to='/auth/login'>
                            Cancel
                        </nuxt-link>
                    </div>
                </div>

                <div v-if="msg" class="field">
                    <p class="is-size-5"> {{ msg }} </p>
                </div>
            </div>
        </div>
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
                reset: false,
                msg: null
            }
        },
        methods: {
            login() {
                this.reset = true
                fireAuth.sendPasswordResetEmail(this.email)
                .then(() => {
                    console.log('Email sent!')
                    this.msg = "Email sent!"
                })
                .catch( err => {
                    console.log(err);
                    this.msg = err.message
                })
                .then(() => {
                    this.reset = false
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