import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SAMPLE_TEXT = `
A Day in a Different World

by Maya Patel



The grass beneath my feet sparkled like it was made of tiny emeralds, each blade catching the light of three suns that hung in a sky the color of roses and honey. The air smelled like cinnamon and something else—maybe stardust, if stardust had a smell. All around me, flowers grew that looked like they were carved from crystals, their petals chiming softly when the warm breeze brushed against them.



I reached out to touch one of the crystal flowers. Its surface felt warm and alive under my fingers, pulsing with a gentle light that reminded me of a heartbeat. The petals rang out a musical note that echoed across the meadow, and suddenly all the other flowers started chiming too, creating a symphony of tinkling crystal sounds that made my whole body tingle.



The forest at the edge of the meadow was even more amazing. The trees were impossibly tall, their trunks spiraling up into the colorful sky like twisted glass sculptures. Their leaves were mirrors that reflected different moments in time—in one leaf I saw dinosaurs roaming ancient Earth, in another I glimpsed what looked like flying cars in a futuristic city. Each branch held hundreds of these memory-leaves, telling countless stories in their reflective surfaces.



A creature floated past me. It looked like a cross between a butterfly and a cloud, its wings made of swirling mist in shades of purple and silver. Its eyes were like tiny galaxies, swirling with stars and nebulae. When it flew close to me, I could hear it humming a melody that made shapes appear in the air—floating geometric patterns that dissolved like sugar in tea.



The path I followed was made of stones that changed color with each step. Red to blue to gold to green, they created patterns that seemed to be trying to tell me something. Sometimes they formed arrows pointing in different directions, other times they swirled into spiral patterns that made me dizzy if I looked at them too long.



In the distance, I saw a city that looked like it was built from light itself. The buildings were ever-changing ribbons of color that wove themselves into towers and arches, then unraveled and reformed into new shapes. I started walking toward it, but then I saw something even more interesting—a pool of what looked like liquid starlight, with creatures made of shadow dancing on its surface.



I spent a long time watching the shadow creatures. They moved like dancers, their forms shifting and changing—sometimes they looked almost human, other times they became abstract patterns that reminded me of calligraphy. One of them noticed me watching and waved, its arm leaving trails of darkness in the air like ink in water.



The longer I stayed in this world, the more details I noticed. The clouds overhead weren't really clouds at all, but rather schools of tiny floating creatures that looked like jellyfish made of morning fog. The ground beneath the crystal grass was slightly transparent, and sometimes I caught glimpses of complex root systems that glowed with bioluminescent light, creating maps of light beneath my feet.



Then everything started to fade, like watercolors running together in the rain. The crystal flowers' song grew fainter, the shadow dancers melted away into nothing, and the memory-leaves on the trees became blank mirrors. I tried to hold onto the details—the smell of cinnamon and stardust, the feeling of warm crystal under my fingers, the sound of the flowers' symphony—but it was all slipping away.



I woke up in my own bed, surrounded by ordinary walls and ordinary sunlight. But when I looked in the mirror, my eyes had a strange sparkle to them, like they had caught and kept some of that other world's starlight. And sometimes, when it's very quiet, I think I can still hear the faint chiming of crystal flowers carried on a breeze from somewhere far away.`

const TextAnnotator = ({ text = SAMPLE_TEXT }) => {
  // State for storing annotations
  const [annotations, setAnnotations] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [newComment, setNewComment] = useState('');

  // Generate a unique ID for new annotations
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || !selection.toString()) return;

    const range = selection.getRangeAt(0);
    if (!range) return;

    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const selectedText = selection.toString();

    setSelectedRange({
      startOffset,
      endOffset,
      selectedText
    });
  };

  // Add new annotation
  const addAnnotation = (comment) => {
    if (!selectedRange || !comment.trim()) return;

    const newAnnotation = {
      id: generateId(),
      ...selectedRange,
      comment
    };

    setAnnotations(prev => [...prev, newAnnotation]);
    setSelectedRange(null);
    setNewComment('');
  };

  // Delete annotation
  const deleteAnnotation = (id) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== id));
  };

  // Render annotated text with highlights and popovers
  const renderAnnotatedText = () => {
    if (!text) return null;
    
    let lastIndex = 0;
    const elements = [];

    // Sort annotations by start offset
    const sortedAnnotations = [...annotations].sort((a, b) => a.startOffset - b.startOffset);

    sortedAnnotations.forEach((annotation, index) => {
      // Add text before annotation
      if (annotation.startOffset > lastIndex) {
        elements.push(
          <span key={`text-${index}`} className="whitespace-pre-wrap">
            {text.slice(lastIndex, annotation.startOffset)}
          </span>
        );
      }

      // Add annotated text with popover
      elements.push(
        <Popover key={annotation.id}>
          <PopoverTrigger>
            <span className="bg-yellow-100 cursor-pointer whitespace-pre-wrap">
              {text.slice(annotation.startOffset, annotation.endOffset)}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Comment:</p>
              <p className="text-sm">{annotation.comment}</p>
              <button
                onClick={() => deleteAnnotation(annotation.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete annotation
              </button>
            </div>
          </PopoverContent>
        </Popover>
      );

      lastIndex = annotation.endOffset;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end" className="whitespace-pre-wrap">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  // Early return if no text is provided
  if (!text) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-gray-500">
        Please provide some text to annotate.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Text container */}
      <div 
        onMouseUp={handleTextSelection}
        className="mb-4 text-lg leading-relaxed"
      >
        {renderAnnotatedText()}
      </div>

      {/* Comment input for new annotation */}
      {selectedRange && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex items-start space-x-2">
            <MessageCircle className="w-5 h-5 mt-2" />
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Selected text: "{selectedRange.selectedText}"
              </p>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-md"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedRange(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => addAnnotation(newComment)}
                  disabled={!newComment.trim()}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  Add annotation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAnnotator;