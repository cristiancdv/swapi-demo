# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluidas devDependencies para construir)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa intermedia - instalar solo dependencias de producción
FROM node:18-alpine AS deps

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Etapa de producción
FROM node:18-alpine AS runner

# Instalar curl para health checks
RUN apk add --no-cache curl

# Crear usuario no root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Establecer directorio de trabajo
WORKDIR /app

# Crear directorio de logs y asignar permisos
RUN mkdir -p /app/logs && chown -R nestjs:nodejs /app/logs
RUN mkdir -p /app/app.log && chown -R nestjs:nodejs /app/app.log

# Copiar dependencias de producción desde deps
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copiar la aplicación construida desde builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Cambiar al usuario no root
USER nestjs

# Exponer puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]