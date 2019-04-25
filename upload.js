/* globals MinIO, fetch, FileReader */

const protocol = 'http://';
const baseURL = 'localhost';
const jsonServerPort = ':3000';
const minioPort = ':9000';

const client = new MinIO.Client({
  endPoint: baseURL,
  port: parseInt(minioPort.replace(':', ''), 10),
  useSSL: protocol.includes('s'),
  accessKey: 'KEY',
  secretKey: 'SECRET'
});

document.getElementById('uploadImage').addEventListener('submit', function (event) {
  event.preventDefault();

  let file = this.querySelector('[name="image"]').files[0];
  let caption = this.querySelector('[name="caption"]').value;
  let type = file.type;
  let fileName = file.name;
  console.log(fileName, type);

  const reader = new FileReader();

  reader.onload = function (evt) {
    const fileData = evt.target.result;

    client.putObject('images', fileName, fileData, {
      'Content-Type': type
    }, function (err, etag) {
      console.log(err, etag);
    });

    fetch(protocol + baseURL + jsonServerPort + '/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        src: protocol + baseURL + minioPort + '/images/' + fileName,
        caption: caption
      })
    });
  };
  reader.readAsBinaryString(file);
});
