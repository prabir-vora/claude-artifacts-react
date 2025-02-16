import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleText = `The water cycle is a natural process that involves the continuous movement of water on Earth. Water moves between the atmosphere, land, and oceans through various processes.`;

const feedbackStyles = {
  targeted: {
    annotations: [
      {
        text: "Good clear introduction to the concept",
        color: "bg-green-100 border-green-400",
        highlight: "The water cycle is a natural process",
        delay: 0.5
      },
      {
        text: "Consider adding specific examples of these processes",
        color: "bg-yellow-100 border-yellow-400",
        highlight: "various processes",
        delay: 1
      }
    ]
  },
  "glow-grow": {
    annotations: [
      {
        text: "✨ Excellent explanation of the basic concept",
        color: "bg-green-100 border-green-400",
        highlight: "continuous movement of water on Earth",
        delay: 0.5
      },
      {
        text: "🌱 Add examples like evaporation and precipitation",
        color: "bg-yellow-100 border-yellow-400",
        highlight: "various processes",
        delay: 1
      }
    ]
  },
  structured: {
    annotations: [
      {
        text: "Content Understanding: Clear basic definition",
        color: "bg-blue-100 border-blue-400",
        highlight: "The water cycle is a natural process",
        delay: 0.5
      },
      {
        text: "Detail: Include specific processes",
        color: "bg-purple-100 border-purple-400",
        highlight: "various processes",
        delay: 1
      }
    ]
  },
  sandwich: {
    annotations: [
      {
        text: "Great start with a clear definition!",
        color: "bg-green-100 border-green-400",
        highlight: "The water cycle is a natural process",
        delay: 0.5
      },
      {
        text: "Consider adding specific examples",
        color: "bg-yellow-100 border-yellow-400",
        highlight: "various processes",
        delay: 1
      },
      {
        text: "Overall, good basic understanding shown",
        color: "bg-green-100 border-green-400",
        highlight: "continuous movement of water",
        delay: 1.5
      }
    ]
  },
  actionable: {
    annotations: [
      {
        text: "1. Add 2-3 specific examples of water movement",
        color: "bg-blue-100 border-blue-400",
        highlight: "various processes",
        delay: 0.5
      },
      {
        text: "2. Explain the role of temperature in the cycle",
        color: "bg-blue-100 border-blue-400",
        highlight: "natural process",
        delay: 1
      }
    ]
  },
  socratic: {
    annotations: [
      {
        text: "What are some specific processes you can identify?",
        color: "bg-purple-100 border-purple-400",
        highlight: "various processes",
        delay: 0.5
      },
      {
        text: "How does this movement affect Earth's ecosystems?",
        color: "bg-purple-100 border-purple-400",
        highlight: "continuous movement of water",
        delay: 1
      }
    ]
  }
};

const FeedbackPreview = ({ style = 'targeted' }) => {
  const [selectedText, setSelectedText] = useState("");
  const [showAnnotations, setShowAnnotations] = useState(false);

  useEffect(() => {
    setShowAnnotations(false);
    const timer = setTimeout(() => {
      setShowAnnotations(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [style]);

  // Get the current style configuration or default to targeted style
  const currentStyle = feedbackStyles[style] || feedbackStyles.targeted;

  // Safety check for annotations
  if (!currentStyle || !currentStyle.annotations) {
    return (
      <div className="p-4 text-red-500">
        Error: Invalid feedback style selected
      </div>
    );
  }

  return (
    <div className="flex gap-6 p-4 max-w-4xl">
      <div className="w-1/2 relative bg-white rounded-lg p-4 shadow-sm">
        <div className="prose">
          {sampleText.split(new RegExp(`(${currentStyle.annotations.map(a => a.highlight).join('|')})`, 'g')).map((part, i) => {
            const annotation = currentStyle.annotations.find(a => a.highlight === part);
            return annotation ? (
              <motion.span
                key={i}
                initial={{ backgroundColor: "transparent" }}
                animate={{ 
                  backgroundColor: annotation.color.includes("green") ? "#dcfce7" : 
                                 annotation.color.includes("yellow") ? "#fef9c3" :
                                 annotation.color.includes("blue") ? "#dbeafe" :
                                 annotation.color.includes("purple") ? "#f3e8ff" : "transparent"
                }}
                transition={{ 
                  duration: 0.5,
                  delay: annotation.delay 
                }}
                className={`px-1 rounded transition-colors`}
              >
                {part}
              </motion.span>
            ) : (
              <span key={i}>{part}</span>
            );
          })}
        </div>
      </div>
      
      <div className="w-1/2 space-y-3">
        <AnimatePresence mode="wait">
          {showAnnotations && currentStyle.annotations.map((annotation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, delay: annotation.delay }}
              className={`p-3 rounded-lg border ${annotation.color} shadow-sm`}
            >
              {annotation.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeedbackPreview;