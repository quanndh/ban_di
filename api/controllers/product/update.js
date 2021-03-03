module.exports = {
  friendlyName: "Update",

  description: "Update product.",

  inputs: {
    id: { type: "number", required: true },
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
      const { id } = inputs;
      const product = await Product.findOne(id);
      if (!product) {
        return exits.fail({
          code: 404,
          message: "Not Found.",
        });
      }
      const updatedProduct = await Product.updateOne(id, { ...inputs });
      return exits.success({
        code: 0,
        data: updatedProduct,
        message: "Updated success!",
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
