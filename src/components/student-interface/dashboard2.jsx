import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronRight, 
  Calendar, 
  BookOpen, 
  Target, 
  RefreshCw,
  Zap,
  Search,
  Image,
  FileText,
  MessageSquare
} from 'lucide-react';

const ProjectInterface = () => {
  const projectPhases = [
    {
      title: "Unboxing the Ecosystem Mystery",
      duration: "2 days",
      description: "Explore your assigned ecosystem and brainstorm superhero concepts",
      tools: ["Web Research Assistant", "Generate Ideas"],
      tasks: [
        "Unbox and explore ecosystem theme",
        "Research ecosystem characteristics",
        "Develop superhero concept"
      ]
    },
    {
      title: "Developing the Digital Narrative",
      duration: "2 days",
      description: "Create your storyline and integrate scientific elements",
      tools: ["Text Editor", "Targeted Feedback"],
      tasks: [
        "Outline your narrative",
        "Write story draft with scientific facts"
      ]
    },
    {
      title: "Crafting the Comic and Report",
      duration: "2 days",
      description: "Design comic panels and complete impact report",
      tools: ["Media Studio", "Image Generator"],
      tasks: [
        "Design comic panels",
        "Write ecosystem impact report"
      ]
    },
    {
      title: "Refinement and Presentation",
      duration: "1 day",
      description: "Polish your work and present to class",
      tools: ["Targeted Feedback"],
      tasks: [
        "Revise based on feedback",
        "Participate in peer review",
        "Present final work"
      ]
    }
  ];

  const availableTools = [
    {
      name: "Web Research Assistant",
      icon: Search,
      description: "Find and organize ecosystem research"
    },
    {
      name: "Generate Ideas",
      icon: Zap,
      description: "Brainstorm superhero concepts"
    },
    {
      name: "Image Generator",
      icon: Image,
      description: "Create comic illustrations"
    },
    {
      name: "Text Editor",
      icon: FileText,
      description: "Write and edit your story"
    },
    {
      name: "Targeted Feedback",
      icon: MessageSquare,
      description: "Get feedback on your work"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 p-6 gap-6">
      {/* Left Column - Project Journey */}
      <div className="w-2/3 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Superhero Ecosystem Project</h2>
          <span className="text-sm text-gray-500">Driving Question: How can we design a compelling digital comic where superheroes save ecosystems?</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projectPhases.map((phase, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">{phase.title}</CardTitle>
                  <p className="text-sm text-gray-500">{phase.duration}</p>
                </div>
                <Calendar className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                <div className="space-y-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column - Tools & Timeline */}
      <div className="w-1/3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableTools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2">
                    <tool.icon className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{tool.name}</p>
                      <p className="text-xs text-gray-500">{tool.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium mb-1">Digital Comic Strip</h3>
                <p className="text-sm text-gray-500">Create a superhero comic about saving ecosystems</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium mb-1">Ecosystem Impact Report</h3>
                <p className="text-sm text-gray-500">Write about threats to your ecosystem</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectInterface;