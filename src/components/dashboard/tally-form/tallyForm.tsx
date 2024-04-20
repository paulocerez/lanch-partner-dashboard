// pages/contact.tsx
import Script from 'next/script';
import { NextPage } from 'next';

const Feedback: NextPage = () => {
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="284"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact form"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          // @ts-ignore: `Tally` global variable will be available once the script loads
          Tally.loadEmbeds();
        }}
      />
    </>
  );
};

export default Feedback;