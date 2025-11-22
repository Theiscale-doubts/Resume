import React from 'react';
import { ResumeData } from '../../types';

// ATS Friendly, Black/Grey, Simple Headings
const TemplateMinimal: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white p-6 md:p-8 max-w-[210mm] mx-auto min-h-[297mm] text-gray-900 font-serif">
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-4 mb-4 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{data.profile.fullName}</h1>
        <p className="text-base mb-2 font-medium">{data.profile.title}</p>
        <div className="text-xs flex flex-wrap justify-center gap-3 text-gray-700">
          {data.profile.phone && <span>{data.profile.phone}</span>}
          {data.profile.email && <span>{data.profile.email}</span>}
          {data.profile.location && <span>{data.profile.location}</span>}
          {data.profile.linkedin && <span>{data.profile.linkedin}</span>}
          {data.profile.website && <span>{data.profile.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.profile.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Professional Summary</h2>
          <p className="text-sm leading-snug text-justify">{data.profile.summary}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-widest">Work Experience</h2>
        <div className="space-y-3">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-sm">{exp.position}</h3>
                <span className="text-xs text-gray-600 italic">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                 <span className="text-xs font-semibold text-gray-800">{exp.company}</span>
                 <span className="text-[10px] text-gray-600">{exp.location}</span>
              </div>
              <div className="text-sm leading-snug whitespace-pre-line pl-1">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-widest">Projects</h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                 <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-sm">{proj.name}</h3>
                    {proj.link && <span className="text-[10px] text-gray-600">{proj.link}</span>}
                 </div>
                 <div className="text-sm leading-snug">
                    {proj.description}
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-widest">Education</h2>
        <div className="space-y-2">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm">{edu.school}</h3>
                <p className="text-xs italic">{edu.degree}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] block text-gray-600">{edu.location}</span>
                <span className="text-[10px] block text-gray-600">{edu.graduationDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      {data.certificates.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Certifications</h2>
          <div className="space-y-1">
             {data.certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between text-sm">
                    <span className="font-bold text-xs">{cert.name} <span className="font-normal text-gray-600">- {cert.issuer}</span></span>
                    <span className="text-[10px] text-gray-600">{cert.date}</span>
                </div>
             ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section>
        <h2 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Skills</h2>
        <div className="text-sm leading-snug">
          {data.skills.map(s => s.name).join(' • ')}
        </div>
      </section>
    </div>
  );
};

export default TemplateMinimal;