# Proyecto3-DB1 (Frontend)
Para poder correr el Fontend es necesario tener docker, primero se tiene qe ejecutar el siguiente comando:
   ```bash
-f docker-compose.yml -f docker-compose.dev.yml build
```
Y luegp es necesario ejecutar este otro comando:
   ```bash
-f docker-compose.yml -f docker-compose.dev.yml up
```
Con estos dos comandos (y levantar el backend) el programa está listo para funcionar
# Proyecto3-DB1 (Backend)

API REST construida con Node.js, Express y Prisma (PostgreSQL).  
Este proyecto se ejecuta de forma local (sin Docker) usando `node app.js` .

## 📋 Requisitos

- Node.js v18 o superior  
- PostgreSQL v15 o superior (corriendo en `localhost:5432`)  
- Prisma

## 🔧 Instalación

1. Clonar repositorio y entrar en la carpeta `Backend`  
   ```bash
   git clone <TU_REPO_URL>
   cd Proyecto3-DB1/Backend
   ```

2. Instalar dependencias  
   ```bash
   npm install
   ```

3. Crear y configurar variables de entorno  
   ```bash
   cp .env.example .env
   ```
   Crea un `.env` y ajusta tus credenciales:
   ```env

   DATABASE_URL="postgresql://postgres:contraseña@localhost:5432/nombredelaDB"
   ```

## 🗄️ Configuración de la Base de Datos

1. Asegúrate de que PostgreSQL esté activo:
   ```bash
   brew services start postgresql@15
   ```

2. Crear la base de datos vacía:
   ```bash
   psql -U postgres -c "CREATE DATABASE Clinica;"
   ```

## 🚀 Migraciones & Seed

- Aplicar migraciones (estructura de tablas y enums):
  ```bash
  npx prisma migrate deploy
  ```


El seed se ejecuta con el script `prisma/seed.js` y carga datos de ejemplo.

## ▶️ Ejecutar la API


- En modo producción:
  ```bash
  npm start
  ```

El servidor escucha en `http://localhost:3001`.

## 📖 Endpoints

| Ruta                    | Método | Descripción              |
| ----------------------- | ------ | ------------------------ |
| /clinicas               | GET    | Listar clínicas          |
| /clinicas               | POST   | Crear clínica            |
| /clinicas/:id           | GET    | Obtener clínica por ID   |
| /clinicas/:id           | PUT    | Actualizar clínica       |
| /clinicas/:id/pacientes | GET    | Pacientes de una clínica |
| /clinicas/:id/medicos   | GET    | Médicos de una clínica   |
| /clinicas/:id/citas     | GET    | Citas de una clínica     |

/medicos                       | GET    | Listar médicos  
/medicos                       | POST   | Crear médico  
/medicos/:id                   | GET    | Obtener médico por ID  
/medicos/:id                   | PUT    | Actualizar médico  
/medicos/:id/citas             | GET    | Citas de un médico  

/pacientes                     | GET    | Listar pacientes  
/pacientes                     | POST   | Crear paciente  
/pacientes/:id                 | GET    | Obtener paciente por ID  
/pacientes/:id                 | PUT    | Actualizar paciente  
/pacientes/:id/citas           | GET    | Citas de un paciente  
/pacientes/:id/tratamientos    | GET    | Tratamientos de un paciente  
/pacientes/:id/facturas        | GET    | Facturas de un paciente  

/citas                         | GET    | Listar citas  
/citas                         | POST   | Crear cita  
/citas/:id                     | GET    | Obtener cita por ID  
/citas/:id                     | PUT    | Actualizar cita  

/consultas                     | GET    | Listar consultas  
/consultas                     | POST   | Crear consulta  
/consultas/:id                 | GET    | Obtener consulta por ID  

/tratamientos                  | GET    | Listar tratamientos  
/tratamientos                  | POST   | Crear tratamiento  

/facturas                      | GET    | Listar facturas  
/facturas                      | POST   | Crear factura  
/facturas/:id                  | GET    | Obtener factura por ID  

## 🔗 Archivos clave

- `app.js` – Definición de rutas y arranque del servidor  
- `prisma/schema.prisma` – Modelo de datos  
- `prisma/migrations/` – Historial de migraciones  
- `prisma/seed.js` – Script de carga de datos iniciales  

## 💬 Soporte

Ante dudas o problemas, abre un _issue_ en el repositorio o contáctame directamente.
