import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  PanelLeftOpen, 
  PanelRightOpen,
  Maximize2,
  Plus,
  FileText,
  Film,
  Target,
  Upload,
  Globe,
  Book,
  Lightbulb,
  MessageSquare,
  Layers,
  CheckCircle,
  Send,
  Clock
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const WorkspaceInterface = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const workspaces = [
    { id: 'textEditor', name: 'Text Editor', icon: FileText },
    { id: 'mediaStudio', name: 'Media Studio', icon: Film },
    { id: 'whiteboard', name: 'Whiteboard', icon: Target }
  ];

  const documents = [
    { 
      id: 1, 
      title: 'Ecosystem Impact Report Draft', 
      type: 'textEditor',
      lastEdited: '2 hours ago',
      status: 'draft'
    },
    { 
      id: 2, 
      title: 'Comic Strip - Page 1', 
      type: 'mediaStudio',
      lastEdited: '1 day ago',
      status: 'in-progress'
    }
  ];

  const aiTools = [
    { 
      id: 'research',
      name: 'Research Assistant',
      icon: Globe,
      description: 'Find and evaluate sources',
      color: 'bg-blue-100 text-blue-500'
    },
    {
      id: 'writing',
      name: 'Writing Assistant',
      icon: MessageSquare,
      description: 'Get writing suggestions',
      color: 'bg-purple-100 text-purple-500'
    },
    {
      id: 'ideas',
      name: 'Idea Generator',
      icon: Lightbulb,
      description: 'Brainstorm concepts',
      color: 'bg-yellow-100 text-yellow-500'
    }
  ];

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      setShowRightPanel(false);
    }
  };

  const handleSubmission = (doc) => {
    // Handle submission logic
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        content: `I'm here to help you with ${selectedTool?.name}. How can I assist you?`,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      

      {/* Left Panel - Workspace */}
      <div className={`${focusMode ? 'w-full' : 'w-2/3'} flex flex-col transition-all duration-300`}>
        {/* Workspace Header */}
        <div className="w-full p-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">My Workspace</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-1">
                <Clock className="w-3 h-3 mr-1" />
                Last saved 2m ago
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tabs defaultValue={workspaces[0].id} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                {workspaces.map(workspace => (
                  <TabsTrigger 
                    key={workspace.id} 
                    value={workspace.id}
                    className="flex items-center gap-2 data-[state=active]:bg-slate-100"
                  >
                    <workspace.icon className="h-4 w-4" />
                    {workspace.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleFocusMode}
              className="hover:bg-slate-100"
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              {focusMode ? 'Exit Focus' : 'Focus Mode'}
            </Button>
            {focusMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRightPanel(!showRightPanel)}
                className="hover:bg-slate-100"
              >
                {!showRightPanel ? <PanelRightOpen className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Document Area */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {documents.map(doc => (
              <Card 
                key={doc.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md border border-slate-200",
                  activeDocument?.id === doc.id ? 'ring-2 ring-blue-500 shadow-sm' : ''
                )}
                onClick={() => setActiveDocument(doc)}
              >
                <CardHeader className="p-4 space-y-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {doc.type === 'textEditor' ? (
                        <FileText className="h-4 w-4 text-slate-500" />
                      ) : (
                        <Film className="h-4 w-4 text-slate-500" />
                      )}
                      <CardTitle className="text-sm font-medium">{doc.title}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.lastEdited}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={doc.status === 'draft' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {doc.status === 'draft' ? 'Draft' : 'In Progress'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-slate-100"
                      onClick={() => handleSubmission(doc)}
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* New Document Card */}
            <Card className="cursor-pointer hover:bg-slate-50 border-dashed border-2 border-slate-200 flex items-center justify-center h-[140px] transition-colors">
              <div className="text-center">
                <Plus className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Create New Document</p>
              </div>
            </Card>
          </div>

          {/* Active Document Editor */}
          {activeDocument && (
            <Card className="h-[calc(100%-200px)] border border-slate-200">
              <CardHeader className="p-4 border-b bg-slate-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">{activeDocument.title}</CardTitle>
                  <Button variant="outline" size="sm" className="hover:bg-slate-100">
                    <Layers className="h-4 w-4 mr-2" />
                    Version History
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 h-[calc(100%-73px)]">
                {activeDocument.type === 'textEditor' ? (
                  <textarea 
                    className="w-full h-full resize-none outline-none p-4 bg-white rounded-lg" 
                    placeholder="Start writing..."
                  />
                ) : (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                    <div className="text-center">
                      <Film className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600">Media Studio Canvas</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Right Panel - AI Tools */}
      {(!focusMode || showRightPanel) && (
        <div className={`${focusMode ? 'w-1/3' : 'w-1/3'} border-l border-slate-200 bg-white transition-all duration-300`}>
          <div className="p-4 border-b bg-slate-50">
            <h2 className="text-lg font-medium text-slate-800">
              {selectedTool ? (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTool(null)}
                    className="hover:bg-slate-200"
                  >
                    ←
                  </Button>
                  {selectedTool.name}
                </div>
              ) : (
                'AI Tools'
              )}
            </h2>
          </div>
          
          <ScrollArea className="h-[calc(100%-65px)]">
            {selectedTool ? (
              <div className="flex flex-col h-[calc(100vh-130px)]">
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] p-3 rounded-lg shadow-sm",
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-100 text-slate-800'
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <form 
                  onSubmit={handleSendMessage}
                  className="border-t p-4 bg-slate-50"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {aiTools.map(tool => (
                  <Card 
                    key={tool.id} 
                    className="cursor-pointer hover:shadow-md border border-slate-200 transition-all"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${tool.color.split(' ')[0]}`}>
                          <tool.icon className={`h-5 w-5 ${tool.color.split(' ')[1]}`} />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{tool.name}</CardTitle>
                          <p className="text-xs text-slate-500">{tool.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-sm text-slate-600">How can I help with your project?</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default WorkspaceInterface;