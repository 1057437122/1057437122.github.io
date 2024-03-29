import type { IProjectmatter, MarkdownInstance } from '@/dependences';
import { GradientText, Project, RandomTags, Section } from '@/dependences';

type IProjectListProps = {
  projectList: MarkdownInstance<IProjectmatter>[];
};
const ProjectList = (props: IProjectListProps) => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      {props.projectList.map((p) => (
        <Project
          name={p.frontmatter.title}
          description={p.frontmatter.description}
          link={p.frontmatter.link}
          img={{
            src: p.frontmatter.imgSrc,
            alt: p.frontmatter.imgAlt,
          }}
          category={
            <>
              {p.frontmatter.stacks?.map((s) => (
                <RandomTags>{s}</RandomTags>
              ))}
            </>
          }
        />
      ))}
    </div>
  </Section>
);

export { ProjectList };
