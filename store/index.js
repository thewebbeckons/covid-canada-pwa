import moment from 'moment'
const apiURL = 'https://api.covid19tracker.ca'

export const state = () => ({
  lastUpdated: 0,
  current: [],
  reports: {}
})

export const mutations = {
  SET_LASTUPDATED: (state, lastUpdated) => {
    state.lastUpdated = lastUpdated
  },
  SET_CURRENT: (state, current) => {
    state.current = current
  },
  SET_REPORTS: (state, reports) => {
    state.reports = reports
  }
}

export const actions = {
  async getSummary ({ commit, state }) {
    // if (state.current.length) { return }

    try {
      let current = await this.$axios.$get(`${apiURL}/summary`)
      const lastUpdated = current.last_updated
      current = current.data[0]
      commit('SET_LASTUPDATED', lastUpdated)
      commit('SET_CURRENT', current)
    } catch (err) {
      return err
    }
  },
  async getReports ({ commit, state }) {
    // if (state.reports.length) { return }

    try {
      const reports = await this.$axios.$get(`${apiURL}/reports`)
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
      const newData = reports.data.slice(reports.data.length - 7, reports.data.length)
      // Populate the chartdata
      newData.forEach((item) => {
        const newDate = moment(item.date, 'YYYY-MM-DD').format('MMM, Do')
        chartdata.labels.push(newDate)
        chartdata.datasets[0].data.push(item.change_cases)
        chartdata.datasets[1].data.push(item.change_fatalities)
      })
      commit('SET_REPORTS', chartdata)
    } catch (err) {
      return err
    }
  }
}
