/**
 * AnchorController
 *
 * @description :: Server-side logic for managing Anchors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * Create meld
     */
    createMeld: function(req, res) {

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


            return res.json(foundAnchor.target.link);

        });
    }
    
};

