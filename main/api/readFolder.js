const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const { READ_FOLDER } = require('./types');

module.exports.readFolder = async (event, props) => {
  try {
    const infoArray = [];
    const normalizedPath = path.resolve(path.normalize(props.path));
    const symLinks = await fsPromises.readdir(normalizedPath, {
      withFileTypes: true,
    });

    for (const file of symLinks) {
      const commonInfo = {
        name: file.name,
        extension: file.name.slice(file.name.lastIndexOf('.')),
      };

      try {
        const info = fs.statSync(path.join(normalizedPath, file.name));

        infoArray.push({
          ...commonInfo,
          folder: info.isDirectory(),
          ...info,
        });
      } catch (e) {
        // permission error when trying to get info
        if (e.code === 'EPERM') {
          infoArray.push({
            ...commonInfo,
            protected: true,
          });
        }
      }
    }

    event.reply(READ_FOLDER, {
      success: true,
      data: infoArray,
    });
  } catch (e) {
    console.error(e);
    event.reply(READ_FOLDER, {
      success: false,
      reason: `[main] ${e.message}`,
    });
  }
};
