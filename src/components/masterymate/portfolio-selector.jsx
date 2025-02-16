import React, { useState } from "react";
import "./portfolio-selector.css";

const PortfolioActivitySelector = () => {
  const [standard, setStandard] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [projectTheme, setProjectTheme] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState(new Set());

  // Mock AI Generation Function
  const generateActivities = () => {
    setLoading(true);
    setTimeout(() => {
      const generatedActivities = [
        {
          title: "Opinion Statement Builder",
          description:
            "Students will craft a clear opinion statement on a chosen topic. This activity helps students focus on creating a structured introduction, organizing their ideas, and stating an opinion clearly.",
          steps: [
            "Select a topic you feel strongly about (e.g., school lunch options, recess time).",
            "Use sentence frames like 'I believe that...' or 'In my opinion...' to construct your statement.",
            "Provide three reasons supporting your opinion.",
          ],
          finalProduct: "A structured paragraph introducing the opinion and supporting points.",
          alignment: ["W.5.1.a"],
        },
        {
          title: "Evidence Collection Detective",
          description:
            "Students gather evidence to support their opinion. This activity builds research skills by introducing them to different types of evidence and organizing their findings.",
          steps: [
            "Research at least two sources supporting your opinion (e.g., facts, expert opinions, or personal anecdotes).",
            "Organize evidence in a graphic organizer, categorizing it into 'facts', 'expert quotes', and 'personal experiences'.",
          ],
          finalProduct: "An evidence portfolio with cited sources and explanations.",
          alignment: ["W.5.1.b"],
        },
        {
          title: "Counterargument Constructor",
          description:
            "Students learn to address opposing viewpoints respectfully and strengthen their arguments.",
          steps: [
            "Identify one potential opposing viewpoint to your opinion.",
            "Write a response that acknowledges the counterargument.",
            "Explain why your original position remains valid despite the counterargument.",
          ],
          finalProduct: "A paragraph addressing and rebutting an opposing viewpoint.",
          alignment: ["W.5.1.b", "W.5.1.c"],
        },
        {
          title: "Complete Opinion Essay",
          description:
            "Students synthesize all the components into a polished opinion essay that demonstrates mastery of the writing process.",
          steps: [
            "Write an introduction with a clear opinion statement.",
            "Develop body paragraphs with logically ordered reasons and supporting evidence.",
            "Include a section addressing counterarguments.",
            "Conclude with a strong restatement of your opinion and main points.",
          ],
          finalProduct: "A complete opinion essay that addresses all aspects of the standard.",
          alignment: ["W.5.1.a", "W.5.1.b", "W.5.1.c", "W.5.1.d"],
        },
      ];
      setActivities(generatedActivities);
      setLoading(false);
    }, 1500); // Simulate API delay
  };

  const handleActivitySelect = (index) => {
    setSelectedActivities(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const handleSaveActivities = () => {
    const savedActivities = activities.filter((_, index) => selectedActivities.has(index));
    // Here you would typically save these to your backend or state management
    console.log('Saved activities:', savedActivities);
    // You can add a success notification here
  };

  return (
    <div className="portfolio-selector-container">
      <div className="selector-header">
        <h2>Portfolio Activity Selection</h2>
        <p className="subtitle">Generate customized learning activities based on your criteria</p>
      </div>

      <div className="input-grid">
        <div className="input-group">
          <label htmlFor="standard">Standard</label>
          <input
            id="standard"
            type="text"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            placeholder="e.g., CCSS.ELA-Literacy.W.5.1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="gradeLevel">Grade Level</label>
          <select 
            id="gradeLevel"
            value={gradeLevel} 
            onChange={(e) => setGradeLevel(e.target.value)}
          >
            <option value="">Select Grade</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="projectTheme">Project Theme</label>
          <input
            id="projectTheme"
            type="text"
            value={projectTheme}
            onChange={(e) => setProjectTheme(e.target.value)}
            placeholder="e.g., Australia's Federation"
          />
        </div>

        <button 
          className={`generate-button ${loading ? 'loading' : ''}`}
          onClick={generateActivities} 
          disabled={loading || !standard || !gradeLevel || !projectTheme}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating...
            </>
          ) : (
            'Generate Activities'
          )}
        </button>
      </div>

      {activities.length > 0 && (
        <div className="activities-container">
          <div className="activities-header">
            <h3>Generated Activities</h3>
            {selectedActivities.size > 0 && (
              <button 
                className="save-activities-button"
                onClick={handleSaveActivities}
              >
                Save {selectedActivities.size} Selected {selectedActivities.size === 1 ? 'Activity' : 'Activities'}
              </button>
            )}
          </div>
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className={`activity-card ${selectedActivities.has(index) ? 'selected' : ''}`}
              >
                <div className="activity-header">
                  <h4>{activity.title}</h4>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedActivities.has(index)}
                      onChange={() => handleActivitySelect(index)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="activity-content">
                  <p className="description">{activity.description}</p>
                  
                  <div className="steps-section">
                    <h5>Steps</h5>
                    <ol>
                      {activity.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="final-product">
                    <h5>Final Product</h5>
                    <p>{activity.finalProduct}</p>
                  </div>

                  <div className="standards">
                    <h5>Aligned Standards</h5>
                    <div className="standards-tags">
                      {activity.alignment.map((standard, i) => (
                        <span key={i} className="standard-tag">{standard}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioActivitySelector;
