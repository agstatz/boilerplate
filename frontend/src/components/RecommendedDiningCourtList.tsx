/**
 * RecommendedDiningCourtList.tsx
 *
 * @author Gaurav Manglani
 */

import { Stack, Container } from "react-bootstrap";

import { useState, useEffect } from "react";
import DiningCourtCard from "./DiningCourtCard";
import { store } from "../store/store";

function RecommendedDiningCourtList(props: any) {
  const [data, setData] = useState([{}]);
  const username = store.getState().app.username;

  useEffect(() => {
    fetch(`http://localhost:5000/recommendations/${username}/dining-courts/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  var courts = new Array();
  for (let i = 0; i < data.length; i++) {
    var courses = new Array();

    if (data[i]["courses" as keyof typeof data[0]]) {
      var coursesArray = [{}];
      coursesArray = data[i]["courses" as keyof typeof data[0]];
      for (let j = 0; j < coursesArray.length; j++) {
        courses.push(coursesArray[j]["courseName" as keyof typeof coursesArray[0]]);
      }
    }

    courts.push(<DiningCourtCard
      name={data[i]["name" as keyof typeof data[0]]}
      coursesArray={courses}
    />);
  }
  
  return (
    <div>
      <Container>
        <Stack gap={2}>
          {courts}
        </Stack>
      </Container>
    </div>
  );
}

export default RecommendedDiningCourtList;
