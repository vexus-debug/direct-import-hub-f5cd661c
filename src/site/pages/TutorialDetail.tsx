import Layout from "@/site/components/Layout";
import PageHero from "@/site/components/PageHero";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClinicType, getSection, getTutorial } from "@/site/data/tutorials";

const TutorialDetail = () => {
  const { clinicType, section: sectionSlug, tutorial: tutorialSlug } = useParams();
  const clinic = getClinicType(clinicType);
  const section = getSection(clinicType, sectionSlug);
  const tutorial = getTutorial(clinicType, sectionSlug, tutorialSlug);

  if (!clinic) return <Navigate to="/tutorials" replace />;
  if (!section) return <Navigate to={`/tutorials/${clinic.slug}`} replace />;
  if (!tutorial) return <Navigate to={`/tutorials/${clinic.slug}/${section.slug}`} replace />;

  return (
    <Layout>
      <PageHero
        eyebrow={`${clinic.name} · ${section.title}`}
        title={tutorial.title}
        description={tutorial.summary}
      />

      <article className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/tutorials" className="hover:text-foreground">Tutorials</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/tutorials/${clinic.slug}`} className="hover:text-foreground">{clinic.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/tutorials/${clinic.slug}/${section.slug}`} className="hover:text-foreground">
              {section.title}
            </Link>
          </nav>

          <ol className="space-y-8">
            {(tutorial.steps ?? []).map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-base font-semibold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 border-t border-border pt-8">
            <Link to={`/tutorials/${clinic.slug}/${section.slug}`}>
              <Button variant="outline" className="gap-2 rounded-sm">
                <ArrowLeft className="h-4 w-4" /> Back to {section.title}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default TutorialDetail;
