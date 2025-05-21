export const filters = [
  {
    value: "all",
    label: "Tous",
  },
  {
    value: "gender",
    label: "Genre",
  },
  {
    value: "cinema",
    label: "Cinéma",
  },
];

export const genders = [
  { value: "all", label: "Tous" },
  { value: "action", label: "Action" },
  { value: "aventure", label: "Aventure" },
  { value: "animation", label: "Animation" },
  { value: "comedie", label: "Comédie" },
  { value: "drame", label: "Drame" },
  { value: "historique", label: "Historique" },
  { value: "fantastique", label: "Fantastique" },
  { value: "horreur", label: "Horreur" },
  { value: "romance", label: "Romance" },
  { value: "science-fiction", label: "Science-fiction" },
  { value: "thriller", label: "Thriller" },
] as const;
