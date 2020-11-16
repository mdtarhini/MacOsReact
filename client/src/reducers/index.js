import { combineReducers } from "redux";
import {
  SET_IS_SMALL_SCREEN,
  SET_REQUESTING_SOMETHING,
} from "../actions/types";
import stockReducer from "../MiniApps/Stock/reducers";
import userReducer from "../User/reducers";
import dictReducer from "../MiniApps/Dictionary/reducers";
import notesReducer from "../MiniApps/Notes/reducers";
import remindersReducer from "../MiniApps/Reminders/reducers";
import messagesReducers from "../MiniApps/Messages/reducers";

const initialStateOfRequestingSomething = {
  fetchingNotes: false,
  addingNote: false,
  deletingNote: false,
  savingNote: false,
  fetchingReminderLists: false,
  addingReminderList: false,
  deletingReminderList: false,
  fetchingReminders: false,
  addingReminder: false,
  deletingReminder: false,
  editingReminder: false,
  deletingChat: false,
  fetchingMessages: false,
};
const requestingSomethingReducer = (
  state = initialStateOfRequestingSomething,
  action
) => {
  switch (action.type) {
    case SET_REQUESTING_SOMETHING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const smallScreenReducer = (state = false, action) => {
  switch (action.type) {
    case SET_IS_SMALL_SCREEN:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  smallScreen: smallScreenReducer,
  requestingSomething: requestingSomethingReducer,
  stockApp: stockReducer,
  user: userReducer,
  dict: dictReducer,
  notes: notesReducer,
  reminders: remindersReducer,
  messages: messagesReducers,
});
