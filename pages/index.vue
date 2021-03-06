<template>
  <div class="container">
    <div id="content">
      <b-row class="section--title align-items-end">
        <b-col cols="12" lg="5">
          <h1 class="title">
            Overview
          </h1>
          <p>
            <small><fa icon="calendar-alt" /> Updated {{ [lastUpdated, 'YYYY-MM-DD HH:mm:ss'] | moment('MMM, Do @ h:mma') }} CST</small>
          </p>
        </b-col>
      </b-row>
      <b-row class="section--data">
        <b-col cols="12" lg="3" md="6" class="mb-3 mb-lg-0">
          <div class="card bg-primary">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex text-light">
                  <!-- <div class="align-self-center ">
                    <fa icon="chart-line" size="3x" />
                  </div> -->
                  <div class="media-body text-right">
                    <h3>{{ formatNumber(current.total_cases) }} ({{ formatNumber(current.change_cases, true) }})</h3>
                    <span>Total Cases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="mb-3 mb-lg-0">
          <div class="card bg-danger">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex text-light">
                  <div class="media-body text-right">
                    <h3>{{ formatNumber(current.total_fatalities) }} ({{ formatNumber(current.change_fatalities, true) }})</h3>
                    <span>Total Deaths</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="mb-3 mb-lg-0">
          <div class="card bg-warning">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex text-light">
                  <!-- <div class="align-self-center ">
                    <fa icon="chart-line" size="3x" />
                  </div> -->
                  <div class="media-body text-right">
                    <h3>{{ formatNumber(current.total_hospitalizations) }} ({{ formatNumber(current.change_hospitalizations, true) }})</h3>
                    <span>Total Hospitalizations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="mb-3 mb-lg-0">
          <div class="card bg-success">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex text-light">
                  <!-- <div class="align-self-center ">
                    <fa icon="chart-line" size="3x" />
                  </div> -->
                  <div class="media-body text-right">
                    <h3>{{ formatNumber(current.total_recoveries) }} ({{ formatNumber(current.change_recoveries, true) }})</h3>
                    <span>Total Recoveries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="section--data">
        <b-col>
          <h1 class="title">
            7-Day Trend
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <line-chart
            v-if="loaded"
            :chartdata="chartdata"
            :options="options"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LineChart from '~/components/LineChart'

export default {
  components: {
    LineChart
  },
  async asyncData ({ $axios }) {
    // Get Current date data and last updated
    let current = await $axios.$get('summary')
    const lastUpdated = current.last_updated
    current = current.data[0]
    // Get Trend Chart Data
    const data = await $axios.$get('reports')
    const chartdata = {
      labels: [],
      datasets: [
        {
          label: 'Cases',
          backgroundColor: 'rgba(0, 123, 255, 0.7)',
          pointBackgroundColor: 'rgb(0, 123, 255)',
          data: []
        },
        {
          label: 'Deaths',
          backgroundColor: 'rgb(220, 53, 69, 0.7)',
          pointBackgroundColor: 'rgb(220, 53, 69)',
          data: []
        }
      ]
    }
    // Cut the data down to the last 7 days
    const newData = data.data.slice(data.data.length - 7, data.data.length)
    // Populate the chartdata
    newData.forEach((item) => {
      const newDate = moment(item.date, 'YYYY-MM-DD').format('MMM, Do')
      chartdata.labels.push(newDate)
      chartdata.datasets[0].data.push(item.change_cases)
      chartdata.datasets[1].data.push(item.change_fatalities)
    })
    return { current, lastUpdated, chartdata }
  },
  data () {
    return {
      options: {
        tooltips: {
          backgroundColor: 'rgba(255,255,255,0.9)',
          titleFontColor: 'black',
          bodyFontColor: 'black',
          footerFontColor: 'black'
          // yAlign: 'bottom'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    loaded () {
      if (this.chartdata.labels.length) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    formatNumber (value, type) {
      if (!value.startsWith('-') && type === true) {
        return '+' + new Intl.NumberFormat('en-US').format(value)
      } else {
        return new Intl.NumberFormat('en-US').format(value)
      }
    }
  }
}
</script>

<style lang="scss">
$red: rgb(220, 53, 69);
$blue: rgb(0, 123, 255);
$green: #2f944d;
$grey: rgba(128, 128, 128, 0.9);

.loading {
  min-height: 100vh;
  vertical-align: middle;
}
.section {
  &--title {
    padding-top: 2rem;
  }
  &--data {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
}
.card {
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.1);
  border:1px solid rgba(211, 211, 211, 0.3);
}
.media-body > span {
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
