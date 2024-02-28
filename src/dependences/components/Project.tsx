import type { ReactNode } from 'react';

type IProjectProps = {
  img: {
    src: string;
    alt: string;
  };
  name: string;
  description: string;
  link: string;
  category: ReactNode;
};

const Project = (props: IProjectProps) => (
  <a href={props.link}>
    <div className="flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="shrink-0">
        <img
          className="size-36 rounded hover:translate-y-1"
          src={props.img.src}
          alt={props.img.alt}
          loading="lazy"
        />
      </div>

      <div>
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          <div className="text-xl font-semibold">{props.name}</div>

          <div className="ml-3 flex flex-wrap gap-2">{props.category}</div>
        </div>

        <p className="mt-3 text-gray-400">{props.description}</p>
      </div>
    </div>
  </a>
);

export { Project };
