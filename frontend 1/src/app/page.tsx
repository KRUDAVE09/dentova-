import DentFlow from "@/components/dentflow";
import { getClinicData } from "@/db/seed";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getClinicData();
  return <DentFlow initialData={data} initialNow={Date.now()}/>;
}
