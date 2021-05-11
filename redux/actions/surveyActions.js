/* eslint-disable no-console */
import axios from 'axios';
import { NEW_FIELD_VISIT, UPDATE_ENTRY, SAVE_SURVEY } from './actionTypes';

// creek_name: string, team_lead: string, team_members: string[]
export const initializeFieldVisit = (creekName, teamLead, teamMembers) => (dispatch) => {
  const volunteers = {
    creekName,
    teamLead,
    teamMembers,
  };
  axios.post('http://localhost:3001', volunteers)
    .then((response) => {
      console.log(response);
      return dispatch({
        type: NEW_FIELD_VISIT,
        payload: {
          response,
        },
      });
    });
};

export const updateEntry = () => (dispatch) => {
  
}
