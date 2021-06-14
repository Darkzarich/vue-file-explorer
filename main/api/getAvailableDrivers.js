const { listAvailableDrives } = require('../utils/windows');
const { GET_DISKS } = require('./types');

module.exports.getAvailableDrives = async (event) => {
  try {
    const disksArray = listAvailableDrives();

    event.reply(GET_DISKS, {
      success: true,
      data: disksArray,
    });
  } catch (e) {
    console.error(e);
    event.reply(GET_DISKS, {
      success: false,
      reason: `[main] ${e.message}`,
    });
  }
};
