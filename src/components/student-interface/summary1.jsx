import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Calendar, 
  Award,
  Target,
  CheckSquare,
  HelpCircle,
  FileText,
  Users,
  Lightbulb,
  Clock
} from 'lucide-react';

const ProjectSummary = () => {
  return (
    <div className='flex w-full h-full justify-center'> 
      <div className="min-h-screen max-w-4xl bg-gray-50 p-6">
        {/* Project Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white">
          <Card className="mb-4 overflow-hidden">
            <img 
              src={"/comicbook-superhero.webp"}
              alt="Superhero Ecosystem Project"
              className="w-full h-[200px] object-cover"
            />
          </Card>
          <h1 className="text-2xl font-bold mb-2">Superhero Ecosystem Project</h1>
          <p className="text-lg mb-2 opacity-90">
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

        {/* Project Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inquiry">Inquiry Framework</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Driving Question</h3>
                      <p className="text-gray-600">How can we design a compelling digital comic where superheroes save ecosystems and habitats?</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Entry Event</h3>
                      <p className="text-gray-600">Ecosystem Mystery Box Challenge - Students receive mystery boxes containing ecosystem themes and clues.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    Final Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Digital Comic Strip</h3>
                      <p className="text-sm text-gray-600">Students create a digital comic featuring superheroes saving specific ecosystems, incorporating scientific facts.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Ecosystem Impact Report</h3>
                      <p className="text-sm text-gray-600">An informative report analyzing threats to ecosystems and proposed superhero interventions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inquiry Framework Tab */}
          <TabsContent value="inquiry">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-500" />
                    Essential Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc pl-4">
                    <li>What are the key characteristics and importance of various ecosystems and habitats?</li>
                    <li>How do human activities impact these natural environments?</li>
                    <li>What storytelling elements are essential for creating engaging comics?</li>
                    <li>How can we effectively combine scientific information with creative writing?</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Need to Knows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc pl-4">
                    <li>What ecosystems and habitats are under threat and why?</li>
                    <li>How do superheroes typically operate in comics?</li>
                    <li>What digital tools are available for creating comics?</li>
                    <li>How to ensure scientific accuracy while maintaining creativity?</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    Learning Goals & Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">NGSS Standards</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="font-medium">MS-LS2-1:</span>
                          <span className="text-sm text-gray-600">Analyze effects of resource availability on organisms and populations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-medium">MS-LS2-2:</span>
                          <span className="text-sm text-gray-600">Predict patterns of interactions among organisms across ecosystems</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Common Core Standards</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="font-medium">CCSS.ELA-LITERACY.W.6.2:</span>
                          <span className="text-sm text-gray-600">Write informative/explanatory texts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-medium">CCSS.ELA-LITERACY.W.6.3:</span>
                          <span className="text-sm text-gray-600">Write narratives with descriptive details</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-24 text-sm font-medium">Days 0-1</div>
                      <div>
                        <h4 className="font-medium">Unboxing the Ecosystem Mystery</h4>
                        <p className="text-sm text-gray-600">Explore ecosystem theme and conduct initial research</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 text-sm font-medium">Days 2-3</div>
                      <div>
                        <h4 className="font-medium">Developing the Digital Narrative</h4>
                        <p className="text-sm text-gray-600">Create storyline and integrate scientific elements</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 text-sm font-medium">Days 4-5</div>
                      <div>
                        <h4 className="font-medium">Crafting the Comic and Report</h4>
                        <p className="text-sm text-gray-600">Design comic panels and complete impact report</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 text-sm font-medium">Day 6</div>
                      <div>
                        <h4 className="font-medium">Refinement and Presentation</h4>
                        <p className="text-sm text-gray-600">Polish work and present to class</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-500" />
                    Tools & Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Workspaces</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-gray-50 rounded text-sm">Text Editor</div>
                        <div className="p-2 bg-gray-50 rounded text-sm">Media Studio</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">AI Tools</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-gray-50 rounded text-sm">Web Research Assistant</div>
                        <div className="p-2 bg-gray-50 rounded text-sm">Citation Generator</div>
                        <div className="p-2 bg-gray-50 rounded text-sm">Generate Ideas</div>
                        <div className="p-2 bg-gray-50 rounded text-sm">Image Generator</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-green-500" />
                    Assessment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Digital Comic Strip (50%)</h3>
                      <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                        <li>Content and Scientific Accuracy</li>
                        <li>Creativity and Narrative</li>
                        <li>Visual Presentation and Design</li>
                        <li>Technical Execution</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Ecosystem Impact Report (50%)</h3>
                      <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                        <li>Content Quality</li>
                        <li>Integration with Comic Storyline</li>
                        <li>Solution Proposal</li>
                        <li>Clarity and Coherence</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Reflection Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Learning Reflection</h3>
                        <ul className="list-disc pl-4 text-sm text-gray-600 space-y-2">
                          <li>How has your understanding of ecosystems changed after this project?</li>
                          <li>What challenges did you face integrating scientific information into your comic?</li>
                          <li>How do you think your comic can influence environmental awareness?</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">AI Literacy Reflection</h3>
                        <ul className="list-disc pl-4 text-sm text-gray-600 space-y-2">
                          <li>How effectively did you use digital tools in your research and creation?</li>
                          <li>Which phase of the project was most challenging and how did you overcome it?</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectSummary;