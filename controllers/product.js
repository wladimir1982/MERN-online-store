const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function (req, res) {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      user: req.user.id
    })
    res.status(200).json(products)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageSrc: req.file ? req.file.path : '',
    category: req.body.category,
    user: req.user.id
  })
  try {
    await product.save()
    res.status(201).json(product)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Product.remove({_id: req.params.id})
    res.status(200).json({
      message: 'The product has been removed.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    user: req.user.id
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }
  try {
    const product = await Product.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(product)
  } catch (e) {
    errorHandler(res, e)
  }
}