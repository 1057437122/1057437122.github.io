import type { ReactNode } from 'react';

import type { IFrontmatter } from '@/dependences';
import { PostContent, PostHeader, Section } from '@/dependences';
import { Comments } from '@/dependences/components/Comments';
import { AppConfig } from '@/utils/AppConfig';

type IBlogPostProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />

    <PostContent content={props.frontmatter}>{props.children}</PostContent>
    <Comments />
  </Section>
);

export { BlogPost };
