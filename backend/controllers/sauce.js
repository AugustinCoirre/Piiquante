const { json } = require('express');
const Sauce = require('../models/sauce');
const fs = require('fs');

exports.newSauce = (req, res, next) => {
    const sauceJson = JSON.parse(req.body.sauce);
        const sauce = new Sauce({
          ...sauceJson,
          likes: 0,
          dislikes: 0,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, (err) => {})
              Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => {
      if (sauce.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Sauce.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  
      .then((sauce) => {
        // vérification si l'ID user (req.body.userId) existe dans les tableaux (sauce.usersLiked et sauce.usersDisliked) 
        let index = sauce.usersLiked.findIndex( x => x === req.body.userId);
        if (index != -1) {
            //  Si user existe supprimer du tableau
            sauce.usersLiked.splice(index, 1);
        } 
        index = sauce.usersDisliked.findIndex( x => x === req.body.userId);
        if (index != -1) {
            sauce.usersDisliked.splice(index, 1);
        }

        // On vérifie la donnée du user ( like ou disliked ) pour le ranger dans la tableau
        if (req.body.like === 1) {
            // modifier (sauce.like et sauce.dislike)
            sauce.usersLiked.push(req.body.userId);
            sauce.likes = sauce.usersLiked.length;
            sauce.save()
                .then(() => { res.status(200).json({message: 'like !'})})
                .catch(error => res.status(401).json({ error }));
        } else if (req.body.like === -1) {
            sauce.usersDisliked.push(req.body.userId);
            sauce.dislikes = sauce.usersDisliked.length;
            sauce.save()
                .then(() => { res.status(200).json({message: 'dislike !'})})
                .catch(error => res.status(401).json({ error }));
        } else {
            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;
            sauce.save()
                .then(() => { res.status(200).json({message: 'reset !'})})
                .catch(error => res.status(401).json({ error }));
        }
        
      })
      .catch((error) => {
        res
            .status(400)
            .json({ error });
      });
}