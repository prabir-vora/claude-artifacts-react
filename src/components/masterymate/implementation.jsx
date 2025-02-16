import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  Plus, 
  Search, 
  Wrench, 
  Clock as ClockIcon,
  FileText,
  Download,
  UploadCloud,
  MessageSquare,
  Settings,
  Upload,
  FileDown,
  Presentation,
  Globe,
  Laptop,
  CheckSquare,
  Users,
  Lightbulb,
  Globe2,
  Heart,
  Calendar as CalendarIcon,
  Play,
  Users2,
  BrainCircuit,
  Pause,
  StopCircle,
  GripVertical,
  ArrowUpDown,
  Minus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Calendar as UiCalendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DateTimeSelector = ({ date, startTime, endTime, onDateChange, onTimeChange, label }) => (
  <div className="flex items-center gap-2">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(new Date(date), 'PPP') : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <UiCalendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <div className="flex items-center gap-2">
      <Input
        type="time"
        value={startTime}
        onChange={(e) => onTimeChange('start', e.target.value)}
        className="w-[120px]"
        placeholder="Start time"
      />
      <span className="text-gray-400">to</span>
      <Input
        type="time"
        value={endTime}
        onChange={(e) => onTimeChange('end', e.target.value)}
        className="w-[120px]"
        placeholder="End time"
      />
    </div>
  </div>
);

const DayScheduling = ({ day, schedule, onScheduleChange }) => (
  <div className="mt-2 space-y-2 pl-2">
    <DateTimeSelector
      date={schedule?.date}
      startTime={schedule?.startTime}
      endTime={schedule?.endTime}
      onDateChange={(date) => onScheduleChange(day, { ...schedule, date })}
      onTimeChange={(type, time) => onScheduleChange(day, { 
        ...schedule, 
        [type === 'start' ? 'startTime' : 'endTime']: time 
      })}
      label="Set day's date"
    />
  </div>
);

const SessionControl = ({ type, isActive, onStart, onEnd }) => {
  const sessionTypes = {
    reflection: {
      icon: Users2,
      title: "Live Reflection Session",
      description: "Guide students through reflection prompts in real-time",
      color: "purple"
    },
    toolkit: {
      icon: BrainCircuit,
      title: "Project Toolkit Session",
      description: "Facilitate AI tool usage in a guided session",
      color: "emerald"
    },
    lesson: {
      icon: Presentation,
      title: "Interactive Lesson",
      description: "Present and engage with lesson materials",
      color: "blue"
    }
  };

  const config = sessionTypes[type];

  return (
    <div className={`bg-${config.color}-50 border border-${config.color}-200 rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-${config.color}-100 rounded-lg flex items-center justify-center`}>
            <config.icon className={`text-${config.color}-600`} size={20} />
          </div>
          <div>
            <h3 className={`font-medium text-${config.color}-900`}>{config.title}</h3>
            <p className={`text-sm text-${config.color}-600`}>{config.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                className={`border-${config.color}-200 hover:bg-${config.color}-100`}
                onClick={() => onEnd()}
              >
                <StopCircle className="mr-2 h-4 w-4" />
                End Session
              </Button>
              <div className={`px-3 py-1 bg-${config.color}-100 text-${config.color}-700 rounded-full text-sm animate-pulse`}>
                Live
              </div>
            </>
          ) : (
            <Button 
              size="sm"
              onClick={() => onStart()}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Session
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectImplementation = () => {
    const [activities, setActivities] = useState([
        {
          id: 1,
          startDay: 1,
          endDay: 1,
          title: "Letters from Home",
          type: "Entry Event",
          steps: [
            { id: 1, text: "Distribute WWII family letters to students", completed: false },
            { id: 2, text: "Students read and analyze letters", completed: false },
            { id: 3, text: "Class discussion on initial impressions", completed: false }
          ],
          teacherNotes: "Prepare authentic-looking letter templates beforehand. Each letter should tell a different story and reflect concerns of the time.",
          deliverables: [
            {
              title: "Initial Analysis Document",
              description: "Submit a one-page analysis of the letter's historical context",
              format: "document",
              dueDate: "End of class"
            }
          ],
          reflectionPrompts: [
            {
              question: "What emotions and concerns did you identify in the letters?",
              type: "text",
              required: true
            },
            {
              question: "How confident do you feel about your understanding of the historical context?",
              type: "scale",
              required: true
            }
          ],
          hidden: false,
          aiTools: [
            {
              id: "web_research",
              name: "Web Research Assistant",
              icon: "🌐",
              prompt: "You are a research assistant helping students find and evaluate historical sources about WWII. Focus on finding primary sources like letters, diaries, and official documents. Explain historical context and help verify source authenticity. Encourage critical thinking about historical bias and perspective.",
              enabled: true
            },
            {
              id: "brainstorm",
              name: "Brainstorm Partner",
              icon: "🌀",
              prompt: "You are a brainstorming partner helping students analyze WWII letters. Ask probing questions about emotional content, historical context, and cultural perspectives. Help students identify themes, patterns, and unique insights. Encourage deeper analysis by connecting personal stories to broader historical events.",
              enabled: true
            }
          ],
          resources: [
            {
              id: 1,
              type: 'slides',
              title: 'Introduction to WWII Letters',
              description: 'Interactive presentation about wartime correspondence and its historical significance',
              url: '/path/to/slides'
            },
            {
              id: 2,
              type: 'worksheet',
              title: 'Letter Analysis Template',
              description: 'Structured worksheet for analyzing historical letters - includes context, themes, and emotional content',
              url: '/path/to/worksheet'
            },
            {
              id: 3,
              type: 'interactive',
              title: 'Virtual Letter Writing Station',
              description: 'Interactive web-based activity where students can explore authentic WWII letter formats and censorship practices',
              url: '/path/to/interactive'
            },
            {
              id: 4,
              type: 'quiz',
              title: 'WWII Communication Methods',
              description: 'Pre-activity quiz to assess student knowledge of wartime communication',
              url: '/path/to/quiz'
            },
            {
              id: 5,
              type: 'link',
              title: 'National Archives - WWII Letters Collection',
              description: 'Curated collection of authentic WWII letters with teaching guides',
              url: 'https://example.com/archives'
            }
          ]
        },
        {
          id: 2,
          startDay: 1,
          endDay: 1,
          title: "Letters of the Era",
          type: "Portfolio Activity",
          steps: [
            { id: 1, text: "Select a fictional letter from those provided or research real WWII letters online", completed: false },
            { id: 2, text: "Identify the concerns and emotions expressed in the letter to understand the context", completed: false },
            { id: 3, text: "Pair up with a classmate and brainstorm possible soldier responses", completed: false },
            { id: 4, text: "Begin noting initial ideas about soldier life based on letter insights", completed: false }
          ],
          teacherNotes: "Guide students to focus on daily life and concerns faced by soldiers. Encourage them to think about the emotional aspects of communication during wartime.",
          deliverables: [
            {
              title: "Soldier Response Draft",
              description: "Create a list of imagined soldier responses that outline daily experiences and emotions",
              format: "document",
              dueDate: "End of Day 1"
            }
          ],
          reflectionPrompts: [
            {
              question: "What surprised you most about the letters you analyzed?",
              type: "text",
              required: true
            },
            {
              question: "How did this activity change your perspective on wartime communication?",
              type: "text",
              required: true
            }
          ],
          hidden: false,
          aiTools: [
            {
              id: "web_research",
              name: "Web Research Assistant",
              icon: "🌐",
              prompt: "You are a research assistant specializing in WWII correspondence. Help students find examples of authentic wartime letters, focusing on language patterns, common themes, and historical accuracy. Guide them in understanding period-specific communication styles and social norms.",
              enabled: true
            },
            {
              id: "writing_assistant",
              name: "Writing Assistant",
              icon: "✍️",
              prompt: "You are a writing coach helping students craft historically accurate WWII-era letters. Ensure period-appropriate language, tone, and content. Guide students to incorporate authentic details about wartime life, censorship practices, and common concerns of the era. Help maintain historical accuracy while allowing for creative expression.",
              enabled: true
            },
            {
              id: "brainstorm",
              name: "Brainstorm Partner",
              icon: "🌀",
              prompt: "You are a creative partner helping students develop soldier responses to WWII letters. Ask questions about the soldier's background, experiences, and emotional state. Help students consider historical events, military life, and personal relationships that would influence their writing. Encourage authentic and historically grounded storytelling.",
              enabled: true
            }
          ],
          resources: [
            {
              id: 1,
              type: 'interactive',
              title: 'WWII Letter Writing Simulator',
              description: 'Interactive tool for crafting period-accurate letters with guidance on style and content',
              url: '/path/to/simulator'
            },
            {
              id: 2,
              type: 'worksheet',
              title: 'Soldier Response Planning Guide',
              description: 'Structured worksheet to help students plan authentic soldier responses',
              url: '/path/to/worksheet'
            },
            {
              id: 3,
              type: 'quiz',
              title: 'WWII Soldier Life Quiz',
              description: 'Assessment of student understanding of daily military life and experiences',
              url: '/path/to/quiz'
            }
          ]
        },
        {
          id: 3,
          startDay: 2,
          endDay: 3,
          title: "The Research Trail",
          type: "Portfolio Activity",
          steps: [
            { id: 1, text: "Formulate several focused research questions about soldiers' experiences in WWII", completed: false },
            { id: 2, text: "Utilize school library resources, verified online databases, and history textbooks", completed: false },
            { id: 3, text: "Document findings in a research organizer", completed: false },
            { id: 4, text: "Note key events, daily routines, and national differences in experience", completed: false }
          ],
          teacherNotes: "Students might need guidance on evaluating source reliability and organizing their research effectively. Emphasize the importance of documenting sources properly.",
          deliverables: [
            {
              title: "Research Organizer",
              description: "Submit organized research notes with properly cited sources, detailing soldiers' experiences from different fronts of the war",
              format: "document",
              dueDate: "End of Day 3"
            }
          ],
          reflectionPrompts: [
            {
              question: "What challenges did you face while researching?",
              type: "text",
              required: true
            },
            {
              question: "What was the most interesting difference you found between soldiers from different countries?",
              type: "text",
              required: true
            }
          ],
          hidden: false,
          aiTools: [
            {
              id: "web_research",
              name: "Web Research Assistant",
              icon: "🌐",
              prompt: "You are a research guide specializing in WWII military history. Help students find and evaluate credible sources about soldiers' experiences across different fronts and military branches. Focus on daily life, combat experiences, and cultural differences between various armed forces. Guide proper citation and source documentation.",
              enabled: true
            },
            {
              id: "data_analyst",
              name: "Data Analyst",
              icon: "📊",
              prompt: "You are a historical data analyst helping students understand WWII military statistics and records. Help interpret deployment numbers, casualty figures, and other relevant data. Guide students in drawing meaningful conclusions while maintaining historical accuracy and context. Assist in organizing and presenting findings clearly.",
              enabled: true
            }
          ],
          resources: [
            {
              id: 1,
              type: 'interactive',
              title: 'WWII Research Database',
              description: 'Interactive database of soldier experiences with guided research tools',
              url: '/path/to/database'
            },
            {
              id: 2,
              type: 'worksheet',
              title: 'Research Organization Template',
              description: 'Comprehensive template for organizing and citing research findings',
              url: '/path/to/template'
            },
            {
              id: 3,
              type: 'slides',
              title: 'Research Methodology Guide',
              description: 'Interactive presentation on historical research methods and source evaluation',
              url: '/path/to/slides'
            }
          ]
        },
        {
          id: 4,
          startDay: 3,
          endDay: 4,
          title: "Diary Drafting",
          type: "Portfolio Activity",
          steps: [
            { id: 1, text: "Choose a soldier persona (country, rank, specific events experienced)", completed: false },
            { id: 2, text: "Draft a detailed script incorporating factual information and personal elements", completed: false },
            { id: 3, text: "Include reflections on historical events and personal life", completed: false },
            { id: 4, text: "Incorporate period-specific language and details", completed: false }
          ],
          teacherNotes: "Encourage students to balance historical accuracy with creative storytelling. Remind them to use their research to inform the personal narrative.",
          deliverables: [
            {
              title: "Audio Diary Script Draft",
              description: "Submit initial draft of your audio diary script reflecting a WWII soldier's experience",
              format: "document",
              dueDate: "End of Day 4"
            }
          ],
          reflectionPrompts: [
            {
              question: "How did you choose your soldier's background and perspective?",
              type: "text",
              required: true
            },
            {
              question: "What was the biggest challenge in balancing historical facts with storytelling?",
              type: "text",
              required: true
            }
          ],
          hidden: false,
          aiTools: [
            {
              id: "writing_assistant",
              name: "Writing Assistant",
              icon: "✍️",
              prompt: "You are a creative writing mentor specializing in historical fiction. Help students develop authentic WWII soldier diary entries by guiding them in voice, perspective, and historical accuracy. Ensure entries reflect appropriate military knowledge, period-specific details, and emotional depth while maintaining historical plausibility.",
              enabled: true
            },
            {
              id: "brainstorm",
              name: "Brainstorm Partner",
              icon: "🌀",
              prompt: "You are a historical consultant helping students develop realistic WWII scenarios for their soldier's diary. Help students integrate actual historical events, military operations, and daily military life into their narratives. Guide them in creating authentic character backgrounds and experiences while maintaining historical accuracy.",
              enabled: true
            }
          ],
          resources: [
            {
              id: 1,
              type: 'interactive',
              title: 'Diary Entry Builder',
              description: 'Interactive tool for crafting historically accurate diary entries',
              url: '/path/to/builder'
            },
            {
              id: 2,
              type: 'worksheet',
              title: 'Character Development Guide',
              description: 'Worksheet for developing authentic soldier personas',
              url: '/path/to/guide'
            },
            {
              id: 3,
              type: 'quiz',
              title: 'Historical Accuracy Check',
              description: 'Self-assessment quiz for checking historical authenticity',
              url: '/path/to/quiz'
            }
          ]
        },
        {
          id: 5,
          startDay: 4,
          endDay: 5,
          title: "Sound Effects and Storytelling",
          type: "Portfolio Activity",
          steps: [
            { id: 1, text: "Identify and learn about various audio elements to enhance your diary", completed: false },
            { id: 2, text: "Select at least three audio elements to include in your script", completed: false },
            { id: 3, text: "Record segments of your script with integrated audio elements", completed: false },
            { id: 4, text: "Review and adjust audio elements for effectiveness", completed: false }
          ],
          teacherNotes: "Guide students in selecting appropriate sound effects and ambient noise. Ensure they understand how to balance audio levels for clarity.",
          deliverables: [
            {
              title: "Audio Elements Plan",
              description: "Submit a plan detailing chosen audio elements and their purpose in your diary",
              format: "document",
              dueDate: "End of Day 4"
            },
            {
              title: "Final Audio Diary",
              description: "Submit the complete, edited audio diary with integrated sound effects",
              format: "audio",
              dueDate: "End of Day 5"
            }
          ],
          reflectionPrompts: [
            {
              question: "How did the addition of audio elements enhance your story?",
              type: "text",
              required: true
            },
            {
              question: "Rate your satisfaction with the final audio production",
              type: "scale",
              required: true
            },
            {
              question: "What would you do differently if you were to create another audio diary?",
              type: "text",
              required: true
            }
          ],
          hidden: false,
          aiTools: [
            {
              id: "audio_assistant",
              name: "Audio Assistant",
              icon: "🎵",
              prompt: "You are an audio production consultant specializing in historical soundscapes. Help students identify and integrate period-appropriate sound effects for their WWII diary entries. Guide them in selecting authentic ambient sounds, military-related audio, and appropriate background effects. Suggest ways to enhance storytelling through audio without compromising historical accuracy.",
              enabled: true
            },
            {
              id: "writing_assistant",
              name: "Writing Assistant",
              icon: "✍️",
              prompt: "You are a script editor helping students optimize their WWII diary entries for audio presentation. Guide students in adapting their writing for audio impact while maintaining historical authenticity. Help with pacing, dramatic tension, and integration of sound effects. Ensure the script remains true to the soldier's voice and historical context.",
              enabled: true
            }
          ],
          resources: [
            {
              id: 1,
              type: 'interactive',
              title: 'Audio Diary Editor',
              description: 'Interactive tool for recording and editing audio diaries with period-appropriate effects',
              url: '/path/to/editor'
            },
            {
              id: 2,
              type: 'slides',
              title: 'Audio Production Guide',
              description: 'Tutorial on creating effective audio narratives with historical authenticity',
              url: '/path/to/slides'
            },
            {
              id: 3,
              type: 'worksheet',
              title: 'Sound Effect Planning Sheet',
              description: 'Worksheet for planning and organizing audio elements',
              url: '/path/to/worksheet'
            }
          ]
        }
      ]);
    
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [expandedDays, setExpandedDays] = useState(new Set([1]));
  const [exportFormat, setExportFormat] = useState('canvas');
  const [daySchedules, setDaySchedules] = useState({});
  const [activeSession, setActiveSession] = useState(null);
  const [activeResource, setActiveResource] = useState(null);
  const [isScheduleMode, setIsScheduleMode] = useState(false);
  const [projectDays, setProjectDays] = useState(5);

  const toggleDay = (day) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const handleScheduleChange = (day, newSchedule) => {
    // Create Date objects for comparison
    const startDateTime = newSchedule.date && newSchedule.startTime
      ? new Date(`${format(new Date(newSchedule.date), 'yyyy-MM-dd')}T${newSchedule.startTime}`)
      : null;

    const endDateTime = newSchedule.date && newSchedule.endTime
      ? new Date(`${format(new Date(newSchedule.date), 'yyyy-MM-dd')}T${newSchedule.endTime}`)
      : null;

    // Validate times are in order
    if (startDateTime && endDateTime && endDateTime < startDateTime) {
      newSchedule = {
        ...newSchedule,
        endTime: newSchedule.startTime
      };
    }

    // Check against previous and next day schedules
    setDaySchedules(prev => {
      const updatedSchedules = { ...prev };
      
      // Check previous day
      if (day > 1 && prev[day - 1]?.date) {
        const prevDateTime = new Date(`${format(new Date(prev[day - 1].date), 'yyyy-MM-dd')}T${prev[day - 1].endTime || '23:59'}`);
        if (startDateTime && prevDateTime > startDateTime) {
          // Adjust current day's date to be after previous day
          const nextDay = new Date(prevDateTime);
          nextDay.setDate(nextDay.getDate() + 1);
          newSchedule = {
            ...newSchedule,
            date: nextDay
          };
        }
      }

      // Check next day
      if (prev[day + 1]?.date) {
        const nextDateTime = new Date(`${format(new Date(prev[day + 1].date), 'yyyy-MM-dd')}T${prev[day + 1].startTime || '00:00'}`);
        if (endDateTime && endDateTime > nextDateTime) {
          // Adjust next day's date to be after current day
          const nextDay = new Date(endDateTime);
          nextDay.setDate(nextDay.getDate() + 1);
          updatedSchedules[day + 1] = {
            ...prev[day + 1],
            date: nextDay
          };
        }
      }

      // Update current day's schedule
      updatedSchedules[day] = {
        ...newSchedule,
        date: newSchedule.date || null,
        startTime: newSchedule.startTime || '',
        endTime: newSchedule.endTime || ''
      };

      return updatedSchedules;
    });
  };

  const handleStartSession = (type) => {
    setActiveSession(type);
    // Additional session setup logic here
  };

  const handleEndSession = () => {
    setActiveSession(null);
    // Additional session cleanup logic here
  };

  const handleResourceLaunch = (resourceId) => {
    setActiveResource(resourceId);
    // Additional session setup logic here
  };

  const LMSExportButton = ({ day }) => (
    <div className="flex items-center gap-2">

      <Button >
        <UploadCloud size={16} className='mr-2' />
        Export to LMS
      </Button>
    </div>
  );

  const DeliverableCard = ({ deliverable, daySchedule }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-left text-gray-800">{deliverable.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{deliverable.description}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <ClockIcon size={14} />
            <span>Due: {
              daySchedule?.date 
                ? `${format(new Date(daySchedule.date), 'PPP')}${daySchedule.endTime ? ` at ${daySchedule.endTime}` : ''}`
                : deliverable.dueDate
            }</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
          {deliverable.format}
        </span>
      </div>
    </div>
  );

  const ReflectionPrompt = ({ prompt, index }) => (
    <div className="bg-indigo-50 p-4 rounded-lg mb-3">
      <div className="flex items-start gap-3">
        <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 flex-shrink-0">
          {index + 1}
        </span>
        <div className="space-y-2 w-full">
          <p className="text-indigo-900 font-medium">
            {prompt.question}
            {prompt.required && <span className="text-red-500 ml-1">*</span>}
          </p>
          {prompt.type === 'text' ? (
            <textarea 
              className="w-full p-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Enter your reflection..."
            />
          ) : prompt.type === 'scale' ? (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button 
                  key={value}
                  className="w-10 h-10 rounded-lg border border-indigo-200 hover:bg-indigo-200 transition-colors flex items-center justify-center text-indigo-700"
                >
                  {value}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  const AIToolConfig = ({ tool, prompt, onPromptChange, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localPrompt, setLocalPrompt] = useState(prompt);

    const handleSave = () => {
      onPromptChange(localPrompt);
      setIsEditing(false);
    };

    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{tool.icon}</span>
            <h4 className="font-medium text-gray-900">{tool.name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={tool.enabled}
              onCheckedChange={onToggle}
            />
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              disabled={!tool.enabled}
            >
              <Settings size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {tool.enabled && (
          isEditing ? (
            <div className="mt-3 space-y-3">
              <textarea
                value={localPrompt}
                onChange={(e) => setLocalPrompt(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                rows="3"
                placeholder="Configure how this AI tool should help students..."
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-700 mt-2">{prompt || "No prompt configured"}</p>
          )
        )}
      </div>
    );
  };

  const ResourceGenerationTool = ({ icon, title, description, onClick, className }) => (
    <button 
      onClick={onClick}
      className={`flex items-start gap-4 p-4 bg-white rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 w-full text-left ${className}`}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </button>
  );

  const ResourceItem = ({ resource, isTeacherView, onLaunch, isActive }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          {resource.type === 'slides' && (
            <div className="bg-blue-50">
              <Presentation size={16} className="text-blue-600" />
            </div>
          )}
          {resource.type === 'worksheet' && (
            <div className="bg-emerald-50">
              <FileText size={16} className="text-emerald-600" />
            </div>
          )}
          {resource.type === 'interactive' && (
            <div className="bg-purple-50">
              <Laptop size={16} className="text-purple-600" />
            </div>
          )}
          {resource.type === 'link' && (
            <div className="bg-purple-50">
              <Globe size={16} className="text-purple-600" />
            </div>
          )}
          {resource.type === 'quiz' && (
            <div className="bg-rose-50">
              <CheckSquare size={16} className="text-rose-600" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-800">{resource.title}</h4>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
              {resource.type}
            </span>
          </div>
          <p className="text-xs text-gray-500">{resource.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {resource.type === 'interactive' && isTeacherView && (
          isActive ? (
            <>
              <Button 
                size="sm"
                onClick={() => onLaunch(null)}
              >
                <StopCircle className="mr-2 h-4 w-4" />
                End Session
              </Button>
              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm animate-pulse">
                Live
              </div>
            </>
          ) : (
            <Button 
              size="sm"
              onClick={() => onLaunch(resource.id)}
            >
              <Play className="mr-2 h-4 w-4" />
              Launch
            </Button>
          )
        )}
        <Button variant="ghost" size="sm">
          <FileDown size={16} className="text-blue-600" />
        </Button>
      </div>
    </div>
  );

  const TeachingSupport = ({ icon, label, className }) => (
    <button
      className={`flex items-center gap-2 px-3 py-2  rounded-md transition-colors text-sm text-gray-700 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const ActivityCard = ({ activity, daySchedule, isTeacherView }) => {
    const [showAITools, setShowAITools] = useState(false);
    const [activeTab, setActiveTab] = useState('steps');
    const duration = activity.endDay - activity.startDay + 1;
    const [aiTools, setAiTools] = useState(activity.aiTools || []);

    const tabs = [
      { id: 'steps', label: 'Steps', icon: FileText },
      { id: 'resources', label: 'Resources', icon: FileDown },
      { id: 'deliverables', label: 'Deliverables', icon: UploadCloud },
      { id: 'reflection', label: 'Reflection', icon: MessageSquare },
      { id: 'ai_tools', label: 'AI Toolkit', icon: Wrench }
    ];

    const handlePromptChange = (toolId, newPrompt) => {
      setAiTools(tools => 
        tools.map(tool => 
          tool.id === toolId ? { ...tool, prompt: newPrompt } : tool
        )
      );
    };

    const handleToolToggle = (toolId) => {
      setAiTools(tools => 
        tools.map(tool => 
          tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
        )
      );
    };

    const renderReflectionTab = () => (
      <div className="space-y-4">
        {isTeacherView && (
          <SessionControl
            type="reflection"
            isActive={activeSession === 'reflection'}
            onStart={() => handleStartSession('reflection')}
            onEnd={handleEndSession}
          />
        )}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Reflection Prompts</h3>
          {isTeacherView && (
            <button className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Plus size={16} />
              Add Prompt
            </button>
          )}
        </div>
        {activity.reflectionPrompts.map((prompt, index) => (
          <ReflectionPrompt key={index} prompt={prompt} index={index} />
        ))}
      </div>
    );

    const renderAIToolsTab = () => (
      <div className="space-y-4">
        {isTeacherView && (
          <SessionControl
            type="toolkit"
            isActive={activeSession === 'toolkit'}
            onStart={() => handleStartSession('toolkit')}
            onEnd={handleEndSession}
          />
        )}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">AI Tool Configuration</h3>
          {isTeacherView && (
            <button className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Plus size={16} />
              Add Tool
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {aiTools.map(tool => (
            <AIToolConfig
              key={tool.id}
              tool={tool}
              prompt={tool.prompt}
              onPromptChange={(newPrompt) => handlePromptChange(tool.id, newPrompt)}
              onToggle={() => handleToolToggle(tool.id)}
            />
          ))}
        </div>
      </div>
    );

    const renderResourcesTab = () => (
      <div className="space-y-4">
        <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Current Resources</h3>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {activity.resources?.map(resource => (
            <ResourceItem 
              key={resource.id} 
              resource={resource}
              isTeacherView={isTeacherView}
              onLaunch={handleResourceLaunch}
              isActive={activeResource === resource.id}
            />
          ))}
          {(!activity.resources || activity.resources.length === 0) && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              No resources available for this activity yet.
            </div>
          )}
        </div>
        <div className="space-y-6">
        {isTeacherView && (
          <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Use AI to create and find teaching materials</h3>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-4"></p>
              <div className="grid grid-cols-2 gap-4">
                <ResourceGenerationTool
                  icon={<Presentation size={20} className="text-purple-600" />}
                  title="Generate Slides/Interactive Lesson"
                  description="Create engaging presentations and interactive materials for this activity"
                  onClick={() => {/* Handle generation */}}
                />
                <ResourceGenerationTool
                  icon={<FileText size={20} className="text-purple-600" />}
                  title="Generate Worksheets/Handouts"
                  description="Create student worksheets and handouts aligned with learning objectives"
                  onClick={() => {/* Handle generation */}}
                />
                <ResourceGenerationTool
                  icon={<Globe size={20} className="text-purple-600" />}
                  title="Find Online Resources"
                  description="Discover relevant websites, videos, and digital materials"
                  onClick={() => {/* Handle search */}}
                />
                <ResourceGenerationTool
                  icon={<Upload size={20} className="text-purple-600" />}
                  title="Upload Materials"
                  description="Share your own teaching materials and resources"
                  onClick={() => {/* Handle upload */}}
                />
              </div>
            </div>
          </div>
        )}
        </div>
        
      </div>
    );

    return (
      <Card className="mb-4 border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="bg-white border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {activity.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-indigo-50 rounded-md text-indigo-600">{activity.type}</span>
                {duration > 1 && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-md text-amber-600">
                    <ClockIcon size={14} />
                    {duration} days
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-t-lg transition-all
                    ${activeTab === tab.id 
                      ? 'bg-gray-900 text-white border border-gray-900 -mb-px font-medium shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <tab.icon 
                    size={18} 
                    className={activeTab === tab.id ? 'text-white' : 'text-gray-400'} 
                  />
                  {tab.label}
                  {tab.id === 'deliverables' && activity.deliverables.length > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.deliverables.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'steps' && (
            <div className="bg-blue-50 -mx-6 -mt-4 px-6 py-3 border-b mb-6">
              <h3 className="font-medium text-blue-900">Activity Steps</h3>
              <p className="text-sm text-blue-600">Complete these steps in sequence</p>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="bg-indigo-50 -mx-6 -mt-4 px-6 py-3 border-b mb-6">
              <h3 className="font-medium text-indigo-900">Required Submissions</h3>
              <p className="text-sm text-indigo-600">Track and manage student deliverables</p>
            </div>
          )}

          {activeTab === 'reflection' && (
            <div className="bg-purple-50 -mx-6 -mt-4 px-6 py-3 border-b mb-6">
              <h3 className="font-medium text-purple-900">Reflection Prompts</h3>
              <p className="text-sm text-purple-600">Guide student reflection and assessment</p>
            </div>
          )}

          {activeTab === 'ai_tools' && (
            <div className="bg-emerald-50 -mx-6 -mt-4 px-6 py-3 border-b mb-6">
              <h3 className="font-medium text-emerald-900">Project Toolkit</h3>
              <p className="text-sm text-emerald-600">Configure AI tools for student support</p>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="bg-amber-50 -mx-6 -mt-4 px-6 py-3 border-b mb-6">
              <h3 className="font-medium text-amber-900">Activity Resources</h3>
              <p className="text-sm text-amber-600">Manage and launch learning materials</p>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-6">
              <div className="mb-6 space-y-3">
                <h3 className="font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">✓</span>
                  Activity Steps
                </h3>
                {activity.steps.map(step => (
                  <div key={step.id} className="flex items-center gap-3 pl-8 group">
                    <input 
                      type="checkbox" 
                      checked={step.completed}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-600 group-hover:text-gray-900">{step.text}</span>
                  </div>
                ))}
              </div>

              {isTeacherView && (
                <div className="mb-6 space-y-4">
                  <Alert className="bg-amber-50 border border-amber-100">
                    <AlertTitle className="text-amber-800 flex items-center gap-2">
                      <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                        !
                      </span>
                      Teacher Notes
                    </AlertTitle>
                    <AlertDescription className="text-amber-700 ml-7">
                      {activity.teacherNotes}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex flex-wrap gap-3">
                    <TeachingSupport 
                      icon={<Lightbulb size={16} className="text-amber-500" />}
                      label="+ Differentiation Support"
                      className="bg-amber-50 hover:bg-amber-100 text-amber-700"
                    />
                    <TeachingSupport 
                      icon={<Users size={16} className="text-blue-500" />}
                      label="+ Team Strategies"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                    />
                    <TeachingSupport 
                      icon={<Globe2 size={16} className="text-emerald-500" />}
                      label="+ Real-World Connection"
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                    />
                    <TeachingSupport 
                      icon={<Heart size={16} className="text-rose-500" />}
                      label="+ SEL"
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Required Submissions</h3>
                {isTeacherView && (
                  <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Plus size={16} />
                    Add Deliverable
                  </button>
                )}
              </div>
              {activity.deliverables.map((deliverable, index) => (
                <DeliverableCard key={index} deliverable={deliverable} daySchedule={daySchedule} />
              ))}
            </div>
          )}

          {activeTab === 'reflection' && renderReflectionTab()}

          {activeTab === 'ai_tools' && renderAIToolsTab()}

          {activeTab === 'resources' && renderResourcesTab()}
        </CardContent>
      </Card>
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDay = parseInt(result.source.droppableId.split('-')[1]);
    const destDay = parseInt(result.destination.droppableId.split('-')[1]);
    const activityId = parseInt(result.draggableId.split('-')[1]);

    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        const dayDiff = destDay - sourceDay;
        return {
          ...activity,
          startDay: destDay,
          endDay: Math.min(projectDays, activity.endDay + dayDiff)
        };
      }
      return activity;
    }));
  };

  // Add duration adjustment component
  const DurationControl = ({ activity, onDurationChange }) => (
    <div className="flex items-center gap-2 ml-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDurationChange(activity.id, Math.max(1, activity.endDay - activity.startDay))}
        disabled={activity.endDay - activity.startDay === 0}
      >
        <Minus size={14} />
      </Button>
      <span className="text-sm font-medium w-8 text-center">
        {activity.endDay - activity.startDay + 1}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDurationChange(activity.id, activity.endDay - activity.startDay + 2)}
        disabled={activity.endDay - activity.startDay + 1 >= projectDays - activity.startDay + 1}
      >
        <Plus size={14} />
      </Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col justify-between mb-8 bg-white p-6 rounded-lg border">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src="https://masterymate.s3.amazonaws.com/cm6rndthz000114fy80p2wp78/a0846cf7-2eef-43b3-b328-b5211eaab39f/WWII_Soldier_Audio_Diaries.png"
              alt="WWII Soldier Audio Diaries Project Cover"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 text-left">WWII Soldier Audio Diaries</h1>
            <p className="text-gray-600 mt-1 text-sm text-left">This project-based learning experience engages 8th-grade students in creating authentic audio diaries representing World War II soldiers' experiences. Students research and analyze primary and secondary sources to develop scripts that reflect varied perspectives and historical contexts. Through storytelling and multimedia integration, students explore major WWII events, propaganda, and technological advancements that influenced soldiers' lives. The project enhances students' historical understanding while developing skills in research, creative writing, and audio editing.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-4">
          {isTeacherView && (
            <Button
              variant="outline"
              onClick={() => setIsScheduleMode(!isScheduleMode)}
              className="gap-2"
            >
              <ArrowUpDown size={16} />
              {isScheduleMode ? 'Exit Schedule Mode' : 'Manage Schedule'}
            </Button>
          )}
          <Button 
            onClick={() => setIsTeacherView(!isTeacherView)}
            variant="outline"
            title={isTeacherView ? "Switch to student view" : "Switch to teacher view"}
          >
            {isTeacherView ? <Eye size={20} className="mr-1" /> : <EyeOff size={20} className="mr-1" />}
            {isTeacherView ? "Switch to Student View" : "Switch to Teacher View"}
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700">
            <Calendar size={20} />
            <span className="font-medium">5 Days</span>
          </div>
          <LMSExportButton />
        </div>
      </div>

      {isScheduleMode && (
        <div className="mb-6 bg-white p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-left text-lg font-medium text-gray-800">Project Schedule</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setProjectDays(prev => prev + 1)}
              >
                <Plus size={14} className="mr-2" />
                Add Day
              </Button>
            </div>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="space-y-2">
              {[...Array(projectDays)].map((_, index) => (
                <Droppable key={`day-${index + 1}`} droppableId={`day-${index + 1}`}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Day {index + 1}</h4>
                        {index === projectDays - 1 && index > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setProjectDays(prev => prev - 1)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove Day
                          </Button>
                        )}
                      </div>
                      {activities
                        .filter(activity => activity.startDay === index + 1)
                        .map((activity, activityIndex) => (
                          <Draggable
                            key={activity.id}
                            draggableId={`activity-${activity.id}`}
                            index={activityIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200 mb-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical size={16} className="text-gray-400" />
                                  </div>
                                  <span className="text-sm">{activity.title}</span>
                                </div>
                                <div className="flex items-center">
                                  <DurationControl 
                                    activity={activity}
                                    onDurationChange={(id, duration) => {
                                      setActivities(prev => prev.map(a => 
                                        a.id === id 
                                          ? { ...a, endDay: a.startDay + duration - 1 }
                                          : a
                                      ));
                                    }}
                                  />
                                  <span className="ml-2 text-xs text-gray-500">
                                    Days: {activity.endDay - activity.startDay + 1}
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      )}

      {[1, 2, 3, 4, 5].map(day => (
        <div key={day} className="mb-6">
          <div className="bg-white border rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleDay(day)}
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Day {day}</h2>
                {daySchedules[day]?.date && (
                  <p className="text-sm text-gray-600 mt-1">
                    {format(new Date(daySchedules[day].date), 'PPP')}
                    {daySchedules[day].startTime && ` at ${daySchedules[day].startTime}`}
                  </p>
                )}
              </div>
              {expandedDays.has(day) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedDays.has(day) && isTeacherView && (
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                <DayScheduling
                  day={day}
                  schedule={daySchedules[day]}
                  onScheduleChange={handleScheduleChange}
                />
              </div>
            )}
          </div>

          {expandedDays.has(day) && (
            <div className="pl-4 mt-4">
              {activities
                .filter(activity => activity.startDay <= day && activity.endDay >= day)
                .map(activity => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity}
                    daySchedule={daySchedules[day]}
                    isTeacherView={isTeacherView}
                  />
                ))
              }
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectImplementation;