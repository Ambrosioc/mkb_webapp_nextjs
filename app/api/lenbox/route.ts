import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route pour sécuriser les appels Lenbox
 * Les clés secrètes (LENBOX_VD et LENBOX_AUTH_KEY) sont stockées côté serveur uniquement
 * et ne sont jamais exposées au client
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { montant, apport, duree, marque } = body;

    // Validation des données
    if (!montant || !apport || !duree) {
      return NextResponse.json(
        { error: 'Données manquantes: montant, apport et duree sont requis' },
        { status: 400 }
      );
    }

    // Récupération des clés privées depuis les variables d'environnement (sans NEXT_PUBLIC_)
    const clientKey = process.env.LENBOX_VD;
    const authKey = process.env.LENBOX_AUTH_KEY;
    const apiCreditUrl = process.env.LENBOX_API_URL || process.env.NEXT_PUBLIC_LENBOX_API_URL;
    const apiCreditCardUrl = process.env.LENBOX_API_URL_CB || process.env.NEXT_PUBLIC_LENBOX_API_URL_CB;

    // Vérification que les clés sont présentes
    if (!clientKey || !authKey || !apiCreditUrl) {
      console.error('❌ Clés Lenbox manquantes dans les variables d\'environnement');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Préparation des données pour l'API Lenbox
    const lenboxData = {
      authkey: authKey,
      vd: clientKey,
      montant: montant,
      apport: apport,
      duree: duree,
      marque: marque || "Test",
    };

    // Appel à l'API Lenbox depuis le serveur
    const response = await fetch(apiCreditUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lenboxData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API Lenbox:', response.status, errorText);
      return NextResponse.json(
        { error: 'Échec de la requête vers Lenbox', details: errorText },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, data: responseData.response });

  } catch (error: any) {
    console.error('❌ Erreur dans /api/lenbox:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'appel Lenbox', details: error.message },
      { status: 500 }
    );
  }
}

