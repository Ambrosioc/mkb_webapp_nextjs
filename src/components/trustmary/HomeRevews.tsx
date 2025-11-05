"use client";

import { trustmaryConfig } from "@/src/config/services";
import { useEffect, useRef } from "react";

const HomeRevews = () => {
  const scriptLoadedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Éviter les appels multiples
    if (scriptLoadedRef.current) {
      return;
    }

    const container = document.querySelector("#trustmary-widget");
    if (!container) return;

    // Vérifier si le script est déjà chargé dans le DOM (au cas où il existerait déjà)
    const existingScript = document.querySelector(
      `script[src*="widget.trustmary.com/${trustmaryConfig.homeApiKey}"]`
    );

    // Si le script existe déjà, marquer comme chargé et ne pas recharger
    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    // Marquer comme chargé avant de créer le script pour éviter les doubles chargements
    scriptLoadedRef.current = true;

    // Charger le script seulement si nécessaire
    const script = document.createElement("script");
    script.src = `https://widget.trustmary.com/${trustmaryConfig.homeApiKey}`;
    script.setAttribute("data-target", "#trustmary-widget");
    script.async = true;
    script.id = "trustmary-home-widget-script";

    script.onerror = () => {
      console.warn("Erreur lors du chargement du widget Trustmary");
      scriptLoadedRef.current = false; // Permettre de réessayer en cas d'erreur
    };

    script.onload = () => {
      console.log("Widget Trustmary (home) chargé avec succès");
    };

    // Nettoyer d'éventuels anciens noeuds dans le conteneur
    try {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    } catch {}
    // Injecter le script directement dans le conteneur cible pour rendre le widget à l'endroit prévu
    container.appendChild(script);
    scriptRef.current = script;

    return () => {
      // Nettoyage : ne supprimer le script que si le composant est vraiment démonté
      // et seulement si le script n'est pas encore chargé
      if (scriptRef.current && !scriptRef.current.hasAttribute("data-loaded")) {
        scriptRef.current.remove();
        scriptLoadedRef.current = false;
      }
    };
  }, []); // Tableau de dépendances vide pour s'exécuter une seule fois

  return null;
};

export default HomeRevews;
