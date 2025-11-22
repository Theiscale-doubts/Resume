import React, { useState, useRef } from 'react';
import ResumeForm from './components/ResumeForm';
import TemplateMinimal from './components/templates/TemplateMinimal';
import TemplateModern from './components/templates/TemplateModern';
import TemplateStylish from './components/templates/TemplateStylish';
import { ResumeData, TemplateType } from './types';
import { INITIAL_RESUME_DATA } from './constants';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : INITIAL_RESUME_DATA;
  });
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (template) {
      case 'minimal':
        return <TemplateMinimal data={data} />;
      case 'stylish':
        return <TemplateStylish data={data} />;
      case 'modern':
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-50 no-print shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <i className="ph-bold ph-file-text text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">AI Resume Builder</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => setTemplate('minimal')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${template === 'minimal' ? 'bg-gray-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Minimal
            </button>
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${template === 'modern' ? 'bg-gray-600 text-blue-400 shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Modern Blue
            </button>
            <button
              onClick={() => setTemplate('stylish')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${template === 'stylish' ? 'bg-gray-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Stylish Grey
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg"
          >
            <i className="ph-bold ph-download-simple"></i>
            <span className="hidden sm:inline">Save as PDF</span>
          </button>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
          >
            <i className={`ph-bold ${showMobilePreview ? 'ph-pencil' : 'ph-eye'} text-xl`}></i>
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-6 gap-6 flex overflow-hidden">

        {/* Editor Column */}
        <div className={`w-full md:w-1/2 lg:w-2/5 flex-col gap-4 no-print editor-column ${showMobilePreview ? 'hidden' : 'flex'} md:flex`}>
          {/* Mobile Template Selector */}
          <div className="md:hidden bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4">
            <label className="text-sm font-bold text-gray-300 mb-2 block">Choose Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="minimal">Minimal & Clean</option>
              <option value="modern">Modern Blue</option>
              <option value="stylish">Stylish Grey</option>
            </select>
          </div>

          <ResumeForm data={data} onChange={setData} />
        </div>

        {/* Preview Column */}
        <div id="preview-wrapper" className={`w-full md:w-1/2 lg:w-3/5 bg-gray-800/50 rounded-xl md:p-8 overflow-y-auto custom-scrollbar flex justify-center items-start ${!showMobilePreview ? 'hidden' : 'flex'} md:flex`}>

          {/* Resume Paper Container */}
          <div id="resume-preview" className="print-only bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] origin-top scale-100 md:scale-90 xl:scale-100 transition-transform duration-300 ease-in-out">
            {renderTemplate()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;