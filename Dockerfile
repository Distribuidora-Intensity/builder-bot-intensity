# Usamos Node 20 oficial
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install --omit=dev

# Copiamos el resto del proyecto
COPY . .

# Exponemos puerto (aunque Baileys no lo usa, Railway lo exige)
EXPOSE 3000

# Comando para arrancar
CMD ["node", "index.js"]

