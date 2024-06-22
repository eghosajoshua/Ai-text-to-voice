export let setWebString = (val) => {
  if ("AppInventor" in window) {
    window.AppInventor.setWebViewString(val);
  }
};

export let getWebString = () => {
  if ("AppInventor" in window) {
    return window.AppInventor.getWebViewString();
  } else {
    return "";
  }
};
