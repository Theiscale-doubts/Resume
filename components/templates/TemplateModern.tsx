import React from 'react';
import { ResumeData } from '../../types';

// Blue headers, clean separators, sans-serif
const TemplateModern: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white p-6 md:p-8 max-w-[210mm] mx-auto min-h-[297mm] text-slate-800 font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-1 tracking-tight">{data.profile.fullName}</h1>
        <p className="text-lg text-blue-600 font-medium mb-3">{data.profile.title}</p>
        
        <div className="flex flex-wrap gap-3 text-xs text-slate-600 border-t border-blue-100 pt-3">
            {data.profile.email && (
                <div className="flex items-center gap-1">
                    <span className="text-blue-500 font-bold">@</span> {data.profile.email}
                </div>
            )}
             {data.profile.phone && (
                <div className="flex items-center gap-1">
                    <span className="text-blue-500 font-bold">#</span> {data.profile.phone}
                </div>
            )}
            {data.profile.location && (
                <div className="flex items-center gap-1">
                    <span className="text-blue-500">📍</span> {data.profile.location}
                </div>
            )}
             {data.profile.linkedin && (
                <div className="flex items-center gap-1">
                    <span className="text-blue-500 font-bold">in</span> {data.profile.linkedin}
                </div>
            )}
        </div>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-5">
        
        {/* Summary */}
        {data.profile.summary && (
          <section>
             <h2 className="text-base font-bold text-blue-900 border-b-2 border-blue-200 mb-2 pb-0.5">
                Profile
             </h2>
             <p className="text-slate-700 text-sm leading-snug">{data.profile.summary}</p>
          </section>
        )}

        {/* Experience */}
        <section>
            <h2 className="text-base font-bold text-blue-900 border-b-2 border-blue-200 mb-3 pb-0.5">
                Experience
            </h2>
            <div className="space-y-4">
                {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-3 border-l-2 border-blue-100">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h3 className="font-bold text-base text-slate-900">{exp.position}</h3>
                            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                        </div>
                        <div className="text-slate-600 font-medium text-xs mb-1">{exp.company} | {exp.location}</div>
                        <div className="text-slate-700 text-sm leading-snug whitespace-pre-line">
                            {exp.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Projects */}
        {data.projects.length > 0 && (
            <section>
                <h2 className="text-base font-bold text-blue-900 border-b-2 border-blue-200 mb-3 pb-0.5">
                    Projects
                </h2>
                <div className="grid grid-cols-1 gap-3">
                    {data.projects.map((proj) => (
                        <div key={proj.id}>
                             <div className="flex items-baseline gap-2 mb-0.5">
                                <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                                {proj.link && <span className="text-[10px] text-blue-500">{proj.link}</span>}
                             </div>
                             <p className="text-slate-700 text-sm leading-snug">{proj.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Flex row for Edu and Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Education */}
            <section>
                <h2 className="text-base font-bold text-blue-900 border-b-2 border-blue-200 mb-3 pb-0.5">
                    Education
                </h2>
                <div className="space-y-3">
                    {data.education.map((edu) => (
                        <div key={edu.id}>
                            <h3 className="font-bold text-sm text-slate-900">{edu.school}</h3>
                            <p className="text-slate-700 text-xs">{edu.degree}</p>
                            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                                <span>{edu.location}</span>
                                <span>{edu.graduationDate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Right Col Container */}
            <div className="space-y-4">
                 {/* Skills */}
                <section>
                     <h2 className="text-base font-bold text-blue-900 border-b-2 border-blue-200 mb-3 pb-0.5">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        {data.skills.map(s => (
                            <span key={s.id} className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md text-xs font-medium border border-blue-100">
                                {s.name}
                            </span>
                        ))}
                    </div>
                </section>
                
                {/* Certs */}
                {data.certificates.length > 0 && (
                    <section>
                        <h2 className="text-base font-bold text-blue-900 border-b-2 border-blue-200 mb-3 pb-0.5">
                            Certifications
                        </h2>
                         <ul className="space-y-1.5">
                            {data.certificates.map((cert) => (
                                <li key={cert.id} className="text-xs text-slate-700">
                                    <span className="font-bold block">{cert.name}</span>
                                    <span className="block text-[10px] text-slate-500">{cert.issuer} • {cert.date}</span>
                                </li>
                            ))}
                         </ul>
                    </section>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateModern;