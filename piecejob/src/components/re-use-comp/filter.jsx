// import React, { useState, useEffect } from 'react';

// const JobFilter = ({ onFilter }) => {
//     const [skills, setSkills] = useState('');
//     const [suggestedSkills, setSuggestedSkills] = useState([]);
//     const [filteredSkills, setFilteredSkills] = useState([]);

//     useEffect(() => {
//         if (skills) {
//             fetch(`http://localhost:1960/api/skills/suggest?query=${skills}`)
//                 .then(response => response.json())
//                 .then(data => setSuggestedSkills(data))
//                 .catch(error => console.error(error));
//         } else {
//             setSuggestedSkills([]);
//         }
//     }, [skills]);

//     const handleSkillsChange = (event) => {
//         const value = event.target.value;
//         setSkills(value);
//         const suggested = suggestedSkills.filter(skill => skill.toLowerCase().includes(value.toLowerCase()));
//         setFilteredSkills(suggested);
//     };

//     const handleSkillClick = (skill) => {
//         setSkills('');
//         setFilteredSkills([]);
//         onFilter(skill);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter skills..."
//                 value={skills}
//                 onChange={handleSkillsChange}
//             />
//             <div>
//                 {filteredSkills.map((skill, index) => (
//                     <span
//                         key={index}
//                         className="filter-skill"
//                         onClick={() => handleSkillClick(skill)}
//                     >
//                         {skill}
//                     </span>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default JobFilter;







import React from 'react'

export default function filter() {
  return (
    <div>filter</div>
  )
}
