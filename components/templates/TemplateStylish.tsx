import React from 'react';
import { ResumeData } from '../../types';

// Light grey boxes, design elements
const TemplateStylish: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white p-0 max-w-[210mm] mx-auto min-h-[297mm] flex flex-col font-sans text-gray-800">
      {/* Header Band */}
      <header className="bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-light tracking-wide mb-1 uppercase">{data.profile.fullName}</h1>
        <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">{data.profile.title}</p>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar (Grey) */}
        <aside className="w-1/3 bg-gray-100 p-6 text-sm border-r border-gray-200">
           
           {/* Contact Info */}
           <div className="mb-6">
             <h3 className="font-bold uppercase text-gray-900 mb-3 border-b border-gray-300 pb-1 text-xs">Contact</h3>
             <ul className="space-y-2 text-gray-600 text-xs">
                {data.profile.phone && <li className="flex items-center gap-2"><i className="ph-fill ph-phone"></i> {data.profile.phone}</li>}
                {data.profile.email && <li className="flex items-center gap-2 break-all"><i className="ph-fill ph-envelope"></i> {data.profile.email}</li>}
                {data.profile.location && <li className="flex items-center gap-2"><i className="ph-fill ph-map-pin"></i> {data.profile.location}</li>}
                {data.profile.website && <li className="flex items-center gap-2 break-all"><i className="ph-fill ph-globe"></i> {data.profile.website}</li>}
             </ul>
           </div>

           {/* Education (Moved to sidebar in this layout) */}
           <div className="mb-6">
             <h3 className="font-bold uppercase text-gray-900 mb-3 border-b border-gray-300 pb-1 text-xs">Education</h3>
             <div className="space-y-3">
                {data.education.map((edu) => (
                    <div key={edu.id}>
                        <div className="font-bold text-gray-800 text-sm">{edu.degree}</div>
                        <div className="text-gray-600 text-xs">{edu.school}</div>
                        <div className="text-gray-500 text-[10px] mt-0.5">{edu.graduationDate}</div>
                    </div>
                ))}
             </div>
           </div>

           {/* Skills */}
            <div className="mb-6">
             <h3 className="font-bold uppercase text-gray-900 mb-3 border-b border-gray-300 pb-1 text-xs">Skills</h3>
             <div className="flex flex-wrap gap-1.5">
                {data.skills.map(s => (
                    <span key={s.id} className="bg-white border border-gray-300 text-gray-700 px-1.5 py-0.5 text-[10px]">
                        {s.name}
                    </span>
                ))}
             </div>
           </div>
           
           {/* Certifications */}
           {data.certificates.length > 0 && (
               <div>
                 <h3 className="font-bold uppercase text-gray-900 mb-3 border-b border-gray-300 pb-1 text-xs">Certifications</h3>
                 <div className="space-y-2">
                    {data.certificates.map((cert) => (
                        <div key={cert.id}>
                            <div className="font-bold text-gray-800 text-xs">{cert.name}</div>
                            <div className="text-gray-500 text-[10px]">{cert.issuer} • {cert.date}</div>
                        </div>
                    ))}
                 </div>
               </div>
           )}

        </aside>

        {/* Main Content (White) */}
        <main className="w-2/3 p-6">
           {/* Summary */}
            {data.profile.summary && (
                <section className="mb-6">
                    <h2 className="font-bold uppercase text-gray-900 tracking-wider mb-3 flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-900 block"></span> Profile
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.profile.summary}</p>
                </section>
            )}

            {/* Experience */}
            <section className="mb-6">
                <h2 className="font-bold uppercase text-gray-900 tracking-wider mb-4 flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-gray-900 block"></span> Work Experience
                </h2>
                <div className="space-y-6 border-l border-gray-200 pl-4 ml-0.5">
                     {data.experience.map((exp) => (
                        <div key={exp.id} className="relative">
                             {/* Timeline Dot */}
                            <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-gray-900 bg-white"></span>
                            
                            <div className="mb-1.5">
                                <h3 className="text-base font-bold text-gray-800">{exp.position}</h3>
                                <div className="flex justify-between text-gray-500 text-xs font-medium">
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-snug whitespace-pre-line">
                                {exp.description}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

             {/* Projects */}
             {data.projects.length > 0 && (
                <section>
                    <h2 className="font-bold uppercase text-gray-900 tracking-wider mb-4 flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-900 block"></span> Projects
                    </h2>
                    <div className="space-y-4">
                         {data.projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="mb-0.5 flex justify-between items-baseline">
                                    <h3 className="text-sm font-bold text-gray-800">{proj.name}</h3>
                                    {proj.link && <span className="text-[10px] text-gray-500">{proj.link}</span>}
                                </div>
                                <div className="text-gray-600 text-sm leading-snug">
                                    {proj.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
             )}
        </main>
      </div>
    </div>
  );
};

export default TemplateStylish;