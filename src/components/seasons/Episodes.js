import './assets/scss/Season.css';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import Slider from '../slider';

export default function Season() {
    useEffect(() => {
        getSeason();
    }, []);
    const { idEpisode } = useParams();
    const [listEpisodes, setEpisodes] = useState([]);
    
    function getSeason() {
        axios
        .get(`https://api.tvmaze.com/episodes/${idEpisode}`)
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
            backgroundImage: `url(${listEpisodes.image?.original})`,
          }}
        >
            <div className="episode-back">
                <div className="episode-container">
                    <div className="episode-image">
                        <img src={listEpisodes.image?.medium} alt={listEpisodes.name} className="season-image" />
                    </div>
                    <div className="episode-content">
                        <div className="episode-name">{listEpisodes?.name}</div>
                            <div className="episode-info">
                                {listEpisodes.rating?.average && (
                                <div >
                                    {listEpisodes.rating?.average} rating -  {Year(listEpisodes?.premiered)} - {listEpisodes?.type && (
                                <span>{listEpisodes?.type}</span>
                                )}
                                </div>
                                )}
                                
                            </div>
                            <div
                                className="episode-description"
                                dangerouslySetInnerHTML={{ __html: listEpisodes?.summary }}
                            ></div>

                            {listEpisodes?.genres?.length && (
                                <div className="episode-topics">
                                <strong>Genres:</strong> {listEpisodes?.genres?.join(", ")}
                                </div>
                            )}
                            <div className="episode-topics">
                                <strong>Language:</strong> {listEpisodes.language}
                            </div>
                        </div>
                    </div>
            </div>
        </section>
        </>
    )
}