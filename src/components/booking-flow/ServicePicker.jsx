import { services } from "../../constants";
import ServiceCard from "../shared/ServiceCard";

function ServicePicker({ selectedService, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          variant="selectable"
          isSelected={selectedService === service.name}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ServicePicker