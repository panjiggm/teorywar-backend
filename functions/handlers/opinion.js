const { db } = require("../util/admin");

exports.getAllOpinion = (req, res) => {
  db.collection("opinion")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let opinion = [];
      data.forEach(doc => {
        opinion.push({
          opinionId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });

      return res.json(opinion);
    })
    .catch(err => console.log(err));
};

exports.createSingleOpinion = (req, res) => {
  const newOpinion = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };

  db.collection("opinion")
    .add(newOpinion)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
};
