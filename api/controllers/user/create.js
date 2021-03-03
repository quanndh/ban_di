module.exports = {
  friendlyName: "Create",

  description: "Create user.",

  inputs: {
    username: { type: "string", required: true },
    password: { type: "string", required: true },
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
      const { username, password } = inputs;
      const findUser = await User.findOne({ username });
      if (findUser) {
        return exits.fail({
          code: 1,
          message: "User has existed!",
        });
      }
      let hashPassword = await sails.helpers.password.hash(password);
      let createUser = await User.create({
        ...inputs,
        password: hashPassword,
      }).fetch();
      delete createUser.password;
      let token = await sails.helpers.jwt.sign(createUser);
      return exits.success({
        code: 0,
        data: createUser,
        token,
        message: "Sign up successfully!",
      });
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System encouter a problem. Try again.",
      });
    }
  },
};
