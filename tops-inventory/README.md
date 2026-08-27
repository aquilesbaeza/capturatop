# CapturaTops 📸🏪

Aplicación PWA offline-first para captura y gestión de inventario de tops de estanterías con OCR automático.

## 🎯 Características

- ✅ **Carga de BD offline** - Datos almacenados en el dispositivo
- ✅ **OCR automático** - Lectura de etiquetas verdes (SKU + cantidad)
- ✅ **Detección de color** - Solo procesa etiquetas verdes (filtra blancas)
- ✅ **Corrección manual** - Validación y ajuste de lecturas
- ✅ **BD integrada** - Precargar descripción de productos
- ✅ **Export Excel** - Por rack, verificado y listo
- ✅ **PWA instalable** - Funciona en Android sin conexión
- ✅ **Modo oscuro** - Interfaz adaptable

## 🚀 Deployment en GitHub Pages

### 1. Crear repositorio
```bash
cd tops-inventory
git init
git add .
git commit -m "Initial commit: CapturaTops"
git remote add origin https://github.com/tu-usuario/capturatop.git
git branch -M main
git push -u origin main
```

### 2. Habilitar GitHub Pages
En Settings → Pages:
- Source: Deploy from a branch
- Branch: main / (root)

### 3. Acceder a la app
```
https://tu-usuario.github.io/capturatop/
```

## 📱 Usar en Samsung S23 Ultra

1. Abre en navegador: `https://tu-usuario.github.io/capturatop/`
2. Toca el menú (⋮) → "Instalar aplicación"
3. Aparecerá en la pantalla de inicio
4. Funciona sin conexión después de la primera visita

## 📊 Actualizar BD diariamente

### Opción 1: Desde la app
1. Abre CapturaTops
2. Toca el ícono 📥 "Cargar BD" en el header
3. Selecciona el Excel actualizado
4. Automáticamente se guarda en el dispositivo

### Opción 2: Precargar en la app
Edita `db-preload.js`:
```javascript
window.DATABASE_PRELOAD = [
    { sku: "1301000001", descripcion: "Producto 1" },
    { sku: "1301000002", descripcion: "Producto 2" },
    // ... más registros
];
```
Luego:
```bash
git add db-preload.js
git commit -m "Update database"
git push
```

## 📝 Formato de etiqueta esperado

La app reconoce automáticamente:
```
1301000123 2 x10
1301000123 2x10
1301000123  2  X  10
```

Donde:
- `1301000123` = SKU (10 dígitos)
- `2` = Cantidad de cajas de fondo
- `10` = Unidades por caja

**Total = 2 × 10 = 20 unidades**

## 🔧 Desarrollo local

Para desarrollo con live reload:
```bash
# Simple HTTP server
python -m http.server 8000

# O con Node.js
npx http-server
```

Accede a: `http://localhost:8000`

## 📦 Estructura de archivos

```
tops-inventory/
├── index.html           # App principal
├── db-preload.js        # BD precargada (actualizar diariamente)
├── manifest.json        # PWA manifest
├── sw.js               # Service Worker (offline)
├── README.md           # Este archivo
└── android/            # Config Capacitor (opcional)
```

## 🛠️ Tecnología

- **Frontend:** Vanilla JS + Tailwind CSS
- **OCR:** Tesseract.js (español + inglés)
- **Export:** SheetJS (Excel)
- **Almacenamiento:** localStorage + IndexedDB
- **PWA:** Service Worker + Web App Manifest

## ⚙️ Configuración inicial

### Columnas esperadas del Excel (BD)

Cuando cargas un Excel, la app busca estas columnas:
- `CODIGO SKU` o `SKU` (10 dígitos)
- `DESCRIPCION` o `DESCRIPCION PRODUCTO`

### Personalización de racks

En `index.html`, línea donde está `RACK_OPTIONS`, cambiar según tu tienda:
```javascript
const RACK_OPTIONS = ['TOP', 'TOP MEDIO', 'INTERMEDIO', 'PISO'];
```

## 🐛 Troubleshooting

### "Primero cargue un archivo Excel"
→ Abre la app y carga `db-preload.js` con datos, o carga manualmente un Excel

### OCR no funciona bien
→ Asegúrate que la foto esté clara y enfocada en la etiqueta verde
→ Puedes corregir manualmente en la pantalla de verificación

### No puedo instalar como app
→ Verifica que accedas por HTTPS (GitHub Pages lo ofrece)
→ Espera 5 segundos después de que cargue la página

## 📧 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

---

**Versión:** 1.0.0  
**Última actualización:** 2026-08-26  
**Estado:** Production Ready ✅
