const templates = {
  desktop: {
    url: 'kagawagao/cha#desktop'
  },
  mobile: {
    url: 'kagawagao/cha#mobile'
  }
}

const getTemplate = (type) => {
  return templates[type]
}

export default getTemplate
