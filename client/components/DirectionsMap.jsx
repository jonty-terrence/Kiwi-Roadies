import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'regenerator-runtime/runtime'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBoxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

// our data
import beaches from '../../data/beachData'
import bikeTracks from '../../data/bikeData'

require('dotenv').config()

mapboxgl.accessToken = process.env.ACCESS_TOKEN

class DirectionsMap extends Component {
  map = null

  componentDidMount () {
    const start = this.props.roadieform[0][0].concat(', New Zealand')
    const end = this.props.roadieform[0][1].concat(', New Zealand')

    this.map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [172.76205, -40.852931],
      zoom: 4
    })

    this.map.on('load', () => {
      const directions = new MapBoxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      })

      this.map.addControl(directions, 'top-left')
      directions.setOrigin(start).setDestination(end)
    })
  }

  addNationalParks = () => {
    const { nationalParks } = this.props

    nationalParks.nationalParks.map((park) => {
      var elMarkerPark = document.createElement('div')
      elMarkerPark.id = 'park'
      var popup = new mapboxgl.Popup({ closeOnClick: false }).setText(
        park.name
      )

      new mapboxgl.Marker(elMarkerPark)
        .setLngLat([park.long, park.lat])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  addCampsites = () => {
    const { campsites } = this.props

    campsites.map((campsite) => {
      var elMarkerCamp = document.createElement('div')
      elMarkerCamp.id = 'campsite'
      var popup = new mapboxgl.Popup({ closeOnClick: false }).setText(
        campsite.name
      )

      new mapboxgl.Marker(elMarkerCamp)
        .setLngLat([campsite.longLat[0], campsite.longLat[1]])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  addHuts = () => {
    const { huts } = this.props

    huts.map((hut) => {
      var elMarkerHut = document.createElement('div')
      elMarkerHut.id = 'hut'
      var popup = new mapboxgl.Popup({ closeOnClick: false }).setText(
        hut.name
      )

      new mapboxgl.Marker(elMarkerHut)
        .setLngLat([hut.longLat[0], hut.longLat[1]])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  addBeaches = () => {
    beaches.map((beach) => {
      var elMarkerBeach = document.createElement('div')
      elMarkerBeach.id = 'beach'
      var popup = new mapboxgl.Popup({ closeOnClick: false }).setText(
        beach.name
      )

      new mapboxgl.Marker(elMarkerBeach)
        .setLngLat([beach.startlong, beach.startlat])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  addTracks = () => {
    bikeTracks.map((track) => {
      var elMarkerBike = document.createElement('div')
      elMarkerBike.id = 'bike'
      var popup = new mapboxgl.Popup({ closeOnClick: false }).setText(
        track.name
      )

      new mapboxgl.Marker(elMarkerBike)
        .setLngLat([track.startlong, track.startlat])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  render () {
    if (this.map) {
      this.addNationalParks()
      this.addCampsites()
      this.addHuts()
      this.addBeaches()
      this.addTracks()
    }

    return (
      <>
        <div className="coolmap">
          <div ref={el => (this.mapWrapper = el)}
            className ="mapWrapper"/>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  roadieform: state.roadieform,
  nationalParks: state.nationalParks,
  campsites: state.campsites,
  huts: state.huts
})

export default connect(mapStateToProps)(DirectionsMap)
