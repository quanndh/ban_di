module.exports = {
  friendlyName: "Find",

  description: "Find product.",

  inputs: {
    search: { type: "string" },
    category: { type: "string" },
    limit: { type: "number" },
    page: { type: "number" },
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
      let { search, category, limit, page } = this.req.query;
      limit = limit || 10;
      page = page || 1;

      const condition = {};
      if (search) {
        condition["or"] = [
          { name: { contains: search } },
          { description: { contains: search } },
        ];
      }
      if (category) {
        condition["category"] = category;
      }
      const products = await Product.find({
        where: condition,
        skip: (page - 1) * limit,
        limit,
        sort: "createdAt DESC",
      });
      const total = await Product.count(condition);
      const countAll = await Product.count();
      return exits.success({
        code: 0,
        data: {
          products: products || [],
          total: total || 0,
          currentPage: page,
          totalPage: Math.ceil(countAll / limit),
        },
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
