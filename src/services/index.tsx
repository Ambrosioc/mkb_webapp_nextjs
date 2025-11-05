import { lenboxConfig } from "../config/services";

export const fetchData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://mkb-backend-node-express.vercel.app";

  if (!apiUrl) {
    console.warn("⚠️ NEXT_PUBLIC_API_URL n'est pas définie. Utilisation de l'API de production par défaut.");
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes

    const response = await fetch(`${apiUrl}/api`, {
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
      console.error("Erreur réseau lors de la récupération des données:", error);
      throw new Error("Erreur de connexion réseau. Vérifiez que le serveur backend est accessible sur " + apiUrl);
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
