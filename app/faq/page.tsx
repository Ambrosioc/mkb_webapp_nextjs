"use client";
import { Main } from "@/src/components/layouts";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { savePageVisitedToLocalStorage } from "@/src/components/localStorage/SaveToLocalStorage";
import React from "react";

const Faq = () => {
  const router = useRouter();
  
  const foqContainerFaq = [
    {
      title: "Achat du véhicule",
      data: [
        {
          question: "Comment se passe l’achat d’un véhicule sur MKB Automobile",
          answer:
            "Accédez à la fiche détaillée pour chacun des véhicules proposés. Vous pouvez nous contacter par e-mail ou téléphone pour plus de renseignements. Le véhicule de vos rêves n’est pas encore disponible ? Inscrivez-vous à notre newsletter et restez informés des prochains véhicules correspondant à vos critères de recherche.",
        },
        {
          question: "La réservation d’un véhicule sélectionné",
          answer:
            " Vous avez trouvé votre véhicule et vous souhaitez le voir et l’essayer ? Vous devez simplement réserver sur notre site, le véhicule sera ainsi bloqué et ne pourra plus être vendu à d’autres clients. L’un de nos conseillers prend ensuite contact avec vous et convient d’un rendez-vous en fonction des disponibilités du vendeur. La livraison est également possible sur demande.",
        },
        {
          question: "La remise des clés",
          answer:
            "La visite du véhicule se fait avec l’un de nos agents. Vous vous présentez au rendez-vous fixé en ayant effectué votre virement sur un compte séquestre, bloqué et sécurisé ou un chèque de banque. Après l’essai du véhicule vous ne souhaitez pas concrétiser la transaction, nous vous remboursons immédiatement. Le véhicule vous plait ? Notre agent vous accompagne dans les démarches et vous repartez avec.",
        },
        {
          question: "Comment savoir si une voiture a des imperfections ?",
          answer:
            "Nous vous montrons de manière transparente les éventuelles imperfections dans notre galerie de photos. Nous suivons un processus très méticuleux pour identifier les imperfections et l’usure. Ces marques d’usure sont dues à une utilisation et un kilométrage normaux et n’apparaissent pas dans la galerie de photos. Vous pouvez en savoir plus sur nos normes de qualité en cliquant ici.",
        },
        {
          question: "Comment puis-je voir la voiture avant de la commander ?",
          answer:
            "Nous vous invitons à prendre rendez-vous par téléphone ou mail afin de confirmer un rendez-vous pour la tester.",
        },
        {
          question: "Comment prendre un rendez-vous de reprise de voiture ?",
          answer:
            "Après avoir fait une demande d'estimation en ligne, vous recevrez votre prix de vente final par e-mail. Il faudra valider un rendez-vous sur notre site web pour prendre rendez-vous. Prise de rendez-vous par : Téléphone : 01 88 83 09 17 E-mail : contact@portfolio.dev",
        },
      ],
    },
    {
      title: "Réprise du véhicule",
      data: [
        {
          question: "Quelles sont les étapes de ventes ?",
          answer: `<ul>
          <li>Estimez votre voiture</li>
          <li>Prenez un rendez- vous en agence</li>
          <li>Nous faisons l’expertise de votre véhicule</li>
          <li>Votre véhicule est vendu 😄</li>
        </ul>`,
        },
        {
          question: "Comment est calculé le prix de votre véhicule ?",
          answer: `Nos experts déterminent le prix de vente en fonction des critères saisis.

Une étude est faîte en se basant sur la marque, modèle, kilométrage, la date de première mise en circulation, la motorisation et l’état général du véhicule.

Vous recevrez un prix de vente cohérent avec le marché du rachat immédiat par un professionnel.`,
        },
        {
          question: "Comment prendre un rendez-vous de reprise de voiture ?",
          answer: `Après avoir fait une demande d’estimation en ligne, vous recevrez votre prix de vente final par e-mail.

Il faudra valider un rendez-vous sur notre site web pour prendre rendez-vous.

Prise de rendez-vous par :
<ul>
<li>Téléphone : 01 88 83 09 17 </li>
<li>E-mail : contact@portfolio.dev </li>
</ul>`,
        },
        {
          question:
            "Est-ce qu'il y a des coûts supplémentaires lors de la vente de ma voiture ?",
          answer:
            "Non, aucun frais supplémentaire lors de l’estimation de votre voiture.",
        },
      ],
    },
    {
      title: "Les garantie MKB",
      data: [
        {
          question: "Comment savoir si une voiture a des imperfections ?",
          answer:
            "Nous vous informons en toute transparence sur les éventuelles marques d’usure ou des rayures sur notre galerie d’exposition en ligne. Nous suivons un processus très méticuleux pour les identifier.",
        },
        {
          question: "Comment puis-je voir la voiture avant de la commander ?",
          answer:
            "Nous vous invitons à prendre rendez-vous par téléphone ou mail afin de confirmer un rendez-vous pour la tester.",
        },
      ],
    },
    {
      title: "Financement",
      data: [
        {
          question: "Paiement en plusieurs fois",
          answer: `Conditions d’éligibilité :
<ul>
<li>Avoir une carte bancaire (Visa, MasterCard, … Hors carte de retrait type électron) </li>
<li>Avoir la majorité légale (18 ans révolus) </li>
<li>Ne pas être fiché en banque de France </li>
<li>Avoir une Carte bancaire valable jusqu’à la date du dernier paiement </li>
<li>Avoir un compte bancaire avec + de 3 mois d’ancienneté </li>
<li>Pour les étrangers, avoir un titre de séjour valable jusqu’à la fin du paiement. </li>
</ul>`,
        },
        {
          question: "Quels sont les différents types de moyens de paiement ?",
          answer: `Nous acceptons les moyens de paiement suivants :
          <ul>
          <li>Carte bancaire (Visa, MasterCard, … Hors carte de retrait type électron) </li>
          <li>Chèque de banque </li>
          <li>Virement bancaire </li>
          <li>Chèque </li>
          <li>Espèces </li>
          </ul>`,
        },
      ],
    },
    {
      title: "MKB Automobile",
      data: [
        {
          question: "Comment puis-je vous contacter ?",
          answer:
            "Que ce soit par téléphone ou par message, notre service client est là pour vous. Notre équipe se fera un plaisir de répondre à toutes vos questions concernant MKB Automobile, nos services ou votre commande. Tél : +33 1 88 83 09 17 E-mail : contact@mkbautomobile.com <>Horaires : Lun. – Ven. 09h00 – 19h00, Sam. 10h00 – 18h00",
        },
        {
          question: "Où êtes-vous situés ?",
          answer:
            "Notre siège est en région parisienne et nous avons plusieurs dépôts dans toute la France.",
        },
      ],
    },
  ];

  return (
    <>
      {/* Background with full width */}
      <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Content container with max-width */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 py-32 relative z-10">
          <div className="flex flex-col w-full items-center space-y-12">
          {/* Header Section - Same as home page */}
          <div className="text-center space-y-6 max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-primary-orange" />
              <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5">
                FAQ
              </Badge>
              <MessageCircle className="w-6 h-6 text-primary-orange" />
            </div>
            <h2 className="text-h1">
              Vous avez des questions ?{" "}
              <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">
                On essaie d'y répondre
              </span>
            </h2>
            <p className="text-body-lg text-grey">
              Trouvez rapidement les réponses aux questions les plus fréquentes
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="w-full space-y-8">
            {foqContainerFaq.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-0 shadow-large bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-h2 font-bold text-primary-orange mb-2">
                      {category.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-orange to-orange-600 rounded-full"></div>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {category.data.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`category-${categoryIndex}-item-${index}`} 
                        className="border-b border-gray-200 last:border-0"
                      >
                        <AccordionTrigger className="text-left text-h4 hover:no-underline py-6 hover:text-primary-orange transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-body text-grey leading-relaxed pb-6">
                          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="w-full border-0 shadow-xl bg-gradient-to-br from-primary-orange-50 via-white to-primary-orange-50">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-h2">
                  Vous n'avez pas trouvé la réponse que vous cherchiez ?
                </h2>
                <p className="text-body-lg text-grey max-w-2xl mx-auto">
                  Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
              <Button
                variant="orange"
                size="lg"
                className="rounded-full px-8 py-6 text-lg shadow-large hover:shadow-xl transition-all duration-300 group"
                onClick={() => {
                  savePageVisitedToLocalStorage("contact");
                  router.push("/contact");
                }}
              >
                Nous contacter
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
