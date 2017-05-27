var express = require("express");

var router = express.Router();


var model = require("../models");

module.exports = function(app) {

    router.get("/", function(req, res) {
        model.burger.findAll({}).then(function(data) {
                var burObject = {
                    burgers: data

                };
                res.render("index", burObject);
            }).catch(function(err) {
                res.json(err)
            });
    });

    router.post("/", function(req, res) {
        model.burger.create({

            burger_name: req.body.burgerInput,

            }).then(function(data) {
                
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
            }).then(function(data) {
                
                res.redirect("/");
            }).catch(function(err) {
                res.json(err)
            });
    });

    return router;

};
