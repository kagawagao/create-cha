const templates = {
  desktop: {
    url: 'https://codeload.github.com/kagawagao/cha/zip/desktop'
  },
  mobile: {
    url: 'https://codeload.github.com/kagawagao/cha/zip/mobile'
  }
}

const getTemplate = (type) => {
  return templates[type]
}

module.exports = getTemplate
