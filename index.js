const express = require('express')
const { createBot, createProvider, createFlow, addKeyword, MemoryDB } = require('@builderbot/bot')
const { BaileysProvider } = require('@builderbot/provider-baileys')

const app = express()
const PORT = process.env.PORT || 3000

// Ruta base para probar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Bot Intensity funcionando')
})

// Ruta para verificar QR (la usaremos después)
app.get('/qr', (req, res) => {
    res.send('El QR se muestra en los logs del servidor')
})

app.listen(PORT, () => {
    console.log(`Servidor HTTP activo en puerto ${PORT}`)
})

// Flujo simple
const flowPrincipal = addKeyword(['hola', 'buenas'])
    .addAnswer('Hola 👋 Soy el asistente de Intensity. ¿En qué puedo ayudarte?')

// Inicialización del bot
async function main() {

    const adapterDB = new MemoryDB()

    const adapterFlow = createFlow([
        flowPrincipal
    ])

    const adapterProvider = createProvider(BaileysProvider, {
        sessionPath: './sessions',
        printQRInTerminal: true
    })

    await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB
    })

    console.log('Bot iniciado correctamente')

    // Mantener vivo el proceso para Railway
    setInterval(() => {}, 1000)
}

main()