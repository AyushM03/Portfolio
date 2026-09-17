import { EnvelopeSimple, Phone } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/data/site";
import CollabForm from "@/components/CollabForm";

export default function Collab() {
  return (
    <section id="collab" className="bg-foreground px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-heading text-3xl font-semibold md:text-4xl">
            Let&apos;s build something worth shipping
          </h2>
          <p className="mb-10 max-w-md text-white/60">
            Open to collaboration, recruiting conversations, or just a
            technical chat. Fill out the form and I&apos;ll get back to you.
          </p>

          <div className="flex flex-col gap-4">
            {siteConfig.email && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-lg text-white/80 hover:text-white"
              >
                <EnvelopeSimple size={20} />
                {siteConfig.email}
              </a>
            )}
            {siteConfig.phone && (
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-lg text-white/80 hover:text-white"
              >
                <Phone size={20} />
                {siteConfig.phone}
              </a>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 text-foreground md:p-8">
          <CollabForm />
        </div>
      </div>
    </section>
  );
}
