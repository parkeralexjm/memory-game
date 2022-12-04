const importImages = (r) => {
  let images = [];
  r.keys().forEach((item, index) => {
    let char = {
      name: item.replace('./', '').replace('.png', ''),
      image: r(item)
    };
    images.push(char)
  });
  return images
}

export default importImages;