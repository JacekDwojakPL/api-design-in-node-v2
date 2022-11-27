import prisma from '../utils/db';

export const createUpdate = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
      },
    });

    if (!product) {
      res.status(404);
      return res.json({ data: product });
    }

    const update = await prisma.update.create({
      data: { ...req.body },
    });

    return res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

export const getOneUpdate = async (req, res, next) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!update) {
      res.status(404);
      return res.json({ data: update });
    }

    return res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

export const getUpdates = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);
    return res.json({
      data: updates,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUpdate = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const update = products
      .reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
      }, [])
      .find((update) => update.id === req.params.id);

    if (!update) {
      res.status(404);
      return res.json({ message: 'update not found' });
    }

    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: { ...req.body },
    });

    return res.json({ data: updatedUpdate });
  } catch (error) {
    next(error);
  }
};

export const deleteUpdate = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const update = products
      .reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
      }, [])
      .find((update) => update.id === req.params.id);

    if (!update) {
      res.status(404);
      return res.json({ message: 'update not found' });
    }
    const deletedUpdate = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ data: deletedUpdate });
  } catch (error) {
    next(error);
  }
};
