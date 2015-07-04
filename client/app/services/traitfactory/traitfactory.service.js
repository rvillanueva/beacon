'use strict';

angular.module('heroesApp')
  .factory('traitFactory', function () {
    // Service logic
    // ...

    var industryKey = {
      "aerospace" : {
        "name" : "Aerospace & Defense"
      },
      "automotive" : {
        "name" : "Automotive"
      },
      "banking" : {
        "name" : "Banking"
      },
      "chemicals" : {
        "name" : "Chemicals & Petroleum"
      },
      "distribution" : {
        "name" : "Consumer Products"
      },
      "education" : {
        "name" : "Education"
      },
      "electronics" : {
        "name" : "Electronics"
      },
      "energy" : {
        "name" : "Energy & Utilities"
      },
      "finance" : {
        "name" : "Financial Markets"
      },
      "government" : {
        "name" : "Government"
      },
      "healthcare" : {
        "name" : "Healthcare"
      },
      "industrial" : {
        "name" : "Industrial Products"
      },
      "insurance" : {
        "name" : "Insurance"
      },
      "life" : {
        "name" : "Life Sciences"
      },
      "media" : {
        "name" : "Media & Entertainment"
      },
      "retail" : {
        "name" : "Retail"
      },
      "telecom" : {
        "name" : "Telecommunications"
      },
      "travel" : {
        "name" : "Travel & Transportation"
      }
    }
    
    var serviceKey = {
      "ais" : {
        "name" : "Application Innovation Services"
      },
      "ams" : {
        "name" : "Application Management Services"
      },
      "appdev" : {
        "name" : "Application Development & Innovation"
      },
      "bas" : {
        "name" : "Business Analytics & Strategy"
      },
      "ea" : {
        "name" : "Enterprise Applications"
      },
      "gps" : {
        "name" : "Global Process Services"
      },
      "ix" : {
        "name" : "Interactive Experience & Mobile"
      },
      "oracle" : {
        "name" : "Oracle"
      },
      "sa" : {
        "name" : "Strategy & Analytics"
      },
      "sap" : {
        "name" : "SAP"
      }
    }

    // Public API here
    return {
      industryKey: function () {
        return industryKey;
      },
      serviceKey: function () {
        return serviceKey;
      }

    };
  });
