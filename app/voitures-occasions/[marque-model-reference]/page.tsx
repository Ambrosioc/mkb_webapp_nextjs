"use client";

import React, { useState } from "react";
import "./productPage.css";
import { Main } from "@/src/components/layouts";
import {
  CardDescription,
  CardDetailsCritere,
  PhotoCard,
  ProductInfo,
} from "@/src/components/cards";
import CustomLink from "@/src/components/ui/links/CustomLink";
import { CustomButton, ImageSlider } from "@/src/components/ui";
import { useCarContext } from "@/src/hooks/CarContext";
import { FormContact } from "@/src/components";
import SocialNetwork from "@/src/components/socialNetwork/SocialNetwork";
import { cardDetailsServicesMkb } from "@/src/constants";

interface PageProps {
  params: {
    "marque-model-reference": string;
  };
}

type ElementId = "critere" | "description";

export default function Page({ params }: PageProps) {
  const { data, isLoading } = useCarContext();
  const [activeElement, setActiveElement] = useState<ElementId>("critere");

  const car = data?.find((item) => {
    const { marque, modele, reference } = item;
    const newModel = modele.replace(/\s/g, "-").toLocaleLowerCase();
    const newMarque = marque.replace(/\s/g, "-").toLocaleLowerCase();
    const id = `${newMarque}-${newModel}-${reference}`;
    return id === params["marque-model-reference"];
  });

  const date = car?.datemes ? new Date(car.datemes) : undefined;

  const handleShowElement = (element: ElementId) => {
    setActiveElement((prev) => (element === prev ? prev : element));
  };

  return (
    <Main>
      {isLoading ? (
        <p>Loading...</p>
      ) : !car ? (
        <div className="padding-x padding-y max-width animate-fade-in">
          <div className="bg-gradient-to-br from-primary-orange-50 to-orange-50 border-2 border-primary-orange-100 rounded-3xl p-12 shadow-large text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-orange/10 rounded-full flex items-center justify-center">
              <span className="text-3xl">🚗</span>
            </div>
            <h2 className="text-black-100 text-h2 font-bold">Véhicule introuvable</h2>
            <p className="text-grey text-body-lg max-w-md mx-auto">
              La fiche demandée n'existe pas ou a été déplacée.
            </p>
            <div className="pt-2">
              <CustomLink title="← Retour au catalogue" href="/voitures-occasions" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex px-5 pb-10 w-full max-xl:flex-col max-md:flex-col">
            <div className="content w-[910px] max-xl:w-full">
              <ImageSlider car={car} />
              <div className="xl:hidden pb-5">
                <ProductInfo car={car} date={date} />
              </div>
              <div className="flex w-full gap-2">
                <CustomButton
                  title="Critère"
                  containerStyles={`rounded-xl shadow-xl border border-primary-orange ${
                    activeElement === "critere"
                      ? "bg-primary-orange text-white"
                      : ""
                  }`}
                  handleClick={() => {
                    handleShowElement("critere");
                  }}
                />
                <CustomButton
                  title="Déscription"
                  containerStyles={`rounded-xl shadow-xl border border-primary-orange ${
                    activeElement === "description"
                      ? "bg-primary-orange text-white"
                      : ""
                  }`}
                  handleClick={() => {
                    handleShowElement("description");
                  }}
                />
              </div>
              <div className="max-md:w-full pt-5">
                {activeElement === "critere" ? (
                  <CardDetailsCritere car={car} date={date} />
                ) : (
                  <CardDescription car={car} />
                )}
              </div>
              <div className="w-full flex flex-col items-center pt-20">
                <div>
                  <span className="font-bold text-2xl">
                    <h3>Les services compris de MKB Automobiles</h3>
                  </span>
                </div>
                <div className="w-full pt-10 grid grid-cols-3 gap-10 max-sm:grid-cols-1">
                  {cardDetailsServicesMkb.map((item, index) => {
                    const Icon = item.logo;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 text-base border p-4 rounded-xl border-primary-orange shadow-xl"
                      >
                        <Icon className="text-orange-500" />
                        <p className="text-center">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <aside className="relative block pl-10 max-xl:hidden">
              <ProductInfo car={car} date={date} />
            </aside>
          </div>
          <div className="w-full flex flex-col items-center p-10 bg-primary-orange-50 gap-6 shadow-xl rounded-2xl">
            <div>
              <h2 className="text-center pb-5">
                Ce modèle vous intéresse ?
                <span style={{ color: "#ff9f1c" }}> Contactez-nous</span>
              </h2>
              <p className="text-center pb-5">
                Nos experts vous accompagnenent pour votre projet d'achat
                automobile.
                <br />
                Nous somme à cotre écoute.
              </p>
              <p className="text-center font-bold">
                Écrivez-nous, nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
            <div className="w-full flex max-md:flex-col">
              <div className="w-1/2">
                <FormContact car={car} />
              </div>
              <div className="w-1/2 flex flex-col  items-center justify-center">
                <p>Vous preferez nous contacter par téléphone ? </p>
                <div className="py-5 border-b-2 border-b-black">
                  <div className="flex justify-center bg-primary-orange p-5 rounded-full gap-2 shadow-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <CustomLink
                      title="Parler a notre équipe"
                      href={"tel:+33188830917"}
                    />
                  </div>
                </div>
                <SocialNetwork />
              </div>
            </div>
          </div>
        </>
      )}
    </Main>
  );
}
