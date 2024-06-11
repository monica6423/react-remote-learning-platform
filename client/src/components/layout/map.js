import React, { Component } from 'react'

class Map extends Component {
  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpXgbep0JF_3zo75vx8nWKuVl6ZkjpS4w&callback=initMap',
    )
    window.initMap = this.initMap
  }

  initMap = () => {
    new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 52.5206, lng: 13.4098 },
      scrollwheel: false,
      zoom: 8,
    })
  }

  render() {
    return <div id="map"></div>
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpXgbep0JF_3zo75vx8nWKuVl6ZkjpS4w&callback=initMap"
// type="text/javascript" async defer></script>

export default Map
