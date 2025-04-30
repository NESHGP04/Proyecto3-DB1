# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./

# Instalar dependencias (aprovechamos el cache de Docker)
RUN npm install

# Copiar todo el código fuente
COPY . .

# Compilar la aplicación (el comando "build" lo provee Vite en package.json)
RUN npm run build

# Etapa 2: Imagen final para servir la aplicación
FROM nginx:stable-alpine

# Elimina la configuración por defecto de nginx (opcional)
RUN rm /etc/nginx/conf.d/default.conf

# Copia la configuración personalizada (ver más abajo)
COPY nginx.conf /etc/nginx/conf.d

# Copia los archivos compilados al directorio de nginx que sirve contenido estático
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Inicia Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
