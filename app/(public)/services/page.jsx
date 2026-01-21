import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import ServicesListContent from "@/components/Service/ServicesListContent";

async function getServices() {
  try {
    await connectDB();
    // Fetch only active services and convert MongoDB documents to plain objects
    const servicesData = await Service.find({ isActive: true })
      .populate("provider", "name")
      .lean();

    // Ensure _id and other MongoDB specific types are converted to strings/plain formats
    const services = JSON.parse(JSON.stringify(servicesData));
    return services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesListContent services={services} />;
}
