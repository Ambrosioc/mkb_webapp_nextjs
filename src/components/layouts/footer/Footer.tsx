"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/src/components/ui/separator";
import { footerLinks } from "@/src/constants";
import { Heart, Shield, Sparkles } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-gray-200 relative overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto flex max-md:flex-col flex-wrap justify-between gap-8 sm:px-16 px-6 py-16">
        <div className="flex flex-col justify-start items-start gap-6 max-w-xs">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary-orange/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500" />
            <Image
              src={"/logo.png"}
              alt="logo"
              width={120}
              height={120}
              className="h-auto w-auto object-fill relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-2">
            <p className="text-body text-gray-700 leading-relaxed">
              MKB-Automobile {new Date().getFullYear()} <br />
              Tous Droits Réservés &copy;
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Shield className="w-4 h-4 text-primary-orange" />
              <span className="text-body-sm text-grey">Véhicules vérifiés et garantis</span>
            </div>
          </div>
        </div>
        <div className="footer__links grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((link, index) => (
            <div key={link.title} className="footer__link space-y-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-h4 font-bold text-gray-900 mb-4">{link.title}</h3>
              <div className="space-y-3">
                {link.links.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="block text-body text-grey hover:text-primary-orange transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Separator className="bg-gray-200" />
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 sm:px-16 px-6 py-8">
        <div className="flex items-center gap-2">
          <p className="text-body-sm text-grey">
            © {new Date().getFullYear()} MKB-Automobile. Tous Droits Réservés
          </p>
          <div className="flex items-center gap-1 text-primary-orange">
            <Heart className="w-4 h-4 fill-primary-orange animate-pulse-slow" />
            <Sparkles className="w-4 h-4 animate-float" />
          </div>
        </div>

        <div className="footer__copyrights-link flex flex-wrap items-center gap-6">
          <Link 
            href="/politique-de-confidentialite" 
            className="text-body-sm text-grey hover:text-primary-orange transition-colors duration-200 relative group"
          >
            Politique de confidentialité
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-orange transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Separator orientation="vertical" className="h-4 bg-gray-300" />
          <Link 
            href="/mentions-legales" 
            className="text-body-sm text-grey hover:text-primary-orange transition-colors duration-200 relative group"
          >
            Mentions légales
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-orange transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
