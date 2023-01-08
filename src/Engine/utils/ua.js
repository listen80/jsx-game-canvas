export const checkRunTime = () => {
  if (location.protocol === "file:" && navigator.userAgentData) {
    return false;
  } else {
    return true;
  }
};
