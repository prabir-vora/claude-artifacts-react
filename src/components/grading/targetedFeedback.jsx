import React, { useState } from 'react';
import { MessageCircle, Lightbulb, Book, Split, Edit, Check, X, ChevronDown, ChevronUp, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const SAMPLE_ESSAY = {
  text: `The Industrial Revolution marked a major turning point in human history, fundamentally changing how people lived and worked. This period saw unprecedented technological advancement and economic growth, but also brought significant social challenges.

During this time, new manufacturing processes emerged, replacing hand production methods with machines. Steam power and the factory system became widespread, leading to increased productivity and efficiency. Cities grew rapidly as people moved from rural areas to find work in factories.

However, these changes also led to difficult working conditions, including long hours, unsafe environments, and child labor. The gap between wealthy factory owners and working-class laborers widened, creating social tensions and eventually leading to the formation of labor unions and new labor laws.

The environmental impact was also significant, with increased pollution and urban crowding. Yet, the period also drove innovations in transportation, communication, and manufacturing techniques that laid the foundation for modern industrial society.`,
  score: 85,
  feedback: "Strong analysis of cause and effect relationships, but could include more specific historical examples."
};

const SIMILAR_ESSAYS = [
  {
    id: 1,
    title: "Industrial Revolution Effects",
    score: 92,
    strength: "Excellent use of specific examples"
  },
  {
    id: 2,
    title: "Social Impact of Industrialization",
    score: 88,
    strength: "Strong analysis of social consequences"
  }
];

const ANNOTATIONS = [
  {
    id: 1,
    startOffset: 0,
    endOffset: 134,
    type: 'strength',
    comment: "Strong opening paragraph with clear thesis statement",
    suggestion: "Consider adding a specific date range for context"
  },
  {
    id: 2,
    startOffset: 287,
    endOffset: 386,
    type: 'improvement',
    comment: "This point could use specific examples",
    suggestion: "Add examples like the cotton gin or steam engine"
  }
];

const REVISION_SUGGESTIONS = [
  {
    id: 1,
    title: "Add Specific Examples",
    description: "Include key inventions and their inventors",
    examples: ["Cotton gin - Eli Whitney", "Steam engine - James Watt"]
  },
  {
    id: 2,
    title: "Expand Social Impact",
    description: "Discuss specific labor reforms and union activities",
    examples: ["Factory Act of 1833", "Formation of early unions"]
  }
];

const AnnotationMarker = ({ annotation, isSelected, onClick }) => {
  const getStyles = (type) => {
    switch (type) {
      case 'strength':
        return 'bg-green-100 border-green-400 hover:bg-green-200';
      case 'improvement':
        return 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200';
      case 'issue':
        return 'bg-red-100 border-red-400 hover:bg-red-200';
      default:
        return 'bg-blue-100 border-blue-400 hover:bg-blue-200';
    }
  };

  return (
    <span
      className={`relative cursor-pointer border-b-2 ${getStyles(annotation.type)} ${
        isSelected ? 'ring-2 ring-offset-1 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      {annotation.content}
    </span>
  );
};

const FeedbackPanel = ({ annotation }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Feedback</span>
        </div>
        <span className={`text-sm px-2 py-1 rounded ${
          annotation.type === 'strength' ? 'bg-green-100 text-green-700' :
          annotation.type === 'improvement' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {annotation.type.charAt(0).toUpperCase() + annotation.type.slice(1)}
        </span>
      </div>
      <p className="text-gray-700">{annotation.comment}</p>
      {annotation.suggestion && (
        <div className="bg-blue-50 p-3 rounded">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Suggestion</span>
          </div>
          <p className="text-sm text-blue-700">{annotation.suggestion}</p>
        </div>
      )}
    </div>
  );
};

const SimilarEssayCard = ({ essay }) => (
  <div className="p-4 bg-white rounded-lg shadow-sm border">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-medium">{essay.title}</h3>
      <span className="text-green-600 font-medium">{essay.score}%</span>
    </div>
    <p className="text-sm text-gray-600">
      <span className="font-medium">Strength: </span>
      {essay.strength}
    </p>
  </div>
);

const RevisionSuggestion = ({ suggestion }) => (
  <div className="p-4 bg-white rounded-lg shadow-sm border">
    <div className="flex items-center gap-2 mb-2">
      <Lightbulb className="w-5 h-5 text-blue-500" />
      <h3 className="font-medium">{suggestion.title}</h3>
    </div>
    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
    <div className="bg-blue-50 p-3 rounded">
      <span className="text-sm font-medium text-blue-700">Examples:</span>
      <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
        {suggestion.examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>
    </div>
  </div>
);

const PrintableFormat = ({ essay, annotations, score, feedback }) => {
  const createAnnotatedText = () => {
    let lastIndex = 0;
    const pieces = [];
    
    // Sort annotations by start position
    const sortedAnnotations = [...annotations].sort((a, b) => a.startOffset - b.startOffset);
    
    sortedAnnotations.forEach((annotation, index) => {
      // Add text before annotation
      if (annotation.startOffset > lastIndex) {
        pieces.push(SAMPLE_ESSAY.text.slice(lastIndex, annotation.startOffset));
      }
      
      // Add annotated text with highlighting
      const annotatedPart = SAMPLE_ESSAY.text.slice(annotation.startOffset, annotation.endOffset);
      const highlightColor = annotation.type === 'strength' ? 'rgba(134, 239, 172, 0.3)' 
        : annotation.type === 'improvement' ? 'rgba(253, 224, 71, 0.3)' 
        : 'rgba(252, 165, 165, 0.3)';
      
      pieces.push(`<mark style="background-color: ${highlightColor};">${annotatedPart}</mark><sup style="color: #3b82f6; font-weight: 600;">[${index + 1}]</sup>`);
      
      lastIndex = annotation.endOffset;
    });
    
    // Add remaining text
    if (lastIndex < SAMPLE_ESSAY.text.length) {
      pieces.push(SAMPLE_ESSAY.text.slice(lastIndex));
    }
    
    return pieces.join('');
  };

  return `
    <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 40px auto; 
            padding: 20px;
            color: #000;
          }
          .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
          }
          .score { 
            font-size: 24px; 
            color: #16a34a; 
            font-weight: bold; 
          }
          .essay-text { 
            line-height: 1.6; 
            margin-bottom: 30px;
            white-space: pre-wrap;
            font-size: 16px;
            color: #000;
          }
          .feedback-section { 
            margin-top: 30px;
            page-break-inside: avoid;
          }
          .feedback-item { 
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
            page-break-inside: avoid;
            position: relative;
          }
          .strength { background-color: #dcfce7; }
          .improvement { background-color: #fef9c3; }
          .issue { background-color: #fee2e2; }
          .suggestion { 
            background-color: #dbeafe;
            padding: 10px;
            margin-top: 8px;
            border-radius: 4px;
          }
          .annotation-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #3b82f6;
            color: white;
            font-size: 12px;
            margin-right: 8px;
          }
          mark {
            background: none;
            padding: 0 1px;
          }
          sup {
            font-size: 0.65em;
            line-height: 0;
            position: relative;
            top: -0.5em;
            margin-left: 1px;
            margin-right: 1px;
          }
          .feedback-number {
            position: absolute;
            left: -10px;
            top: -10px;
            width: 24px;
            height: 24px;
            background-color: #3b82f6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Essay Feedback Report</h1>
          <div class="score">Score: ${score}%</div>
        </div>
        
        <div class="essay-text">
          ${createAnnotatedText()}
        </div>

        <div class="feedback-section">
          <h2>Detailed Feedback</h2>
          ${annotations.map((annotation, index) => `
            <div class="feedback-item ${annotation.type}">
              <div class="feedback-number">${index + 1}</div>
              <div style="margin-left: 15px;">
                <strong>${annotation.type.charAt(0).toUpperCase() + annotation.type.slice(1)}:</strong>
                <p style="margin: 8px 0;">${annotation.comment}</p>
                ${annotation.suggestion ? `
                  <div class="suggestion">
                    <strong>Suggestion:</strong>
                    <p style="margin: 8px 0;">${annotation.suggestion}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="feedback-section">
          <h2>Overall Feedback</h2>
          <p>${feedback}</p>
        </div>
      </body>
    </html>
  `;
};

const EnhancedEssayGrader = () => {
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [showSimilar, setShowSimilar] = useState(false);
  const [showRevisions, setShowRevisions] = useState(false);

  const createAnnotatedText = () => {
    let lastIndex = 0;
    const pieces = [];
    
    ANNOTATIONS.forEach((annotation, index) => {
      // Add text before annotation
      if (annotation.startOffset > lastIndex) {
        pieces.push(
          <span key={`text-${index}`}>
            {SAMPLE_ESSAY.text.slice(lastIndex, annotation.startOffset)}
          </span>
        );
      }
      
      // Add annotated text
      pieces.push(
        <AnnotationMarker
          key={`annotation-${index}`}
          annotation={{
            ...annotation,
            content: SAMPLE_ESSAY.text.slice(annotation.startOffset, annotation.endOffset)
          }}
          isSelected={selectedAnnotation?.id === annotation.id}
          onClick={() => setSelectedAnnotation(annotation)}
        />
      );
      
      lastIndex = annotation.endOffset;
    });
    
    // Add remaining text
    if (lastIndex < SAMPLE_ESSAY.text.length) {
      pieces.push(
        <span key="text-final">
          {SAMPLE_ESSAY.text.slice(lastIndex)}
        </span>
      );
    }
    
    return pieces;
  };

  const handlePrintFeedback = () => {
    const printContent = PrintableFormat({
      essay: SAMPLE_ESSAY,
      annotations: ANNOTATIONS,
      score: SAMPLE_ESSAY.score,
      feedback: SAMPLE_ESSAY.feedback
    });
    
    // First export HTML for debugging
    const htmlBlob = new Blob([printContent], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'essay-feedback.html';
    document.body.appendChild(htmlLink);
    htmlLink.click();
    document.body.removeChild(htmlLink);
    URL.revokeObjectURL(htmlUrl);
  
    // Then generate PDF
    const element = document.createElement('div');
    element.innerHTML = printContent;
    document.body.appendChild(element);
  
    const options = {
      margin: 1,
      filename: 'essay-feedback.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().set(options).from(element).save().then(() => {
      document.body.removeChild(element);
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-6">
        {/* Essay Content */}
        <div className="w-2/3 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Essay Review</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrintFeedback}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  <span>Download Feedback</span>
                </button>
                <span className="text-2xl font-bold text-green-600">{SAMPLE_ESSAY.score}%</span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              {createAnnotatedText().map((piece, index) => (
                <React.Fragment key={index}>{piece}</React.Fragment>
              ))}
            </div>
          </div>

          {/* Selected Annotation Feedback */}
          {selectedAnnotation && (
            <FeedbackPanel annotation={selectedAnnotation} />
          )}
        </div>

        {/* Sidebar */}
        <div className="w-1/3 space-y-4">
          {/* Similar Essays */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <button
              onClick={() => setShowSimilar(!showSimilar)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Similar Essays</span>
              </div>
              {showSimilar ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {showSimilar && (
              <div className="mt-4 space-y-4">
                {SIMILAR_ESSAYS.map(essay => (
                  <SimilarEssayCard key={essay.id} essay={essay} />
                ))}
              </div>
            )}
          </div>

          {/* Revision Suggestions */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <button
              onClick={() => setShowRevisions(!showRevisions)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Revision Suggestions</span>
              </div>
              {showRevisions ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {showRevisions && (
              <div className="mt-4 space-y-4">
                {REVISION_SUGGESTIONS.map(suggestion => (
                  <RevisionSuggestion key={suggestion.id} suggestion={suggestion} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEssayGrader;