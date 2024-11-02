import express from 'express'
import { createRedsysAPI, SANDBOX_URLS } from 'redsys-easy'

const router = express.Router()

const redsys = createRedsysAPI({
    urls: SANDBOX_URLS,
    secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
    merchantCode: '999008881',
    terminal: '1',
    currency: '978',
    urlMerchant: 'http://localhost:3000/payment/callback',
    urlMerchantOk: 'http://localhost:3000/payment/success',
    urlMerchantKo: 'http://localhost:3000/payment/error',
    environment: 'test'
})

router.post('/create-payment', async (req, res) => {
    try {
        const { amount } = req.body
        const orderNumber = Date.now().toString().slice(-12)

        const form = redsys.createRedirectForm({
            DS_MERCHANT_ORDER: orderNumber,
            DS_MERCHANT_AMOUNT: amount,
            DS_MERCHANT_CURRENCY: '978',
            DS_MERCHANT_MERCHANTCODE: '999008881',
            DS_MERCHANT_TERMINAL: '1',
            DS_MERCHANT_TRANSACTIONTYPE: '0',
            DS_MERCHANT_URLOK: 'http://localhost:5173/payment/success',
            DS_MERCHANT_URLKO: 'http://localhost:5173/payment/error'
        })

        res.json({ form })
    } catch (error) {
        console.error('Error creating payment form:', error)
        res.status(500).json({ error: 'Error creating payment form', details: error.message })
    }
})


router.post('/callback', (req, res) => {
    try {
        const response = redsys.processRedirectNotification(req.body.Ds_SignatureVersion, req.body.Ds_MerchantParameters, req.body.Ds_Signature)

        if (response.success) {
            res.redirect('/payment/success')
        } else {
            res.redirect('/payment/error')
        }
    } catch (error) {
        res.status(500).json({ error: 'Error processing payment callback' })
    }
})

router.post('/payment/success', (req, res) => {
    const transactionDetails = {
        method: 'Credit Card',
        amount: req.body.Ds_Amount / 100, // Convert cents to euros
        currency: 'EUR',
        customerAddress: req.body.Ds_Card_Number, // Last 4 digits for security
        companyAddress: req.body.Ds_MerchantCode,
        items: req.session.cartItems,
        txHash: req.body.Ds_AuthorisationCode
    }

    res.redirect(`http://localhost:5173/payment/success?data=${encodeURIComponent(JSON.stringify(transactionDetails))}`)
})
router.get('/success', (req, res) => {
    res.json({ status: 'success', message: 'Payment completed successfully' })
})

router.get('/error', (req, res) => {
    res.json({ status: 'error', message: 'Payment failed' })
})

export default router
