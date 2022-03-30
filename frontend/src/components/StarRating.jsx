/**
 * StarRating.jsx
 * 
 * A component that shows stars for a rating system
 */

import { useState, useEffect } from "react";

function StarRating() {

    const [stars, setStars] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => { 
        var list = [];

        for (var i = 0; i < rating; i++) {
            list.push( <i 
                        className="bi bi-star-fill"
                        id={i.toString()}
                        onMouseOver={updateStar}
                        onMouseOut={revertStars}
                        onClick={updateRating}></i>);
        }

        for (var i = rating; i < 5; i++) {
            list.push(<i 
                    className="bi bi-star" 
                    id={i.toString()} 
                    onMouseOver={updateStar} 
                    onMouseOut={revertStars}
                    onClick={updateRating}></i>);
        }
        
        setStars(list);
    }, []);

    useEffect(() => {
        updateStar(rating.toString());
    }, [rating])

    const updateStar = (e) => {
        var numberOfStars;
        if (e.target !== undefined) {
            numberOfStars = parseInt(e.target.id) + 1;
        } else {
            numberOfStars = parseInt(e);
        }
        

        var list = [];

        for (var i = 0; i < numberOfStars; i++) {
            list.push(<i 
                        className="bi bi-star-fill"
                        id={i.toString()}
                        onMouseOver={updateStar}
                        onMouseOut={revertStars}
                        onClick={updateRating}></i>);
        }

        for (var i = numberOfStars; i < 5; i++) {
            list.push(<i 
                        className="bi bi-star"
                        id={i.toString()}
                        onMouseOver={updateStar}
                        onMouseOut={revertStars}
                        onClick={updateRating}></i>);
        }

        console.log("rating " + rating);

        setStars(list);
    }

    const revertStars = () => {
        var numberOfStars = rating;
        console.log(numberOfStars);

        var list = [];

        for (var i = 0; i < numberOfStars; i++) {
            list.push(<i 
                        className="bi bi-star-fill"
                        id={i.toString()}
                        onMouseOver={updateStar}
                        onMouseOut={revertStars}
                        onClick={updateRating}></i>);
        }

        for (var i = numberOfStars; i < 5; i++) {
            list.push(<i
                        className="bi bi-star"
                        id={i.toString()}
                        onMouseOver={updateStar}
                        onMouseOut={revertStars}
                        onClick={updateRating}></i>);
        }

        setStars(list);
    }

    const updateRating = (e) => {
        var numberOfStars = parseInt(e.target.id) + 1;
        console.log("updating rating" + numberOfStars);
        setRating(parseInt(e.target.id) + 1);
    }

    return (
        <span className="rating-stars">
            {stars}
        </span>
    )
}

export default StarRating;