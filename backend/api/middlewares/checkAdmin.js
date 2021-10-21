const isAdmin = async (req) => {
  const admin = await database.admin.findOne({
    where: { id: req.body.userId },
  });
  if (!admin) {
    return false;
  }
  console.log(red.body.userID);
  return true;
};
