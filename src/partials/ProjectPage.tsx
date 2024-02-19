import type { ReactNode } from 'react';

import type { IProjectmatter } from '@/dependences';
import { Section } from '@/dependences';

type IProjectPageProps = {
  projectmatter: IProjectmatter;
  children: ReactNode;
};
type TIconProps = {
  imgSrc: string;
  imgAlt: string;
  url?: string;
};
const IconComponent = (props: TIconProps) => (
  <div className="shrink-0">
    <a href={props.url}>
      <img className="size-10 rounded" src={props.imgSrc} alt={props.imgAlt} />
    </a>
  </div>
);

const ProjectPage = (props: IProjectPageProps) => (
  <Section>
    <div className=" flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="shrink-0">
        <img
          className="size-40 rounded hover:translate-y-1"
          src={props.projectmatter.imgSrc}
          alt="img alt"
        />
      </div>
      <div>
        <div className="flex flex-col items-center gap-x-2 p-2 sm:flex-row">
          <div className="py-3 text-2xl">{props.projectmatter.title}</div>
          <IconComponent
            imgAlt={props.projectmatter.title}
            imgSrc="/assets/images/ios-icon-white.png"
            url={props.projectmatter.iosDownloadUrl}
          />
          <IconComponent
            imgAlt={props.projectmatter.title}
            imgSrc="/assets/images/android-icon-white.png"
            url={props.projectmatter.androidDownloadUrl}
          />
        </div>
        <div>{props.projectmatter.description}</div>
      </div>
    </div>
    <div className="flex space-x-4 overflow-x-auto p-4">
      {props.projectmatter.imgs?.map((img) => {
        return (
          <div className="flex shrink-0 items-center justify-center rounded-lg">
            <img
              className="max-h-full max-w-full rounded"
              src={img}
              alt={props.projectmatter.imgAlt}
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
