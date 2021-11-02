/*
    preload.js
    Access Node.js from the renderer with a preload script
*/

// accesses the Node.js process.versions object and runs a basic
// replaceText helper function to insert the version numbers into the HTML document.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(
      `${dependency}-version`,
      process.versions[dependency]
    );
  }
});
