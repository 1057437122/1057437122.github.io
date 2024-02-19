import { GradientText, HeroAvatar, HeroSocial, Section } from '@/dependences';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Baishun</GradientText> 👋
        </>
      }
      description={
        <>
          A lazy{' '}
          <a className="text-cyan-400 hover:underline" href="/">
            fake
          </a>{' '}
          fullstack{' '}
          <a className="text-cyan-400 hover:underline" href="/">
            developer
          </a>{' '}
          , dreaming to become a{' '}
          <a className="text-cyan-400 hover:underline" href="/">
            musician
          </a>{' '}
          .
        </>
      }
      avatar={
        <img
          className="w-60"
          src="/assets/images/hacker.png"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="/">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/facebook-icon.png"
              alt="Facebook icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/youtube-icon.png"
              alt="Youtube icon"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
