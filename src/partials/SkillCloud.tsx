import { ColorTags, GradientText, Section, Tags } from '@/dependences';

const SkillCloud = () => (
  <Section
    title={
      <>
        My <GradientText>Skills</GradientText>
      </>
    }
  >
    <div className="flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="flex flex-col gap-6">
        <div className="ml-3 flex flex-wrap gap-2">
          <Tags color={ColorTags.GREEN}>Flutter</Tags>
          <Tags color={ColorTags.BLUE}>ComfyUI</Tags>
          <Tags color={ColorTags.GREEN}>Linux</Tags>
          <Tags color={ColorTags.GREEN}>Nginx</Tags>
          <Tags color={ColorTags.FUCHSIA}>PHP</Tags>
          <Tags color={ColorTags.GREEN}>Docker</Tags>
          <Tags color={ColorTags.GREEN}>NodeJS</Tags>
          <Tags color={ColorTags.GRAY}>Micro Service</Tags>
          <Tags color={ColorTags.GRAY}>SQL</Tags>
          <Tags color={ColorTags.INDIGO}>Firebase</Tags>
        </div>
        <div className="ml-3 flex flex-wrap gap-2">
          <Tags color={ColorTags.INDIGO}>Odoo</Tags>
          <Tags color={ColorTags.GREEN}>ExpressJS</Tags>
          <Tags color={ColorTags.INDIGO}>Socket.io</Tags>
          <Tags color={ColorTags.FUCHSIA}>Vue</Tags>
          <Tags color={ColorTags.INDIGO}>MySQL</Tags>
          <Tags color={ColorTags.GRAY}>MongoDB</Tags>
          <Tags color={ColorTags.GREEN}>Docker</Tags>
        </div>
      </div>
    </div>
  </Section>
);

export { SkillCloud };
