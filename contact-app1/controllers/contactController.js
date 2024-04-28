const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const mongoose = require("mongoose")
// @描述 获取当前用户所有联系方式
// @路由 GET /api/contacts
// 权限 私有
const getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user_id: req.user.id })
  res.status(200).json(contacts)
})

// @描述 添加联系方式
// @路由 POST /api/contacts
// 权限 私有
const addContact = asyncHandler(async (req, res, next) => {
  const { name, phone, email } = req.body
  if (!name || !phone || !email) {
    res.status(400)
    throw new Error("所有字段都需要填充")
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    phone,
    email,
  })
  res.status(201).json(contact)
})

// @描述 获得某个人的联系方式
// @路由 GET /api/contacts/:id
// 权限 私有
const getContact = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404)
    throw new Error("未找到")
  }
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error("未找到")
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("禁止访问")
  }
  res.status(200).json(contact)
})

// @描述 更新某个联系方式
// @路由 PUT /api/contacts/:id
// 权限 私有
const updateContact = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404)
    throw new Error("未找到")
  }
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error("未找到")
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("禁止访问")
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updateContact)
})

// @描述 删除某个联系方式
// @路由 DELETE /api/contacts/:id
// 权限 私有
const deleteContact = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404)
    throw new Error("未找到")
  }
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error("未找到")
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("禁止访问")
  }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = {
  getAllContacts,
  addContact,
  getContact,
  updateContact,
  deleteContact,
}
