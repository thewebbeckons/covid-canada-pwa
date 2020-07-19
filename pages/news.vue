<template>
  <div id="content" class="container">
    <b-row class="py-4">
      <b-col lg="8" md="10" class="mx-auto">
        <h1 class="title">
          Latest Covid-19 News
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8" md="10" class="mx-auto">
        <div v-for="post in articles" :key="post.title" class="post-preview">
          <a :href="post.url">
            <h2 class="post-title">
              {{ post.title }}
            </h2>
            <h3 class="post-subtitle">
              {{ post.description }}
            </h3>
          </a>
          <p class="post-meta">
            Posted by <a :href="post.source.url">{{ post.source.name }} </a>
            on {{ post.publishedAt | moment('MMM, do @ h:mma') }}
          </p>
          <hr>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      articles: [],
      timestamp: 0
    }
  },
  mounted () {
    this.fetchNews()
  },
  methods: {
    async fetchNews () {
      try {
        await fetch('https://gnews.io/api/v3/search?q=covid+canada&token=5228bd988561296d8e8ff34464c6a809', { cache: 'force-cache' })
          .then(res => res.json())
          .then((data) => {
            this.articles = data.articles
            this.timestamp = data.timestamp
          })
      } catch (error) {
        return error.message
      }
    }
  }

}
</script>

<style lang="scss">
$red: #ff8181;
$alt-color: #35495e;
$font-family: 'Source Sans Pro', 'Arial Narrow', Arial, sans-serif;

.post {
  &-preview {
    a {
      color: $alt-color;
    }
    a:focus, a:hover {
      text-decoration: none;
      color: $red;
    }
  }
  &-title {
    font-weight: bold;
    text-transform: uppercase;
    font-family: $font-family;
  }
  &-subtitle {
    font-weight:300;
    font-size: 1.3rem;
  }
  &-meta {

  }
}

</style>
