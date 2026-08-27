/**
 * CapturaTops - Configuración
 * Personaliza estos valores según tu tienda
 */

window.CAPTURATOPS_CONFIG = {
    // ===== RACKS =====
    racks: [
        'TOP',
        'TOP MEDIO',
        'INTERMEDIO',
        'PISO'
    ],

    // ===== MAPEO DE COLUMNAS DE EXCEL =====
    // Personaliza según los nombres de tus columnas en Excel
    excelColumns: {
        sku: ['CODIGO SKU', 'SKU', 'CÓDIGO SKU'],              // Busca en este orden
        descripcion: ['DESCRIPCION', 'DESCRIPCION PRODUCTO', 'PRODUCTO', 'NOMBRE'],
        precio: ['PRECIO FINAL', 'PRECIO', 'VALOR'],
        categoria: ['CATEGORIA', 'TIPO', 'CATEGORIA PRODUCTO'],
    },

    // ===== OCR =====
    ocr: {
        enabled: true,
        languages: ['spa', 'eng'],              // Español + Inglés
        timeout: 30000,                         // 30 segundos timeout
        patterns: [
            /(\d{10})\s*(\d+)\s*x\s*(\d+)/i,   // 1301000123 2 x10
            /(\d{10})\s*(\d+)\s*x\s*(\d+)/i,   // 1301000123 2x10
            /(\d{10})\s*(\d+)\s*\(\s*(\d+)\)/i // 1301000123 2 (10)
        ]
    },

    // ===== DETECCIÓN DE COLOR (GREEN LABELS) =====
    greenLabel: {
        enabled: true,
        hueRange: [80, 160],        // Rango HSV para verde
        saturationMin: 30,
        brightnessMin: 50,
    },

    // ===== ALMACENAMIENTO =====
    storage: {
        dbKey: 'topsDatabase',
        lastSyncKey: 'topsLastSync',
        maxStorageSize: 50 * 1024 * 1024,  // 50MB
    },

    // ===== EXPORT =====
    export: {
        fileFormat: 'xlsx',                 // 'xlsx' o 'csv'
        columns: ['RACK', 'SKU', 'DESCRIPCION', 'CAJAS', 'UNID/CAJA', 'TOTAL', 'TIMESTAMP'],
        dateFormat: 'dd/mm/yyyy',
        autoFilename: 'Tops_{RACK}_{DATE}.xlsx',
    },

    // ===== VALIDACIÓN =====
    validation: {
        skuLength: 10,
        minBoxes: 1,
        maxBoxes: 999,
        minUnitsPerBox: 1,
        maxUnitsPerBox: 999,
    },

    // ===== INTERFAZ =====
    ui: {
        theme: 'auto',              // 'auto', 'light', 'dark'
        language: 'es',             // 'es', 'en'
        showProductInfo: true,      // Mostrar descripción de BD
        confirmBeforeSave: true,    // Pedir confirmación al guardar
    },

    // ===== LOGS =====
    debug: false,                   // Activa para ver logs en consola
};

// ===== VALIDACIÓN DE CONFIGURACIÓN =====
function validateConfig() {
    const config = window.CAPTURATOPS_CONFIG;

    console.log('✅ CapturaTops Config Validado');
    console.log('   Racks:', config.racks.length);
    console.log('   OCR:', config.ocr.enabled ? 'Habilitado' : 'Deshabilitado');
    console.log('   Export:', config.export.fileFormat.toUpperCase());
    console.log('   Debug:', config.debug ? 'ON' : 'OFF');
}

// Validar al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', validateConfig);
} else {
    validateConfig();
}

// Exportar para uso en otros scripts
window.getConfig = () => window.CAPTURATOPS_CONFIG;
