import { validationResult, matchedData } from "express-validator"
import mockUsers from "../utils/constants.mjs"
import { User } from "../mongoose/schema/user.mjs"

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
      throw err
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

const addUser = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const data = matchedData(req)
  console.log(data)
  const newUser = new User(data)
  try {
    const savedUser = await newUser.save(newUser)
    return res.status(201).send(savedUser)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
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
