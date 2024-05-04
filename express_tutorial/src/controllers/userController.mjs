import { validationResult, matchedData } from "express-validator"
import mockUsers from "../utils/constants.mjs"

// @desc get all user
// @route /api/users
// access public
const getAllUsers = (req, res) => {
  const {
    query: { value },
  } = req
  console.log(req.session.id)
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      throw err;
    }
    console.log(sessionData)
  })
  const valiadtedResult = validationResult(req)
  if (!valiadtedResult.isEmpty()) return res.status(200).send(mockUsers)
  const data = matchedData(req)
  const { filter } = data
  const filterUser = mockUsers.filter((user) => {
    if (user[filter]) return user[filter].includes(value)
  })
  return res.status(200).send(filterUser)
}

const addUser = (req, res) => {
  const valiadtedResult = validationResult(req)
  console.log(valiadtedResult)
  if (!valiadtedResult.isEmpty()) return res.sendStatus(400)
  const { body } = req
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
  mockUsers.push(newUser)
  res.status(201).send(newUser)
}

const getUser = (req, res) => {
  console.log(req.params)
  const { findUserIndex } = req
  const findUser = mockUsers[findUserIndex]
  res.status(200).send(findUser)
}

const updateUser = (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
  return res.status(200).send(mockUsers[findUserIndex])
}
const patchUser = (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.status(200).send(mockUsers[findUserIndex])
}
const deleteUser = (req, res) => {
  const { findUserIndex } = req
  mockUsers.splice(findUserIndex, 1)
  res.status(200).send(mockUsers)
}
export { getAllUsers, getUser, addUser, updateUser, patchUser, deleteUser }
