<template>
  <div>
    <div class="main-title is-size-3">Manage Applications</div>
    <div v-for="(applicants, course) in applicantData" :key="course">
      <article class="panel margin-top is-dark">
        <p class="panel-heading">
          Applications to {{ course }}
        </p>

        <div v-for="applicant in applicants" :key="applicant" class="panel-block">
          <div class="level">
            <div class="level-left">
              {{ applicant }}
            </div>
            <div class="level-right">
              <div class="buttons">
                <button class="button is-light is-outlined is-primary"
                  @click="accept(applicant, course)">Accept</button>
                <button class="button is-light is-danger" @click="decline(applicant)">Decline</button>
              </div>
            </div>
          </div>
        </div>

      </article>
    </div>

  </div>
</template>

<script>
  import {
    fireDb
  } from '@/services/firebase';

  export default {
    name: 'ApproveElective',
    data() {
      return {
        all: null,
        applicantData: {},
        accepted: {}
      }
    },
    mounted() {
      fireDb.collection("applications").doc('pending')
        .onSnapshot(data => {
          let temp = data.data().applicationData
          this.all = temp
          let applicants = Object.keys(this.all)
          temp = {}
          applicants.forEach(element => {
            let id = this.all[element]['course_id']
            if (temp[id] != null) {
              temp[id].push(element)
            } else {
              temp[id] = [element]
            }
          });
          this.applicantData = temp
        });
    },
    methods: {
      accept(email, id) {
        if (this.accepted[id] != null) {
          this.accepted[id].push(email) 
        } else {
          this.accepted[id] = [email]
        }
        fireDb.collection("applications").doc("approved").set({
          data: this.accepted
        }, {
          merge: true
        })
      },
      decline(email) {
        fireDb.collection("applications").doc("pending").collection(email)
      }
    }
  }

</script>

<style scoped>
  .list {
    max-width: 100%;
  }

  .pad-top {
    margin-top: 1rem;
  }

  .panel-block {
    min-height: 2rem;
    padding: 1.25rem 1.25rem;
  }

  .level {
    width: 100%;
  }

  .pad-right {
    margin-right: 1rem;
  }

  .margin-top {
    margin-top: 1rem;
  }

</style>
