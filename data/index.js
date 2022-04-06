const IMAGE_URL = `https://unsplash.it/230/344?id=`

const CAROUSEL_DATA = ['', '', '', '', '', '', '', '']
  .map((data, key) => ['', '', '', '']
    .map((data, imageKey) => `${IMAGE_URL}${key}${imageKey}`))

export default CAROUSEL_DATA
