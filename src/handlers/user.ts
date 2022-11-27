import prisma from '../utils/db';
import { comparePasswords, createJWT, hashPassword } from '../utils/auth';

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  try {
    const isValid = await comparePasswords(req.body.password, user.password);
    if (isValid) {
      const token = createJWT(user);
      return res.json({ token });
    } else {
      res.status(401);
      return res.json({ message: 'Invalid username or password' });
    }
  } catch (e) {
    next({ type: 'auth' });
  }
};
