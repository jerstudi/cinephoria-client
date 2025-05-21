"use server";

import { mongodb } from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";

export async function getMovies() {
  try {
    const moviesData = await prisma.movie.findMany({
      select: {
        id: true,
        identifier: true,
        title: true,
        poster: true,
        description: true,
        actors: true,
        directors: true,
        musicComposer: true,
        synopsis: true,
        movieDate: true,
        gender: true,
        ageLimit: true,
        duration: true,
        favorite: true,
        active: true,
        createdAt: true,
      },
    });
    return moviesData;
  } catch (error) {
    console.error("Get movies data error:", error);
    throw error;
  }
}

export async function getCineSessions() {
  try {
    const cineSessionsData = await prisma.cineSession.findMany({
      include: {
        movie: true,
        hall: true,
        cinema: true,
        reservations: true,
      },
    });
    return cineSessionsData;
  } catch (error) {
    console.error("Get cineSessions data error: ", error);
    throw error;
  }
}

// MongoDB
export async function getAllReviews() {
  try {
    const allReviews = await mongodb.review.findMany({
      where: {
        status: "active",
      },
    });
    return allReviews;
  } catch (error) {
    console.error("Get all reviews data error:", error);
    throw error;
  }
}
