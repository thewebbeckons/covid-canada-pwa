<template>
  <div>
    <b-navbar toggleable="lg" type="dark" fixed="top">
      <div class="container">
        <b-navbar-brand to="/">
          <fa icon="virus" /> covid canada
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item to="/" link-classes="menu--item">Home</b-nav-item> -->
            <!-- <b-nav-item to="/timeline" link-classes="menu--item">Timeline</b-nav-item>
            <b-nav-item to="/world" link-classes="menu--item">Worldwide</b-nav-item> -->
            <b-nav-item to="/news" link-classes="menu--item">News</b-nav-item>
            <b-nav-item to="/about" link-classes="menu--item">About</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>
