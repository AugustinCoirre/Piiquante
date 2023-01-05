const Sauce = require('../models/sauce');

exports.newSauce = (req, res, next) => {
    delete req.body._id;
        const sauce = new Sauce({
          ...req.body
        });
        sauce.save()
          .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
          .catch(error => res.status(400).json({ error }));
    };

exports.findSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.findOneSauce = (req, res , next) => {
    Sauce.findOne({ _id: req.params.id })
        .then( sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.updateSauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
    };

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    };

