// @desc 获得所有人的联系方式
// @route /api/contacts
// @access 公开
const getAllContacts = (req, res) => {
  res.status(200).json({ message: "获得所有人的联系方式" });
}; 
 
const getContact = (req, res) => {
  res.status(200).json({ message: `获得某一个人的联系方式:${req.params.id}` });
};

const addContact = (req, res) => {
  const {name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error('所有字段都需要填充')
  }
  res.status(201).json({ message: `创建一个联系方式` });
};
const updateContact = (req, res) => {
  res.status(204).json({ message: `更新一个联系方式：${req.params.id}` });
};
const deleteContact = (req, res) => {
  res.status(204).json({ message: `删除一个联系方式:${req.params.id}` });
};

module.exports = {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
