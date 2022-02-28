const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(500).send({ message: "An error has occurred on the server" });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      res.status(404).send({ message: "User ID not found" });
    }

    res.send(user);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(500).send({ message: "An error has occurred on the server" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const newUser = await User.create({ name, about, avatar });

    if (!newUser) {
      res
        .status(400)
        .send({
          message: "Invalid data passed to the methods for creating a user",
        });
    }

    res.send(newUser);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res
      .status(500)
      .send({ message: "An error has occurred on the server" });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updateProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {new: true}
    )

    if (!updateProfile) {
      res
        .status(400)
        .send({
          message: "Invalid data passed to the methods for creating a user",
        });
    }

    res.send(updateProfile);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res
      .status(500)
      .send({ message: "An error has occurred on the server" });
  }
}

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {new: true},
    )

    if (!updateAvatar) {
      res
        .status(400)
        .send({
          message: "Invalid data passed to the methods for creating a user",
        });
    }

    res.send(updateAvatar);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res
      .status(500)
      .send({ message: "An error has occurred on the server" });
  }
}