module.exports = {
  friendlyName: "Create",

  description: "Create product.",

  inputs: {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    price: { type: "number", required: true },
    category: { type: "string", required: true },
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
      let product = await Product.create({ ...inputs }).fetch();
      return exits.success({
        code: 0,
        data: product,
        message: "Product created successfully!",
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
