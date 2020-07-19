<template>
  <footer>
    <div class="container">
      <b-row>
        <b-col lg="8" md="10" class="mx-auto">
          <hr>
          <p class="text-center">
            <small>
              Designed and built with <fa icon="heart" class="text-danger" /> in Toronto. // Data Provided by <a href="https://covid19tracker.ca/">Covid-19 Tracker Canada</a>
            </small>
          </p>
        </b-col>
      </b-row>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
a {
  color: #ff0000;
}
footer p {
  font-size: 0.9rem;
}
hr {
  margin: 1rem auto;
  border: 0;
  height: 1px;
  border-top: 1px solid rgba(0,0,0,.1);
}
</style>
