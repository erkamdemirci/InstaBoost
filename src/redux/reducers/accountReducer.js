import { CHANGE_CURRENT_ACCOUNT, LOGIN_BACKUP_ACCOUNT, SET_ORIGINAL_ACCOUNT } from '../actions/types';

const initialState = {
  currentAccount: null,
  originalAccount: null,
  backupAccount: null,
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_ACCOUNT:
      return {
        ...state,
        currentAccount: action.currentAccount
      };
    case LOGIN_BACKUP_ACCOUNT:
      return {
        ...state,
        currentAccount: action.backupAccount,
        backupAccount: action.backupAccount
      };
    case SET_ORIGINAL_ACCOUNT:
      return {
        ...state,
        currentAccount: action.originalAccount,
        originalAccount: action.originalAccount
      };
    default:
      return state;
  }
}

export default accountReducer;