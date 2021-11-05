import { default as jwt } from "jsonwebtoken";
import { default as config } from "../configs/authConfig.js";
import { default as db } from "../models/index.js";

const getUserSecret = async (token) => {
  const decoded = await jwt.decode(token);
  const role = decoded.role;
  switch (role) {
    case "admin": {
      const user = await db.admin.findOne({ where: { id: decoded.sub } });
      return user.securitySecret;
    }
    case "school": {
      const user = await db.school.findOne({ where: { id: decoded.sub } });
      return user.securitySecret;
    }
    case "teacher": {
      const user = await db.teacher.findByPK(decoded.sub);
      return user.securitySecret;
    }
    case "student": {
      const user = await db.student.findByPK(decoded.sub);
      return user.securitySecret;
    }
    default:
      console.log(`Unauthenticated`);
  }
  return new Error("Unauthenticated");
};

const sign = async (userId, role, signOption, userSecret) => {
  return jwt.sign({ sub: userId, role: role }, signOption.SECRET + userSecret, {
    expiresIn: signOption.EXPIRED,
  });
};
const signAccessToken = async (userId, role, userSecret) =>
  await sign(userId, role, config.accessToken, userSecret);

const signRefreshToken = async (userId, role, userSecret) =>
  await sign(userId, role, config.refreshToken, userSecret);

const verify = (token, verifyOption, userSecret) => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, verifyOption.SECRET + userSecret, (err, decoded) => {
      if (err) {
        resolve();
      }
      resolve(decoded);
    })
  );
};
const verifyAccessToken = async (token) => {
  const info = await verify(
    token,
    config.accessToken,
    await getUserSecret(token)
  );
  return info;
};

const verifyRefreshToken = async (token) => {
  return await verify(token, config.refreshToken, await getUserSecret(token));
};

// const signForgotPasswordToken = async (payload) =>
//   await sign(payload, config.jwt.forgotPasswordToken, config.jwt.systemSecret);
// const verifyForgotPasswordToken = async (token) =>
//   await verify(token, config.jwt.forgotPasswordToken, config.jwt.systemSecret);

export default {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
