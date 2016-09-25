module.exports = {
    createAnchor: function(req, done) {
        var hash = req.param('hash');
        var hashValue = req.param('hashValue');

        if(!hash || !hashValue) {
            return done('Missing required parameter [hash || hashValue]');
        }

        Anchor.create({
            hash: hash,
            hashValue: hashValue
        }).exec(function(err, newAnchor) {
            req['anchor'] = newAnchor;
            return done(err, req);
        });
    },
    createTarget: function(req, done) {
        var anchor = req.param('anchor');
        var link = req.param('link');

        /* HAMY: Needs to be set before we can modify anchors
        if(!anchor) {
            return done('Missing required parameter [anchor]');
        }
        */

        if(!link) {
            return done('Missing required parameter [link]');
        }

        Target.create({
            link: link,
            anchors: [anchor]
        }).exec(function(err, newTarget) {
            return done(err, newTarget);
        });
    }
};