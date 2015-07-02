/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./mission.model');

exports.register = function(socket) {
  request.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  request.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('request:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('request:remove', doc);
}
