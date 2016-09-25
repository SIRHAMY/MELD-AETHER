/**
 * TargetController
 *
 * @description :: Server-side logic for managing Targets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    createTarget: function(req, res) {
        Target.create({
            id: req.param('id'),
            link: req.param('link')
        }).exec(function(err, newTarget) {
            if(err) return res.status(500).json({error: err});

            return res.json(newTarget);
        });
    }
    
};

