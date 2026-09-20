import Layout from "@/site/components/Layout";
import PageHero from "@/site/components/PageHero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Smile, BookOpen } from "lucide-react";
import { tutorialClinicTypes, countTutorials } from "@/site/data/tutorials";

const icons = { Smile, Eye };

const Tutorials = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="Tutorials"
        title="Learn Clinexus, step by step"
        description="Guides for every clinic type — how to set up your practice, run your daily flow and get the most out of each module."
      />

      <section className="py-20 md:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {tutorialClinicTypes.map((clinic, i) => {
              const Icon = icons[clinic.icon] ?? BookOpen;
              const total = countTutorials(clinic);
              return (
                <motion.div
                  key={clinic.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <Link
                    to={`/tutorials/${clinic.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold">{clinic.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{clinic.tagline}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {clinic.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {clinic.sections.length} topics · {total} {total === 1 ? "guide" : "guides"}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-primary">
                        Browse <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tutorials;
