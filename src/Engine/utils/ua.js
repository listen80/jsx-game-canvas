export const checkChromeVersion = (value) => {
  if (location.protocol === "file:") {
    return false
    // } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 86) {
    // alert('需要chrome最新浏览器')
  } else {
    return true;
  }
}

