import { Container, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { useEffect, useState } from "react";
import axios from "axios";

function UserTagsList(props: Props) {
  const targetFood = useLocation().search.substring(
    useLocation().search.lastIndexOf("=") + 1
  );
  const [hiddenRowsArray, setHiddenRowsArray] = useState({});
  const [foodTagArray, setFoodTagArray] = useState([{}]);

  var emptyResponse = true;

  useEffect(async () => {
    try {
      emptyResponse = false;
      const { data: response } = await axios.get(
        "http://localhost:3001/api/foods/getuserfoodtags/".concat(targetFood.replace(/_/g, ' '))
      );

      try {
        if (response.length > 0) {
            emptyResponse = false;

        }
      }
      catch (err){
        emptyResponse = true;
      }

      setFoodTagArray(response);
    } catch (err) {
      console.error(err);
      emptyResponse = true;
    }
  }, []);

  try {
    if (foodTagArray[0].rating === undefined) {
        emptyResponse = true;
    }
    else {
        emptyResponse = false;
    }

  } catch (err) {
    emptyResponse = true;
  }
  if (!emptyResponse) {
    return (
      <Container>
        <div class="ovr row flex-col flex-nowrap pb-1">
          {foodTagArray.map((foodTagArray, k) => (
            <div class="col flex-start">
              <div class="tag-block flex-start p-3">
                <h3>{foodTagArray.name}</h3>
                <p>score: {foodTagArray.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  } else {
    return (
        <Container>
          <div>
            <p class="user-tag-empty pt-2">There are no food tags for this food item. Be the first to create one!</p>
          </div>
        </Container>
    );
  }
}

export default UserTagsList;
