/**
 * FoodRatingsList.jsx
 *
 * @author Ashton Statz
 */

import { Stack, Container, Row, Col } from 'react-bootstrap';
import { StarRating } from './';
import { useState, useEffect } from 'react';
import axios from 'axios';

function FoodRatingsList(props) {
    const url = 'http://localhost:3001/';
    const [foods, setFoods] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        try {
            axios
                .get(url + 'api/getFoodRating?user=' + props.urlUsername)
                .then((res) => {
                    setFoods(res.data);
                    console.log(res.data);
                });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <div className='p-2 my-2 mx-2 bg-white rounded'>
                <Stack gap={2}>
                    <h5>
                        <strong>Recent Food Ratings</strong>
                    </h5>
                    {foods !== undefined ? (
                        foods.map((item) => {
                            return (
                                <Row className=' m-2 rounded border'>
                                    <Col>{item.food}</Col>
                                    <Col>
                                        <StarRating
                                            inputRating={item.rating}
                                            updateFunction={null}
                                            readOnly={true}
                                        />
                                    </Col>
                                </Row>
                            );
                        })
                    ) : (
                        <>helloasdf</>
                    )}
                </Stack>
            </div>
        </Container>
    );
}

export default FoodRatingsList;
