import React, { useState } from "react";
import { LEGAL_AND_COPY_TEMPLATES, LegalAndCopyTemplate } from "../data/roadmapData";
import { FileText, Copy, Check, Info } from "lucide-react";

export const TemplatesHub: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("ph-maker-comment");
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  const categories = ["전체", "런칭 카피", "커뮤니티 카피", "콜드 이메일", "법적 문서"];

  const filteredTemplates = activeCategory === "전체"
    ? LEGAL_AND_COPY_TEMPLATES
    : LEGAL_AND_COPY_TEMPLATES.filter((t) => t.category === activeCategory);

  const selectedTemplate = LEGAL_AND_COPY_TEMPLATES.find((t) => t.id === selectedTemplateId) || LEGAL_AND_COPY_TEMPLATES[0];

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <FileText className="w-4 h-4" />
            <span>글로벌 런칭 필수 카피라이팅 & 법률 템플릿</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            복사해서 바로 쓰는 글로벌 빌더 템플릿
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Product Hunt 첫 댓글, Show HN, Reddit 포스트, 콜드 메일 및 환불 정책 영문 원본입니다.
          </p>
        </div>
      </div>

      {/* Category Pills / Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Template List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredTemplates.map((template) => {
            const isSelected = template.id === selectedTemplate.id;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/50"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-indigo-400 mb-1">
                  <span>{template.category}</span>
                </div>
                <div className="text-sm font-bold text-white line-clamp-1">{template.title}</div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-2">{template.purpose}</div>
              </button>
            );
          })}
        </div>

        {/* Template Viewer */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400">{selectedTemplate.category}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedTemplate.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedTemplate.purpose}</p>
              </div>
              <button
                onClick={() => handleCopy(selectedTemplate.templateContent)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shrink-0 shadow-sm shadow-indigo-600/20"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "복사 완료!" : "영문 원본 복사"}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 bg-slate-900/90 rounded-lg border border-slate-800/80 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto scrollbar-thin">
                {selectedTemplate.templateContent}
              </pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              [대괄호]로 표시된 제품명, 가격, 가치 제안 부분을 자신의 서비스 정보로 변경하여 사용하세요.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
