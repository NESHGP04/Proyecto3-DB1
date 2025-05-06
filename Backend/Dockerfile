# Dockerfile (Backend - Producción)
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias de forma eficiente
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto 3030 (asegúrate de que coincide con la variable PORT en app.js)
EXPOSE 3030

# Comando para iniciar la aplicación
# Cambia "src/app.js" por la ruta correcta de tu archivo principal
CMD ["node", "src/app.js"] 
