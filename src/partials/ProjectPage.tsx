import type { ReactNode } from 'react';

import type { IFrontmatter } from '@/dependences';
import { Section } from '@/dependences';

type IProjectPageProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
};

const ProjectPage = (props: IProjectPageProps) => (
  <Section>
    <div className=" flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="shrink-0">
        <img
          className="size-40 rounded hover:translate-y-1"
          src={props.frontmatter.imgSrc}
          alt="img alt"
        />
      </div>
      <div>
        <div className="py-3 text-2xl">{props.frontmatter.title}</div>
        <div>{props.frontmatter.description}</div>
      </div>
    </div>
    <div className="flex space-x-4 overflow-x-auto p-4">
      {props.frontmatter.imgs.map((img) => {
        return (
          <div className="w-100 h-200 flex  shrink-0 items-center justify-center rounded-lg">
            <img
              className="max-h-full max-w-full rounded"
              src={img}
              alt={props.frontmatter.imgAlt}
              loading="lazy"
            />
          </div>
        );
      })}
    </div>

    <div>{props.children}</div>
  </Section>
);

export { ProjectPage };
