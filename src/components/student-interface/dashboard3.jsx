import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Rocket,
  Calendar,
  Target,
  Users,
  BookOpen,
  RefreshCw,
  Star,
  Clock,
  FileText,
} from 'lucide-react';

const ProjectDashboard = () => {
  const projectCards = [
    {
      title: 'Entry Event & Inquiry',
      icon: Rocket,
      description: 'Project kickoff event, Need to Knows, Learning Goals & Standards',
      color: 'bg-indigo-500'
    },
    {
      title: 'Project Tracking',
      icon: Calendar,
      description: 'Project schedule and milestones',
      color: 'bg-blue-500'
    },
    {
      title: 'Build your Deliverables',
      icon: Target,
      description: 'Create and develop project deliverables',
      color: 'bg-emerald-500'
    },
    {
      title: 'Group Work',
      icon: Users,
      description: 'Collaborate with your team',
      color: 'bg-violet-500'
    },
    {
      title: 'Workshops',
      icon: BookOpen,
      description: 'Lessons & Assessments',
      color: 'bg-orange-500'
    },
    {
      title: 'Reflections',
      icon: RefreshCw,
      description: 'Reflect on your learning',
      color: 'bg-pink-500'
    },
    {
      title: 'Grading & Feedback',
      icon: Star,
      description: 'Scoring for implementation & deliverables',
      color: 'bg-yellow-500'
    }
  ];

  const timelineEvents = [
    { date: 'Dec 11', title: 'Project Kickoff', description: 'Ecosystem Mystery Box Challenge' },
    { date: 'Dec 13', title: 'Research Phase', description: 'Explore ecosystems and develop concept' },
    { date: 'Dec 15', title: 'Comic Development', description: 'Start creating your digital comic' },
    { date: 'Dec 18', title: 'Final Submissions', description: 'Submit completed work' }
  ];

  const currentPhase = {
    name: "Research Phase",
    description: "Explore ecosystems and develop concept",
    progress: 65,
    tasks: [
      { name: "Research local ecosystems", completed: true },
      { name: "Identify environmental threats", completed: true },
      { name: "Draft superhero concept", completed: false },
      { name: "Create story outline", completed: false }
    ]
  };

  const deliverables = [
    {
      title: 'Digital Comic Strip',
      status: 'In Progress',
      dueDate: 'Dec 18'
    },
    {
      title: 'Ecosystem Impact Report',
      status: 'Not Started',
      dueDate: 'Dec 18'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white">
        <Card className="mb-4 overflow-hidden">
          <img 
            src={"/comicbook-superhero.webp"}
            alt="Superhero Ecosystem Project"
            className="w-full h-[200px] object-cover"
          />
        </Card>
        <h1 className="text-2xl font-bold mb-2 text-left">Superhero Ecosystem Project</h1>
        <p className="text-lg mb-2 opacity-90 text-left">
          How can we design a compelling digital comic where superheroes save ecosystems?
        </p>
        <div className="flex items-center gap-4 text-sm opacity-80">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            ELA and Social Studies
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            7 days
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Column - Project Components */}
        <div className="w-2/3 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {projectCards.map((card, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all cursor-pointer group"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={`${card.color} p-2 rounded-lg text-white`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-left text-lg mb-1 group-hover:text-blue-600">
                    {card.title}
                  </h3>
                  <p className="text-sm text-left text-gray-600">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Timeline & Deliverables */}
        <div className="w-1/3 space-y-6">
          {/* Current Phase Card */}
          <Card className="bg-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Current Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className='text-left'>
                  <h4 className="font-medium">{currentPhase.name}</h4>
                  <p className="text-sm text-gray-600">{currentPhase.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${currentPhase.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{currentPhase.progress}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {currentPhase.tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center
                        ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {task.completed && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${task.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                        {task.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Key Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 pr-4">
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                        {index < timelineEvents.length - 1 && (
                          <div className="w-0.5 h-full bg-blue-100" />
                        )}
                      </div>
                      <div className='text-left'>
                        <p className="text-sm font-medium text-blue-600">{event.date}</p>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Deliverables Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-500" />
                Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1 text-left">
                      <h4 className="font-medium">{deliverable.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full inline-block
                        ${deliverable.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'}`}
                      >
                        {deliverable.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Due {deliverable.dueDate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;