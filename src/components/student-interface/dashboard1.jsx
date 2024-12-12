import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Users, Calendar, BookOpen, Target, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectInterface = () => {
  const projectCards = [
    { title: 'Entry Events', icon: Calendar, description: 'Project kickoff and initial activities' },
    { title: 'Build Your Products', icon: Target, description: 'Create and develop project deliverables' },
    { title: 'Group Work', icon: Users, description: 'Collaborate with your team' },
    { title: 'Timeline', icon: Calendar, description: 'Project schedule and milestones' }
  ];

  const timelineEvents = [
    { date: 'Week 1', title: 'Project Initiation', description: 'Team formation and project setup' },
    { date: 'Week 2', title: 'Research Phase', description: 'Gather and analyze information' },
    { date: 'Week 3', title: 'Development', description: 'Create project deliverables' },
    { date: 'Week 4', title: 'Implementation', description: 'Execute project plan' },
    { date: 'Week 5', title: 'Review', description: 'Final assessment and reflection' }
  ];

  const groups = ['Plan A', 'Plan B', 'Plan C'];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 gap-8">
      {/* Left Column - Project Cards */}
      <div className="w-2/3 space-y-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-gray-800 tracking-tight"
        >
          Project Journey
        </motion.h2>
        <div className="grid grid-cols-2 gap-6">
          {projectCards.map((card, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-6 w-6 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Implementation Strategy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mt-6 border-none bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Implementation Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: RefreshCw, text: 'Consider your Reflection' },
                  { icon: BookOpen, text: 'Document Lessons' },
                  { icon: Users, text: 'Group Organization' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right Column - Timeline & Groups */}
      <div className="w-1/3 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-3/5 border-none bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Key Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 pr-4">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500 shadow-md shadow-blue-200" />
                      <span className="font-semibold text-blue-600">{event.date}</span>
                    </div>
                    <div className="ml-6 mt-2">
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <Separator className="my-4 bg-gray-200" />
                    )}
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {groups.map((group, index) => (
                  <motion.div
                    whileHover={{ x: 5 }}
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">{group}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-blue-400" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectInterface;