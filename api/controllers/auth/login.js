module.exports = {
  friendlyName: "Log in",

  description: "",

  inputs: {
    username: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },
    fail: {
      statusCode: 400,
    },
    serverError: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    try {
      let { username, password } = inputs;
      let idFriends = [];
      if (!username || !password) {
        return exits.fail({
          code: 1,
          message: "Username and password must be filled!",
        });
      }
      let findUser = await User.findOne({ username });
      if (!findUser) {
        return exits.fail({
          code: 404,
          message: "User not exist",
        });
      }
      let check = await sails.helpers.password.check(
        password,
        findUser.password
      );
      if (check) {
        let token = await sails.helpers.jwt.sign(findUser);
        return exits.success({
          code: 0,
          data: findUser,
          token,
        });
      } else {
        return exits.fail({
          code: 1,
          message: "Wrong password!",
        });
      }
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System error!",
      });
    }
  },
};
