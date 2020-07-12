<template>
  <div class="container">
    <b-row align-v="center" class="section--title">
      <b-col cols="9">
        <h1 class="title">
          Overview
        </h1>
      </b-col>
      <b-col>
        <p class="text-right">
          <fa icon="calendar-alt" /> Data updated {{ new Date() | moment('MMMM, Do') }}
        </p>
      </b-col>
    </b-row>
    <b-row class="section--data">
      <b-col cols="3">
        <div class="card confirmed">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex text-light">
                <!-- <div class="align-self-center ">
                  <fa icon="chart-line" size="3x" />
                </div> -->
                <div class="media-body text-right">
                  <animated-number
                    :value="canada.total_new_cases_today"
                    :duration="400"
                    :delay="100"
                    :formatValue="formatNumber"
                  />
                  <span>New Daily Cases</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card deaths">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex text-light">
                <div class="media-body text-right">
                  <AnimatedNumber
                    :value="canada.total_new_deaths_today"
                    :duration="400"
                    :delay="100"
                    :formatValue="formatNumber"
                  />
                  <span>New Daily Deaths</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="section--title">
      <b-col>
        <h1 class="title">
          Canadian Totals
        </h1>
      </b-col>
    </b-row>
    <b-row class="section--data">
      <b-col cols="3">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex text-dark">
                <div class="media-body text-right confirmed-text">
                  <animated-number
                    :value="canada.total_cases"
                    :duration="400"
                    :delay="100"
                    :formatValue="formatNumber"
                  />
                  <span>Total Confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex text-light">
                <div class="media-body text-right recovered-text">
                  <animated-number
                    :value="canada.total_recovered"
                    :duration="400"
                    :delay="100"
                    :formatValue="formatNumber"
                  />
                  <span>Total Recovered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex deaths-text">
                <div class="media-body text-right ">
                  <animated-number
                    :value="canada.total_deaths"
                    :duration="400"
                    :delay="100"
                    :formatValue="formatNumber"
                  />
                  <span>Total Deaths</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex text-light">
                <div class="media-body text-right info-text">
                  <animated-number
                    :value="canada.total_active_cases"
                    :duration="400"
                    :delay="100"
                    :formatValue="formatNumber"
                  />
                  <span>Total Active Cases</span>
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
        <div class="day-trend">
          <!-- <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="redFill" x1="1" x2="1" y1="0" y2="1">
                <stop offset="0%" stop-color="#ff6060" />
                <stop offset="100%" stop-color="#ffffff" />
              </linearGradient>
              <linearGradient id="greyFill" x1="1" x2="1" y1="0" y2="1">
                <stop offset="0%" stop-color="grey" />
                <stop offset="100%" stop-color="#ffffff" />
              </linearGradient>
            </defs>
          </svg> -->
          <TrendChart
            :datasets="datasets"
            :labels="labels"
            :grid="grid"
            :min="0"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import TrendChart from 'vue-trend-chart'

export default {
  components: {
    AnimatedNumber,
    TrendChart
  },
  data () {
    return {
      canada: [],
      datasets: [
        {
          data: [0, 0],
          smooth: true,
          fill: true,
          showPoints: true,
          className: 'curve1'
        },
        {
          data: [0, 0],
          smooth: true,
          fill: true,
          showPoints: true,
          className: 'curve2'
        }
      ],
      globalData: [],
      totalPopCanada: 37590000,
      labels: {
        xLabels: [],
        yLabels: 5,
        yLabelsTextFormatter: val => Math.floor(val)
      },
      grid: {
        verticalLines: true,
        verticalLinesNumber: 1,
        horizontalLines: true,
        horizontalLinesNumber: 1
      }
    }
  },
  computed: {
    deathRateCanada (country) {
      const percent = (this.canada.total_deaths / this.canada.total_cases) * 100
      return percent.toFixed(2)
    },
    deathRatePopCanada (country) {
      const deathRate = (this.canada.total_deaths / this.totalPopCanada) * 100
      return deathRate.toFixed(2)
    },
    confirmedRateCanada (country) {
      const rate = (this.canada.total_cases / this.totalPopCanada) * 100
      return rate.toFixed(2)
    }
  },
  mounted () {
    fetch('https://api.thevirustracker.com/free-api?countryTotal=CA')
      .then((response) => {
        response.json().then((canada) => {
          this.canada = canada.countrydata[0]
        })
      })
    fetch('https://api.thevirustracker.com/free-api?countryTimeline=CA')
      .then((response) => {
        response.json().then((data) => {
          this.labels.xLabels = Object.keys(data.timelineitems[0]).slice(-8)
          this.labels.xLabels.pop()
          const dailyCases = Object.values(data.timelineitems[0]).slice(-8)
          dailyCases.pop()
          dailyCases.forEach((date) => {
            this.datasets[0].data.push(Number(date.new_daily_cases))
            this.datasets[1].data.push(Number(date.new_daily_deaths))
          })
          this.datasets[0].data = this.datasets[0].data.slice(2)
          this.datasets[1].data = this.datasets[1].data.slice(2)
        })
      })
    fetch('https://api.thevirustracker.com/free-api?global=stats')
      .then((response) => {
        response.json().then((data) => {
          this.globalData = data
        })
      })
  },
  methods: {
    formatNumber (value) {
      return `<h1> ${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(value)}</h1>`
    }
  }
}
</script>

<style lang="scss">
$red: #ff6060;
$blue: #6b93ff;
$green: #2f944d;
$grey: rgba(128, 128, 128, 0.9);

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
.confirmed {
  background-color:$red;
  &-text {
    color: $red;
  }
}
.deaths {
  background-color: $grey;
  &-text {
    color: $grey;
  }
}
.recovered {
  background-color: $green;
  &-text {
    color: $green;
  }
}
.info {
  background-color: $blue;
  &-text {
    color: $blue;
  }
}
.day-trend {
  .vtc {
    height: 350px;
    font-size: 12px;
    font-family: 'Ubuntu', 'Arial Narrow', Arial, sans-serif;
  }
  margin-bottom: 3rem;
}
.curve1 {
  .stroke {
    stroke: $red;
    stroke-width: 2;
  }
  .fill {
    fill: url(#redFill);
    fill-opacity: 0.5;
  }
}
.curve2 {
  .stroke {
    stroke: $grey;
    stroke-width: 2;
  }
  .fill {
    fill: url(#greyFill);
    fill-opacity: 0.5;
  }
}
.grid,
.labels {
  line {
    stroke: rgba(0,0,0, 0.3);
  }
}
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
