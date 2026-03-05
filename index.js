const express = require('express')
const { createBot, createProvider, createFlow, addKeyword } = require('@builderbot/bot')
const { BaileysProvider } = require('@builderbot/provider-baileys')

const app = express()
const PORT = process.env.PORT || 3000

// Endpoint para que Railway vea que está vivo
app.get('/', (req, res) => {
  res.send('Bot Intensity funcionando')
})

app.listen(PORT, () => {
  console.log(`Servidor HTTP activo en puerto ${PORT}`)
})

const flowPrincipal = addKeyword(['hola', 'buenas']).addAnswer(
  'Hola 👋 Soy el asistente de Intensity. Decime qué estás buscando.'
)

async function main() {
  const provider = createProvider(BaileysProvider, {
    sessionPath: './sessions'
  })

  const flow = createFlow([flowPrincipal])

  await createBot({
    flow,
    provider,
  })
}

main()
