 import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link } from 'react-router-dom'

export default function Slider(props) {
    const seasons = props.seasons.map((show, index) => {
        console.log(show)
        return (
            <div key={index} className="cardseason" >
                <Link to={props.episode ? '/episode/' + props.idSeason + '/' + show.id : '/season/' + show.id}>
                    <div className="imageseason" style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: `url(${show.image?.original})`,
                    }}></div>
                </Link>
                <div className="title">
                    {show.name}
                </div>
            </div>  
        );
    });
    return (
        <div className="sliderFirst">
        {seasons?.length > 0 && (
        <div>
            <h2>{props.episode ? 'Episodes' : 'Seasons'}</h2>
            <Carousel plugins={[
                'arrows',
                {
                resolve: slidesToShowPlugin,
                options: {
                numberOfSlides: 4
                }
                },
            ]}
            breakpoints={{
                640: {
                plugins: [
                {
                    resolve: slidesToShowPlugin,
                    options: {
                    numberOfSlides: 1
                    }
                },
                ]
                },
                900: {
                plugins: [
                {
                    resolve: slidesToShowPlugin,
                    options: {
                    numberOfSlides: 2
                    }
                },
                ]
                }
            }}
            >
                {seasons}
            </Carousel>
        </div>
        )}
        </div>
    )
}
