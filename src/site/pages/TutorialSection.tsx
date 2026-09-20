import Layout from "@/site/components/Layout";
import PageHero from "@/site/components/PageHero";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react";
import { getClinicType, getSection } from "@/site/data/tutorials";

const TutorialSection = () => {
  const { clinicType, section: sectionSlug } = useParams();
  const clinic = getClinicType(clinicType);
  const section = getSection(clinicType, sectionSlug);

  if (!clinic) return <Navigate to="/tutorials" replace />;
  if (!section) return <Navigate to={`/tutorials/${clinic.slug}`} replace />;

  return (
    <Layout>
      <PageHero
        eyebrow={clinic.name}
        title={section.title}
        description={section.description}
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/tutorials" className="hover:text-foreground">Tutorials</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/tutorials/${clinic.slug}`} className="hover:text-foreground">{clinic.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{section.title}</span>
          </nav>

          {section.tutorials.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold">Guides coming soon</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                We're writing the {section.title.toLowerCase()} tutorials for {clinic.name.toLowerCase()}.
                Check back shortly.
              </p>
            </div>
          ) : (
            <ol className="divide-y divide-border rounded-lg border border-border/60 bg-card">
              {section.tutorials.map((tutorial, i) => (
                <li key={tutorial.slug}>
                  <Link
                    to={`/tutorials/${clinic.slug}/${section.slug}/${tutorial.slug}`}
                    className="group flex items-center gap-5 px-6 py-5 transition-colors hover:bg-muted/50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{tutorial.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{tutorial.summary}</span>
                    </span>
                    <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                      {[tutorial.level, tutorial.duration].filter(Boolean).join(" · ")}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TutorialSection;
