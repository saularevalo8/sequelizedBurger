var express = require("express");

var router = express.Router();

// Import the model (app.js) to use its database functions.
var model = require("../models");

module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.
    router.get("/", function(req, res) {
        model.burger.findAll({}).then(function(dbBurgers) {
                var hbsObject = {
                    burgers: dbBurgers

                };
                res.render("index", hbsObject);
            }).catch(function(err) {
                res.json(err)
            });
    });

    router.post("/", function(req, res) {
        model.burger.create({

            burger_name: req.body.burgerInput,

            }).then(function(dbBurgers) {
                // res.json(dbBurgers);
                res.redirect("/");
            })
    });

    router.put("/:id", function(req, res) {
        model.burger.update({
                devoured: req.body.devoured
            }, {
                where: {
                    id: req.params.id
                }
            }).then(function(dbBurgers) {
                // res.json(dbBurgers);
                res.redirect("/");
            }).catch(function(err) {
                res.json(err)
            });
    });

    return router;

};
