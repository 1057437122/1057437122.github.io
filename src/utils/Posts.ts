import type {
  IFrontmatter,
  IProjectmatter,
  MarkdownInstance,
} from '@/dependences';

export const sortByDate = (posts: MarkdownInstance<IFrontmatter>[]) => {
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).valueOf() -
      new Date(a.frontmatter.pubDate).valueOf()
  );
};

export const sortProjectByDate = (
  projects: MarkdownInstance<IProjectmatter>[]
) => {
  return projects.sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).valueOf() -
      new Date(a.frontmatter.pubDate).valueOf()
  );
};
