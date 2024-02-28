import type { ReactNode } from 'react';

import type { IFrontmatter } from '@/dependences';
import { PostContent, PostHeader, Section } from '@/dependences';
import { Comments } from '@/dependences/components/Comments';
import { MySocialShare } from '@/dependences/socials/MySocialShare';
import { AppConfig } from '@/utils/AppConfig';

type IBlogPostProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
  url: string;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />
    <div className="mx-auto max-w-prose py-5 ">
      <MySocialShare
        description={props.frontmatter.description}
        title={props.frontmatter.title}
        url={props.url}
      />
    </div>
    <PostContent content={props.frontmatter}>{props.children}</PostContent>

    <Comments />
  </Section>
);

export { BlogPost };
