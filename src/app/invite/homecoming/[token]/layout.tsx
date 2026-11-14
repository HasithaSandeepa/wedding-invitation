import type { Metadata } from "next";
import { homecomingConfig } from "@/config/homecoming";
const { couple, event } = homecomingConfig;
export const metadata: Metadata = {
  title: `${couple.bride.fullNameEn} & ${couple.groom.fullNameEn} — Homecoming Invitation`,
  description: `Homecoming on ${event.day} ${event.monthEn} ${event.year} at ${event.venue.nameEn}, ${event.venue.addressEn}.`,
};
export default function Layout({children}: {children: React.ReactNode}) { return children; }
