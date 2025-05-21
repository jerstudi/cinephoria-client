import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { CineSession } from "../data/schemas/cineSessions.schema";

type MovieScheduleProps = {
  movie: NonNullable<CineSession["movie"]>;
  session: CineSession;
};

const DAYS_ABBR = {
  mercredi: "MER",
  vendredi: "VEN",
  samedi: "SAM",
  lundi: "LUN",
  mardi: "MAR",
  jeudi: "JEU",
  dimanche: "DIM",
} as const;

export function MovieSchedule({ movie, session }: MovieScheduleProps) {
  // Vérifier que nous avons toutes les données nécessaires
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!movie || !session) {
    console.log("Données manquantes:", { movie, session });
    return null;
  }

  const startTime = new Date(session.sessionStart);
  const endTime = new Date(session.sessionEnd);
  const movieDuration = movie.duration;

  console.log("Données de session:", {
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    movieDuration,
  });

  // Vérifier que les dates sont valides
  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    console.log("Dates invalides");
    return null;
  }

  // Vérifier que la durée du film est valide
  if (!movieDuration || movieDuration <= 0) {
    console.log("Durée du film invalide:", movieDuration);
    return null;
  }

  // Calculer le nombre de séances possibles
  const totalDuration = endTime.getTime() - startTime.getTime();
  console.log("Durée totale:", totalDuration);

  // Vérifier que la durée totale est valide
  if (totalDuration <= 0) {
    console.log("Durée totale invalide");
    return null;
  }

  // Ajouter 30 minutes entre chaque séance pour le nettoyage
  const sessionDuration = (movieDuration + 30) * 60 * 1000; // Convertir en millisecondes
  const maxSessions = Math.max(0, Math.floor(totalDuration / sessionDuration));

  console.log("Calcul des séances:", {
    sessionDuration,
    maxSessions,
  });

  // Si pas de séances possibles, retourner null
  if (maxSessions === 0) {
    console.log("Pas de séances possibles");
    return null;
  }

  // Générer les horaires pour une semaine
  const schedules = Array.from({ length: 7 }, (_, dayIndex) => {
    const baseDate = new Date(startTime);
    baseDate.setDate(baseDate.getDate() + dayIndex);
    baseDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
    return baseDate;
  });

  console.log(
    "Horaires générés:",
    schedules.map((s) => s.toISOString()),
  );

  // Déterminer les jours de diffusion
  const isLongMovie = movieDuration >= 120;
  const allowedDays = isLongMovie
    ? ["mercredi", "vendredi", "samedi"]
    : Object.keys(DAYS_ABBR);

  console.log("Jours autorisés:", allowedDays);

  // Filtrer les horaires par jour autorisé
  const filteredSchedules = schedules.filter((schedule) => {
    const dayName = format(schedule, "EEEE", { locale: fr }).toLowerCase();
    const isAllowed = allowedDays.includes(dayName);
    console.log("Jour vérifié:", { dayName, isAllowed });
    return isAllowed;
  });

  console.log(
    "Horaires filtrés:",
    filteredSchedules.map((s) => s.toISOString()),
  );

  // Si pas d'horaires après filtrage, retourner null
  if (filteredSchedules.length === 0) {
    console.log("Pas d'horaires après filtrage");
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {filteredSchedules.map((schedule, index) => (
        <span key={index} className="text-xs">
          {format(schedule, "EEEE", { locale: fr }).slice(0, 3).toUpperCase()}{" "}
          {format(schedule, "HH:mm")}
          {index < filteredSchedules.length - 1 && " • "}
        </span>
      ))}
    </div>
  );
}
