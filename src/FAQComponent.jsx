import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const faqData = [
  { question: 'What is Ant Design?', answer: 'Ant Design is a UI library for React.' },
  { question: 'How does the toggle work?', answer: 'The toggle is handled with the Ant Design Switch component.' },
  { question: 'What is a circular progress?', answer: 'A circular progress is used to show progress in a circle.' },
];

const FAQComponent = () => {
  return (
    <Collapse accordion style={{ width: '100%', maxWidth: '600px' }}>
      {faqData.map((faq, index) => (
        <Panel header={faq.question} key={index}>
          <p>{faq.answer}</p>
        </Panel>
      ))}
    </Collapse>
  );
};

export default FAQComponent;
