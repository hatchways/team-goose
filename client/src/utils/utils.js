export const copyToClipboard = (text) => {
  // source: https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};
