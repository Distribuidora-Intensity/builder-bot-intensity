const express = require('express')
const { createBot, createProvider, createFlow, addKeyword, MemoryDB } = require('@builderbot/bot')
const { BaileysProvider } = require('@builderbot/provider-baileys')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Bot Intensity funcionando')
})

app.listen(PORT, () => {
  console.log(`Servidor HTTP activo en puerto ${PORT}`)
})

const flowPrincipal = addKeyword(['hola','buenas']).addAnswer(
  'Hola 👋 Soy el asistente de Intensity. ¿Qué producto estás buscando?'
)

async function main(){

  const adapterDB = new MemoryDB()

  const adapterFlow = createFlow([
    flowPrincipal
  ])

  const adapterProvider = createProvider(BaileysProvider,{
    sessionPath:'./sessions',
    printQRInTerminal:true
  })

  await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  console.log("Bot iniciado correctamente")

  // mantiene vivo el proceso
  setInterval(()=>{},1000)
}

main()