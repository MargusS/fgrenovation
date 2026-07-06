const heroBackgroundImages = ["/media/hero-image.png"] as const;

type HomeHeroProps = {
  /**
   * Añade aquí las rutas de las imágenes del hero.
   * Ejemplo: ["/media/hero-1.jpg", "/media/hero-2.jpg"]
   */
  backgroundImages?: readonly string[];
  activeImageIndex?: number;
};

export function HomeHero({
  backgroundImages = heroBackgroundImages,
  activeImageIndex = 0,
}: HomeHeroProps) {
  const backgroundImage =
    backgroundImages[activeImageIndex] ?? backgroundImages[0] ?? heroBackgroundImages[0];

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-background lg:h-[min(100vh,980px)] lg:min-h-[760px]"
    >
      <div
        className="absolute inset-0 -z-20 hidden bg-cover bg-center lg:block lg:bg-right"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/*
        Desktop: el 60% izquierdo queda difuminado/fundido con el fondo,
        dejando el 40% derecho de la imagen limpio.
      */}
      <div
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 0%, var(--background) 35%, oklch(0.99 0.002 80 / 0.96) 45%, oklch(0.99 0.002 80 / 0.74) 54%, oklch(0.99 0.002 80 / 0) 60%)",
        }}
        aria-hidden="true"
      />


      <div className="flex w-full items-center justify-center px-5 py-20 text-center sm:px-8 md:px-12 lg:justify-start lg:px-16 lg:py-28 lg:text-left xl:px-20">
        <div className="mx-auto flex w-full max-w-[36rem] flex-col items-center space-y-8 lg:mx-0 lg:items-start">
          <div className="space-y-5">
            <h1 className="font-sans text-[clamp(2.1rem,9vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-foreground lg:text-[clamp(2.65rem,6vw,5.25rem)] lg:leading-[0.98]">
              Entreprise générale de rénovation
            </h1>

            <p className="font-sans text-[clamp(1.2rem,4.8vw,1.65rem)] font-normal leading-tight tracking-[-0.035em] text-foreground lg:text-[clamp(1.25rem,2.2vw,2rem)]">
              en Suisse romande
            </p>
          </div>

          <div className="max-w-[34rem] space-y-2 font-sans text-base font-medium leading-relaxed tracking-[-0.015em] text-foreground/78 sm:text-lg">
            <p>Plâtrerie • Peinture • Carrelage • Isolation</p>
            <p>Faux plafonds • Rénovation complète</p>
          </div>

          <div className="flex w-full max-w-sm flex-col items-stretch gap-4 pt-5 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-[0.2rem] bg-[#173C25] px-7 py-4 text-sm font-bold uppercase tracking-[0.02em] text-primary-foreground shadow-sm transition-colors hover:bg-[#24563a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Demander un devis
            </a>

            <a
              href="#projets"
              className="inline-flex w-full items-center justify-center rounded-[0.2rem] border border-foreground/35 bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-[0.02em] text-foreground shadow-sm transition-colors hover:border-foreground/65 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto lg:bg-background/30 lg:backdrop-blur-[2px] lg:hover:bg-background/55"
            >
              Voir nos réalisations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
