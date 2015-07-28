'use strict';

var _ = require('lodash');
var Questions = require('./questions.model');

// Get list of questionss
exports.index = function(req, res) {
  Questions.find(function (err, questionss) {
    if(err) { return handleError(res, err); }
    return res.json(200, questionss);
  });
};

// Get a single questions
exports.show = function(req, res) {
  Questions.findById(req.params.id, function (err, questions) {
    if(err) { return handleError(res, err); }
    if(!questions) { return res.send(404); }
    return res.json(questions);
  });
};

// Creates a new questions in the DB.
exports.create = function(req, res) {
  Questions.create(req.body, function(err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(201, questions);
  });
};

// Updates an existing questions in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Questions.findById(req.params.id, function (err, questions) {
    if (err) { return handleError(res, err); }
    if(!questions) { return res.send(404); }
    var updated = _.merge(questions, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, questions);
    });
  });
};

// Deletes a questions from the DB.
exports.destroy = function(req, res) {
  Questions.findById(req.params.id, function (err, questions) {
    if(err) { return handleError(res, err); }
    if(!questions) { return res.send(404); }
    questions.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}