import { lenboxConfig } from "../config/services";

export const fetchData = async () => {
  const envApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const prodBase = "https://mkb-backend-node-express.vercel.app";
  const primaryBase = envApiUrl && envApiUrl.trim().length > 0 ? envApiUrl : prodBase;

  if (!primaryBase) {
    console.warn("⚠️ NEXT_PUBLIC_API_URL n'est pas définie. Utilisation de l'API de production par défaut.");
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes

    const response = await fetch(`${primaryBase}/api`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Les données ne sont pas au format JSON attendu (tableau)");
    }

    return data;
  } catch (error: any) {
    // Gestion des erreurs
    if (error.name === 'AbortError') {
      console.error("Timeout lors de la récupération des données:", error);
      throw new Error("La requête a pris trop de temps. Veuillez réessayer plus tard.");
    }

    if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      console.error("Erreur réseau lors de la récupération des données (base):", primaryBase, error);
      // Fallback automatique vers l'API de production si l'API locale est indisponible
      if (primaryBase.includes('localhost') || primaryBase.includes('127.0.0.1')) {
        try {
          const controllerFallback = new AbortController();
          const timeoutIdFallback = setTimeout(() => controllerFallback.abort(), 30000);
          const fallbackUrl = `${prodBase}/api`;
          const responseFallback = await fetch(fallbackUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controllerFallback.signal,
          });
          clearTimeout(timeoutIdFallback);
          if (!responseFallback.ok) {
            throw new Error(`HTTP error (fallback)! Status: ${responseFallback.status}`);
          }
          const dataFallback = await responseFallback.json();
          if (!Array.isArray(dataFallback)) {
            throw new Error("Les données (fallback) ne sont pas au format JSON attendu (tableau)");
          }
          console.warn("⚠️ API locale indisponible. Données chargées depuis l'API de production.");
          return dataFallback;
        } catch (fallbackError) {
          console.error("Échec du fallback vers l'API de production:", fallbackError);
        }
      }
      throw new Error("Erreur de connexion réseau. Vérifiez que le serveur backend est accessible sur " + primaryBase);
    }

    console.error(
      "Une erreur s'est produite lors de la récupération des données JSON:",
      error,
    );
    throw error;
  }
};

export const submitLoanApplication = async (data: any) => {
  try {
    const response = await fetch(lenboxConfig.apiCreditUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Échec de la requête POST vers Finnocar");
    }
    const responseData = await response.json();
    return responseData.response;
  } catch (error) {
    console.log(error);
  }
};
