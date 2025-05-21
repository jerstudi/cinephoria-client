function generateSessionTimes(duration: number) {
  const baseTime = "19:00";
  const longMovieDays = ["mer", "ven", "sam"];
  const allDays = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

  const midnightHourCondition = (h: string) => {
    if (h === "00") {
      return "24";
    }
    return h;
  };

  const sessionDuration = (
    endSessionTime: string,
    startSessionTime: string,
  ) => {
    const sessionStart = new Date(startSessionTime);
    const sessionStartTime = sessionStart.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const sessionEnd = new Date(endSessionTime);
    const sessionEndTime = sessionEnd.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // const sessionDuration =
    //   Number(midnightHourCondition(sessionEndTime.split(":")[0])) -
    //   Number(midnightHourCondition(sessionStartTime.split(":")[0]));

    // Calculer la différence en millisecondes
    const diffMs = sessionEnd.getTime() - sessionStart.getTime();

    // Convertir en minutes
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    // Formater en "1h30" par exemple
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const duration = `${hours}h${minutes.toString().padStart(2, "0")}`;

    return duration;
  };
}
