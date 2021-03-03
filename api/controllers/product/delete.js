module.exports = {
  friendlyName: "Delete",

  description: "Delete product.",

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
      await Product.destroyOne(id);
      return exits.success({
        code: 0,
        message: "Product deleted successfully!",
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
