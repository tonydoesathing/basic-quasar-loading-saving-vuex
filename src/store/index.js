import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* const errorHandler = function (fileName, e) {
  let msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'Storage quota exceeded';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'File not found';
      break;
    case FileError.SECURITY_ERR:
      msg = 'Security error';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Invalid modification';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'Invalid state';
      break;
    default:
      msg = 'Unknown error';
      break;
  }
  console.log(`Error (${fileName}): ${msg}`);
}; */

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

function writeFileAndRead(fileEntry, dataObj) {
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

function writeFile(fileEntry, dataObj) {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter((fileWriter) => {
      fileWriter.onwriteend = function () {
        resolve();
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

document.addEventListener('deviceready', () => {
  /* resolveLocalFileSystemURL(cordova.file.dataDirectory)
    .then((result) => {
      // returns the data directory
      console.log('data directory');
      console.log(result);
      return result;
    })
    .then((result) => {
      // check for things directory, create if not there
      console.log('getting things directory, creating if not exist');
      return getDirectory(result, 'Things', { create: true });
    })
    .then((result) => {
      console.log('got Things directory');
      console.log(result);
      return result;
    })
    .then((result) => {
      console.log('getting Things file, creating if not exist');
      return getFile(result, 'Things.json', { create: true });
    })
    .then((result) => {
      console.log('got Things file');
      return result;
    })
    .then((result) => {
      console.log('reading Things file');
      return readFile(result);
    })
    .then((result) => {
      console.log('contents of file:');
      console.log(result.result);
      return result;
    })
    .then((result) => {
      console.log('checking if it is empty; if it is, writing blank obj, if not, return text');
      if (result.result === '') {
        console.log('file is empty');
        console.log('writing new Things object');
        return writeFile(result.fileEntry, { Things: [] });
      }
      console.log('file has stuff');
      return result;
    })
    .then((result) => {
      console.log('contents of file:');
      console.log(result.result);
      return result;
    })
    .then((result) => {
      console.log('converting Things into object');
      return {
        fileEntry: result.fileEntry,
        result: JSON.parse(result.result),
      };
    })
    .then((result) => {
      console.log('Things object:');
      console.log(result.result);
      return result;
    })
    .then((result) => {
      console.log('Append value to Things array and save');
      result.result.Things.push('Meow');
      return writeFile(result.fileEntry, result.result);
    })
    .then((result) => {
      console.log('resulting file:');
      console.log(result.result);
      return result;
    })
    .then((result) => {
      console.log('parsing to object');
      return parseResult(result);
    })
    .then((result) => {
      console.log(result.result);
      return result;
    }); */
  //  listDir(cordova.file.dataDirectory);
  /* function writeToFile(fileName, data) {
    data = JSON.stringify(data, null, '\t');
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (directoryEntry) => {
      directoryEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
        console.log(fileEntry);
      }, errorHandler.bind(null, fileName));
      console.log(data);
      console.log(directoryEntry);
    }, errorHandler.bind(null, fileName));
  }

  writeToFile('example.json', { foo: 'bar' }); */
}, false);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      posts: ['Post1', 'Post2'],
      loadedFiles: false,
    },
    mutations: {
      addPost(state, post) {
        state.posts.push(post);
      },
      setPosts(state, posts) {
        state.posts = posts;
        console.log(posts);
      },
      setLoadedFiles(state, loadedStatus) {
        state.loadedFiles = loadedStatus;
      },
    },
    actions: {
      addPost: (context, post) => {
        return new Promise((resolve, reject) => {
          if (context.state.loadedFiles) {
            console.log('trying to add post');
            resolveLocalFileSystemURL(cordova.file.dataDirectory)
              .then((result) => {
                // returns the data directory
                console.log('data directory');
                console.log(result);
                return result;
              })
              .then((result) => {
                // check for things directory, create if not there
                console.log('getting things directory, creating if not exist');
                return getDirectory(result, 'Things', { create: true });
              })
              .then((result) => {
                console.log('got Things directory');
                console.log(result);
                return result;
              })
              .then((result) => {
                console.log('getting Things file, creating if not exist');
                return getFile(result, 'Things.json', { create: false });
              })
              .then((result) => {
                console.log('got Things file');
                console.log(result);
                return result;
              })
              .then((result) => {
                context.commit('addPost', post);
                return writeFile(result, context.state.posts);
              })
              .then(() => {
                resolve(post);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject(new Error('Files have not loaded'));
          }
        });
      },
      loadFiles: (context) => {
        return new Promise((resolve, reject) => {
          document.addEventListener('deviceready', () => {
            resolveLocalFileSystemURL(cordova.file.dataDirectory)
              .then((result) => {
                // returns the data directory
                console.log('data directory');
                console.log(result);
                return result;
              })
              .then((result) => {
                // check for things directory, create if not there
                console.log('getting things directory, creating if not exist');
                return getDirectory(result, 'Things', { create: true });
              })
              .then((result) => {
                console.log('got Things directory');
                console.log(result);
                return result;
              })
              .then((result) => {
                console.log('getting Things file, creating if not exist');
                return getFile(result, 'Things.json', { create: true });
              })
              .then((result) => {
                console.log('got Things file');
                return result;
              })
              .then((result) => {
                console.log('reading Things file');
                return readFile(result);
              })
              .then((result) => {
                console.log('contents of file:');
                console.log(result.result);
                return result;
              })
              .then((result) => {
                console.log('checking if it is empty; if it is, writing blank obj, if not, return text');
                if (result.result === '') {
                  console.log('file is empty');
                  console.log('writing new Things object');
                  return writeFileAndRead(result.fileEntry, JSON.stringify([]));
                }
                console.log('file has stuff');
                return result;
              })
              .then((result) => {
                console.log('contents of file:');
                console.log(result.result);
                return result;
              })
              .then((result) => {
                console.log('converting Things into object');
                return parseResult(result);
              })
              .then((result) => {
                console.log('Things object:');
                console.log(result.result);
                return result;
              })
              .then((result) => {
                context.commit('setPosts', result.result);
                context.commit('setLoadedFiles', true);
                resolve();
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    },
  });

  return Store;
}
