"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { submitLoanApplication } from "../services";
// Les clés Lenbox sont maintenant gérées côté serveur via /api/lenbox
// Plus besoin d'importer lenboxConfig
import { Calculator, Euro, Clock, TrendingUp, CheckCircle2, Sparkles, Loader2 } from "lucide-react";

interface LoanResponse {
  affecte: boolean;
  mensualite_12?: number;
  mensualite_24?: number;
  mensualite_36?: number;
  mensualite_48?: number;
  mensualite_60?: number;
  mensualite_72?: number;
  url: string;
}

const CreditWidget = () => {
  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [apport, setApport] = useState<number>(3000);
  const [loanDuration, setLoanDuration] = useState<number>(12);
  const [response, setResponse] = useState<LoanResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mensualites = [
    { mois: 12, mensualite: response?.mensualite_12, label: "1 an" },
    { mois: 24, mensualite: response?.mensualite_24, label: "2 ans" },
    { mois: 36, mensualite: response?.mensualite_36, label: "3 ans" },
    { mois: 48, mensualite: response?.mensualite_48, label: "4 ans" },
    { mois: 60, mensualite: response?.mensualite_60, label: "5 ans" },
    { mois: 72, mensualite: response?.mensualite_72, label: "6 ans" },
  ];

  const totalAmount = loanAmount - apport;
  const estimatedMensualite = totalAmount / loanDuration;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Les clés secrètes sont maintenant gérées côté serveur via /api/lenbox
    // On envoie uniquement les données du formulaire
    const data = {
      montant: loanAmount,
      apport: apport,
      duree: loanDuration,
      marque: "Test",
    };

    try {
      const responseData = await submitLoanApplication(data);
      setResponse(responseData);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      // Vous pouvez ajouter ici une notification d'erreur pour l'utilisateur
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {!response ? (
          <motion.form
            key="form"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Montant à financer */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="loanAmount" className="text-body font-semibold flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Euro className="w-5 h-5 text-primary-orange" />
                  </motion.div>
                  Montant à financer
                </Label>
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                    key={loanAmount}
                  >
                    <Input
                      id="loanAmount"
                      type="number"
                      min={1500}
                      max={100000}
                      step={50}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.min(100000, Math.max(1500, parseInt(e.target.value) || 1500)))}
                      className="w-32 h-12 text-center font-bold text-h4 border-2 border-primary-orange/50 focus:border-primary-orange"
                    />
                  </motion.div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-orange font-semibold">€</span>
                </div>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={1500}
                max={100000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-body-sm text-grey">
                <span>1 500 €</span>
                <span>100 000 €</span>
              </div>
            </motion.div>

            <Separator className="bg-primary-orange/20" />

            {/* Apport */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="apport" className="text-body font-semibold flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <TrendingUp className="w-5 h-5 text-primary-orange" />
                  </motion.div>
                  Votre apport
                </Label>
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                    key={apport}
                  >
                    <Input
                      id="apport"
                      type="number"
                      min={0}
                      max={12000}
                      step={50}
                      value={apport}
                      onChange={(e) => setApport(Math.min(12000, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-32 h-12 text-center font-bold text-h4 border-2 border-primary-orange/50 focus:border-primary-orange"
                    />
                  </motion.div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-orange font-semibold">€</span>
                </div>
              </div>
              <Slider
                value={[apport]}
                onValueChange={(value) => setApport(value[0])}
                min={0}
                max={12000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-body-sm text-grey">
                <span>0 €</span>
                <span>12 000 €</span>
              </div>
            </motion.div>

            <Separator className="bg-primary-orange/20" />

            {/* Durée */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="loanDuration" className="text-body font-semibold flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-5 h-5 text-primary-orange" />
                  </motion.div>
                  Durée du prêt
                </Label>
                <motion.div
                  key={loanDuration}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange px-4 py-2 text-lg font-bold">
                    {loanDuration} mois ({loanDuration / 12} {loanDuration / 12 > 1 ? "ans" : "an"})
                  </Badge>
                </motion.div>
              </div>
              <Slider
                value={[loanDuration]}
                onValueChange={(value) => setLoanDuration(value[0])}
                min={12}
                max={72}
                step={12}
                className="w-full"
              />
              <div className="flex justify-between text-body-sm text-grey">
                <span>12 mois (1 an)</span>
                <span>72 mois (6 ans)</span>
              </div>
            </motion.div>

            {/* Récapitulatif */}
            <motion.div
              variants={itemVariants}
              key={`recap-${loanAmount}-${apport}-${loanDuration}`}
            >
              <Card className="border-2 border-primary-orange-100 bg-gradient-to-br from-primary-orange-50 to-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Calculator className="w-5 h-5 text-primary-orange" />
                    </motion.div>
                    <h4 className="text-h4 font-bold">Récapitulatif</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      key={`amount-${loanAmount}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-body-sm text-grey">Montant total</p>
                      <p className="text-h4 font-bold text-gray-900">{formatCurrency(loanAmount)}</p>
                    </motion.div>
                    <motion.div
                      key={`apport-${apport}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-body-sm text-grey">Apport</p>
                      <p className="text-h4 font-bold text-primary-orange">{formatCurrency(apport)}</p>
                    </motion.div>
                    <motion.div
                      className="col-span-2 pt-2 border-t border-primary-orange/20"
                      key={`total-${totalAmount}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-body-sm text-grey">Montant à financer</p>
                      <p className="text-h2 font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
                    </motion.div>
                    <motion.div
                      className="col-span-2 pt-2 border-t border-primary-orange/20"
                      key={`mensualite-${estimatedMensualite}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-body-sm text-grey">Estimation mensualité (hors intérêts)</p>
                      <p className="text-h3 font-bold text-primary-orange">{formatCurrency(estimatedMensualite)}</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                variant="orange"
                size="lg"
                disabled={isLoading || totalAmount <= 0}
                className="w-full rounded-full group shadow-large"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Calcul en cours...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 w-5 h-5" />
                      Lancer la simulation
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="ml-2 w-5 h-5" />
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            key="results"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Alert className="border-green-200 bg-green-50/50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-body-sm">
                  <strong>Type de crédit:</strong>{" "}
                  <span className="font-semibold text-primary-orange">
                    {response?.affecte === true ? "Crédit affecté" : "Crédit consommation"}
                  </span>
                </AlertDescription>
              </Alert>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary-orange" />
                <h3 className="text-h3 font-bold">Choisissez votre formule</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {mensualites.map((item, index) => (
                    item.mensualite && (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-2 border-primary-orange-100 bg-gradient-to-br from-white to-primary-orange-50/30 group">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="border-primary-orange/50 bg-primary-orange/10 text-primary-orange">
                                {item.label}
                              </Badge>
                              <span className="text-body-sm text-grey">({item.mois} mois)</span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-4">
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                className="text-h2 font-bold text-gray-900"
                              >
                                {formatCurrency(item.mensualite)}
                              </motion.span>
                              <span className="text-body text-grey">/ mois</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setResponse(null);
                  setIsLoading(false);
                }}
                className="w-full rounded-full"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Nouvelle simulation
                </motion.button>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreditWidget;
