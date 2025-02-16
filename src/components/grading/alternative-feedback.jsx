import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowUp, Brain, MessageCircle } from 'lucide-react';

// Glow and Grow Style
const GlowGrowFeedback = ({ annotations }) => {
  const glows = annotations.filter(a => a.type === 'HIGHLIGHT');
  const grows = annotations.filter(a => a.type === 'SUGGESTION');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Glow and Grow Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Glows Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Glows
          </h3>
          <div className="space-y-3">
            {glows.map((glow) => (
              <div key={glow.id} className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600 italic mb-1">
                  "{glow.selectedText.slice(0, 100)}..."
                </div>
                <div className="text-sm">{glow.comment}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grows Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-green-500" />
            Grows
          </h3>
          <div className="space-y-3">
            {grows.map((grow) => (
              <div key={grow.id} className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600 italic mb-1">
                  "{grow.selectedText.slice(0, 100)}..."
                </div>
                <div className="text-sm">{grow.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Socratic Style
const SocraticFeedback = ({ annotations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Reflection Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {annotations.map((annotation) => (
            <div key={annotation.id} className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 italic mb-2">
                Regarding: "{annotation.selectedText.slice(0, 100)}..."
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-1 text-blue-500" />
                <div>{annotation.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Sandwich Style
const SandwichFeedback = ({ annotations }) => {
  // Assuming annotations are ordered: positive, constructive, positive
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {annotations.map((annotation, index) => (
          <div 
            key={annotation.id}
            className={`p-4 rounded-lg ${
              index % 2 === 0 ? 'bg-green-50' : 'bg-yellow-50'
            }`}
          >
            <h3 className="font-semibold mb-2">
              {index === 0 ? 'Strengths' : 
               index === 1 ? 'Areas for Growth' : 
               'Final Encouragement'}
            </h3>
            <div className="text-sm text-gray-600 italic mb-1">
              "{annotation.selectedText.slice(0, 100)}..."
            </div>
            <div>{annotation.comment}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Main component that switches between feedback styles
const FeedbackStyleWrapper = ({ 
  feedbackStyle,
  annotations,
}) => {
  switch (feedbackStyle) {
    case 'GLOW_GROW':
      return <GlowGrowFeedback annotations={annotations} />;
    case 'SOCRATIC':
      return <SocraticFeedback annotations={annotations} />;
    case 'SANDWICH':
      return <SandwichFeedback annotations={annotations} />;
    case 'STRUCTURED':
    case 'TARGETED':
    case 'ACTIONABLE':
    default:
      return <AnnotatedContent content="" annotations={annotations} />;
  }
};

export { 
  GlowGrowFeedback,
  SocraticFeedback,
  SandwichFeedback,
  FeedbackStyleWrapper
};

