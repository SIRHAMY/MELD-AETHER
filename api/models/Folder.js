/**
 * Folder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      primaryKey: true
    },
    folders: {
      collection: 'folder',
      via: 'parent'
    },
    parent: {
      model: 'folder'
    },
    contents: {
      collection: 'anchor',
      via: 'parent'
    }
    
  }
};

