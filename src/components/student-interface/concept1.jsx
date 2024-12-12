import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  PenTool, 
  Globe,  
  Film,
  Lightbulb,
  Upload,
  Book,
  Target,
} from 'lucide-react';

const WorkspaceInterface = () => {
  const [activeWorkspace, setActiveWorkspace] = useState('textEditor');
  const [activeTool, setActiveTool] = useState(null);

  const workspaces = [
    { id: 'textEditor', name: 'Text Editor', icon: PenTool },
    { id: 'mediaStudio', name: 'Media Studio', icon: Film },
    { id: 'whiteboard', name: 'Whiteboard', icon: Target },
  ];

  const aiTools = [
    { 
      id: 'webResearch',
      name: 'Web Research Assistant',
      icon: Globe,
      description: 'Find and evaluate credible sources'
    },
    {
      id: 'citation',
      name: 'Citation Generator',
      icon: Book,
      description: 'Create accurate citations'
    },
    {
      id: 'ideaGenerator',
      name: 'Generate Ideas',
      icon: Lightbulb,
      description: 'Brainstorm creative concepts'
    }
  ];

  const deliverables = [
    {
      name: 'Digital Comic Strip',
      status: 'in-progress',
      workspace: 'mediaStudio'
    },
    {
      name: 'Ecosystem Impact Report',
      status: 'not-started',
      workspace: 'textEditor'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Tools */}
      <div className="w-64 border-r bg-white p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Workspaces</h3>
            <div className="space-y-2">
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace.id)}
                  className={`flex items-center w-full p-2 rounded-lg text-sm
                    ${activeWorkspace === workspace.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-100'}`}
                >
                  <workspace.icon className="h-4 w-4 mr-2" />
                  {workspace.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">AI Tools</h3>
            <div className="space-y-2">
              {aiTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex items-center w-full p-2 rounded-lg text-sm
                    ${activeTool === tool.id 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'hover:bg-gray-100'}`}
                >
                  <tool.icon className="h-4 w-4 mr-2" />
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Workspace</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Save Progress
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-4 h-full">
            {/* Main Work Area */}
            <div className="col-span-2 bg-white rounded-lg border h-full">
              <Tabs defaultValue="editor" className="h-full">
                <TabsList className="border-b px-4">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="p-4 h-[calc(100%-40px)]">
                  {activeWorkspace === 'textEditor' && (
                    <div className="h-full border rounded-lg p-4">
                      <textarea 
                        className="w-full h-full resize-none outline-none" 
                        placeholder="Start writing your content here..."
                      />
                    </div>
                  )}
                  {activeWorkspace === 'mediaStudio' && (
                    <div className="h-full border rounded-lg p-4 flex items-center justify-center">
                      <div className="text-center">
                        <Film className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Media Studio Workspace</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="preview" className="p-4">
                  Preview content will appear here
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - AI Assistant & Deliverables */}
            <div className="space-y-4">
              {/* AI Assistant */}
              <Card className="h-1/2">
                <CardHeader>
                  <CardTitle className="text-sm">AI Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100%-60px)]">
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-sm">How can I help with your project?</p>
                      </div>
                      {activeTool && (
                        <div className="bg-purple-50 rounded p-3">
                          <p className="text-sm font-medium mb-1">
                            {aiTools.find(t => t.id === activeTool)?.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {aiTools.find(t => t.id === activeTool)?.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Deliverables */}
              <Card className="h-1/2">
                <CardHeader>
                  <CardTitle className="text-sm">Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100%-60px)]">
                    <div className="space-y-3">
                      {deliverables.map((item, index) => (
                        <div 
                          key={index}
                          className="p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full
                              ${item.status === 'in-progress' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-gray-100 text-gray-600'}`}
                            >
                              {item.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                            </span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full text-xs"
                          >
                            Submit Deliverable
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInterface;