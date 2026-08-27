# ⚡ Setup Rápido - CapturaTops

## 🎯 Objetivo
Subir CapturaTops a GitHub Pages para probar en Samsung S23 Ultra.

---

## 📋 Pasos (5 minutos)

### 1. Preparar BD con datos reales
```bash
cd tops-inventory
node scripts/excel-to-db.js /ruta/a/tu-base-datos.xlsx
```

**Nota:** El script busca columnas: `CODIGO SKU` y `DESCRIPCION`  
Si tus columnas son diferentes, edita `scripts/excel-to-db.js` línea ~36

### 2. Crear repo en GitHub
1. Ve a https://github.com/new
2. Nombre: **capturatop**
3. Descripción: "Captura de tops tienda"
4. **Public** ✓
5. Create repository

### 3. Conectar y subir
```bash
# Desde carpeta tops-inventory
git init
git add .
git commit -m "Initial: CapturaTops"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/capturatop.git
git push -u origin main
```

### 4. Activar GitHub Pages
1. Ve a https://github.com/TU-USUARIO/capturatop
2. Settings → Pages
3. Branch: **main** / **(root)**
4. Save

**¡Listo!** Accede en 2 minutos a:
```
https://tu-usuario.github.io/capturatop/
```

### 5. Instalar en Samsung S23
1. Abre Chrome
2. Ve a: `https://tu-usuario.github.io/capturatop/`
3. Espera 5 seg
4. Menú (⋮) → **Instalar aplicación**
5. ✅ Hecho

---

## 🔧 Personalizar

### Cambiar racks (TOP, TOP MEDIO, etc.)
Edita `config.js` línea ~8:
```javascript
racks: [
    'TOP',
    'TOP MEDIO',
    'INTERMEDIO',
    'PISO'
],
```

### Cambiar columnas de Excel
Edita `scripts/excel-to-db.js` línea ~36:
```javascript
sku: String(row['TU-COLUMNA-SKU'] || '').trim(),
descripcion: String(row['TU-COLUMNA-DESC'] || '').trim(),
```

### Cambiar tema
Edita `config.js` línea ~54:
```javascript
theme: 'dark',  // 'light', 'dark', o 'auto'
```

---

## 🔄 Actualizar BD diariamente

Cada vez que recibas una BD actualizada:

```bash
cd tops-inventory

# Convertir Excel a db-preload.js
node scripts/excel-to-db.js ./datos-tienda-NUEVA.xlsx

# Subir a GitHub
git add db-preload.js
git commit -m "Update: $(date +%Y-%m-%d)"
git push

# En el S23, solo hacer refresh
```

---

## ✅ Checklist

- [ ] Excel de BD preparado
- [ ] Columnas configuradas en `excel-to-db.js`
- [ ] Repo creado en GitHub
- [ ] Primera BD exportada a `db-preload.js`
- [ ] Código subido (`git push`)
- [ ] Pages habilitado en Settings
- [ ] App visible en GitHub Pages
- [ ] Instalado en Samsung S23

---

## 🆘 Quick Troubleshoot

| Error | Solución |
|-------|----------|
| "git: command not found" | Instala Git desde: https://git-scm.com |
| "Cannot find module xlsx" | `npm install xlsx` |
| Página en blanco | F12 → Console, busca errores rojos |
| No se instala en S23 | Espera 10 seg, Chrome debe ofrecer "Instalar" |
| OCR lento | Normal, 1era vez ~10 seg. Después está en caché |

---

## 📞 Próximos pasos

1. **Probar OCR:** Carga BD → Toma foto de etiqueta verde → Debe leer SKU automático
2. **Verificar cálculos:** Verifica que "2 cajas × 10 unidades = 20 total"
3. **Exportar Excel:** Captura algunos tops → Export → Abre en PC

---

## 🎓 Más info

- **README.md** - Documentación completa
- **GITHUB_SETUP.md** - Setup detallado GitHub Pages
- **config.js** - Todas las opciones de configuración

---

¡Lista para producción en 10 minutos! 🚀
