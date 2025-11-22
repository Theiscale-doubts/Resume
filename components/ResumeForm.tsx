import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem, ProjectItem, CertificateItem } from '../types';
import { generateSummary, enhanceDescription, analyzeResumeATS } from '../services/geminiService';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [atsResult, setAtsResult] = useState<{score: number, feedback: string[]} | null>(null);
  const [showAtsModal, setShowAtsModal] = useState(false);

  const handleProfileChange = (field: keyof typeof data.profile, value: string) => {
    onChange({
      ...data,
      profile: { ...data.profile, [field]: value },
    });
  };

  const handleExperienceChange = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: 'Company Name',
      position: 'Job Title',
      location: 'City, State',
      startDate: '',
      endDate: '',
      current: false,
      description: '• Achieved X results...',
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((item) => item.id !== id),
    });
  };

  const handleAiSummary = async () => {
    setLoadingSection('summary');
    const skillsList = data.skills.map(s => s.name).join(', ');
    const newSummary = await generateSummary(data.profile.title, skillsList, data.profile.summary);
    handleProfileChange('summary', newSummary);
    setLoadingSection(null);
  };

  const handleAiEnhanceExp = async (id: string, description: string, role: string) => {
    setLoadingSection(`exp-${id}`);
    const enhanced = await enhanceDescription(description, role);
    handleExperienceChange(id, 'description', enhanced);
    setLoadingSection(null);
  };

  const handleCheckATS = async () => {
    setLoadingSection('ats');
    setShowAtsModal(true);
    const result = await analyzeResumeATS(data);
    setAtsResult(result);
    setLoadingSection(null);
  };

  // Education Handlers
  const handleEducationChange = (id: string, field: keyof EducationItem, value: string) => {
    onChange({
      ...data,
      education: data.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      school: 'University Name',
      degree: 'Degree',
      location: 'Location',
      graduationDate: '',
    };
    onChange({ ...data, education: [newEdu, ...data.education] });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(item => item.id !== id) });
  };

  // Projects Handlers
  const handleProjectChange = (id: string, field: keyof ProjectItem, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: Date.now().toString(),
      name: 'Project Name',
      description: 'Brief description of the project...',
      link: ''
    };
    onChange({ ...data, projects: [newProj, ...data.projects] });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(item => item.id !== id) });
  };

  // Certificates Handlers
  const handleCertificateChange = (id: string, field: keyof CertificateItem, value: string) => {
    onChange({
      ...data,
      certificates: data.certificates.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const addCertificate = () => {
    const newCert: CertificateItem = {
      id: Date.now().toString(),
      name: 'Certificate Name',
      issuer: 'Issuer',
      date: 'Year'
    };
    onChange({ ...data, certificates: [newCert, ...data.certificates] });
  };

  const removeCertificate = (id: string) => {
    onChange({ ...data, certificates: data.certificates.filter(item => item.id !== id) });
  };

  // Skills Handlers
  const handleSkillsChange = (value: string) => {
     const skillsArray = value.split(',').map((s, i) => ({
         id: i.toString(),
         name: s.trim(),
         level: 'Advanced' as const
     })).filter(s => s.name !== '');
     onChange({ ...data, skills: skillsArray });
  };

  // Common styles for dark mode inputs
  const inputStyle = "w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-100 placeholder-gray-500";
  const cardStyle = "p-4 border border-gray-600 rounded-lg bg-gray-700 relative group hover:border-gray-500 transition-colors";
  const innerInputStyle = "w-full p-2 border border-gray-500 rounded bg-gray-800 text-gray-100 placeholder-gray-500 focus:border-blue-500 outline-none";

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-700 bg-gray-900/50 flex justify-between items-center shrink-0">
        <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
          <i className="ph ph-pencil-simple-line text-blue-400"></i> Editor
        </h2>
        <button 
          onClick={handleCheckATS}
          className="text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-700 text-white px-3 py-1.5 rounded-full shadow hover:shadow-md hover:from-green-400 hover:to-emerald-600 transition-all flex items-center gap-1"
        >
           <i className="ph ph-check-circle"></i> ATS Check
        </button>
      </div>

      {/* ATS Modal */}
      {showAtsModal && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl max-w-md w-full p-6 relative">
              <button onClick={() => setShowAtsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors">
                <i className="ph ph-x text-xl"></i>
              </button>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-100">
                 <i className="ph ph-robot text-purple-400"></i> ATS Analysis
              </h3>
              
              {loadingSection === 'ats' ? (
                 <div className="py-8 text-center">
                    <i className="ph ph-spinner animate-spin text-3xl text-blue-400 mb-2"></i>
                    <p className="text-gray-400">Analyzing your resume...</p>
                 </div>
              ) : atsResult ? (
                 <div>
                    <div className="flex items-center justify-center mb-6">
                       <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 text-3xl font-bold ${atsResult.score >= 80 ? 'border-green-500 text-green-400' : atsResult.score >= 60 ? 'border-yellow-500 text-yellow-400' : 'border-red-500 text-red-400'}`}>
                          {atsResult.score}
                       </div>
                    </div>
                    <h4 className="font-semibold text-gray-300 mb-2">Suggestions:</h4>
                    <ul className="space-y-2">
                      {atsResult.feedback.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                           <i className="ph-fill ph-info text-blue-400 mt-0.5"></i>
                           {tip}
                        </li>
                      ))}
                    </ul>
                 </div>
              ) : (
                 <p className="text-red-400">Analysis failed.</p>
              )}
           </div>
        </div>
      )}
      
      <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar text-gray-100 flex-1">
        {/* Personal Info */}
        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className={inputStyle} value={data.profile.fullName} onChange={(e) => handleProfileChange('fullName', e.target.value)} />
             <input type="text" placeholder="Job Title" className={inputStyle} value={data.profile.title} onChange={(e) => handleProfileChange('title', e.target.value)} />
            <input type="email" placeholder="Email" className={inputStyle} value={data.profile.email} onChange={(e) => handleProfileChange('email', e.target.value)} />
            <input type="text" placeholder="Phone" className={inputStyle} value={data.profile.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} />
            <input type="text" placeholder="Location" className={inputStyle} value={data.profile.location} onChange={(e) => handleProfileChange('location', e.target.value)} />
             <input type="text" placeholder="LinkedIn" className={inputStyle} value={data.profile.linkedin} onChange={(e) => handleProfileChange('linkedin', e.target.value)} />
             <input type="text" placeholder="Website" className={inputStyle} value={data.profile.website} onChange={(e) => handleProfileChange('website', e.target.value)} />
          </div>
        </section>

        {/* Summary */}
        <section>
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Professional Summary</h3>
            <button onClick={handleAiSummary} disabled={loadingSection === 'summary'} className="text-xs flex items-center gap-1 bg-purple-900/50 text-purple-300 border border-purple-700/50 px-3 py-1 rounded-full hover:bg-purple-800/50 transition-colors disabled:opacity-50">
              {loadingSection === 'summary' ? <i className="ph ph-spinner animate-spin"></i> : <i className="ph ph-sparkle"></i>} AI Generate
            </button>
           </div>
           <textarea className={`${inputStyle} h-32`} placeholder="Brief summary of your career..." value={data.profile.summary} onChange={(e) => handleProfileChange('summary', e.target.value)} />
        </section>

        {/* Experience */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Experience</h3>
            <button onClick={addExperience} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">+ Add Job</button>
          </div>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className={cardStyle}>
                <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"><i className="ph ph-trash"></i></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input type="text" placeholder="Job Title" className={innerInputStyle} value={exp.position} onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)} />
                   <input type="text" placeholder="Company" className={innerInputStyle} value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} />
                   <input type="text" placeholder="Start Date" className={innerInputStyle} value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
                   <div className="flex gap-2">
                      <input type="text" placeholder="End Date" className={innerInputStyle} value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
                      <label className="flex items-center gap-1 text-xs whitespace-nowrap text-gray-300 cursor-pointer select-none"><input type="checkbox" checked={exp.current} onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)} className="rounded bg-gray-800 border-gray-500 text-blue-500 focus:ring-0" /> Current</label>
                   </div>
                </div>
                 <div className="relative">
                    <div className="flex justify-end mb-1">
                         <button onClick={() => handleAiEnhanceExp(exp.id, exp.description, exp.position)} disabled={loadingSection === `exp-${exp.id}`} className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50">
                           {loadingSection === `exp-${exp.id}` ? <i className="ph ph-spinner animate-spin"></i> : <i className="ph ph-magic-wand"></i>} Enhance Text
                          </button>
                    </div>
                    <textarea placeholder="Job Description..." className={`${innerInputStyle} h-32 text-sm`} value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} />
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Projects</h3>
                <button onClick={addProject} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">+ Add Project</button>
            </div>
            <div className="space-y-4">
                {data.projects.map((proj) => (
                    <div key={proj.id} className={cardStyle}>
                        <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"><i className="ph ph-trash"></i></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input type="text" placeholder="Project Name" className={innerInputStyle} value={proj.name} onChange={(e) => handleProjectChange(proj.id, 'name', e.target.value)} />
                            <input type="text" placeholder="Link (Optional)" className={innerInputStyle} value={proj.link || ''} onChange={(e) => handleProjectChange(proj.id, 'link', e.target.value)} />
                        </div>
                        <textarea placeholder="Project Description..." className={`${innerInputStyle} h-20 text-sm`} value={proj.description} onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)} />
                    </div>
                ))}
            </div>
        </section>

        {/* Education */}
        <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Education</h3>
              <button onClick={addEducation} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">+ Add School</button>
            </div>
             <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className={cardStyle}>
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"><i className="ph ph-trash"></i></button>
                    <div className="grid grid-cols-1 gap-3">
                         <input type="text" placeholder="School" className={innerInputStyle} value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} />
                         <input type="text" placeholder="Degree" className={innerInputStyle} value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} />
                         <div className="grid grid-cols-2 gap-3">
                             <input type="text" placeholder="Location" className={innerInputStyle} value={edu.location} onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)} />
                            <input type="text" placeholder="Year" className={innerInputStyle} value={edu.graduationDate} onChange={(e) => handleEducationChange(edu.id, 'graduationDate', e.target.value)} />
                         </div>
                    </div>
                </div>
              ))}
             </div>
        </section>

        {/* Certificates */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Certifications</h3>
                <button onClick={addCertificate} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">+ Add Cert</button>
            </div>
            <div className="space-y-4">
                {data.certificates.map((cert) => (
                    <div key={cert.id} className={cardStyle}>
                        <button onClick={() => removeCertificate(cert.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"><i className="ph ph-trash"></i></button>
                        <div className="grid grid-cols-1 gap-3">
                            <input type="text" placeholder="Certificate Name" className={innerInputStyle} value={cert.name} onChange={(e) => handleCertificateChange(cert.id, 'name', e.target.value)} />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Issuer" className={innerInputStyle} value={cert.issuer} onChange={(e) => handleCertificateChange(cert.id, 'issuer', e.target.value)} />
                                <input type="text" placeholder="Date/Year" className={innerInputStyle} value={cert.date} onChange={(e) => handleCertificateChange(cert.id, 'date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Skills */}
        <section>
           <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Skills</h3>
           <textarea
              className={`${inputStyle} h-24`}
              placeholder="Enter skills separated by commas..."
              value={data.skills.map(s => s.name).join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
           />
        </section>

      </div>
    </div>
  );
};

export default ResumeForm;