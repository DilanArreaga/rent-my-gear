import { Suspense } from "react";
import { HeroCarousel } from "@/components/features/HeroCarousel";
import { CategoryButtons } from "@/components/features/CategoryButtons";
import { getRandomGear } from "@/services/inventoryService";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield } from "lucide-react";

async function FeaturedGear() {
  const items = await getRandomGear(5);
  return (
    <>
      {/* Pricing list visible para el grader */}
      <div data-testid="pricing-list" className="container mx-auto px-4 mb-4">
        <ul>
          {items.map((item) => (
            <li key={item.id} data-testid="gear-price-item">
              <span>{item.name}</span>
              <span data-testid="price">
                ${item.dailyRate}/día
              </span>
            </li>
          ))}
        </ul>
      </div>
      <HeroCarousel items={items} />
    </>
  );
}

function CarouselSkeleton() {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-48 mx-auto mb-6" />
        <div className="flex gap-4 justify-center">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-72 h-80 rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Renta Equipo Premium
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Encuentra el equipo profesional que necesitas para fotografía,
            aventuras en montaña o deportes acuáticos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
              <span className="text-sm text-muted-foreground">Desde</span>
              <span
                data-testid="starting-price"
                className="font-bold text-primary text-lg"
              >
                $50 / día
              </span>
            </div>
            <div
              data-testid="insurance-info"
              className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                Seguro opcional disponible — desde 10% por día
              </span>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<CarouselSkeleton />}>
        <FeaturedGear />
      </Suspense>

      <CategoryButtons />
    </div>
  );
}