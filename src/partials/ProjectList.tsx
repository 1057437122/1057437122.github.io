import { ColorTags, GradientText, Project, Section, Tags } from '@/dependences';

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
          src: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/64/c4/83/64c48340-6034-e7e2-ba82-2305bde83d54/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp',
          alt: 'Fuyin TV',
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
        img={{
          src: 'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/f2/44/31/f24431bb-c228-fa17-1d78-72eb57ff7612/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp',
          alt: '看看-海外华人社区',
        }}
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
        img={{
          src: 'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/10/57/0f/10570f91-1f0d-079b-8819-1d763b6c4033/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp',
          alt: 'alert-me',
        }}
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
        link="https://apps.apple.com/es/app/bizq/id1497423597"
        img={{
          src: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/c6/cd/f3/c6cdf398-0d49-8932-ad78-00ee331db742/AppIcon-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/460x0w.webp',
          alt: 'BizQ',
        }}
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
