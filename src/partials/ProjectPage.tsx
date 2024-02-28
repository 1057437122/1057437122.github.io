import type { ReactNode } from 'react';

import type { IProjectmatter } from '@/dependences';
import { RandomTags, Section } from '@/dependences';
import { MySocialShare } from '@/dependences/socials/MySocialShare';
import { AppConfig } from '@/utils/AppConfig';

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

const ProjectPage = (props: IProjectPageProps) => {
  const projectUrl = `${AppConfig.site_url}/projects/${props.projectmatter.link}`;
  return (
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
          <div className="flex flex-col items-start">
            <div className="flex  flex-row gap-x-3">
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
            <div className="my-2 flex flex-wrap gap-2">
              {props.projectmatter.stacks?.map((s) => (
                <RandomTags>{s}</RandomTags>
              ))}
            </div>
          </div>
          <div>{props.projectmatter.description}</div>
        </div>
      </div>
      <div className="bg-slate-800 p-3">
        <MySocialShare
          description={props.projectmatter.description}
          title={props.projectmatter.title}
          url={projectUrl}
        />
      </div>
      <div className="flex space-x-4 overflow-x-auto">
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
};

export { ProjectPage };
