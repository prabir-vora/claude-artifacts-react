import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  FeedbackStyleWrapper 
} from './alternative-feedback';
import { Button } from '@/components/ui/button';

const DEMO_ANNOTATIONS = [
  {
    id: "1",
    selectedText: "The author effectively establishes the theme through vivid imagery and careful word choice",
    comment: "Excellent use of literary analysis terminology and specific observations",
    type: "HIGHLIGHT"
  },
  {
    id: "2",
    selectedText: "The symbolism of the green light",
    comment: "How might this symbol connect to other motifs in the novel? Consider its relationship to the American Dream.",
    type: "SUGGESTION"
  },
  {
    id: "3",
    selectedText: "Character development shows growth",
    comment: "Strong observation. Can you provide specific examples from the text to support this?",
    type: "HIGHLIGHT"
  }
];


const FeedbackDemo = () => {
  const [currentStyle, setCurrentStyle] = useState('GLOW_GROW');

  const feedbackStyles = ['GLOW_GROW', 'SOCRATIC', 'SANDWICH', 'STRUCTURED'];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feedback Style Showcase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap mb-6">
            {feedbackStyles.map((style) => (
              <Button
                key={style}
                variant={currentStyle === style ? "default" : "outline"}
                onClick={() => setCurrentStyle(style)}
              >
                {style.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <FeedbackStyleWrapper
          feedbackStyle={currentStyle}
          annotations={DEMO_ANNOTATIONS}
        />
      </div>
    </div>
  );
};

export default FeedbackDemo; 