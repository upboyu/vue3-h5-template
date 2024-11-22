const useAppStore = defineStore(
  'app',
  {
    state: () => ({
      theme: {
        isThemeUsed: false,
      }
    }),
    actions: {
      setTheme(themeString) {
        themeString = themeString?.startsWith?.("#") ? themeString : '#4EFFF7,#2FC6F1'  // 默认颜色

        let theme = themeString.split(',')
        theme[1] = theme[1] || theme[0] // 兼容单色非渐变theme
        this.theme = {
          isThemeUsed: true,
          background: [theme[0], theme[1]],
          success: [theme[0], theme[1], mixColors(theme[0], theme[1]), '#2f3036'], // 渐变1，渐变2，提示框标题，提示框文字
          error: ['#FFF868', '#EFC247', '#f8be28', '#666666']
        }

        document.documentElement.style.setProperty('--theme-background-color1', this.theme.background[0])
        document.documentElement.style.setProperty('--theme-background-color2', this.theme.background[1])
        document.documentElement.style.setProperty('--theme-success-color1', this.theme.success[0])
        document.documentElement.style.setProperty('--theme-success-color2', this.theme.success[1])
        document.documentElement.style.setProperty('--theme-success-title', this.theme.success[2])
        document.documentElement.style.setProperty('--theme-success-text', this.theme.success[3])
        document.documentElement.style.setProperty('--theme-error-color1', this.theme.error[0])
        document.documentElement.style.setProperty('--theme-error-color2', this.theme.error[1])
        document.documentElement.style.setProperty('--theme-error-title', this.theme.error[2])
        document.documentElement.style.setProperty('--theme-error-text', this.theme.error[3])

      }
    }
  })

export default useAppStore
