/**
 * DiningCourtCard.tsx
 * On the profile page, users can view recommended
 * dining courts.
 * This holds the framework for an
 * individual dining court.
 * @author Gaurav Manglani
 */

import { Stack, Container } from "react-bootstrap";

function DiningCourtCard(props: any) {
  const { name, coursesArray } = props;

  const courses = [];
  if (coursesArray) {
    for (const [index, value] of coursesArray.entries()) {
      courses.push(<li key={index}>{value}</li>);
    }
  }
  
  return (
    <Container>
      <div className="p-2 my-2 mx-2 bg-light border rounded">
        <Stack gap={2}>
          <a href={"/dining-courts/" + name}>
            <h5>{name}</h5>
          </a>
          Courses:
          <br />
          <ul>{courses}</ul>
        </Stack>
      </div>
    </Container>
  );
}

export default DiningCourtCard;
