export const validateUser = (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const occupation = req.body.occupation;
  const avatar = req.body.avatar;
  if (!first_name || !last_name || !email || !occupation || !avatar)
    return res
      .status(400)
      .json({ success: false, message: "All fields must be filled" });
  next();
};
