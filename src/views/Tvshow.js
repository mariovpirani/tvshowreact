import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from '../components/slider';

export default function Tvshow() {
    useEffect(() => {
      getListShows();
    }, []);
    const [listShows, setShows] = useState([]);
    function getListShows() {
      axios
        .get(` https://api.tvmaze.com/search/shows?q=The+Powerpuff+Girls`)
        .then((response) => {
          let season = []
          response.data.map((show) => {
            console.log(show)
            season.push(show.show)
          });
          console.log(season)
          setShows(season)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  return (
      <div className="Tvshow">
        <Slider seasons={listShows} episode={false} idSeason='0' />
      </div>
  )
}

