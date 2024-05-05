export const addCart = (req, res) => {
  const { body: item } = req
  if (!req.session.user || Object.keys(item).length ===0 ) return res.sendStatus(400)
  const { cart } = req.session
  if (cart) cart.push(item)
  else req.session.cart = [item]
  res.status(201).send(req.session.cart)
}
