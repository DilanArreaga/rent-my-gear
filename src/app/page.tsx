"use client";

import { Shield } from "lucide-react";

const FEATURED_ITEMS = [
  {
    id: "gear-001",
    name: "Canon EOS R5",
    category: "fotografia-video",
    dailyRate: 500,
    description: "Camara mirrorless profesional",
  },
  {
    id: "gear-002", 
    name: "Tienda de Camping 4P",
    category: "montana-camping",
    dailyRate: 200,
    description: "Tienda para 4 personas",
  },
  {
    id: "gear-003",
    name: "Kayak Pro",
    category: "deportes-acuaticos",
    dailyRate: 300,
    description: "Kayak profesional de mar",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Renta Equipo Premium</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra el equipo profesional que necesitas para fotografia,
            aventuras en montana o deportes acuaticos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
              <span className="text-sm">Desde</span>
              <span data-testid="starting-price" className="font-bold text-lg">
                $200 / dia
              </span>
            </div>
            <div
              data-testid="insurance-info"
              className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">
                Seguro opcional disponible — desde 10% por dia
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Equipo Disponible</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_ITEMS.map((item) => (
              <div
                key={item.id}
                data-testid="gear-item"
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="mb-2">
                  <span
                    data-testid="category-badge"
                    className="text-xs bg-muted px-2 py-1 rounded-full"
                  >
                    {item.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                <div className="mt-3">
                  <span data-testid="gear-price" className="text-lg font-bold text-primary">
                    ${item.dailyRate}/dia
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
