"use client";
import { Hero } from "@/src/components";
import { savePageVisitedToLocalStorage } from "@/src/components/localStorage/SaveToLocalStorage";
import SocialNetwork from "@/src/components/socialNetwork/SocialNetwork";
import HomeRevews from "@/src/components/trustmary/HomeRevews";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  carsModel,
  manifactureLogo,
  sectionHome,
  supportCards,
} from "@/src/constants";
import { ArrowRight, Award, Phone, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../src/styles/trustmary.css";

const faqData = [
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
];

export default function Home({ }) {
  const router = useRouter();
  console.warn(
    "Avertissement : En utilisant cette console, vous vous exposez au risque que des personnes malveillantes se fassent passer pour vous et volent vos informations grâce à une attaque appelée Self-XSS. Ne saisissez pas et ne copiez pas du code que vous ne comprenez pas.",
  );
  return (
    <>
      <main className="overflow-hidden">
        <Hero />
        <div>
          {/* <div className="w-full flex flex-col justify-center items-center py-15">
            <h2>
              <span style={{ color: "#ff9f1c" }}>Recherche</span> rapide
            </h2>
            <div className="mt-12 w-full flex justify-evenly pb-20">
              <SearchBar />
            </div>
          </div> */}
          <section className="w-full py-32 border-t border-gray-200 bg-gradient-to-b from-primary-orange-50 via-white to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              <div className="w-full pb-16 flex flex-col items-center space-y-4">
                <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-6 py-2 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  Qualité certifiée
                </Badge>
                <h2 className="text-h1 text-center max-w-3xl">
                  <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">MKB</span> - Un gage de qualité
                </h2>
                <p className="text-body-lg text-grey text-center max-w-2xl">
                  Des véhicules rigoureusement sélectionnés et vérifiés pour votre sécurité
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {sectionHome.map((section, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-large bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
                  >
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-orange/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative p-6 rounded-full bg-gradient-to-br from-primary-orange-50 to-white shadow-medium group-hover:scale-110 transition-transform duration-500">
                          <Image
                            src={section.img}
                            width={60}
                            height={60}
                            alt={`${section.title}-logo`}
                            className="transition-transform duration-500 group-hover:rotate-6"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-h3 font-bold">{section.title}</h3>
                        <p className="text-body text-grey leading-relaxed max-w-sm">
                          {section.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <HomeRevews />
          <section className="flex items-center w-full py-32 bg-gradient-to-b from-white via-primary-orange-50/50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,159,28,0.1),transparent)]" />
            <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              <div className="space-y-6 text-center mb-12">
                <div className="flex items-center justify-center gap-3">
                  <Star className="w-6 h-6 text-primary-orange fill-primary-orange" />
                  <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5">
                    Avis clients
                  </Badge>
                  <Star className="w-6 h-6 text-primary-orange fill-primary-orange" />
                </div>
                <h2 className="text-h1">
                  <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">Recommandé</span> par nos clients
                </h2>
                <p className="text-body-lg text-grey max-w-2xl mx-auto">
                  Plus de 98% de nos clients nous recommandent. Découvrez leurs témoignages authentiques.
                </p>
              </div>
              <div id="trustmary-widget" className="w-full min-h-[400px] flex items-center justify-center" />
            </div>
          </section>
          <section className="py-32 border-t border-gray-200 bg-gradient-to-br from-white via-primary-orange-50/30 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,159,28,0.15),transparent)]" />
            <div className="max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-4">
                    <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5 w-fit">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Occasions à saisir
                    </Badge>
                    <h2 className="text-h1 leading-tight">
                      Ne ratez pas{" "}
                      <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">
                        une bonne occasion
                      </span>
                    </h2>
                    <p className="text-body-lg text-grey leading-relaxed max-w-lg">
                      La meilleure façon d'acheter votre voiture à proximité de chez vous et cela partout en France.
                      Des véhicules vérifiés aux meilleurs prix.
                    </p>
                  </div>
                  <Button
                    variant="orange"
                    size="lg"
                    className="rounded-full px-8 py-6 text-lg shadow-large hover:shadow-xl transition-all duration-300 group"
                    onClick={() => {
                      savePageVisitedToLocalStorage("voitures-occasions");
                      router.push("/voitures-occasions");
                    }}
                  >
                    Trouver votre voiture
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  {carsModel.map((car, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-large bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                        <Image
                          src={car.path}
                          width={350}
                          height={200}
                          alt={car.title}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-h4 font-bold group-hover:text-primary-orange transition-colors">
                          {car.title}
                        </h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="flex w-full py-32 bg-gradient-to-br from-white to-primary-orange-50/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-orange/10 rounded-3xl blur-3xl" />
                <Card className="border-0 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                  <div className="relative">
                    <Image
                      src="/MKB-automobile-Trouvez-votre-voiture-600-400.webp"
                      width={600}
                      height={400}
                      alt="service-personnalise"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </Card>
              </div>
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5 w-fit">
                    <Users className="w-4 h-4 mr-2" />
                    Service personnalisé
                  </Badge>
                  <h2 className="text-h1 leading-tight">
                    Bénéficiez d'un accompagnement{" "}
                    <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">
                      adapté à vos besoins
                    </span>{" "}
                    via la recherche personnalisée
                  </h2>
                  <p className="text-body-lg text-grey leading-relaxed">
                    Nos experts vous accompagnent tout au long de votre processus d'achat.
                    Un service sur-mesure pour trouver le véhicule qui correspond exactement à vos attentes.
                  </p>
                </div>
                <Button
                  variant="orange"
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg shadow-large hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {
                    savePageVisitedToLocalStorage("recherche-personnalisee");
                    router.push("/recherche-personnalisee");
                  }}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>
          <section className="flex w-full justify-center py-32 bg-gradient-to-br from-primary-orange-50 via-white to-primary-orange-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,159,28,0.15),transparent)]" />
            <div className="grid md:grid-cols-2 gap-8 max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              {supportCards.map((card, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-cover bg-center relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url(${card.backgroundImage})`,
                    minHeight: '320px',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent group-hover:from-primary-orange/10 transition-colors duration-500" />
                  <CardContent className="relative z-10 flex flex-col justify-center items-center h-full space-y-6 p-8 text-center">
                    <div className="space-y-2">
                      <h2 className="text-h2 font-bold">{card.title}</h2>
                      <Separator className="w-16 bg-primary-orange/30" />
                    </div>
                    <p className="text-body-lg text-grey max-w-md leading-relaxed">{card.text}</p>
                    <Button
                      variant="orange"
                      size="lg"
                      className="rounded-full px-8 py-6 shadow-large hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      onClick={() => {
                        const keyStorage = card.path.split("/")[1];
                        savePageVisitedToLocalStorage(keyStorage);
                        router.push(card.path);
                      }}
                    >
                      {card.btnTitle}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <section className="flex w-full justify-center py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              <div className="flex flex-col items-center space-y-6 mb-16">
                <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5 mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sélection premium
                </Badge>
                <h2 className="text-h1 text-center">
                  <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">
                    Nos marques et modèles
                  </span>{" "}
                  les plus populaires
                </h2>
                <p className="text-body-lg text-grey text-center max-w-2xl">
                  Des véhicules de toutes les grandes marques, soigneusement sélectionnés et vérifiés
                </p>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-6 mb-12">
                {manifactureLogo.map((link, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-medium bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group p-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <Image
                        src={link.img}
                        width={100}
                        height={100}
                        alt={link.alt}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button
                  variant="orange"
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg shadow-large hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {
                    savePageVisitedToLocalStorage("voitures-occasions");
                    router.push("/voitures-occasions");
                  }}
                >
                  Venez découvrir
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>
          <section className="w-full flex justify-center py-32 bg-gradient-to-br from-primary-orange-50 via-white to-primary-orange-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,159,28,0.1),transparent)]" />
            <div className="max-w-[1440px] mx-auto px-6 sm:px-16 relative z-10">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm p-12">
                <div className="flex flex-col items-center space-y-8 text-center">
                  <div className="space-y-4">
                    <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5">
                      <Phone className="w-4 h-4 mr-2" />
                      Contactez-nous
                    </Badge>
                    <h2 className="text-h1">
                      Un modèle vous intéresse ?{" "}
                      <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">
                        Contactez-nous
                      </span>
                    </h2>
                    <p className="text-body-lg text-grey max-w-2xl mx-auto">
                      Nos experts vous accompagnent pour votre projet d'achat automobile.
                      Nous sommes à votre écoute !
                    </p>
                  </div>
                  <Separator className="w-24 bg-primary-orange/30" />
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Button
                      variant="orange"
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg shadow-large hover:shadow-xl transition-all duration-300 group"
                      asChild
                    >
                      <a href="tel:+33188830917" className="flex items-center">
                        <Phone className="mr-2 w-5 h-5" />
                        Parler à notre équipe
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg border-2 hover:bg-primary-orange-50 transition-all duration-300"
                      onClick={() => {
                        savePageVisitedToLocalStorage("contact");
                        router.push("/contact");
                      }}
                    >
                      Formulaire de contact
                    </Button>
                  </div>
                  <SocialNetwork />
                </div>
              </Card>
            </div>
          </section>
          <section className="flex w-full py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="flex flex-col max-w-[1440px] mx-auto w-full px-6 sm:px-16 items-center space-y-12 relative z-10">
              <div className="text-center space-y-6 max-w-3xl">
                <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5">
                  FAQ
                </Badge>
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
              <Card className="w-full border-0 shadow-large bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                        <AccordionTrigger className="text-left text-h4 hover:no-underline py-6">
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
              <Button
                variant="orange"
                size="lg"
                className="rounded-full px-8 py-6 text-lg shadow-large hover:shadow-xl transition-all duration-300 group"
                onClick={() => {
                  savePageVisitedToLocalStorage("faq");
                  router.push("/faq");
                }}
              >
                Accéder à la FAQ complète
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
