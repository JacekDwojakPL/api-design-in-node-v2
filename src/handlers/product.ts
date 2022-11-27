import prisma from '../utils/db';

export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    return res.json({ data: user.products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });

    return res.json({ data: product });
  } catch (error) {
    next({ type: 'input' });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    return res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    return res.json({ data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });

    return res.json({ data: deletedProduct });
  } catch (error) {
    next(error);
  }
};
