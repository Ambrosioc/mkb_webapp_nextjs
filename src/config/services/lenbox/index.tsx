// Type: Config file for Lenbox API calls
// ⚠️ NOTE: Les clés secrètes (LENBOX_VD et LENBOX_AUTH_KEY) et les URLs sont maintenant gérées côté serveur
// via l'API route /api/lenbox. Toutes les variables sensibles sont privées (sans NEXT_PUBLIC_).
// Ce fichier est conservé pour compatibilité mais n'est plus utilisé côté client.
export const lenboxConfig = {
  // URLs maintenant gérées côté serveur uniquement
  // Ces valeurs ne sont plus utilisées côté client
  apiCreditUrl: process.env.NEXT_PUBLIC_LENBOX_API_URL,
  apiCreditCardUrl: process.env.NEXT_PUBLIC_LENBOX_API_URL_CB,
};
