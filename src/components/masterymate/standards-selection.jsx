import React, { useState } from 'react';
import { ChevronRight, ChevronDown, X, Save, BookOpen, Search } from 'lucide-react';

const StandardsSelector = () => {
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Presets data
  const [presets, setPresets] = useState([
    {
      id: 'preset-1',
      name: 'Common Core Math Grade 8',
      set: 'ccss',
      subject: 'math',
      grade: 'Grade 8',
      standards: ['ccss.math.8.ee.a.1', 'ccss.math.8.ee.a.2']
    }
  ]);

  // Reset dependent selections when parent selection changes
  const handleSetChange = (setId) => {
    setSelectedSet(setId);
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedStandards([]);
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    setSelectedGrade('');
    setSelectedStandards([]);
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    setSelectedStandards([]);
  };

  const loadPreset = (preset) => {
    setSelectedSet(preset.set);
    setSelectedSubject(preset.subject);
    setSelectedGrade(preset.grade);
    setSelectedStandards(preset.standards);
  };

  const savePreset = () => {
    if (!presetName || !selectedSet || !selectedSubject || !selectedGrade) return;
    
    const newPreset = {
      id: `preset-${Date.now()}`,
      name: presetName,
      set: selectedSet,
      subject: selectedSubject,
      grade: selectedGrade,
      standards: selectedStandards
    };
    
    setPresets([...presets, newPreset]);
    setPresetName('');
  };

  const clearSelection = () => {
    setSelectedSet('');
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedStandards([]);
    setSearchTerm('');
  };

  return (
    <div className="flex gap-6 w-full max-w-6xl mx-auto p-6">
      {/* Main Selection Panel */}
      <div className="w-2/3 space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Header with Selection Path */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Standards Selection</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100"
              >
                <BookOpen size={16} />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={clearSelection}
                className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100"
              >
                <X size={16} />
                Clear
              </button>
            </div>
          </div>
          
          {/* Selection Path Indicator */}
          <div className="flex items-center gap-2 text-sm">
            <span className={`px-3 py-1 rounded ${selectedSet ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>
              Standards Set
            </span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className={`px-3 py-1 rounded ${selectedSubject ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>
              Subject
            </span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className={`px-3 py-1 rounded ${selectedGrade ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>
              Grade Level
            </span>
          </div>
        </div>

        {/* Presets Section */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Saved Presets</h3>
          {presets.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {presets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="p-3 text-left border rounded-md bg-white hover:bg-gray-50"
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-sm text-gray-600">
                    {preset.subject} - {preset.grade}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic mb-4">No saved presets</p>
          )}
          
          <div className="flex gap-2">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name"
              className="flex-1 p-2 border rounded-md bg-white"
            />
            <button
              onClick={savePreset}
              disabled={!presetName || !selectedSet || !selectedSubject || !selectedGrade}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={16} />
              Save Selection
            </button>
          </div>
        </div>

        {/* Hierarchical Selection */}
        <div className="space-y-4">
          {/* Standards Set Selection */}
          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. Select Standards Set
            </label>
            <select
              value={selectedSet}
              onChange={(e) => handleSetChange(e.target.value)}
              className="w-full p-2 border rounded-md bg-white"
            >
              <option value="">Select Standards Set...</option>
              <option value="ccss">Common Core State Standards</option>
              <option value="ngss">Next Generation Science Standards</option>
            </select>
          </div>

          {/* Subject Selection - Only shown if Standards Set is selected */}
          {selectedSet && (
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">Select Subject...</option>
                <option value="math">Mathematics</option>
                <option value="ela">English Language Arts</option>
              </select>
            </div>
          )}

          {/* Grade Selection - Only shown if Subject is selected */}
          {selectedSubject && (
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. Select Grade Level
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => handleGradeChange(e.target.value)}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">Select Grade...</option>
                {['K', '1', '2', '3', '4', '5', '6', '7', '8'].map(grade => (
                  <option key={grade} value={`Grade ${grade}`}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Standards Selection - Only shown if Grade is selected */}
          {selectedGrade && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  4. Select Standards
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search standards..."
                    className="pl-10 pr-4 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {/* Example standards data structure - in real app, this would come from an API */}
                {[
                  {
                    id: 'domain-1',
                    title: 'Operations & Algebraic Thinking',
                    standards: [
                      {
                        id: 'ccss.math.8.ee.a.1',
                        description: 'Know and apply the properties of integer exponents to generate equivalent numerical expressions.'
                      },
                      {
                        id: 'ccss.math.8.ee.a.2',
                        description: 'Use square root and cube root symbols to represent solutions to equations.'
                      }
                    ]
                  },
                  {
                    id: 'domain-2',
                    title: 'Functions',
                    standards: [
                      {
                        id: 'ccss.math.8.f.a.1',
                        description: 'Understand that a function is a rule that assigns to each input exactly one output.'
                      },
                      {
                        id: 'ccss.math.8.f.a.2',
                        description: 'Compare properties of two functions represented in different ways.'
                      }
                    ]
                  }
                ].map(domain => (
                  <div key={domain.id} className="border rounded-lg">
                    <button
                      onClick={() => {
                        if (expandedSections.includes(domain.id)) {
                          setExpandedSections(expandedSections.filter(id => id !== domain.id));
                        } else {
                          setExpandedSections([...expandedSections, domain.id]);
                        }
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                    >
                      <span className="font-medium">{domain.title}</span>
                      {expandedSections.includes(domain.id) ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.includes(domain.id) && (
                      <div className="p-3 pt-0 space-y-2">
                        {domain.standards
                          .filter(standard => 
                            searchTerm === '' || 
                            standard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            standard.id.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map(standard => (
                            <div
                              key={standard.id}
                              className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md"
                            >
                              <input
                                type="checkbox"
                                id={standard.id}
                                checked={selectedStandards.includes(standard.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedStandards([...selectedStandards, standard.id]);
                                  } else {
                                    setSelectedStandards(selectedStandards.filter(id => id !== standard.id));
                                  }
                                }}
                                className="mt-1"
                              />
                              <label htmlFor={standard.id} className="text-sm cursor-pointer">
                                <div className="font-medium text-blue-600">{standard.id}</div>
                                <div className="text-gray-600">{standard.description}</div>
                              </label>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-6 h-fit sticky top-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Selected Standards
          </h3>
          
          {selectedStandards.length === 0 ? (
            <p className="text-gray-600 italic">No standards selected</p>
          ) : (
            <div className="space-y-4">
              {selectedStandards.map(standardId => (
                <div key={standardId} className="p-3 border rounded-lg">
                  <div className="font-medium text-sm text-blue-600">
                    {standardId}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Standard description here...
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
            {selectedStandards.length} standard{selectedStandards.length !== 1 ? 's' : ''} selected
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardsSelector;