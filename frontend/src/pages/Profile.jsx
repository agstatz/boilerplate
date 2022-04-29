/**
 *  Profile.jsx
 *  The profile page of a given user
 *
 * @author Ashton Statz, Gaurav Manglani, Arjan Mobin
 */

// component imports
import {
    Row,
    Card,
    Col,
    Button,
    Stack,
    Container,
    ButtonGroup,
    ToggleButton,
} from 'react-bootstrap';
import {
    RecommendedFood,
    RecommendedDiningCourtList,
    DietaryInfo,
    BanUserButton,
    FavoriteFoodList,
    FoodRatingsList,
} from '../components';
import { MealPlanList, MealPlanProfileView } from '../components/MealPlans/';
import { PageNotFound } from '../pages/';

// react imports
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

// external imports
import { store, ClearForm, UpdateForm } from '../store/store';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Profile(props) {
    const history = useHistory();

    const { id } = useParams();
    const username = store.getState().app.username;
    const [foods, setFoods] = useState([{}]);
    const [mealSwipes, setMealSwipes] = useState(0);
    const [triedCount, setTriedCount] = useState(0);
    const [friendCount, setFriendCount] = useState(0);
    const [eatingAt, setEatingAt] = useState('');

    const handleLogout = () => {
        try {
            store
                .dispatch(ClearForm())
                .then((res) => {
                    window.location.replace('/');
                })
                .catch((err) => {
                    window.location.replace('/');
                });
        } catch (err) {
            window.location.replace('/');
        }
    };

    function resetAccount() {
        confirmAlert({
            title: 'Confirm to submit',
            message:
                'Are you sure to do this. This will reset all your account preferences.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post('http://localhost:3001/api/resetUser', {
                            data: {
                                username: username,
                            },
                        });
                    },
                },
                {
                    label: 'No',
                    onClick: () => {},
                },
            ],
        });
    }

    const handleMealSwipeReset = () => {
        const userInfo = {
            username: username,
            mealSwipes: 20,
        };

        axios
            .post('http://localhost:3001/api/editUserPreferences', {
                data: userInfo,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        store.dispatch(UpdateForm('mealSwipes', 20));
        window.location.reload();
    };

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2,
            }}
        />
    );

    useEffect(async () => {
        const { data: response } = await axios.get(
            'http://localhost:5000/recommendations/' + id + '/foods/'
        );
        setFoods(response);
        const { data: response3 } = await axios.get(
            'http://localhost:3001/Profile_Info?username=' + id
        );
        console.log(response3);
        if (response3[0] === '') {
            setEatingAt('Currently not eating');
        } else {
            setEatingAt('Currently eating at:\n' + response3[0]);
        }
        if (response3[1] === '') {
            setFriendCount(0);
        } else {
            setFriendCount(response3[1]);
        }
        if (response[2] === '') {
            setTriedCount(0);
        } else {
            setTriedCount(response3[2]);
        }

        const { data: response2 } = await axios.get(
            'http://localhost:3001/api/users/dietary/' + username
        );
        setMealSwipes(response2.mealSwipes);

        const getProfile = async () => {
            try {
                // TODO: get user based on username
            } catch (err) {
                return <PageNotFound />;
            }
        };
        getProfile(id);
    }, []);

    function foodItems() {
        return foods.map((food) => (
            <Container>
                <Stack gap={2}>
                    <RecommendedFood
                        title={food.name}
                        nutrition={food.nutrition}
                    />
                    {likeDislike()}
                </Stack>
            </Container>
        ));
    }

    function likeDislike(liked) {
        const radios = [
            { name: 'Like', value: '1' },
            { name: 'Dislike', value: '2' },
        ];

        return (
            <>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type='radio'
                            variant={
                                idx % 2 == 0
                                    ? 'outline-success'
                                    : 'outline-danger'
                            }
                            name='radio'
                            value={radio.value}
                            checked={liked == radio.value}
                            onChange={(e) => 1}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </>
        );
    }

    return (
        <Container style={{ paddingTop: '12vh' }}>
            <Row>
                <Col xs={6} sm={5} md={4} lg={3} xl={3}>
                    <Card
                        className='my-3'
                        bg='light'
                        style={{ maxWidth: '200px', minWidth: '200px' }}
                    >
                        <img
                            alt='Profile'
                            height='200'
                            src='https://i.stack.imgur.com/l60Hf.png'
                        ></img>
                        <Card.Body>
                            <div>
                                <h3>
                                    <strong>{id ? id : 'username'}</strong>
                                </h3>
                                <BanUserButton />
                                <Row className='mt-3'>
                                    <Col className='text-center'>
                                        <strong>{friendCount}</strong>
                                        <p>Friends</p>
                                    </Col>
                                    <Col className='text-center'>
                                        <strong>{triedCount}</strong>
                                        <p>Items Tried</p>
                                    </Col>
                                </Row>
                                {username === id ? ( // For user
                                    <Stack gap='1'>
                                        <Button
                                            href={'/Foods_Tried'}
                                            className='btn-sm'
                                            variant='outline-primary'
                                        >
                                            Foods that I have tried
                                        </Button>
                                        <Button
                                            href={`/edit/${id}`}
                                            className='btn-sm'
                                            variant='outline-primary'
                                        >
                                            Edit Account
                                        </Button>
                                        <Button
                                            onClick={handleLogout}
                                            className='btn-sm'
                                            variant='outline-primary'
                                        >
                                            Sign Out
                                        </Button>
                                        <Button
                                            onClick={resetAccount}
                                            className='btn-sm'
                                            variant='outline-primary'
                                        >
                                            Reset Account
                                        </Button>
                                    </Stack>
                                ) : (
                                    // For friends
                                    <Button
                                        href={'/Foods_Tried?user=' + id}
                                        className='btn-sm'
                                        variant='outline-primary'
                                    >
                                        Foods that {id} has tried
                                    </Button>
                                )}
                                <a>
                                    <br></br>
                                    <br></br>
                                    {eatingAt}
                                </a>
                                <Card.Text></Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} sm={7} md={8} lg={9} xl={9}>
                    <Card className='my-3' bg='light'>
                        <Card.Body>
                            {username === id ? ( //For user
                                <Tabs
                                    className='mx-3'
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Tab
                                        label='My Meal Plans'
                                        style={{ cursor: 'auto' }}
                                    >
                                        <MealPlanList
                                            filterValue={id}
                                            username={username}
                                        />
                                    </Tab>
                                    <Tab
                                        label='Current Meal Plan'
                                        style={{ cursor: 'auto' }}
                                    >
                                        <MealPlanProfileView
                                            store={store}
                                            urlUsername={id}
                                        />
                                    </Tab>
                                    <Tab
                                        label='My Dietary Info'
                                        style={{ cursor: 'auto' }}
                                    >
                                        <DietaryInfo />
                                    </Tab>
                                    <Tab
                                        label='My Favorite Foods'
                                        style={{ cursor: 'auto' }}
                                    >
                                        <FavoriteFoodList username={username} />
                                    </Tab>
                                    <Tab
                                        label='Food Ratings'
                                        style={{ cursor: 'auto' }}
                                    >
                                        <FoodRatingsList urlUsername={id} />
                                    </Tab>
                                </Tabs>
                            ) : (
                                <Tabs
                                    className='mx-3'
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Tab
                                        label={id + "'s Meal Plans"}
                                        style={{ cursor: 'auto' }}
                                    >
                                        <MealPlanList
                                            filterValue={id}
                                            username={username}
                                        />
                                    </Tab>
                                    <Tab
                                        label={id + "'s Favorite Foods"}
                                        style={{ cursor: 'auto' }}
                                    >
                                        <FavoriteFoodList username={id} />
                                    </Tab>
                                </Tabs>
                            )}
                            <ColoredLine />
                            {username === id ? ( //For user
                                <Row className='mt-3'>
                                    <Col className='text-center'>
                                        <strong>{mealSwipes}</strong>
                                        <p>Meal Swipes Left</p>
                                    </Col>
                                    <Col className='text-center'>
                                        <Button
                                            onClick={handleMealSwipeReset}
                                            className='btn-sm'
                                            variant='outline-primary'
                                        >
                                            Reset Week
                                        </Button>
                                    </Col>
                                </Row>
                            ) : (
                                <></>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {username === id ? ( //friends are unable to see this section
                    <Col sm={12}>
                        <Card className='my-3 mb-5' bg='light'>
                            <Card.Header className='h5'>
                                <strong>Recommended</strong>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Here are some recommendations based on your
                                    history, feedback and restrictions:
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Card.Text>Food Items:</Card.Text>
                                        <Container>
                                            <Stack gap={2}>{foodItems()}</Stack>
                                        </Container>{' '}
                                    </Col>

                                    <Col>
                                        <Card.Text>Dining Courts:</Card.Text>
                                        <RecommendedDiningCourtList />
                                    </Col>
                                </Row>
                                <br />
                                <Container className='d-flex justify-content-center'>
                                    <Button
                                        className='mx-2'
                                        onClick={async () => {
                                            fetch(
                                                `http://localhost:3001/api/foods/recommendations`
                                            )
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    setFoods(data);
                                                });
                                        }}
                                    >
                                        Generate Recommendations{' '}
                                        <i className='bi bi-chevron-right'></i>
                                    </Button>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
        </Container>
    );
}

export default Profile;
