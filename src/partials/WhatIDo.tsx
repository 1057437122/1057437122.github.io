import { ColorTags, GradientText, Section, Tags } from '@/dependences';

const WhatIDo = () => (
  <Section
    title={
      <>
        What I <GradientText>Do</GradientText>
      </>
    }
  >
    <div className="flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="flex flex-col gap-6">
        <div className="ml-3 flex flex-wrap gap-2">
          <Tags color={ColorTags.FUCHSIA}>App Development(IOS/Android)</Tags>
          <Tags color={ColorTags.ORANGE}>Website Development</Tags>
          <Tags color={ColorTags.INDIGO}>Odoo Development</Tags>
        </div>
      </div>
    </div>
  </Section>
);

export { WhatIDo };
