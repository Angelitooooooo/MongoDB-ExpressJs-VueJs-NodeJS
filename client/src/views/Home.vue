<template>
  <div>
    Home
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data : () => ({
        baseUrl:'http://localhost:5000/',
  }),
  mounted() {
        axios.get( `${this.baseUrl}user`,{
          headers : {
            token :localStorage.getItem('token')
          }
        }).then((res) => {
          console.log(res , " hey")
        }).catch((err) => {
            console.log(err)
        });
      },

}
</script>

<style>

</style>