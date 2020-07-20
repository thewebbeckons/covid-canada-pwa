<template>
  <div class="container py-5">
    <b-row>
      <b-col lg="8" md="10" class="mx-auto">
        <h2 class="title-about">Ya another Covid tracker...</h2>
        <p>
          This website is another look at tracking covid cases from Canada. It was mainly built to
          further my knowledge about the javascript framework <a class="nuxt" href="https://nuxtjs.org">NuxtJS</a>
          and to play around with more <span class="nuxt">APIs</span>. It is still a work in progress as I think
          about other features and data to consume. Right now I think I've found the best source of
          data that I can find at least where Canada is concerned.
        </p>
        <p>
          Speaking of data; none of the data on this website is my own, that is all thanks to the lovely
          people over at <a class="covid" href="https://covid19tracker.ca/">Covid-19Tracker.ca</a>
          who have spent a considerable amount of time building a very awesome site and <span class="nuxt">API</span>.
          I spent a lot of time trying and failing with other <span class="nuxt">APIs</span> before I found theirs. So major
          thanks to the team over there (<a href="https://covid19tracker.ca/acknowledgements.html">COVID-19 Tracker Team</a>).
        </p>
        <p>
          Next steps for this website is to further break down the data and showcase the provinces not just canada. Along with some more use of
          chartjs library to visuallize more of the data being offered. I also want to show some comparisions to other countries data primarily
          the USA. But for now I just wanted to get something up so I could also test out publishing to a new host. That host being
          the wonderful <a class="nuxt" href="https://surge.sh/">surge.sh</a>
        </p>
        <p>
          And I guess a little bit about me, I'm a mainly self taught full-stack web developer from Toronto, Ontario. Spending most of my time
          right now working on projects in <span class="nuxt">VueJS/NuxtJS/WordPress</span>
        </p>
        <p>
          <a class="nuxt" href="https://github.com/thewebbeckons"><fa :icon="faGithub" class="fa-2x" /></a>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default {
  computed: {
    faGithub () {
      return faGithub
    }
  }
}
</script>

<style lang="scss">
$nuxt: #00c58e;
$font: 'Source Sans Pro', Arial, Helvetica, sans-serif;
.nuxt {
  color: $nuxt;
}
a.covid {
  color: #FF0000;
}
.title-about {
  font-weight: 700;
  font-family: $font;
}
p {
  font-family: $font;
}
</style>
