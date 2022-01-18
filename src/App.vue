<template>
  <h1> {{msg}} </h1>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      msg: "Dune > Star Wars"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 2cm;
}
</style>
