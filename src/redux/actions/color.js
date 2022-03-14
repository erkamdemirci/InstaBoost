import { UPDATE_COLOR_THEME } from './types';

export const updateColorTheme = (isDark) => (
  {
    type: UPDATE_COLOR_THEME,
    isDark: isDark
  }
);
