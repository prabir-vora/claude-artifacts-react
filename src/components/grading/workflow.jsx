import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GradingWorkflow = () => {
  const [currentPhase, setCurrentPhase] = useState('SCORING');
  const [criteriaStatus, setCriteriaStatus] = useState({
    'thesis': 'pending',
    'evidence': 'pending',
    'analysis': 'pending',
    'mechanics': 'pending'
  });

  const criteria = [
    {
      id: 'thesis',
      title: 'Thesis & Argument',
      maxPoints: 25,
      aiScore: 23,
      evidence: 'Clear thesis statement in first paragraph: "Throughout F. Scott Fitzgerald\'s The Great Gatsby..."'
    },
    {
      id: 'evidence',
      title: 'Evidence Usage',
      maxPoints: 25,
      aiScore: 21,
      evidence: 'Multiple textual references but lacking specific quotes'
    },
    {
      id: 'analysis',
      title: 'Analysis Depth',
      maxPoints: 25,
      aiScore: 22,
      evidence: 'Strong analysis of symbolism, particularly in discussion of green light'
    },
    {
      id: 'mechanics',
      title: 'Writing Mechanics',
      maxPoints: 25,
      aiScore: 24,
      evidence: 'Well-structured paragraphs, minimal grammatical errors'
    }
  ];

  const handleCriterionComplete = (criterionId) => {
    setCriteriaStatus(prev => ({
      ...prev,
      [criterionId]: currentPhase === 'SCORING' ? 'scored' : 'feedback_added'
    }));
  };

  const handlePhaseComplete = () => {
    if (currentPhase === 'SCORING') {
      setCurrentPhase('FEEDBACK');
    } else if (currentPhase === 'FEEDBACK') {
      setCurrentPhase('COMPLETE');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Phase Indicator */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <div className={`flex items-center gap-2 ${
            currentPhase === 'SCORING' ? 'text-blue-600 font-bold' : 'text-gray-600'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPhase === 'SCORING' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>1</div>
            Scoring
          </div>
          <div className={`flex items-center gap-2 ${
            currentPhase === 'FEEDBACK' ? 'text-blue-600 font-bold' : 'text-gray-600'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPhase === 'FEEDBACK' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>2</div>
            Feedback
          </div>
        </div>
      </div>

      {/* Criteria Cards */}
      <div className="space-y-4">
        {criteria.map((criterion) => (
          <Card key={criterion.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{criterion.title}</span>
                <span className="text-sm">
                  {criteriaStatus[criterion.id] === 'pending' ? '⏳' : 
                   criteriaStatus[criterion.id] === 'scored' ? '✓' : '✓✓'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPhase === 'SCORING' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">AI Suggested Score</div>
                      <div className="text-2xl">{criterion.aiScore}/{criterion.maxPoints}</div>
                    </div>
                    <Button 
                      onClick={() => handleCriterionComplete(criterion.id)}
                      disabled={criteriaStatus[criterion.id] !== 'pending'}
                    >
                      Approve Score
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium mb-2">Supporting Evidence:</div>
                    <div className="text-sm">{criterion.evidence}</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>Final Score: {criterion.aiScore}/{criterion.maxPoints}</div>
                    <Button
                      onClick={() => handleCriterionComplete(criterion.id)}
                      disabled={criteriaStatus[criterion.id] === 'feedback_added'}
                    >
                      Add Feedback
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Phase Control */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handlePhaseComplete}
          disabled={Object.values(criteriaStatus).some(status => 
            (currentPhase === 'SCORING' && status === 'pending') ||
            (currentPhase === 'FEEDBACK' && status !== 'feedback_added')
          )}
        >
          {currentPhase === 'SCORING' ? 'Proceed to Feedback' : 'Complete Grading'}
        </Button>
      </div>
    </div>
  );
};

export default GradingWorkflow;