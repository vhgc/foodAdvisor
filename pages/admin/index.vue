<template>
  <div>
    <section class="section" >
      <div class="columns">
        <div class="column">
          <h2 class="title is-2">Resturantes</h2>
        </div>
      </div>
      <div class="table-container">
        {{restaurants}}
        <button class="button" @click="logOut">Logout</button>
        <table class="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Restaurant name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in restaurants" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <nuxt-link class="button" :to="`admin/${item.id}`" >
                  Editar
                </nuxt-link>
                <button class="button is-danger"
                  @click="eliminardocumento(item.id)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>

import { db, firebase } from '~/plugins/firebase'

export default {
  middleware: 'auth',
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.getDocumentos()
  },
  methods: {
    eliminarDocumento(id) {
      const ref = db.collection('restaurants').doc(id)
      ref.delete()
    },
    getDocumentos() {
      this.restaurans =  []
      const data = db.collection('restaurants').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const restaurant = {
            id: doc.id,
            ...doc.data()
          }
          this.restaurans.push(restaurant)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    logOut() {
      firebase.auth().signOut()
      this.$route.push('/')
    }
  }
}
</script>
