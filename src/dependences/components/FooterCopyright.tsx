type IFooterCopyrightProps = {
  site_name: string;
};

const FooterCopyright = (props: IFooterCopyrightProps) => (
  <div className="border-t border-gray-600 pt-5">
    <div className="text-sm text-gray-200">
      © Copyright {new Date().getFullYear()} by {props.site_name}. Built with ♥
      by{' '}
      <a
        className="text-cyan-400 hover:underline"
        href="https://me.lecy.cc"
        target="_blank"
        rel="noopener noreferrer"
      >
        Lecy
      </a>
      . Origin theme of this blog is from{' '}
      <a target="_blank" href="https://github.com/ixartz/Astro-boilerplate">
        ixartz
      </a>
      . Social Icons are copied from{' '}
      <a
        target="_blank"
        href="https://github.com/silent1mezzo/astro-social-share/tree/main"
      >
        astro-social-share
      </a>
    </div>
  </div>
);

export { FooterCopyright };
