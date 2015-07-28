/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Questions = require('./questions.model');

exports.register = function(socket) {
  Questions.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Questions.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('questions:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('questions:remove', doc);
}