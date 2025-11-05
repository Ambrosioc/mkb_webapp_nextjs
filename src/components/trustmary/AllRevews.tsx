"use client";

import { trustmaryConfig } from "@/src/config/services";
import { useEffect, useRef } from "react";

const AllRevews = () => {
  const scriptLoadedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Éviter les appels multiples
    if (scriptLoadedRef.current) {
      return;
    }

    const revewsContainer = document.querySelector("#trustmary-widget-reviews");
    if (!revewsContainer) return;

    // Vérifier si le script est déjà chargé dans le DOM (au cas où il existerait déjà)
    const existingScript = document.querySelector(
      `script[src*="widget.trustmary.com/${trustmaryConfig.allApiKey}"]`
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
    script.src = `https://widget.trustmary.com/${trustmaryConfig.allApiKey}`;
    script.setAttribute("data-target", "#trustmary-widget-reviews");
    script.async = true;
    script.id = "trustmary-all-reviews-script";

    script.onerror = () => {
      console.warn("Erreur lors du chargement du widget Trustmary (all reviews)");
      scriptLoadedRef.current = false; // Permettre de réessayer en cas d'erreur
    };

    script.onload = () => {
      console.log("Widget Trustmary (all reviews) chargé avec succès");
    };

    // Nettoyer d'éventuels anciens noeuds dans le conteneur
    try {
      while (revewsContainer.firstChild) {
        revewsContainer.removeChild(revewsContainer.firstChild);
      }
    } catch {}
    // Injecter le script directement dans le conteneur cible pour rendre le widget à l'endroit prévu
    revewsContainer.appendChild(script);
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

export default AllRevews;
