<template>
  <div class="container">
    <section class="section">
      <h1 class="title is-1">{{ $route.params.category }}</h1>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ $route.params.category }}</a>
          </li>
        </ul>
      </nav>
      <div class="container">
        <section class="section">
          <div class="columns">
            <RestaurantCard
              :name="restaurant.name"
              :description="restaurant.description"
              :slug="restaurant.slug"
              :category="restaurant.category"
              :likes="restaurant.likes"
              :image="restaurant.image"
              class="restaurant-card"
              v-for="(restaurant, index) in restaurants" :key="index"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import api from '~/services/api'
import { db } from '~/plugins/firebase'

export default {
  components: {
    RestaurantCard: () => import('@/components/Restaurantecard'),
  },
  async created() {
    await bd
      .collection('restaurants')
      .where('category', '==', this.$route.params.category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.restaurants.push(doc.data)
        });
      })
  },
  data() {
    return {
      restaurants: []
    }
  }
   // async asyncData({ params }) {
  //   try {
  //     /* petición getRestaurantsByCategory() */
  //     const payload = {
  //       category: params.category
  //     }

  //     const { data } = await api.getRestantsByCategory(payload)
  //     return { restaurants: data}

  //   } catch (error) {
  //     console.log({ statusCode: 404, message: 'Category not found' })
  //   }
  // }
}
</script>
<style>
.restaurant-card {
  margin: 10px 20px;
  min-width: 300px;
}
</style>
