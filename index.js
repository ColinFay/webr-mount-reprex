
const fs = require('fs');
const path = require('path');
const { WebR } = require('webr');
const webR = new WebR();

(async () => {

  await webR.init();

  const data = new Blob(
    fs.readFileSync(
      path.join(__dirname, 'iris.data')
    )
  );

  console.log(data)

  const metadata = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'iris.js.metadata')
    )
  );

  console.log(metadata)

  await webR.FS.mkdir('/data');

  const options = {
    packages: [{
      blob: await data,
      metadata: await metadata,
    }],
  }
  await webR.FS.mount("WORKERFS", options, '/data');

  process.exit(1);

})();