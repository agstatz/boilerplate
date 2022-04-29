/**
 * StarRating.jsx
 *
 * A component that shows stars for a rating system
 */

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function StarRating(props) {
    const [stars, setStars] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        var list = [];

        for (var i = 0; i < rating; i++) {
            list.push(
                <i
                    className='bi bi-star-fill'
                    id={i.toString()}
                    onMouseOver={updateStar}
                    onMouseOut={revertStars}
                    onClick={updateRating}
                ></i>
            );
        }

        for (var i = rating; i < 5; i++) {
            list.push(
                <i
                    className='bi bi-star'
                    id={i.toString()}
                    onMouseOver={updateStar}
                    onMouseOut={revertStars}
                    onClick={updateRating}
                ></i>
            );
        }

        setStars(list);
        if (props.inputRating) {
            setRating(props.inputRating);
        }
    }, []);

    useEffect(() => {
        updateStar(rating.toString());
    }, [rating]);

    const updateStar = (e) => {
        var numberOfStars;
        if (e.target !== undefined) {
            numberOfStars = parseInt(e.target.id) + 1;
        } else {
            numberOfStars = parseInt(e);
        }

        var list = [];

        for (var i = 0; i < numberOfStars; i++) {
            list.push(
                <i
                    className='bi bi-star-fill'
                    id={i.toString()}
                    onMouseOver={!props.readOnly ? updateStar : null}
                    onMouseOut={!props.readOnly ? revertStars : null}
                    onClick={!props.readOnly ? updateRating : null}
                ></i>
            );
        }

        for (var i = numberOfStars; i < 5; i++) {
            list.push(
                <i
                    className='bi bi-star'
                    id={i.toString()}
                    key={i}
                    onMouseOver={!props.readOnly ? updateStar : null}
                    onMouseOut={!props.readOnly ? revertStars : null}
                    onClick={!props.readOnly ? updateRating : null}
                ></i>
            );
        }

        setStars(list);
    };

    const revertStars = () => {
        var numberOfStars = rating;

        var list = [];

        for (var i = 0; i < numberOfStars; i++) {
            list.push(
                <i
                    className='bi bi-star-fill'
                    id={i.toString()}
                    onMouseOver={updateStar}
                    onMouseOut={revertStars}
                    onClick={updateRating}
                ></i>
            );
        }

        for (var i = numberOfStars; i < 5; i++) {
            list.push(
                <i
                    className='bi bi-star'
                    id={i.toString()}
                    onMouseOver={updateStar}
                    onMouseOut={revertStars}
                    onClick={updateRating}
                ></i>
            );
        }

        setStars(list);
    };

    const updateRating = (e) => {
        var numberOfStars = parseInt(e.target.id) + 1;
        setRating(parseInt(e.target.id) + 1);
        props.updateFunction(numberOfStars);
    };

    const resetRating = () => {
        props.updateFunction(0);
        setRating(0);
    };

    return (
        <span className='rating-stars'>
            {stars}
            {!props.readOnly ? (
                <>
                    <br />
                    <Button size='sm' onClick={resetRating}>
                        Reset Rating
                    </Button>
                </>
            ) : (
                <></>
            )}
        </span>
    );
}

export default StarRating;
