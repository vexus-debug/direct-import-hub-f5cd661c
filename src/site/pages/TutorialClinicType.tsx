import Layout from "@/site/components/Layout";
import PageHero from "@/site/components/PageHero";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getClinicType } from "@/site/data/tutorials";

const TutorialClinicType = () => {
  const { clinicType } = useParams();
  const clinic = getClinicType(clinicType);

  if (!clinic) return <Navigate to="/tutorials" replace />;

  return (
    <Layout>
      <PageHero
        eyebrow="Tutorials"
        title={clinic.name}
        description={clinic.description}
      />

      <section className="py-16 md:py-20">
        <div className="container">
          <nav className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/tutorials" className="hover:text-foreground">Tutorials</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{clinic.name}</span>
          </nav>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {clinic.sections.map((section, i) => (
              <motion.div
                key={section.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
              >
                <Link
                  to={`/tutorials/${clinic.slug}/${section.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <h2 className="text-base font-semibold">{section.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {section.tutorials.length > 0
                        ? `${section.tutorials.length} guides`
                        : "Coming soon"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TutorialClinicType;
