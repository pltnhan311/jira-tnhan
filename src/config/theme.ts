import type { ThemeConfig } from 'antd'

export const primaryColor = '#3a5a40'
// export const primaryColor = '#588157'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,

    colorWarning: '#fdb812',
    colorSuccess: '#10B981',
    borderRadius: 4,

    fontFamily: 'Lexend',
    fontWeightStrong: 400,

    colorPrimaryBg: 'rgba(0,0,0,0.05)'

    // motion: false,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      boxShadowSecondary: 'none'
    }
  }
}
