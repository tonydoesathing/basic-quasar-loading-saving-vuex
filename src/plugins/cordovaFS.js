/*
for some fucking dumbass reason the import of this works the first time
but not anytime after that. I have absolutely no fucking clue why and
it pisses me the fuck off but oh well
*/

function resolveLocalFileSystemURL(path) {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(path, (fileSystem) => {
      resolve(fileSystem);
    }, (err) => {
      reject(err);
    });
  });
}

function getDirectory(directory, path, options) {
  return new Promise((resolve, reject) => {
    directory.getDirectory(path, options, (dir) => {
      resolve(dir);
    }, (err) => {
      err = {
        directory,
        error: err,
      };
      reject(err);
    });
  });
}


/* returns a fileEntry to be used in readFile or writeFile */

function getFile(directory, path, options) {
  return new Promise((resolve, reject) => {
    directory.getFile(path, options, (file) => {
      resolve(file);
    }, (err) => {
      err = {
        directory,
        error: err,
      };
      reject(err);
    });
  });
}


/* returns text of file */

function readFile(fileEntry) {
  return new Promise((resolve, reject) => {
    fileEntry.file((file) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve({
          fileEntry,
          result: this.result,
        });
      };
      reader.readAsText(file);
    }, (err) => {
      err.fileEntry = fileEntry;
      reject(err);
    });
  });
}

/* returns read text of saved file */

function writeFile(fileEntry, dataObj) {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter((fileWriter) => {
      fileWriter.onwriteend = function () {
        resolve(readFile(fileEntry));
      };

      fileWriter.onerror = function (e) {
        e = {
          fileEntry,
          dataObj,
          error: e,
        };
        reject(e);
      };

      if (!dataObj) {
        dataObj = '';
      }

      fileWriter.write(dataObj);
    }, (err) => {
      err.fileEntry = fileEntry;
      err.dataObj = dataObj;
      reject(err);
    });
  });
}

function parseResult(result) {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        fileEntry: result.fileEntry,
        result: JSON.parse(result.result),
      });
    } catch (e) {
      e.fileEntry = result.fileEntry;
      e.result = result.result;
      reject(e);
    }
  });
}

export default {
  resolveLocalFileSystemURL,
  readFile,
  writeFile,
  getFile,
  getDirectory,
  parseResult,
};
