'use strict';

module.exports = function (Suggestion) {
    Suggestion.getSuggestion = function (dis, cb) {
        cb(null, Suggestion.find({ where: { disaster: dis } }).suggestion);
    }

    Suggestion.remoteMethod(
        'getSuggestion',
        {
            accepts: [
                { arg: 'dis', type: 'string', required: true }
            ],
            http: { path: '/suggestions', verb: 'get' },
            returns: { arg: 'ret', type: "string", root: true, required: true }
        }
    )
};
