function getImage () {
  fetch('http://localhost:3000/images')
    .then(res => res.json())
    .then(images => {
      var list = document.getElementById('testing');

      for (let im of images) {
        var newList = document.createElement('li');

        var newImg = document.createElement('img');
        newImg.id = im.id;
        newImg.src = im.src;
        newImg.alt = im.caption;

        var newCaption = document.createElement('LABEL');
        newCaption.innerHTML = ' ' + im.caption;

        newList.append(newImg);
        newList.append(newCaption);
        list.append(newList);
      }
    });
}
getImage();
