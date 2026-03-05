const express = require('express')
const { createBot, createProvider, createFlow, addKeyword, MemoryDB } = require('@builderbot/bot')
const { BaileysProvider } = require('@builderbot/provider-baileys')
const QRCode = require('qrcode')

const app = express()
const PORT = process.env.PORT || 3000

let qrCodeBase64 = null

app.get('/', (req, res) => {
    res.send('Bot Intensity funcionando')
})

app.get('/qr', async (req, res) => {

    if (!qrCodeBase64) {
        return res.send("QR todavía no generado, revisá nuevamente en unos segundos")
    }

    res.send(`
        <h2>Escanear QR para conectar WhatsApp</h2>
        <img src="${qrCodeBase64}" />
    `)
})

app.listen(PORT, () => {
    console.log(`Servidor HTTP activo en puerto ${PORT}`)
})

const flowPrincipal = addKeyword(['hola', 'buenas'])
    .addAnswer('Hola 👋 Soy el asistente de Intensity. ¿En qué puedo ayudarte?')

async function main() {

    const adapterDB = new MemoryDB()

    const adapterFlow = createFlow([
        flowPrincipal
    ])

    const adapterProvider = createProvider(BaileysProvider, {
        sessionPath: './sessions',
        printQRInTerminal: false
    })

    adapterProvider.on('qr', async (qr) => {
        console.log('QR generado')

        qrCodeBase64 = await QRCode.toDataURL(qr)
    })

    await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB
    })

    console.log('Bot iniciado correctamente')

    setInterval(() => {}, 1000)
}

main()