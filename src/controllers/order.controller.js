const { Order } = require('../models/order.model');

exports.getOrders = async (req, res) => {
    try {
        const order = await Order.find();
        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getOrder =  async (req, res) => {
    try {
        const order = await Order.findOne({_id: req.params.id});
        if (!order)
            return res.status(404).json({error:'Order not found'});
        return res.send(order);
    } catch (err) {
        return res.status(500).json(err);
        
    }
}