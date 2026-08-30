# 📦 Inventario Escáner

App web responsive para captura y gestión de inventario mediante cámara (QR/Códigos de barras) o entrada manual. Funciona **offline** con sincronización de BD via web.

## 🚀 Características

- **📷 Captura por Cámara**: Lee códigos QR y códigos de barras con jsQR
- **✏️ Entrada Manual**: Agregar productos manualmente por SKU
- **🔄 Sincronización**: BD cachea offline, solo sincroniza metadata de actualización
- **📱 Responsive**: Compatible con Android (Chrome) e iPhone (Safari)
- **💾 Offline-First**: Funciona sin conexión, sincroniza cuando hay conexión
- **📊 Exportar**: Descarga inventario en JSON

## 📋 Estructura

```
├── index.html                 # App principal (responsive)
├── products.json             # BD de ~13,000 productos (se crea automático)
├── sync-info.json            # Metadata de última actualización
├── sw.js                      # Service Worker (caché offline)
├── manifest.json             # PWA manifest
├── convert-excel-to-json.js  # Convertidor Excel → JSON
└── package.json              # Dependencias (xlsx, jsQR)
```

## 🔧 Instalación

```bash
npm install
```

## 📚 Flujo de Datos

### 1️⃣ Convertir Excel a JSON
```bash
node convert-excel-to-json.js
```
- Lee archivos `.xlsx` con estructura: `CODIGO SKU`, `DESCRIPCION`, `UPC`, `CANTIDAD`
- Mantiene **todos** los datos (sin eliminar nada)
- Detecta inconsistencias (SKUs duplicados, códigos barras duplicados)
- Genera `products.json` + `sync-info.json`

### 2️⃣ Desplegable web
Sube los archivos a tu servidor (GitHub Pages, Vercel, etc.)

### 3️⃣ Uso en dispositivos
- Accede desde navegador (Chrome/Safari)
- App cachea `products.json` localmente (offline)
- Sincroniza solo `sync-info.json` (fecha/hora/cantidad)
- Inventario se guarda en localStorage del dispositivo

## 📖 Cómo usar

### Captura por Cámara
1. Abre la pestaña **📷 Cámara**
2. Haz clic en "▶ Iniciar Cámara"
3. Apunta el código a la cámara (QR o código de barras)
4. Ingresa ubicación (opcional)
5. Haz clic en "✅ Agregar a Inventario"

### Entrada Manual
1. Abre la pestaña **✏️ Manual**
2. Ingresa SKU (busca automáticamente en BD)
3. Ingresa ubicación
4. Haz clic en "➕ Agregar Producto"

### Ver Listado
1. Abre la pestaña **📋 Listado**
2. Busca productos por SKU
3. Exporta como JSON

## 🔄 Actualizaciones de Base de Datos

Cuando actualizas `products.json`:
1. Ejecuta: `node convert-excel-to-json.js`
2. Haz commit y push
3. Los dispositivos descargarán la nueva versión en background
4. Verán en **📦 Inventario**: fecha/hora de última actualización

## 🌐 Compatibilidad

| Navegador | Android | iPhone |
|-----------|---------|--------|
| Chrome | ✅ Completo | ✅ Completo |
| Safari | ✅ Soporte | ✅ Completo |
| Firefox | ✅ Soporte | ⚠️ Limitado |
| Edge | ✅ Soporte | ⚠️ Limitado |

**Nota**: Safari en iOS requiere permisos en Configuración > Safari > Cámara.

## 🚀 Deploy

### GitHub Pages
```bash
git add .
git commit -m "feat: Sistema de inventario offline"
git push origin main
```
Accede a: `https://tu-usuario.github.io/escaner/`

### Vercel / Netlify
Solo sube este repositorio - despliega automático.

## 📊 Gestión de Inconsistencias

El convertidor reporta:
- **Códigos de barras duplicados**: Mismo UPC en múltiples filas
- **Descripciones conflictivas**: SKU con descripciones diferentes
- **Cantidades**: Registra si un SKU tiene múltiples cantidades

Ejemplo de reporte:
```
📋 Inconsistencias encontradas:

codigo_barras_duplicado (114,220):
  - SKU: 1101000003, Fila: 3
  - SKU: 1101000003, Fila: 4
  ...

descripcion_conflictiva (1):
  - SKU: 1301000146, Fila: 133,967
    Actual: COMPUTADORA DE ESCRITORIO HP TG02-0001LA
    Nueva: COMPUTADORA DE ESCRITORIO HP
```

## 📱 PWA (Instalar como app)

En dispositivos móviles:
1. Abre en navegador
2. Menú > "Instalar app"
3. O toca el ícono **Compartir** > "Añadir a pantalla de inicio"

## 🔐 Datos Locales

Toda la información se guarda localmente:
- **localStorage**: Inventario actual + BD cachea
- **Cache API**: Assets offline (HTML, JS, estilos)
- **Nada se envía** a servidores externos

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Convertir nueva BD
node convert-excel-to-json.js

# Versionar cambios
git add .
git commit -m "feat: Descripción del cambio"
git push
```

## 📄 Licencia

ISC
