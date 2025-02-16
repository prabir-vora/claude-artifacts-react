import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageCircle, Star, ArrowUpCircle, CheckCircle2 } from 'lucide-react';

const FeedbackDisplay = () => {
  // Example data
  const feedback = {
    content: `# The American Dream in The Great Gatsby

Throughout F. Scott Fitzgerald's The Great Gatsby, the American Dream serves as both a powerful motivator and a destructive force. Gatsby's relentless pursuit of wealth and status, driven by his love for Daisy, ultimately leads to his downfall.

The green light at the end of Daisy's dock symbolizes Gatsby's hopes and dreams. However, like the American Dream itself, it remains forever out of reach.`,
    annotations: [
      {
        id: "1",
        selectedText: "Throughout F. Scott Fitzgerald's The Great Gatsby...",
        comment: "Strong thesis statement that effectively frames your argument.",
        type: "HIGHLIGHT"
      },
      {
        id: "2",
        selectedText: "The green light at the end of Daisy's dock...",
        comment: "Consider expanding on this symbolism with specific textual evidence.",
        type: "SUGGESTION"
      }
    ],
    rubricGrades: [
      {
        criterionId: "1",
        criterionTitle: "Thesis & Argument",
        points: 23,
        maxPoints: 25,
        comment: "Excellent thesis with clear argumentation."
      },
      {
        criterionId: "2",
        criterionTitle: "Evidence & Analysis",
        points: 21,
        maxPoints: 25,
        comment: "Good analysis but needs more specific examples."
      }
    ],
    feedbackStyle: "STRUCTURED",
    overallGrade: 88,
    maxPoints: 100
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Overall Grade Display */}
      <GradeOverview 
        grade={feedback.overallGrade} 
        maxPoints={feedback.maxPoints} 
      />
      
      {/* Rubric Breakdown */}
      <RubricBreakdown rubricGrades={feedback.rubricGrades} />
      
      {/* Content with Annotations */}
      <AnnotatedContent 
        content={feedback.content}
        annotations={feedback.annotations}
      />
    </div>
  );
};

const GradeOverview = ({ grade, maxPoints }) => {
  const percentage = (grade / maxPoints) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Grade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            {grade}/{maxPoints}
          </div>
          <div className="text-2xl">
            {percentage.toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RubricBreakdown = ({ rubricGrades }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rubric Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rubricGrades.map((grade) => (
          <div key={grade.criterionId} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{grade.criterionTitle}</h3>
              <span className="font-medium">
                {grade.points}/{grade.maxPoints}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {grade.comment}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const AnnotatedContent = ({ 
  content, 
  annotations 
  }) => {
  const getAnnotationIcon = (type) => {
    switch (type) {
      case 'HIGHLIGHT':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'SUGGESTION':
        return <ArrowUpCircle className="w-4 h-4 text-blue-500" />;
      case 'CORRECTION':
        return <CheckCircle2 className="w-4 h-4 text-red-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annotated Submission</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap">{content}</div>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Annotations</h3>
            {annotations.map((annotation) => (
              <div 
                key={annotation.id} 
                className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
              >
                {getAnnotationIcon(annotation.type)}
                <div>
                  <div className="text-sm text-gray-600 italic mb-1">
                    "{annotation.selectedText.slice(0, 100)}..."
                  </div>
                  <div>{annotation.comment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;