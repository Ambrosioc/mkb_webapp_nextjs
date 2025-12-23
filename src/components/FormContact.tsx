"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Send, Loader2, CheckCircle2, XCircle, User, Mail, Phone, MessageSquare, Sparkles } from "lucide-react";

const FormContact = ({ car }: any) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // const router = useRouter();
  const marque = car?.marque;
  const modele = car?.modele;
  const refCar = car?.reference;

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Le nom est requis";
    if (!firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    }
    if (!phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[0-9+\s\-()]+$/.test(phone)) {
      newErrors.phone = "Format de téléphone invalide";
    }
    if (!message.trim()) newErrors.message = "Le message est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus(null);

    const formData = {
      name: name,
      firstName: firstName,
      email: email,
      phone: phone,
      message: message,
      marque: marque,
      modele: modele,
      refCar: refCar,
    };

    try {
      // Portfolio: simulation d'envoi avec affichage dans un popup
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmittedData(formData);
      setShowDialog(true);
        setName("");
        setFirstName("");
        setEmail("");
        setPhone("");
        setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert className="border-green-200 bg-green-50/50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-body font-semibold">Message envoyé !</AlertTitle>
              <AlertDescription className="text-body-sm">
                Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive" className="border-red-200 bg-red-50/50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-body font-semibold">Erreur</AlertTitle>
              <AlertDescription className="text-body-sm">
                Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Nom */}
        <motion.div
          variants={inputVariants}
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="name" className="text-body font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-primary-orange" />
            Nom <span className="text-primary-orange">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            className={`h-12 ${errors.name ? "border-red-500" : ""}`}
            placeholder="Votre nom"
            required
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        {/* Prénom */}
        <motion.div
          variants={inputVariants}
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="firstName" className="text-body font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-primary-orange" />
            Prénom <span className="text-primary-orange">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors({ ...errors, firstName: "" });
            }}
            className={`h-12 ${errors.firstName ? "border-red-500" : ""}`}
            placeholder="Votre prénom"
            required
          />
          {errors.firstName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {errors.firstName}
            </motion.p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div
          variants={inputVariants}
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="email" className="text-body font-semibold flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary-orange" />
            Email <span className="text-primary-orange">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            className={`h-12 ${errors.email ? "border-red-500" : ""}`}
            placeholder="exemple@email.com"
            required
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        {/* Téléphone */}
        <motion.div
          variants={inputVariants}
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label htmlFor="phone" className="text-body font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary-orange" />
            Téléphone <span className="text-primary-orange">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
            placeholder="06 12 34 56 78"
            required
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {errors.phone}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Message */}
      <motion.div
        variants={inputVariants}
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Label htmlFor="message" className="text-body font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary-orange" />
          Message <span className="text-primary-orange">*</span>
        </Label>
        <textarea
          id="message"
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: "" });
          }}
          className={`w-full p-4 rounded-xl border-2 ${
            errors.message ? "border-red-500" : "border-gray-200"
          } focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20 outline-none transition-all duration-300 resize-none text-body`}
          placeholder="Votre message..."
          required
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500"
          >
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-full group shadow-large bg-primary-orange hover:bg-primary-orange/90 text-white font-semibold text-body-lg px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Envoyer le message
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.span>
            </>
          )}
        </motion.button>
      </motion.div>
      
      {/* Dialog pour afficher les données soumises */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              Message envoyé avec succès !
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Voici un récapitulatif des informations que vous avez envoyées :
            </DialogDescription>
          </DialogHeader>
          {submittedData && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Nom</p>
                  <p className="text-base">{submittedData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Prénom</p>
                  <p className="text-base">{submittedData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                  <p className="text-base">{submittedData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Téléphone</p>
                  <p className="text-base">{submittedData.phone}</p>
                </div>
              </div>
              {submittedData.marque && (
                <div className="p-4 bg-primary-orange-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Véhicule concerné</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {submittedData.marque && <p><span className="font-medium">Marque:</span> {submittedData.marque}</p>}
                    {submittedData.modele && <p><span className="font-medium">Modèle:</span> {submittedData.modele}</p>}
                    {submittedData.refCar && <p className="col-span-2"><span className="font-medium">Référence:</span> {submittedData.refCar}</p>}
                  </div>
                </div>
              )}
              {submittedData.message && (
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Message</p>
                  <p className="text-base text-gray-700 whitespace-pre-wrap">{submittedData.message}</p>
                </div>
              )}
              <div className="pt-4 border-t">
                <p className="text-sm text-red-600 font-medium">
                  ⚠️ Important : Les messages ne sont pas envoyés. Ceci est une démonstration pour portfolio uniquement.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.form>
  );
};
export default FormContact;
