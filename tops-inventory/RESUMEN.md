# 📊 CapturaTops - RESUMEN EJECUTIVO

**Fecha:** 26 de Agosto de 2026  
**Estado:** ✅ LISTO PARA PRODUCCIÓN  
**Plataforma:** GitHub Pages + Samsung S23 Ultra

---

## 🎯 ¿Qué es CapturaTops?

Aplicación web PWA (Progressive Web App) para captura automática de inventario en tops de estanterías usando:
- 📷 **Cámara del dispositivo** - Captura fotos
- 🤖 **OCR automático** - Lee SKU + cantidades
- 💾 **BD offline** - Consulta local sin conexión
- 📊 **Export Excel** - Genera reportes verificados
- 📱 **Instalable** - Se instala como app nativa

---

## 📁 Archivos creados

```
tops-inventory/
├── 📄 index.html          ← APP PRINCIPAL (el núcleo)
├── 📄 config.js           ← Configuración personalizable
├── 📄 db-preload.js       ← BD precargada (actualizar diariamente)
├── 📄 manifest.json       ← Configuración PWA
├── 📄 sw.js              ← Service Worker (offline)
├── 📄 package.json        ← Dependencias
├── 📁 scripts/
│   └── excel-to-db.js     ← Script para convertir Excel → DB
├── 📄 README.md           ← Documentación completa
├── 📄 GITHUB_SETUP.md     ← Cómo subir a GitHub Pages
├── 📄 SETUP.md            ← Guía rápida (comienza aquí)
└── 📄 .gitignore          ← Archivos a ignorar en Git
```

---

## ⚙️ Flujo de trabajo

```
1. CARGAR BD
   Usuario → Carga Excel local
   App → Convierte a JSON
   Device → Guarda en localStorage

2. CAPTURAR FOTOS
   Usuario → Toma foto del top
   App → Extrae etiqueta verde
   OCR → Lee: SKU + cajas + unidades

3. VERIFICAR
   Usuario → Revisa lectura (editar si hay error)
   App → Consulta descripción en BD
   Display → Muestra total = cajas × unidades

4. GUARDAR
   Usuario → Confirma "Guardar"
   App → Almacena en dispositivo
   List → Muestra en listado del rack

5. EXPORTAR
   Usuario → Toca "Descargar"
   App → Genera Excel
   File → Se descarga: Tops_TOP_2026-08-26.xlsx
```

---

## 🚀 Próximos pasos (EN ORDEN)

### PASO 1: Preparar BD (5 min)
```bash
cd tops-inventory
node scripts/excel-to-db.js /ruta/a/base-datos-aplicaciones-tienda.xlsx
```
**Resultado:** Se actualiza `db-preload.js` con tus SKUs y descripciones

### PASO 2: Crear repositorio GitHub (2 min)
1. https://github.com/new
2. Nombre: **capturatop**
3. Public
4. Create

### PASO 3: Subir código (3 min)
```bash
git remote add origin https://github.com/TU-USUARIO/capturatop.git
git branch -M main
git push -u origin main
```

### PASO 4: Activar GitHub Pages (1 min)
1. Settings → Pages
2. Branch: main / (root)
3. Save

**¡LISTO!** Accede a: `https://tu-usuario.github.io/capturatop/`

### PASO 5: Instalar en Samsung S23 (2 min)
1. Abre Chrome
2. Ve a la URL anterior
3. Menú (⋮) → Instalar aplicación
4. ✅ Aparece en pantalla inicio

---

## 📱 Modo de uso en el S23

```
HOME
 ↓
Toca CapturaTops app
 ↓
Pantalla: "Cargar Base de Datos"
  → Si primera vez, cargas Excel
  → Si ya está, muestra "BD cargada ✓"
 ↓
Pantalla: "Captura de Tops"
  → Selecciona Rack (TOP, TOP MEDIO, etc.)
  → Toca botón grande 📷 FOTO
  → Toma foto de etiqueta verde
  → App lee automáticamente: SKU + cantidad
  → Editas si hay error
  → Tocas ✅ GUARDAR
  → Aparece en lista del rack
  → Repites para todas las cajas del rack
 ↓
Cuando termines el rack:
  → Toca 📥 DESCARGAR
  → Se genera Excel: Tops_TOP_2026-08-26.xlsx
  → Se descarga al dispositivo
 ↓
Cambias de Rack:
  → Toca "Cambiar Rack"
  → Selecciona siguiente
  → Repites proceso
```

---

## 🔄 Actualizar BD diariamente

**Cada mañana recibir BD actualizada:**

```bash
# 1. Cuando llegue el Excel nuevo
node scripts/excel-to-db.js ./datos-tienda-HOY.xlsx

# 2. Subir cambio
git add db-preload.js
git commit -m "Update database: $(date +%Y-%m-%d)"
git push

# 3. En los S23, solo hacer refresh de navegador
#    (la BD nueva se carga automáticamente)
```

---

## ⚙️ Personalización

### Cambiar racks según tu tienda
Edita `config.js`:
```javascript
racks: ['TOP', 'TOP MEDIO', 'PISO', 'SOTANO'],
```

### Cambiar columnas de Excel
Edita `scripts/excel-to-db.js` si tus columnas son:
```javascript
sku: String(row['TU-COLUMNA-SKU']).trim(),
descripcion: String(row['TU-COLUMNA-DESC']).trim(),
```

### Cambiar tema oscuro/claro
Edita `config.js`:
```javascript
theme: 'dark',  // 'light', 'dark', 'auto'
```

---

## 📊 Características técnicas

| Aspecto | Detalles |
|--------|---------|
| **OCR** | Tesseract.js (español + inglés) |
| **Almacenamiento** | localStorage (hasta 50MB por dispositivo) |
| **Offline** | 100% offline después de 1era carga |
| **Export** | Excel 2007+ (.xlsx) con SheetJS |
| **Seguridad** | Sin datos en cloud, todo local |
| **Compatible** | Chrome/Android 8+ |
| **Tamaño** | ~2MB (primero carga Tesseract ~100MB caché) |

---

## ✅ Testing en S23

### Test Básico
1. Carga BD → Debe mostrar "✓ BD cargada"
2. Selecciona rack → Debe cambiar
3. Toma foto → Debe leer etiqueta
4. Edita manualmente → Debe actualizar total
5. Guardar → Debe aparecer en lista
6. Export → Debe generar Excel

### Test de Formato
Toma foto a etiqueta con:
- `1301000123 2 x10` ← Debe leer correctamente
- `1301000123 2x10` ← Sin espacios también
- Manual → Escribe 1301000456 / 3 / 15 → Debe calcular 45

---

## 🆘 Troubleshooting rápido

| Problema | Causa | Solución |
|----------|-------|----------|
| Página en blanco | Script error | F12 → Console → ver error rojo |
| OCR lee mal | Foto borrosa/mala iluminación | Toma otra foto clara |
| No se instala | No es HTTPS | GitHub Pages es automático HTTPS |
| BD no carga | Script Excel-to-db fallo | Ver error: `node scripts/excel-to-db.js` |
| Exporta vacío | No hay cajas capturadas | Captura primero algunas cajas |

---

## 📞 Soporte

Errores comunes y soluciones:
- **Ver logs:** F12 en Chrome → Pestaña Console
- **Resetear app:** Borrar localStorage en DevTools → Application
- **Rebuild BD:** `node scripts/excel-to-db.js nuevo-archivo.xlsx`

---

## 📈 Roadmap futuro (opcional)

```
v1.1: Sincronización a nube (Google Drive)
v1.2: Reportes gráficos por rack
v1.3: Multi-usuario con perfiles
v1.4: Integración con API tienda real
v2.0: App nativa Android (Capacitor full)
```

---

## ✨ Lo que conseguiste

✅ App separada de scan-main (sin conflictos)  
✅ OCR automático de etiquetas verdes  
✅ BD offline actualizable diariamente  
✅ Export Excel automático por rack  
✅ Instalable en Samsung S23  
✅ Interface responsive y tema oscuro  
✅ Documentación completa  
✅ Script para actualizar BD  

---

## 🎉 Resumen

| Qué | Dónde |
|-----|-------|
| **App** | https://tu-usuario.github.io/capturatop/ |
| **Código** | https://github.com/tu-usuario/capturatop |
| **Documentación** | `README.md` y `SETUP.md` |
| **Configuración** | `config.js` |
| **BD dinámica** | `db-preload.js` (actualizar diariamente) |

---

**¡LISTA PARA IR A PRODUCCIÓN! 🚀**

Próximo paso: Sigue `SETUP.md` para los 5 pasos finales.
