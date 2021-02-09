<template>
  <div>
    <h2 class="title is-2">FoodAdvisor, tu web de restaurantes</h2>
    <div class="subcribe" v-if="!is_subscribe">
      <input v-model="email" type="text" class="input email" placeholder="email..."/>
      <button class="button is-info" @click="envia">
        Suscribirse
        </button>
    </div>
  </div>
</template>

<script>
import api from '~/services/api'

export default {
  data() {
    return {
      email: '',
      is_subscribe: false
    }
  },
  methods: {
    async envia() {
      console.log('casa')
      const payload =  {
        email: this.email
      }

      const response = await api.postSubscribeUser(payload)
      console.log('--', response)
      if (response.status == 201) {
        this.is_subscribe = true
      }
    }
  }
}
</script>


<style scoped>
.subcribe{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.email {
 width: 80%;
}
</style>
