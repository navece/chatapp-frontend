import styled from "styled-components";
import { Button, List, ListItem } from "semantic-ui-react";

export const Mycontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const MyformContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #d6e5e3;
`;

export const MyFormHeader = styled.div`
  height: 30%;
  background: #476c9b;
  border-radius: 0% 0% 50% 0%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyFormBody = styled.div`
  padding: 20px;
  height: 70%;
`;

export const MyInput = styled.input`
  border-radius: 40px !important;
`;

export const MyButton = styled(Button)`
  background: #476c9b !important;
  color: black !important;
`;

export const MyList = styled(List)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  overflow-y: scroll;
  height: 85vh;
`;

export const MyMessage = styled(ListItem)`
  display: flex !important;
  justify-content: flex-end;
`;

export const MyListItem = styled(ListItem)`
  display: flex !important;
  justify-content: flex-start;
`;

export const MyMsg = styled.div`
  background: #4c9f70;
  height: 30px;
  border-radius: 20px;
  display: flex;
  padding: 10px;
  align-items: center;
  font-size: 20px;
`;

export const MyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  height: 90vh;
  background: #283845;
`;
export const MySendMessageForm = styled.form`
  width: 95%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const MySendMessageInput = styled.input`
  border-radius: 30px !important;
  border-color: grey !important;
`;
