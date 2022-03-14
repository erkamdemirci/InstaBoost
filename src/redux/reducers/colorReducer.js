import { UPDATE_COLOR_THEME } from '../actions/types';

const darkThemeColors = {

  statusBar: 'light-content',

  red: '#FF3B30',
  pink: '#FF2D55',
  green: '#4CD964',
  yellow: '#fffa65',
  orange: '#FF9500',
  black: '#000',
  white: '#fff',

  screenBackground: '#1D1D33',

  bottomTabBackground: '#1D1D33',
  bottomTabActiveTint: '#FCC449',
  bottomTabPassiveTint: '#C7EEE1',
  bottomTabProfileBorder: '#fff',

  loadingControl: '#fff',

  dataCantLoadTitle: '#4CD964',
  dataCantLoadDesc: '#fff',

  navbarTintTheme: '#fff',
  navbarTintAntiTheme: '#1D1D33',

  linearGradientDark: '#25253E',
  linearGradientLight: '#32324E',

  coinText: '#fffa65',

  headerTitle: '#a0eccd',
  headerDesc: '#fff',

  themeBlue: '#6E6BF2',
  themeBlue2: '#4549FD',

  themeSide1Dark: '#FFB000',
  themeSide1Soft: '#FCC449',

  themeSide2Dark: '#F40037',
  themeSide2Soft: '#FF6F90',

  themeSide3Dark: '#A034E3',
  themeSide3Soft: '#CA84F5',

  rowShadow:'#000',
  rowArrow: '#fff',
  switchButtonActive: '##4CD964',
  switchButtonPassive: 'gray',

  likeMain: '#F40037',
  followMain: '#FFB000',
  commentMain: '#A034E3',
  collectionMain: '#CA84F5',
  videoAdMain: '#FF6F90',

  profileName: '#fff',
  profileUsername: '#8E8E93',
  profileNumberTitles: '#C7C7CC',
  profileNumbers: '#fff',
  profileDesc: '#fff',

  profileModalBackground: '#000',
  profileModalDesc: '#fff',
  profileModalCarouselBackground: '#fff',
  profileModalCarouselTitle: '#8E8E93',
  profileModalCarouselCoinBackground: '#535c68',

  historyTopTabBackground: '#1D1D33',
  historyTopTabActiveTint: '#1D1D33',
  historyTopTabPassiveTint: '#fff',
  historyTopTabActiveBackground: '#FCC449',

  historyRowUncomplete: '#a0eccd',
  historyRowComplete: '#4CD964',
  historyTypeIconTint: '#a0eccd',
  historyRowShadowColor: '#000',

  historyCommentTitle: '#4CD964',
  historyCommentDesc: '#81d4b4',

  historyModalTitleIconTint: '#FF2D55',
  historyModalTitleBackground: '#1D1D33',
  historyModalBackground: '#fff',
  historyModalText: '#fff',
  historyModalConfirmButtonBackground: '#4CD964',
  historyModalConfirmButton: '#fff',
  historyModalCancelButtonBackground: '#FF3B30',
  historyModalCancelButton: '#fff',

  actionTabTitle: '#fff',
  actionTabDesc: '#fff',
  actionTabHeaderTextShadow: '#4549FD',
  actionTabShopBackground: '#fffa65',
  actionTabShopTint: '#1D1D33',
  actionTabRowDesc: '#fff',
  actionTabBackground: '#1D1D33',


  earnFollowName: '#fff',
  earnFollowUsername: '#C7EEE1',
  earnFollowLockedLabel: '#fff',
  earnFollowButtonBackground: '#1D1D33',
  earnFollowButtonTitle: '#fff',
  earnFollowButtonBorder: '#fff',

  earnCommentName: '#fff',
  earnCommentUsername: '#C7EEE1',
  earnCommentText: '#fff',
  earnCommentButtonBackground: '#1D1D33',
  earnCommentButtonTitle: '#fff',
  earnCommentButtonBorder: '#fff',
  earnCommentIconTint: '#C7EEE1',

  spendHeaderBackground: '#000',
  spendButtonBackground: '#4CD964',
  spendButtonTitle: '#fff',
  spendInputTitleLabel: '#fff',
  spendInputActive: '#fff',
  spendInputPassive: '#C7EEE1',

  spendCommentRowBackground: '#000',
  spendCommentAdd: '#fff',

  notificationsText: '#fff',
  notificationsDate: '#8E8E93',

  settingsRowBackground: '#1D1D33',
  settingsRowTitle: '#8E8E93',
  settingsRowDesc: '#fff',

  backupAccountInputActive: '#fff',
  backupAccountInputPassive: '#95afc0',
  backupAccountInputText: '#fff',
  backupAccountBackground: '#25253E',
  backupAccountButtonBackground: '#4CD964',
  backupAccountButtonText: '#fff',
}

const lightThemeColors = {
  statusBar: 'dark-content',

  red: '#FF3B30',
  pink: '#FF2D55',
  green: '#4CD964',
  yellow: '#fffa65',
  orange: '#FF9500',
  black: '#000',
  white: '#fff',

  screenBackground: '#dff9fb',

  bottomTabBackground: '#1D1D33',
  bottomTabActiveTint: '#FCC449',
  bottomTabPassiveTint: '#bdc3c7',
  bottomTabProfileBorder: '#fff',

  loadingControl: '#1D1D33',

  dataCantLoadTitle: '#4CD964',
  dataCantLoadDesc: '#535c68',

  navbarTintTheme: '#535c68',
  navbarTintAntiTheme: '#fff',

  linearGradientDark: '#D9F3F4',
  linearGradientLight: '#D9F3F4',

  coinText: '#4CD964',

  headerIconTint: '#535c68',
  headerTitle: '#535c68',
  headerDesc: '#95afc0',

  themeBlue: '#6E6BF2',
  themeBlue2: '#4549FD',

  themeSide1Dark: '#FFB000',
  themeSide1Soft: '#FCC449',

  themeSide2Dark: '#F40037',
  themeSide2Soft: '#FF6F90',

  themeSide3Dark: '#A034E3',
  themeSide3Soft: '#CA84F5',

  rowShadow:'#535c68',
  rowArrow: '#535c68',
  switchButtonActive: '#4CD964',
  switchButtonPassive: 'lightgray',

  likeMain: '#F40037',
  followMain: '#FFB000',
  commentMain: '#A034E3',
  collectionMain: '#CA84F5',
  videoAdMain: '#FF6F90',

  profileName: '#000',
  profileUsername: '#8E8E93',
  profileNumberTitles: '#95a5a6',
  profileNumbers: '#000',
  profileDesc: '#000',

  profileModalBackground: '#000',
  profileModalDesc: '#fff',
  profileModalCarouselBackground: '#dff9fb',
  profileModalCarouselTitle: '#8E8E93',
  profileModalCarouselCoinBackground: '#fff',

  historyTopTabBackground: '#1D1D33',
  historyTopTabActiveTint: '#fff',
  historyTopTabPassiveTint: '#95afc0',
  historyTopTabActiveBackground: '#95afc0',

  historyRowUncomplete: '#535c68',
  historyRowComplete: '#4CD964',
  historyTypeIconTint: '#535c68',

  historyCommentTitle: '#4CD964',
  historyCommentDesc: '#81d4b4',

  historyModalTitleIconTint: '#FF2D55',
  historyModalTitleBackground: '#1D1D33',
  historyModalBackground: '#fff',
  historyModalText: '#fff',
  historyModalConfirmButtonBackground: '#4CD964',
  historyModalConfirmButton: '#fff',
  historyModalCancelButtonBackground: '#FF3B30',
  historyModalCancelButton: '#fff',

  actionTabTitle: '#fff',
  actionTabDesc: '#fff',
  actionTabHeaderTextShadow: '#4549FD',
  actionTabShopBackground: '#fffa65',
  actionTabShopTint: '#1D1D33',
  actionTabRowDesc: '#000',
  actionTabBackground: '#dff9fb',


  earnFollowName: '#535c68',
  earnFollowUsername: '#95a5a6',
  earnFollowLockedLabel: '#fff',
  earnFollowButtonBackground: '#D9F3F4',
  earnFollowButtonTitle: '#535c68',
  earnFollowButtonBorder: '#535c68',

  earnCommentName: '#535c68',
  earnCommentUsername: '#95a5a6',
  earnCommentText: '#535c68',
  earnCommentButtonBackground: '#D9F3F4',
  earnCommentButtonTitle: '#535c68',
  earnCommentButtonBorder: '#535c68',
  earnCommentIconTint: '#535c68',

  spendHeaderBackground: '#D9F3F4',
  spendButtonBackground: '#4CD964',
  spendButtonTitle: '#fff',
  spendInputTitleLabel: '#535c68',
  spendInputActive: '#535c68',
  spendInputPassive: '#95afc0',

  spendCommentRowBackground: '#000',
  spendCommentAdd: '#fff',

  notificationsText: '#000',
  notificationsDate: '#8E8E93',

  settingsRowBackground: '#1D1D33',
  settingsRowTitle: '#535c68',
  settingsRowDesc: '#95afc0',

  backupAccountInputActive: '#000',
  backupAccountInputPassive: '#95afc0',
  backupAccountInputText: '#000',
  backupAccountBackground: '#fff',
  backupAccountButtonBackground: '#4CD964',
  backupAccountButtonText: '#fff',

  
}

const initialState = {
  themeColors: lightThemeColors,
  isDark: false
}

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLOR_THEME:
      return {
        themeColors: action.isDark ? darkThemeColors : lightThemeColors,
        isDark: action.isDark
      };
    default:
      return state;
  }
}

export default colorReducer;