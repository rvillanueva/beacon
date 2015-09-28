'use strict';

angular.module('heroesApp')
  .filter('userFilter', function () {
    return function (users, availability, searchedTag) {

      var filtered = [];
      var checkTag = function(user){

        if(searchedTag){
          var found = false;
          if(!user.traits){
            user.traits = {}
          }
          if(!user.traits.tags){
            user.traits.tags = []
          }
          for (var i = 0; i < user.traits.tags.length; i++){
            var tag = user.traits.tags[i];
            if(!tag.tag){
              tag.tag == ''
            }
            if(tag.tag.toLowerCase().indexOf(searchedTag.toLowerCase()) > -1){
              found = true;
            }
          }
          if(found){
            filtered.push(user)
          }
        } else {
          filtered.push(user)
        }

      }
      for (var i=0; i < users.length; i++){
        var user = users[i]
        if(availability == 'All'){
          checkTag(user)
        } else if (availability == 'Available'){
          if(user.traits.availability && user.traits.availability !== 'Not Available'){
            checkTag(user)
          }
        } else if (availability == 'Not Available'){
          if(!user.traits.availability || user.traits.availability == 'Not Available'){
            checkTag(user)
          }
        } else if (availability){
          if(user.traits.availability == availability){
            checkTag(user)
          }
        } else {
          checkTag(user)
        }
      }
      return filtered;
    };
  });
