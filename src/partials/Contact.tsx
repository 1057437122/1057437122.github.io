import { GradientText, Section } from '@/dependences';

const Contact = () => (
  <Section>
    <div className="bg-slate-800 p-7">
      <div className="flex items-center">
        For business cooperation, please send email to :{' '}
        <GradientText>
          <a href="mailto:lecy.cc.app@gmail.com">lecy.cc.app@gmail.com</a>{' '}
        </GradientText>
      </div>
    </div>
  </Section>
);

export { Contact };
