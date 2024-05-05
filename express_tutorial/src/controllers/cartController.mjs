const addCart = (req, res) => {
  const { body: item } = req
  if (!req.session.user || Object.keys(item).length === 0)
    return res.sendStatus(400)
  const { cart } = req.session
  if (cart) cart.push(item)
  else req.session.cart = [item]
  res.status(201).send(req.session.cart)
}

const getCart = (req, res) => {
  if (!req.session.user) return res.sendStatus(401)
  return res.status(200).send(req.session.cart ?? [])
}
export { addCart, getCart }
