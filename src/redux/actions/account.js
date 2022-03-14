import { CHANGE_CURRENT_ACCOUNT, LOGIN_BACKUP_ACCOUNT, SET_ORIGINAL_ACCOUNT } from './types';

export const changeCurrentAccount = (currentAccount) => (
  {
    type: CHANGE_CURRENT_ACCOUNT,
    currentAccount: currentAccount
  }
);

export const loginBackupAccount = (backupAccount) => (
  {
    type: LOGIN_BACKUP_ACCOUNT,
    backupAccount: backupAccount
  }
);

export const setOriginalAccount = (originalAccount) => (
  {
    type: SET_ORIGINAL_ACCOUNT,
    originalAccount: originalAccount
  }
);


