// Configuración global y personalizable de BAMVERSE
// Aquí Luis ("Güerito") puede modificar fácilmente fechas, fotos y preferencias

export const SITE_CONFIG = {
  names: {
    he: "Luis",
    heNickname: "Güerito",
    she: "Michelle",
    sheNickname: "Pecosa",
    couple: "Pecosa ♡ Güerito",
    signature: "Con amor, tu Güerito",
  },
  // Fecha oficial de inicio de la relación: 1 de junio de 2026 (00:00:00)
  relationshipStartDate: "2026-06-01T00:00:00",
  
  photos: {
    pecosaMain: "/images/pecosa.jpg",
    coupleEnding: null, // Puedes colocar aquí '/images/nosotros.jpg' más adelante
  },

  audio: {
    ambientVolume: 0.35,
    customAudioPath: null, // Si agregas un mp3, ponlo en '/music/cancion.mp3'
  }
};
