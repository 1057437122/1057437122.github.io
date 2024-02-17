import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="Fuyin TV"
        description="Fuyin TV is a greate video site for Christians, people can read faithful articles and watch a lot of pastors' videos."
        link="https://apps.apple.com/us/app/%E7%A6%8F%E9%9F%B3tv/id717567955"
        img={{
          src: '/assets/images/project-web-design.png',
          alt: 'Project Web Design',
        }}
        category={
          <>
            <Tags color={ColorTags.LIME}>Material design</Tags>
            <Tags color={ColorTags.FUCHSIA}>Flutter</Tags>
            <Tags color={ColorTags.SKY}>Bloc</Tags>
            <Tags color={ColorTags.ROSE}>Dart</Tags>
          </>
        }
      />
      <Project
        name="看看-海外华人社区"
        description="A social app for Chinese people around the world."
        link="https://apps.apple.com/cn/app/%E7%9C%8B%E7%9C%8B-%E6%B5%B7%E5%A4%96%E5%8D%8E%E4%BA%BA%E7%A4%BE%E5%8C%BA/id1616558305"
        img={{ src: '/assets/images/project-fire.png', alt: 'Project Fire' }}
        category={
          <>
            <Tags color={ColorTags.VIOLET}>Firebase</Tags>
            <Tags color={ColorTags.EMERALD}>Flutter</Tags>
            <Tags color={ColorTags.YELLOW}>JavaScript</Tags>
          </>
        }
      />
      <Project
        name="Alert-me"
        description="An app base on location share and location notification."
        link="https://apps.apple.com/es/app/alert-me/id6444185245"
        img={{ src: '/assets/images/project-maps.png', alt: 'Project Maps' }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>Firebase</Tags>
            <Tags color={ColorTags.INDIGO}>Flutter</Tags>
            <Tags color={ColorTags.ROSE}>Google Map</Tags>
          </>
        }
      />
      <Project
        name="BizQ backend"
        description="A multi-shop online business platform."
        link="/"
        img={{ src: '/assets/images/project-maps.png', alt: 'Project Maps' }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>Linux</Tags>
            <Tags color={ColorTags.INDIGO}>NodeJS</Tags>
            <Tags color={ColorTags.ROSE}>ExpressJS</Tags>
            <Tags color={ColorTags.GREEN}>Socket</Tags>
            <Tags color={ColorTags.GRAY}>Micro Service</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
