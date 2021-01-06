import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { List, Image, ListItem, Button } from "semantic-ui-react";
import { MyList, MyDiv } from "./styledComponents";
import matthew from "../img/matthew.png";
import { Link } from "react-router-dom";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
    }
  }
`;

export default function Home() {
  const [users, setUsers] = useState([]);
  useQuery(GET_USERS, {
    onCompleted(data) {
      setUsers(data.getUsers);
    },
  });
  const handleClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  if (users.length > 0) {
    return (
      <MyDiv>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClick}>Logout</Button>
        </div>
        <MyList size="huge">
          {users.map((user) => {
            return (
              <ListItem key={user.username}>
                <Image avatar src={matthew} />
                <List.Content>
                  <Link to={`/${user.username}`}>
                    <List.Header style={{ color: "#4c9f70" }}>
                      {user.username}
                    </List.Header>
                  </Link>
                </List.Content>
              </ListItem>
            );
          })}
        </MyList>
      </MyDiv>
    );
  } else {
    return <h6>Loading...</h6>;
  }
}
