/**
 * AnchorController
 *
 * @description :: Server-side logic for managing Anchors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * Create meld
     * 
     * POST (/meld)
     * 
     * Required params:
     * - hash
     * - hashValue
     * - link
     */
    createAnchor: function(req, res) {

        Anchor.create({
            hash: req.param('hash'),
            hashValue: req.param('hashValue'),
            target: req.param('target'),
            link: req.param('link')
        }).exec(function(err, newAnchor) {

            if(err) return res.status(500).json({error: err});

            return res.json(newAnchor);
            /*
            Target.create({
                link: req.param('link'),
                anchors: [newAnchor]
            }).exec(function(err, newTarget) {
                while(!newTarget)
                console.log(newTarget);
                console.log(newTarget.anchors);
                Anchor.update({hash: newTarget.anchors[0].hash}, {target: newTarget}).exec(function(err, updated) {
                    if(err) return res.status(500).json({error: err});

                    return res.json(updated);
                });
            });
            */
        });
        
        /*
        MeldService.createAnchor(req, function(err, newAnchor) {
            if(err) return res.status(500).json({error: err});

            MeldService.createTarget(req, newAnchor, function(err, newTarget) {
                if(err) return res.status(500).json({error: err});

                Anchor.update({hash: req.param('anchor').hash}).exec(function(err, updated) {
                    if(err) return res.status(500).json({error: err});

                    return res.json(updated);
                });

            });
            //return res.json(newAnchor);
        });
        */
    },

	/**
     * Get meld with matching/similar hash
     * 
     * GET (/meld)
     * 
     * Required params:
     * - hash
     * - hashValue
     */
    getMeld: function(req, res) {
        Anchor.find().populate('target').exec(function(err, anchors) {
            if(err) return res.serverError(err);

            var desiredHash = req.param('hashValue');
            var foundAnchor = null;

            for(item in anchors) {
                var thisAnchor = anchors[item];
                if(Math.abs(thisAnchor.hashValue - desiredHash) < 20) {
                    foundAnchor = thisAnchor;
                    break;
                }
            }

            if(!foundAnchor) {
                return res.status(404).json({ error: "We could not locate the droids you were looking for." });
            }


            return res.json(foundAnchor.link);

        });
    }
    
};

