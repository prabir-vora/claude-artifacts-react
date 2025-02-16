import React from 'react';

const RubricCard = ({ criterion }) => {
  const getLevelInfo = (score) => {
    const levels = {
      "Does Not Meet": {
        textColor: "text-red-500",
        text: "Do Not Meet",
        segments: ["bg-red-500", "bg-gray-200", "bg-gray-200", "bg-gray-200"]
      },
      "Partially Meets": {
        textColor: "text-yellow-600",
        text: "Partially Meet",
        segments: ["bg-yellow-500", "bg-yellow-500", "bg-gray-200", "bg-gray-200"]
      },
      "Fully Meets": {
        textColor: "text-green-500",
        text: "Fully Meet",
        segments: ["bg-green-500", "bg-green-500", "bg-green-500", "bg-gray-200"]
      },
      "Exceeds": {
        textColor: "text-blue-500",
        text: "Exceeds",
        segments: ["bg-blue-500", "bg-blue-500", "bg-blue-500", "bg-blue-500"]
      }
    };
    return levels[score] || levels["Does Not Meet"];
  };

  const { textColor, text, segments } = getLevelInfo(criterion.score);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="mb-4">
        <h3 className="text-xl text-gray-800 font-medium mb-1">
          {criterion.name}
        </h3>
        <p className="text-sm">
          You <span className={`${textColor} italic`}>{text}</span> this standard
        </p>
      </div>

      {/* Segmented Progress Bar */}
      <div className="flex gap-1 mb-4 h-8">
        {segments.map((bgColor, index) => (
          <div 
            key={index}
            className={`flex-1 ${bgColor} first:rounded-l-sm last:rounded-r-sm`}
          />
        ))}
      </div>

      {/* Level Labels */}
      <div className="flex text-xs text-gray-600 mb-4">
        <div className="flex-1">Doesn't Meet</div>
        <div className="flex-1 text-center">Partially Meets</div>
        <div className="flex-1 text-center">Fully Meets</div>
        <div className="flex-1 text-right">Exceeds</div>
      </div>

      {/* Feedback Text */}
      <div className="bg-gray-50 p-4 rounded-sm">
        <p className="text-sm text-gray-700 leading-relaxed">
          {criterion.description}
        </p>
        {criterion.details && (
          <p className="text-sm text-gray-700 leading-relaxed mt-2">
            {criterion.details}
          </p>
        )}
      </div>
    </div>
  );
};

// Example usage
const RubricExample = () => {
  const sampleCriteria = [
    {
      id: "criteria_1",
      name: "Criteria",
      score: "Does Not Meet",
      description: "You have not followed all of the directions for the project or haven't executed them correctly. Please refer back to the project objectives and make sure you haven't left anything out.",
      details: "You did not include the required project elements. Please go back to the project objectives and include them all."
    },
    {
      id: "craftsmanship_1",
      name: "Craftsmanship",
      score: "Fully Meets",
      description: "Created a project that appears neat, clean, and has minimal stray pencil/pen marks. Took the time to clean up most of the hand/finger prints. The Project was not folded in any way.",
      details: "Project was matted correctly and matte was cut neatly and cleanly using appropriate tools."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      {sampleCriteria.map(criterion => (
        <RubricCard key={criterion.id} criterion={criterion} />
      ))}
    </div>
  );
};

export default RubricExample;