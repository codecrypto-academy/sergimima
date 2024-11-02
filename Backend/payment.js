const express = require('express')
const router = express.Router()
const RedsysAPI = require('redsys-easy')


const redsys = new RedsysAPI({
    secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
    merchantCode: '999008881',
    terminal: '1',
    currency: '978',
    urlMerchant: 'http://localhost:3000/payment/callback',
    environment: 'test'
})

router.post('/create-payment', async (req, res) => {
    const { amount, orderId } = req.body

    const form = redsys.createForm({
        amount: amount,
        order: orderId,
        merchantName: 'Web3 Shop',
        merchantUrl: 'http://localhost:3000',
        consumerLanguage: '001',
        productDescription: 'Web3 Shop Purchase'
    })

    res.json({ form })
})


router.post('/callback', (req, res) => {
    const response = redsys.processResponse(req.body.Ds_SignatureVersion, req.body.Ds_MerchantParameters, req.body.Ds_Signature)

    if (response.success) {
        // Payment successful
        // Update order status in your database
        res.redirect('/payment/success')
    } else {
        // Payment failed
        res.redirect('/payment/error')
    }
})

router.get('/success', (req, res) => {
    res.json({ status: 'success', message: 'Payment completed successfully' })
})

router.get('/error', (req, res) => {
    res.json({ status: 'error', message: 'Payment failed' })
})
module.exports = router
export default router
