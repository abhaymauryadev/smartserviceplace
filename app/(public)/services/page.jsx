import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import ServicesListContent from "@/components/Service/ServicesListContent";

async function getServices(searchParams) {
  try {
    await connectDB();

    const { category, maxPrice } = searchParams || {};
    let query = { isActive: true };

    if (category) {
      const categories = category.split(',');
      if (!categories.includes('All')) {
        query.category = { $in: categories };
      }
    }

    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    // Fetch filtered services and convert MongoDB documents to plain objects
    const servicesData = await Service.find(query)
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

export default async function ServicesPage({ searchParams }) {
  const params = await searchParams;
  const services = await getServices(params);

  return <ServicesListContent services={services} />;
}
