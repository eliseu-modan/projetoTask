let isAdmin = false;

exports.isAdminMiddleware = async function (isAdminParam) {
  isAdmin = isAdminParam;
  await new Promise((resolve) => setTimeout(resolve, 0));
};

exports.isAdmin = function (req, res, next) {
  if (isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Acesso não autorizado. Você não é um administrador." });
  }
};
