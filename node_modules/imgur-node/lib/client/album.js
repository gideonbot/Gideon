const album = require('../endpoints/album');

class Album {
  constructor(client) {
    this.client = client;
  }

  get(albumID, callback) {
    album.get(this.client.clientID, albumID, callback);
  }

  create(options, callback) {
    album.create(this.client.append(options), callback);
  }

  update(options, callback) {
    album.update(this.client.append(options), callback);
  }

  delete(albumID, callback) {
    album.delete(this.client.append({ albumID: albumID }), callback);
  }

  favorite(albumID, callback) {
    album.favorite(this.client.append({ albumID: albumID }), callback);
  }

  getImages(albumID, callback) {
    album.getImages(this.client.clientID, albumID, callback);
  }

  setImages(albumID, imageIDs, callback) {
    let options = {
      albumID: albumID,
      ids: imageIDS
    };
    album.setImages(this.client.append(options), callback);
  }

  addImages(albumID, imageIDs, callback) {
    let options = {
      albumID: albumID,
      ids: imageIDS
    };
    album.addImages(this.client.append(options), callback);
  }

  removeImages(albumID, imageIDs, callback) {
    let options = {
      albumID: albumID,
      ids: imageIDS
    };
    album.removeImages(this.client.append(options), callback);
  }
}

module.exports = Album;
