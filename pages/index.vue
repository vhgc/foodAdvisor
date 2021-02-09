<template>
  <div>
    <Hero @onShowBanner="changeShowBanner">
      <Banner slot="header" style="width: 800px" v-if="showBanner"/>
      <Slogan slot="header" style="width: 800px" v-else/>
    </Hero>
    <div class="container">
      <section class="section">
        <div class="columns is-multiline">
        <RestaurantCard
            class="restaurant-card"
            :name="restaurant.name"
            :description="restaurant.description"
            :category="restaurant.category"
            :slug="restaurant.slug"
            v-bind:likes="restaurant.likes"
            :image="restaurant.image"
            v-on:onLikeButton="sumLikes(restaurant)"
            v-for="(restaurant, index) in restaurants"
            v-bind:key="index"
        />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import RestaurantCard from "/components/RestaurantCard"
import api from '~/services/api'
import { db } from '~/plugins/firebase'

export default {

  components: {
    RestaurantCard: () => import('@/components/Restaurantecard'),
    Hero: () => import('@/components/Hero'),
    Banner: () => import('@/components/banner'),
    Slogan: () => import('@/components/slogan')
  },
  // async asyncData() {
  //   // Solo se crean en las Páginas en el directorio Pages
  //   try {
  //     const { data } = await api.getRestaurants()
  //     return { restaurants: data}
  //   } catch {
  //     return { restaurants: []}
  //   }
  // },
  // created() {
  //   console.log(db)
  //   const response = db.collections('restaurants').get()
  //   response.then(snapshot => {
  //     snapshot.forEach((doc) => {
  //       const restaurant = {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //       this.restaurants.push(restaurant)
  //     })
  //   }).catch(err => {
  //       console.log(err)
  //     })

  // },
  async created(){
    const response = await api.getRestaurants()
    if (response.status == 200) {
      this.restaurants = response.data
    }
  },
  data() {
    return {
      likes : 0,
      showBanner: false,
      restaurants: []
    }
  },
  methods: {
    async sumLikes(restaurant) {
      const payload =  {
        id: restaurant.id,
        data: {
          likes: restaurant.likes + 1
        }
      }
      const response = await api.putSumLikes(payload)
      if (response.status == 200) {
        restaurant.likes++
      }
      // this.restaurants[index].likes = this.restaurants[index].likes + 1
    },
    changeShowBanner() {
      this.showBanner = !this.showBanner
    }
  }
}
</script>

<style>
  .restaurant-card {
    margin: 10px 10px;
    max-width: 300px;
  }
</style>
