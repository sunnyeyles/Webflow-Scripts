window.onload = async function () {
  //  check local store for icons object to append into the material symbols link.

  // create material symbols link useing default link + anything found in local store (if found)
  //  if no icons found in local store, use the default link

  //  if icons found in local store, use the default link + the icons found in local store

  //  if icons found in local store, use the default link + the icons found in local store

  // after the dom loads run the below function but change it to store the icons in local store and remove / readd the material symbols link so that it addes the icons to the link

  const iconNames = new Set();

  // find all elements with the class "material-icon"
  const iconElements = document.querySelectorAll(".material-icon");

  iconElements.forEach((iconElement) => {
    // get icon name from the text content of the element
    const iconName = iconElement.textContent.trim();
    if (iconName) {
      //   console.log("iconName", iconName);
      iconNames.add(iconName);
    }
  });

  // check if any icon names were found
  if (iconNames.size === 0) {
    document.body.classList.add("buttons-ready"); // show buttons anyway
    return;
  }

  // sort the icon names alphabetically (to avoid 404s)
  const sortedIconNames = [...iconNames].sort();
  const iconNamesString = sortedIconNames.join(",");

  // get the material symbols link
  const linkElement = document.getElementById("material-symbols-link");

  if (linkElement) {
    const existingHref = linkElement.getAttribute("href");
    const newHref = `${
      existingHref.split("&icon_names=")[0]
    }&icon_names=${iconNamesString}`;
    linkElement.setAttribute("href", newHref);

    try {
      // wait for the font to load (1.5s max)
      await Promise.race([
        document.fonts.load(`1em 'Material Symbols Outlined'`),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    } catch (e) {
      console.warn("Font load timed out, showing buttons anyway.");
    }
  } else {
    console.error("CDN link not found");
  }

  // reveal all buttons once ready
  document.body.classList.add("buttons-ready");
};
