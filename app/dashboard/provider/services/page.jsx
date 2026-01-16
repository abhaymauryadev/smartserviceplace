import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

import ServicesHeader from "@/components/Service/ServiceHeader";
import ServiceFilters from "@/components/Service/ServiceFilters";
import ServiceCard from "@/components/Service/ServiceCard";
import EmptyServices from "@/components/Service/EmptyServices";

async function getServices(providerId) {
  await connectDB();
  return Service.find({ provider: providerId }).lean();
}

export default async function ProviderServicesPage() {
  const session = await getServerSession(authOptions);
  // Serialize complex objects (like ObjectIDs, Dates) to plain JSON
  const services = JSON.parse(JSON.stringify(await getServices(session.user.id)));

  return (
    <div className="p-4 sm:p-6 space-y-6 text-black">
      <ServicesHeader />

      <ServiceFilters />

      {services.length === 0 ? (
        <EmptyServices />
      ) : ( 
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6
        ">
          {services.map((service) => (
            <ServiceCard key={service._id} images={service.images} service={service} />
          ))}
        </div>
      )}  
    </div>  
  );
}
