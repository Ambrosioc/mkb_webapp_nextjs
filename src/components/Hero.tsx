"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { savePageVisitedToLocalStorage } from "./localStorage/SaveToLocalStorage";
import { ArrowRight, Shield, CheckCircle2, Zap } from "lucide-react";

const Hero = () => {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Vérifier la taille d'écran au montage et lors du redimensionnement
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    // Vérifier au montage
    checkScreenSize();

    // Écouter les changements de taille
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return (
    <section className="relative w-full pt-32 pb-32 overflow-hidden">
      {/* Full-bleed background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-orange-50 via-white to-primary-orange-50/30 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-orange/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-1.5 text-sm font-semibold">
              <Shield className="w-3 h-3 mr-2" />
              Vente sécurisée
            </Badge>
            <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-700 px-4 py-1.5 text-sm font-semibold">
              <CheckCircle2 className="w-3 h-3 mr-2" />
              Garanti vérifié
            </Badge>
          </div>

          <div className="space-y-6">
            <h1 className="text-h1 max-sm:text-4xl font-bold leading-tight tracking-tight">
              L'achat de votre voiture{" "}
              <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-orange-600 bg-clip-text text-transparent">
                simple, fiable et sécurisé
              </span>
            </h1>
            <p className="text-body-lg text-grey max-w-xl leading-relaxed">
              Sécurisez votre achat et bénéficiez d'un accompagnement adapté à vos besoins. 
              Des véhicules vérifiés, des prix transparents, une expérience sans stress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="orange"
              size="lg"
              className="group text-lg px-8 py-6 rounded-full shadow-large hover:shadow-xl transition-all duration-300"
              onClick={() => {
                savePageVisitedToLocalStorage("voitures-occasions");
                router.push("/voitures-occasions");
              }}
            >
              Trouver votre véhicule
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary-orange-50 transition-all duration-300"
              onClick={() => {
                savePageVisitedToLocalStorage("recherche-personnalisee");
                router.push("/recherche-personnalisee");
              }}
            >
              Recherche personnalisée
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-orange" />
                <span className="text-2xl font-bold text-gray-900">1000+</span>
              </div>
              <p className="text-sm text-grey">Véhicules disponibles</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">98%</span>
              </div>
              <p className="text-sm text-grey">Clients satisfaits</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">100%</span>
              </div>
              <p className="text-sm text-grey">Vérifiés et garantis</p>
            </div>
          </div>
        </div>

        {/* Image container - Only rendered on desktop (≥1024px) */}
        {isDesktop && (
          <div className="hero__image-container relative hidden lg:block xl:flex xl:justify-end xl:items-center">
            <div className="hero__image relative w-full max-w-full h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-orange/20 to-transparent rounded-3xl blur-2xl" />
              <Image
                src="/audi-a3-sportback-35-tfsi-150-s-tronic-7-neuf-2022-fleury-les-aubrais-1.png"
                alt="hero"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
                priority
                sizes="(max-width: 1280px) 50vw, 600px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
