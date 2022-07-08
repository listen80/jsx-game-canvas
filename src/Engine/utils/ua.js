export const checkChromeVersion = (value) => {
  if (location.protocol === "file:") {
    return false
  } else if (!navigator.userAgentData.brands) {
    return false
  } else {
    return true;
  }
}
