// script will run after DOM is ready due to defer attribute
export async function optimizeMaterialIcons() {
  //  check local storage for icons to append into the material symbols cdn link which will speed up loads for people who have already loaded the page
  const storedIcons = localStorage.getItem("materialIcons");

  const defaultLink =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

  const linkElement = document.getElementById("material-symbols-link");
  let alreadyLoadedIcons = [];
  if (linkElement) {
    const currentHref = linkElement.getAttribute("href");
    const iconNamesMatch = currentHref.match(/&icon_names=([^&]+)/);
    if (iconNamesMatch) {
      alreadyLoadedIcons = iconNamesMatch[1].split(",");
    }
  }

  let materialSymbolsLink = defaultLink;

  // start with icons hard coded in the cdn link
  let allIcons = [...alreadyLoadedIcons];

  // append any new icons found in local storage
  if (storedIcons) {
    try {
      const parsedIcons = JSON.parse(storedIcons);
      if (parsedIcons && parsedIcons.length > 0) {
        // only add stored icons that aren't already in the HTML
        parsedIcons.forEach((icon) => {
          if (!allIcons.includes(icon)) {
            allIcons.push(icon);
          }
        });
      }
    } catch (e) {}
  }

  // create the final cdn link with all icons
  if (allIcons.length > 0) {
    const iconNamesString = allIcons.join(",");
    materialSymbolsLink = `${defaultLink}&icon_names=${iconNamesString}`;
  }

  // create or update the material symbols link element
  if (!linkElement) {
    const newLinkElement = document.createElement("link");
    newLinkElement.id = "material-symbols-link";
    newLinkElement.rel = "stylesheet";
    document.head.appendChild(newLinkElement);
  }

  linkElement.href = materialSymbolsLink;

  // get all the icon names from the dom
  const iconNames = new Set();

  // find all elements with the class "material-icon"
  const iconElements = document.querySelectorAll(".material-icon");
  console.log("Found", iconElements.length, "material-icon elements");

  iconElements.forEach((iconElement) => {
    // get icon name from the text content of the element
    const iconName = iconElement.textContent.trim();
    if (iconName) {
      iconNames.add(iconName);
      console.log("Found icon:", iconName);
    }
  });

  // check if any icon names were found
  if (iconNames.size === 0) {
    return;
  }

  // sort the icon names alphabetically to avoid because we get a 404 if we don't
  const sortedIconNames = [...iconNames].sort();
  const iconNamesString = sortedIconNames.join(",");

  // Check if we have new icons that aren't already loaded
  const newIcons = sortedIconNames.filter(
    (icon) => !alreadyLoadedIcons.includes(icon)
  );
  console.log("New icons found:", newIcons);

  // store the found icons in local storage
  localStorage.setItem("materialIcons", JSON.stringify(sortedIconNames));

  // only update the link if we have new icons
  if (newIcons.length > 0) {
    if (linkElement) {
      const newHref = `${defaultLink}&icon_names=${iconNamesString}`;
      console.log("Updating CDN link to:", newHref);

      // remove the old link
      linkElement.remove();

      // create and append the new link to trigger CDN fetch
      const newLinkElement = document.createElement("link");
      newLinkElement.id = "material-symbols-link";
      newLinkElement.rel = "stylesheet";
      newLinkElement.href = newHref;
      document.head.appendChild(newLinkElement);
    }
  }
}
