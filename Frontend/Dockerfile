# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .
ARG NEXT_PUBLIC_API_URL
# Establecer variables de entorno para el build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

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
RUN adduser --system --uid 1001 nextjs

# Establecer directorio de trabajo
WORKDIR /app

# Establecer variable de entorno de producción
ENV NODE_ENV=production

# Copiar dependencias de producción desde deps
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copiar archivos construidos desde builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Cambiar al usuario no root
USER nextjs

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]