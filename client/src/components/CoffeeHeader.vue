<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{name: 'coffees'}">Coffees</router-link></li>
        <li><router-link :to="{name: 'users'}">Users</router-link></li>
        <li><router-link :to="{name: 'login'}">Login</router-link></li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackHeader'
}
</script>

<style scoped>
.nv-navbar {
  background-color: palegoldenrod; /* สีพื้นหลัง */
  width: 100%;
  padding: 10px 0px 10px 0px;
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}

.nv-navbar .nav li {
  float: left;
}

.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: gray;
  font-weight: bold;
}

.nv-navbar .nav li a:hover {
  color: darkslategrey;
}

.nv-navbar .nav li a.router-link-active {
  background-color: gold;
  color: darkslategrey;
}

.clearfix {
  clear: left;
}
</style>