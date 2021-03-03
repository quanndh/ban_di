module.exports = {
  friendlyName: "Find one",

  description: "",

  inputs: {
    id: { type: "string", required: true },
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
      const { id } = inputs;
      const product = await Product.findOne(id);
      if (!product) {
        return exits.fail({
          code: 404,
          message: "Not Found.",
        });
      }
      return exits.success({
        code: 0,
        data: product,
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
