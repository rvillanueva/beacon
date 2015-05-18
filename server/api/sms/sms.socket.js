/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var sms = require('./sms.model');

exports.register = function(socket) {
  sms.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  sms.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sms:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sms:remove', doc);
}
