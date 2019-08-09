const request = require('../request');

module.exports = {
  get: function(clientID, albumID, callback) {
    let args = {
      clientID: clientID,
      method: 'GET',
      path: `/album/${albumID}`
    };
    request(args, callback);
  },

  // options (Object)
  // options.clientID
  // options.accessToken
  // options.ids
  // options.title
  // options.description
  // options.privacy
  // options.layout
  // options.cover
  create: function(options, callback) {
    let args = {
      clientID: options.clientID,
      accessToken: options.accessToken,
      method: 'POST',
      path: '/album',
      data: {
        ids: options.ids,
        title: options.title,
        description: options.description,
        privacy: options.privacy,
        layout: options.layout
      }
    };
    if (options.cover) args.data.cover = options.cover;
    request(args, callback);
  },

  // options (Object)
  // options.clientID
  // options.accessToken
  // options.albumID || options.id
  // options.ids
  // options.title
  // options.description
  // options.privacy
  // options.layout
  // options.cover
  update: function(options, callback) {
    let albumID = options.albumID || options.id;
    let args = {
      clientID: options.clientID,
      accessToken: options.accessToken,
      method: 'PUT',
      path: `/album/${albumID}`,
      data: {
        ids: options.ids,
        title: options.title,
        description: options.description,
        privacy: options.privacy,
        layout: options.layout
      }
    };
    if (options.cover) args.data.cover = options.cover;
    request(args, callback);
  },

  // options (Object)
  // options.clientID
  // options.accessToken
  // options.albumID || options.id
  delete: function(options, callback) {
    let albumID = options.albumID || options.id;
    let args = {
      clientID: options.clientID,
      accessToken: options.accessToken,
      method: 'DELETE',
      path: `/album/${albumID}`
    };
    request(args, callback);
  },

  favorite: function(accessToken, albumID, callback) {
    let args = {
      accessToken: accessToken,
      method: 'POST',
      path: `/album/${albumID}/favorite`
    };
    request(args, callback);
  },

  getImages: function(clientID, albumID, callback) {
    let args = {
      clientID: clientID,
      method: 'GET',
      path: `/album/${albumID}/images`
    };
    request(args, callback);
  },

  // options (Object)
  // options.clientID
  // options.accessToken
  // options.albumID || options.id
  // options.ids
  setImages: function(options, callback) {
    let albumID = options.albumID || options.id;
    let args = {
      clientID: options.clientID,
      accessToken: options.accessToken,
      data: {
        ids: options.ids
      },
      method: 'POST',
      path: `/album/${albumID}`
    };
    request(args, callback);
  },

  // options (Object)
  // options.clientID
  // options.accessToken
  // options.albumID || options.id
  // options.ids
  addImages: function(options, callback) {
    let albumID = options.albumID || options.id;
    let args = {
      clientID: options.clientID,
      accessToken: options.accessToken,
      data: {
        ids: options.ids
      },
      method: 'PUT',
      path: `/album/${albumID}/add`
    };
    request(args, callback);
  },

  // options (Object)
  // options.clientID
  // options.accessToken
  // options.albumID || options.id
  // options.ids
  removeImages: function(options, callback) {
    let albumID = options.albumID || options.id;
    let args = {
      clientID: options.clientID,
      accessToken: options.accessToken,
      data: {
        ids: options.ids
      },
      method: 'DELETE',
      path: `/album/${albumID}/remove_images`
    };
    request(args, callback);
  }
};
