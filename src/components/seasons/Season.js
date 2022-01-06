import './assets/scss/Season.css';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import Slider from '../slider';

export default function Season() {
    useEffect(() => {
        getSeason();
    }, []);
    const { idSeason } = useParams();
    const [listSeason, setSeason] = useState([]);
    const [listEpisodes, setEpisodes] = useState([]);
    console.log(idSeason)
    function getSeason() {
        axios
          .get(`https://api.tvmaze.com/shows/${idSeason}`)
          .then((response) => {
              console.log(response.data)
            setSeason(response.data)
            getEpisodes()
          })
          .catch((error) => {
            console.log(error);
          })
     }
     function getEpisodes() {
        axios
        .get(`https://api.tvmaze.com/shows/${idSeason}/episodes`)
        .then((response) => {
            console.log(response.data)
            setEpisodes(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
     }
     function Year(date) {
        if (date) {
          const year = date?.split("-");
          return year[0];
        }
      }
     return (
        <>
        <section
          className="episode"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundImage: `url(${listSeason.image?.original})`,
          }}
        >
            <div className="episode-back">
                <div className="episode-container">
                    <div className="episode-image">
                        <img src={listSeason.image?.medium} alt={listSeason.name} className="season-image" />
                    </div>
                    <div className="episode-content">
                        <div className="episode-name">{listSeason?.name}</div>
                            <div className="episode-info">
                                {listSeason.rating?.average && (
                                <div >
                                    {listSeason.rating?.average} rating -  {Year(listSeason?.premiered)} - {listSeason?.type && (
                                <span>{listSeason?.type}</span>
                                )}
                                </div>
                                )}
                                
                            </div>
                            <div
                                className="episode-description"
                                dangerouslySetInnerHTML={{ __html: listSeason?.summary }}
                            ></div>

                            {listSeason?.genres?.length && (
                                <div className="episode-topics">
                                <strong>Genres:</strong> {listSeason?.genres?.join(", ")}
                                </div>
                            )}
                            <div className="episode-topics">
                                <strong>Language:</strong> {listSeason.language}
                            </div>
                        </div>
                        <Slider seasons={listEpisodes} idSeason={idSeason} episode={true}/>
                    </div>
            </div>
        </section>
        </>
    )
}