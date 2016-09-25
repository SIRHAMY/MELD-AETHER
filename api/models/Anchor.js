/**
 * Anchor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    hash: {
      type: 'string',
      primaryKey: true
    },
    hashValue: {
      type: 'integer'
    },
    target: {
      model: 'target'
    },
    parent: {
      model: 'folder'
    },
    masterDomain: {
      model: 'domain'
    },
    link: {
      type: 'string',
      required: true
    }

  }
};

