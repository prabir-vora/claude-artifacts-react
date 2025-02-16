import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronRight, FileText, Settings, Table as TableIcon } from 'lucide-react';
import { SAMPLE_ASSIGNMENT_ADSL } from '@/lib/sample_adsl';

const ADSLEditor = () => {
  const [activeView, setActiveView] = useState('split');
  const [sections, setSections] = useState(SAMPLE_ASSIGNMENT_ADSL);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const updateQuestionField = (sectionIndex, questionIndex, field, value) => {
    setSections(prev => {
      const newSections = [...prev];
      const content = newSections[sectionIndex].content;
      if (content[questionIndex].type !== 'text' && content[questionIndex].type !== 'table') {
        content[questionIndex][field] = value;
      }
      return newSections;
    });
  };

  const ContentRenderer = ({ content }) => {
    if (content.type === 'text') {
      return (
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg mb-4">
          <p className="text-gray-700 leading-relaxed">{content.content}</p>
        </div>
      );
    }
    
    if (content.type === 'table') {
      return (
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg mb-4 overflow-x-auto">
          <div className="flex items-center gap-3 mb-4">
            <TableIcon size={18} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">Table Data</span>
          </div>
          <div 
            dangerouslySetInnerHTML={{ __html: content.content }} 
            className="table-wrapper min-w-full [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-200 [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_th]:border [&_th]:border-gray-200 [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:text-left [&_th]:font-medium [&_tr:hover]:bg-gray-50" 
          />
        </div>
      );
    }
    
    return null;
  };

  const QuestionEditor = ({ question, sectionIndex, questionIndex }) => {
    return (
      <Card className="mb-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Label className="text-lg font-semibold text-gray-900">Question {question.id}</Label>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {question.type}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Label className="text-gray-700">Required</Label>
                  <Switch 
                    checked={question.required}
                    onCheckedChange={(checked) => 
                      updateQuestionField(sectionIndex, questionIndex, 'required', checked)
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Label className="text-gray-700">Points</Label>
                  <Input
                    type="number"
                    value={question.points}
                    onChange={(e) => 
                      updateQuestionField(sectionIndex, questionIndex, 'points', parseFloat(e.target.value))
                    }
                    className="w-24"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-gray-700 mb-2 block">Prompt</Label>
              <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                {question.prompt?.map((p, i) => (
                  <p key={i} className="text-gray-800 leading-relaxed">{p.content}</p>
                ))}
              </div>
            </div>
            {question.type === 'short_answer' && (
              <div>
                <Label className="text-gray-700 mb-2 block">Sample Answer</Label>
                <Input 
                  placeholder="Enter a sample answer..."
                  className="mt-2"
                />
              </div>
            )}
            {question.type === 'calculation' && (
              <div>
                <Label className="text-gray-700 mb-2 block">Calculation Steps</Label>
                <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-600">Add calculation steps and formulas here</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const SectionView = ({ section, index }) => {
    const isExpanded = expandedSections[section.section_id];
    
    return (
      <Card className="mb-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors py-6" 
          onClick={() => toggleSection(section.section_id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isExpanded ? 
                <ChevronDown size={24} className="text-blue-600" /> : 
                <ChevronRight size={24} className="text-blue-600" />
              }
              <CardTitle className="text-xl font-semibold text-gray-900">{section.title}</CardTitle>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm font-medium text-gray-600">
                {section.content.filter(c => c.type !== 'text' && c.type !== 'table').length} questions
              </div>
              <Label className="text-gray-700">Total Points: {section.points}</Label>
              <Settings size={20} className="text-gray-500 hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-2 pb-6">
            {section.content.map((item, itemIndex) => (
              <div key={item.id || `${section.section_id}-${itemIndex}`}>
                {(item.type === 'text' || item.type === 'table') ? (
                  <ContentRenderer content={item} />
                ) : (
                  <QuestionEditor
                    question={item}
                    sectionIndex={index}
                    questionIndex={itemIndex}
                  />
                )}
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Tabs defaultValue={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="split" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Split View
          </TabsTrigger>
          <TabsTrigger value="digital" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Settings className="mr-2 h-4 w-4" />
            Digital View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="split" className="mt-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="border rounded-xl p-6 bg-white shadow-sm">
              <div className="h-screen bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-700 font-medium">PDF Preview</p>
                  <p className="text-sm text-gray-500 mt-2">Upload a PDF to preview</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 overflow-y-auto h-screen pr-4 custom-scrollbar">
              {sections.map((section, index) => (
                <SectionView key={section.section_id} section={section} index={index} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="digital" className="mt-6">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <SectionView key={section.section_id} section={section} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ADSLEditor;