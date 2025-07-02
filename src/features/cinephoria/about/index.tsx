"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AboutCinephoria() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="my-8"></div>
      <Card>
        <CardHeader>
          <CardTitle>À propos de Cinephoria</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>
            Cinéphoria est un joyau du cinéma français, une véritable icône du
            divertissement cinématographique. Fondée il y a plusieurs décennies
            par des passionnés de cinéma, l’entreprise a réussi à s’imposer
            comme un acteur de l’industrie du divertissement en France.
            L’entreprise enregistre un chiffre d’affaires de 5 millions d’euros,
            témoignant de son succès, avec 80 employés répartis dans 5 cinémas
            en France (Nantes, Bordeaux, Paris, Toulouse, Lille) et 2 en
            Belgique (Charleroi, Liège).
          </p>
        </CardContent>
        <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
      </Card>
      <div className="my-8"></div>
    </div>
  );
}
