import { IResume } from "@/types/resume.types";

function cleanUrl(value: string) {
  return value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function Description({ text }: { text: string }) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const bullets = lines.filter((line) => /^[-•*]\s+/.test(line));

  if (lines.length > 1 && bullets.length === lines.length) {
    return <ul className="resume-bullets">{lines.map((line, index) => <li key={index}>{line.replace(/^[-•*]\s+/, "")}</li>)}</ul>;
  }

  return <p className="resume-description">{text}</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="resume-section"><h2>{title}</h2>{children}</section>;
}

export function ResumeDocument({ resume }: { resume: IResume }) {
  const { personalInfo, summary, workExperience, projects, education, skills } = resume;
  const contactItems = [personalInfo?.email, personalInfo?.phone, personalInfo?.location].filter(Boolean);
  const links = [
    personalInfo?.linkedin && { label: "LinkedIn", href: personalInfo.linkedin },
    personalInfo?.github && { label: "GitHub", href: personalInfo.github },
    personalInfo?.portfolio && { label: cleanUrl(personalInfo.portfolio), href: personalInfo.portfolio },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article id="resume-print-root" className="resume-paper" aria-label={`${personalInfo?.name || "Candidate"} resume`}>
      <header className="resume-header">
        <h1>{personalInfo?.name || "Your Name"}</h1>
        {resume.title && <p className="resume-role">{resume.title}</p>}
        <address className="resume-contact">
          {contactItems.map((item, index) => <span key={item}>{index > 0 && <i aria-hidden="true">•</i>}{item}</span>)}
        </address>
        {links.length > 0 && <nav className="resume-links" aria-label="Professional profiles">{links.map((link, index) => <span key={link.href}>{index > 0 && <i aria-hidden="true">•</i>}<a href={link.href}>{link.label}</a></span>)}</nav>}
      </header>

      {summary && <Section title="Professional Summary"><p className="resume-summary">{summary}</p></Section>}

      {workExperience?.length > 0 && <Section title="Experience"><div className="resume-entry-list">{workExperience.map((exp, index) => <article className="resume-entry" key={`${exp.company}-${index}`}>
        <div className="resume-entry-heading"><div><h3>{exp.position}</h3><p className="resume-organization">{exp.company}</p></div><p className="resume-date">{exp.startDate} - {exp.endDate || "Present"}</p></div>
        {exp.description && <Description text={exp.description} />}
      </article>)}</div></Section>}

      {projects?.length > 0 && <Section title="Projects"><div className="resume-entry-list">{projects.map((project, index) => <article className="resume-entry" key={`${project.title}-${index}`}>
        <div className="resume-project-heading"><h3>{project.title}</h3>{(project.liveUrl || project.githubUrl) && <p className="resume-project-links">{project.liveUrl && <a href={project.liveUrl}>Live</a>}{project.liveUrl && project.githubUrl && <span> · </span>}{project.githubUrl && <a href={project.githubUrl}>GitHub</a>}</p>}</div>
        {project.description && <Description text={project.description} />}
        {project.techStack?.length > 0 && <p className="resume-tech"><strong>Technologies:</strong> {project.techStack.join(", ")}</p>}
      </article>)}</div></Section>}

      {education?.length > 0 && <Section title="Education"><div className="resume-entry-list">{education.map((edu, index) => <article className="resume-entry resume-education" key={`${edu.institute}-${index}`}>
        <div><h3>{edu.degree}</h3><p className="resume-organization">{edu.institute}</p></div><p className="resume-date">{edu.startDate} - {edu.endDate}</p>
      </article>)}</div></Section>}

      {skills?.length > 0 && <Section title="Skills"><p className="resume-skills">{skills.join("  •  ")}</p></Section>}
    </article>
  );
}
