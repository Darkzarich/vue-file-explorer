const child = require('child_process');

module.exports = {
  listAvailableDrives: () => {
    const stdout = child.execSync('wmic logicaldisk get name');

    return stdout
      .toString()
      .split('\r\r\n')
      .filter((value) => /[A-Za-z]:/.test(value))
      .map((value) => value.trim());
  },
};
