import React from 'react';
import FeedbackPreview from './feedback-preview';

const FeedbackStyles = () => {
  const styles = [
    'targeted',
    'glow-grow', 
    'structured',
    'sandwich',
    'actionable',
    'socratic'
  ];

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-semibold mb-6">Feedback Style Previews</h2>
      {styles.map(style => (
        <div key={style} className="space-y-2">
          <h3 className="text-lg font-medium capitalize">{style} Style</h3>
          <FeedbackPreview style={style} />
          <div className="border-b border-gray-200 my-6" />
        </div>
      ))}
    </div>
  );
};

export default FeedbackStyles;
