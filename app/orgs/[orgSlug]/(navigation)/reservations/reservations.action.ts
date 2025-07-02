"use server";

import { prisma } from "@/lib/prisma";

export async function getReservations() {
  try {
    const reservationsData = await prisma.reservation.findMany();
    return reservationsData;
  } catch (error) {
    console.error("Get reservations data error: ", error);
    throw error;
  }
}
