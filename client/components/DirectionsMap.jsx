import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'regenerator-runtime/runtime'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBoxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

require('dotenv').config()

// console.log('mapbox token for Directions map', process.env.ACCESS_TOKEN)

mapboxgl.accessToken = process.env.ACCESS_TOKEN

class DirectionsMap extends Component {
  updateView =(viewport) => {
    this.setState({ viewport })
  }

  componentDidMount () {
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [172.76205, -40.852931],
      zoom: 4
    })

    const start = this.props.roadieform[0][0].concat(', New Zealand')
    const end = this.props.roadieform[0][1].concat(', New Zealand')

    console.log('start', start)
    console.log('end', end)

    map.on('load', function () {
      const directions = new MapBoxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      })

      map.addControl(directions, 'top-left')

      const marker = new mapboxgl.Marker()
        .setLngLat([172.76205, -40.852931])
        .addTo(map)

      directions.setOrigin(start).setDestination(end)
    })
  }

  render () {
    console.log(this.props.roadieform)
    return (
      <>
        <p>Directions Map</p>
        <div ref={el => (this.mapWrapper = el)}
          className ="mapWrapper"/>
      </>
    )
  }
}

const mapStateToProps = state => ({
  roadieform: state.roadieform
})

export default connect(mapStateToProps)(DirectionsMap)
