import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';


function App() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhY2xpY2trIiwiYSI6ImNsdHMzMjF5azBvNHEybHFtaTFrNjVjMDgifQ.GoNQaqHD-i6oGS3zJ5bbHw'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/joshuaclickk/cly41cale00ag01oe04de40nf', //main (not working on mobile)
      //style: 'mapbox://styles/joshuaclickk/cm1fv74yb03x601rbgy1j7enq', // test style URL 
      center: [151.767071, -32.928618], // starting position [lng, lat]
     // maxBounds: [151.57267678415096, -32.954658143269306], // [west, south] [151.75647890282644, -32.94511041929251] [151.8504009188231, -32.81909047987636] ,
      zoom: 13.9, 
      maxZoom: 18.0, 
      bearing: -10.5,
      pitch: 56.5, 
      maxPitch: 56.5,
      minPitch: 56.5
    });

    mapRef.current.on('click', () => {
      const clickedFeatures = map.queryRenderedFeatures(event.point, {
        layers: ['beer-trail-breweries-scott', 'beer-trail-breweries-large'], // Replace with your layer names
      });

      if (!clickedFeatures.length) return;

      const clickedBrewery = clickedFeatures[0];

      // Construct the popup content dynamically
      const popupContent = `
        <h3>${clickedBrewery.properties.title}</h3>
        <img src='https://brewcastlebrewtrail.com.au/wp-content/uploads/${clickedBrewery.properties.icon}' alt='${clickedBrewery.properties.title}' />
        <a href="https://${clickedBrewery.properties.website}" target="_blank">${clickedBrewery.properties.website}</a><br />
        ${clickedBrewery.properties.phone ? `<a href="tel:${clickedBrewery.properties.phone}">${clickedBrewery.properties.phone}</a><br />` : ''}
        ${clickedBrewery.properties.contact ? `<a href="https://${clickedBrewery.properties.website}/${clickedBrewery.properties.contact}" target="_blank">Contact Us Here</a><br />` : ''}
        ${clickedBrewery.properties.email_user && clickedBrewery.properties.email_domain ? `<a href="mailto:${clickedBrewery.properties.email_user}@${clickedBrewery.properties.email_domain}">${clickedBrewery.properties.email_user}@${clickedBrewery.properties.email_domain}</a><br />` : ''}
        <p>${clickedBrewery.properties.description}</p>
        <a href="https://maps.google.com/?q=${clickedBrewery.properties.title}" target="_blank">Get directions</a>
      `;

      // Create and display the popup near the clicked brewery marker
      new mapboxgl.Popup({ offset: [-60, -80] })
          .setLngLat(clickedFeatures[0].geometry.coordinates)
          .setHTML(popupContent)
          .addTo(map);
    })


    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}

export default App
