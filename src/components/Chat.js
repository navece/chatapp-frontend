import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {
  gql,
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { Input, Button } from "semantic-ui-react";
import {
  MyList,
  MyMessage,
  MyMsg,
  MyListItem,
  MyDiv,
  MySendMessageInput,
  MySendMessageForm,
} from "./styledComponents";
import dayjs from "dayjs";

const GET_MESSAGE = gql`
  query getMessage($username: String!) {
    getMessage(username: $username) {
      uuid
      sender
      recipient
      content
      createdat
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($recipient: String!, $content: String!) {
    sendMessage(recipient: $recipient, content: $content) {
      uuid
      createdat
    }
  }
`;

const GET_NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      sender
      recipient
      content
      createdat
    }
  }
`;

export default function Chat({ match }) {
  const token = localStorage.getItem("token");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const { username } = jwt.decode(token);
  const [getMessage] = useLazyQuery(GET_MESSAGE, {
    onCompleted(data) {
      setState(data.getMessage);
      setLoading(false);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted(data) {
      console.log(data);
    },
  });

  useSubscription(GET_NEW_MESSAGE, {
    onSubscriptionData(data) {
      setState([...state, data.subscriptionData.data.newMessage]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ variables: { recipient: match.params.id, content: msg } });
    setMsg("");
  };

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    getMessage({ variables: { username: match.params.id } });
  }, [match.params.id, state]);

  let currDate;
  let prevDate;

  if (!loading) {
    return (
      <MyDiv>
        <MyList>
          {state.map((message) => {
            let dt = false;
            currDate = dayjs(new Date(parseInt(message.createdat))).format(
              "MMM D, YYYY"
            );
            if (currDate !== prevDate) {
              console.log(currDate, prevDate);
              dt = true;
            }
            prevDate = currDate;
            if (dt) {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "lavender",
                  }}
                  key={currDate}
                >
                  {currDate}
                </div>
              );
            }
            if (message.sender === username) {
              return (
                <MyMessage key={message.uuid}>
                  <MyMsg>
                    <p>
                      {message.content}{" "}
                      <span style={{ fontSize: 12 }}>
                        {dayjs(message.createdat).format("h:mm A")}
                      </span>
                    </p>
                  </MyMsg>
                </MyMessage>
              );
            } else {
              return (
                <MyListItem key={message.uuid}>
                  <MyMsg>
                    <p>
                      {message.content}{" "}
                      <span style={{ fontSize: 12 }}>
                        {dayjs(message.createdat).format("h:mm A")}
                      </span>
                    </p>
                  </MyMsg>
                </MyListItem>
              );
            }
          })}
        </MyList>
        <MySendMessageForm onSubmit={handleSubmit}>
          <Input
            style={{
              width: "80%",
            }}
          >
            <MySendMessageInput value={msg} onChange={handleChange} />
          </Input>
          <Button
            onClick={handleSubmit}
            style={{ marginRight: 10 }}
            size="huge"
            circular
            icon="send"
          />
        </MySendMessageForm>
      </MyDiv>
    );
  } else {
    return <h5>loading...</h5>;
  }
}
