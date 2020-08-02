<template>
  <div id="app">
    <div id="nav">
      <section>
        <router-link to="/">Home</router-link>
      </section>
      <section>
        <router-link to="/state-pattern/on-memory">State Pattern (on memory)</router-link> |
        <router-link to="/state-pattern/from-api">State Pattern (from api)</router-link>
      </section>
      <section>
        <router-link to="/strategy-pattern">Strategy Pattern</router-link>
      </section>
      <section>
        <router-link to="/notification-pattern">Notification Pattern</router-link>
      </section>
      <section>
        <router-link to="/first-class-collection-pattern/on-memory">
          First Class Collection Pattern (on memory)
        </router-link> |
        <router-link to="/first-class-collection-pattern/from-api">
          First Class Collection Pattern (from api)
        </router-link>
      </section>
        <router-link to="/first-class-collection-pattern/composition-api">
          First Class Collection Pattern With Composition-Api (on memory)
        </router-link>
      <section>
      </section>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
