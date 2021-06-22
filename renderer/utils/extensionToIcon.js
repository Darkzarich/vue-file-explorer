export default (folderItem) => {
  if (folderItem.folder) {
    if (folderItem.protected) {
      return 'folder-protected-icon';
    }
    return 'folder-icon';
  }

  if (folderItem.protected) {
    return 'file-lock';
  }

  if (folderItem.name == '..') {
    return 'undo';
  }

  if (folderItem.drive) {
    return 'hdd';
  }

  switch (folderItem.extension.toLowerCase()) {
    case '.exe':
    case '.msi':
      return 'file-app';
    case '.png':
    case '.gif':
    case '.jpg':
    case '.svg':
    case '.jpeg':
    case '.bmp':
      return 'file-picture';
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.midi':
    case '.flac':
    case '.aac':
      return 'file-music';
    case '.mp4':
    case '.mov':
    case '.wmv':
    case '.avi':
    case '.flv':
    case '.mkv':
      return 'file-video';
    case '.txt':
    case '.log':
    case '.md':
    case '.rtf':
      return 'file-text';
    case '.pdf':
      return 'file-pdf';
    case '.conf':
    case '.ini':
    case '.cfg':
    case '.cf':
      return 'file-cog';
    default:
      return 'file-unknown';
  }
};
