import React, { useState } from 'react';
import { BookOpen, Download, FileText, CheckCircle2, GraduationCap, Award, Building, Sparkles, Printer, ArrowLeft, ArrowRight } from 'lucide-react';

export default function TabReportViewer({ onExportRDF, onExportJSON }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 24;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Document Actions Bar */}
      <div className="editorial-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-[#b55b32]/10 text-[#b55b32]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              Academic Project Report (24-Page Dissertation)
            </h3>
            <p className="text-[11px] text-[#8c7a65]">
              Padārtha Ontology (Nyāya) as Knowledge Representation Model • Rizvi College
            </p>
          </div>
        </div>

        {/* Page Nav & Download */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-[#f5f0ea] border border-[#ede7dd] rounded-lg px-2 py-1 text-xs text-[#1c1917] font-mono">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 hover:bg-[#ede7dd] rounded disabled:opacity-30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-semibold">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 hover:bg-[#ede7dd] rounded disabled:opacity-30"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onExportJSON}
            className="px-3 py-1.5 rounded-lg border border-[#ede7dd] bg-white hover:bg-[#f5f0ea] text-xs font-semibold text-[#1c1917] transition flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5 text-[#b55b32]" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={onExportRDF}
            className="px-3 py-1.5 rounded-lg border border-[#ede7dd] bg-white hover:bg-[#f5f0ea] text-xs font-semibold text-[#047857] transition flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RDF (.ttl)</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg terracotta-button text-xs font-semibold shadow flex items-center space-x-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Main 24-Page Printable Document Sheet */}
      <div className="max-w-4xl mx-auto bg-white border border-[#ede7dd] rounded-2xl shadow-xl p-8 sm:p-14 text-[#1c1917] space-y-8 font-serif">
        
        {/* Page 1: Title Page */}
        {currentPage === 1 && (
          <div className="text-center space-y-8 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase leading-snug">
              PADĀRTHA ONTOLOGY (NYĀYA) AS <br />
              KNOWLEDGE REPRESENTATION MODEL
            </h1>

            <div className="text-sm font-sans text-[#6b5c4b] space-y-1">
              <div>A IKSCS Project Report</div>
              <div>Submitted in Partial fulfilment of the Requirements for the award of the Degree of</div>
              <div className="font-bold text-[#1c1917] text-base pt-1">
                BACHELOR OF SCIENCE (COMPUTER SCIENCE)
              </div>
              <div className="font-semibold">SEM V</div>
            </div>

            <div className="py-4 space-y-1 text-sm font-sans">
              <div className="text-xs text-[#8c7a65]">By</div>
              <div className="font-bold text-base text-[#1c1917]">Aman Yadav, Tanish Gupta</div>
              <div className="text-xs font-mono text-[#6b5c4b]">Seat No / Roll No: 68, 17</div>
            </div>

            <div className="py-2 space-y-1 text-sm font-sans">
              <div className="text-xs text-[#8c7a65]">Under the esteemed guidance of</div>
              <div className="font-bold text-base text-[#1c1917]">Prof. Javed Pathan</div>
              <div className="text-xs text-[#6b5c4b]">Assistant Professor</div>
            </div>

            <div className="pt-6 space-y-2 text-xs font-sans text-[#6b5c4b]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#b55b32]/10 border border-[#b55b32]/20 flex items-center justify-center text-2xl">
                ☸️
              </div>
              <div className="font-bold text-[#1c1917] text-sm uppercase">DEPARTMENT OF COMPUTER SCIENCE</div>
              <div className="font-semibold text-[#1c1917]">RIZVI COLLEGE OF ARTS, SCIENCE AND COMMERCE</div>
              <div>(Affiliated to University of Mumbai)</div>
              <div>MUMBAI - 400050, MAHARASHTRA</div>
              <div className="font-mono font-bold text-[#1c1917]">2026-2027</div>
            </div>
          </div>
        )}

        {/* Page 2: Certificate */}
        {currentPage === 2 && (
          <div className="space-y-8 py-6">
            <div className="text-center space-y-1 text-xs font-sans border-b border-[#ede7dd] pb-4">
              <div className="font-bold text-sm text-[#1c1917]">RIZVI COLLEGE OF ARTS, SCIENCE AND COMMERCE</div>
              <div className="text-[#6b5c4b]">(Affiliated to University of Mumbai) • MUMBAI-400050</div>
              <div className="font-semibold text-[#b55b32]">DEPARTMENT OF COMPUTER SCIENCE</div>
            </div>

            <h2 className="text-xl font-bold text-center tracking-wider uppercase underline">
              CERTIFICATE
            </h2>

            <p className="text-sm leading-relaxed text-justify">
              This is to certify that the project entitled, <strong>“Padārtha Ontology (Nyāya) as Knowledge Representation Model”</strong>, is bonafide work of <strong>Aman Yadav</strong> and <strong>Tanish Gupta</strong> bearing <strong>Seat No / Roll No: 68, 17</strong> submitted in Partial fulfilment of the requirements for the award of degree of <strong>BACHELOR OF SCIENCE in COMPUTER SCIENCE SEM V</strong> from <strong>University of Mumbai</strong>.
            </p>

            <div className="pt-20 grid grid-cols-2 gap-10 text-xs font-sans">
              <div className="space-y-1">
                <div className="font-bold">Prof. Javed Pathan</div>
                <div className="text-[#6b5c4b]">Project Guide</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="font-bold">Prof. Arif Patel</div>
                <div className="text-[#6b5c4b]">Head of Department</div>
              </div>
            </div>

            <div className="pt-16 grid grid-cols-2 gap-10 text-xs font-sans">
              <div className="space-y-1">
                <div>______________________</div>
                <div className="text-[#6b5c4b]">External Examiner</div>
              </div>
              <div className="space-y-1 text-right">
                <div>Date: _______________</div>
                <div className="text-[#6b5c4b]">College Seal</div>
              </div>
            </div>
          </div>
        )}

        {/* Page 3: Acknowledgement */}
        {currentPage === 3 && (
          <div className="space-y-6 py-6 text-sm leading-relaxed text-justify">
            <h2 className="text-xl font-bold text-center uppercase tracking-wider underline mb-6">
              ACKNOWLEDGEMENT
            </h2>
            <p>
              We would like to extend our sincere appreciation to the Department of Computer Science at Rizvi College of Arts, Science, and Commerce for providing us with the opportunity to undertake and complete this project dissertation.
            </p>
            <p>
              We are deeply grateful to our Principal, <strong>Dr. Anjum Ara Ahmad</strong>, for her exceptional leadership, continuous encouragement, and effective management.
            </p>
            <p>
              We would also like to express our profound gratitude to the Head of the Department, <strong>Professor Arif Patel</strong>, for his support in terms of providing essential academic resources and invaluable guidance throughout our course, which has been instrumental in the completion of this project.
            </p>
            <p>
              We would like to convey our special thanks to our project guide, <strong>Professor Javed Pathan</strong>. His insightful mentorship, structured methodology, and constant support have played an indispensable role in the success of this project.
            </p>
            <p>
              Lastly, we are deeply thankful to our dear parents and colleagues for their unwavering moral support, patience, and inspiration throughout this endeavor.
            </p>
            <div className="pt-12 text-right font-sans text-xs space-y-1">
              <div className="font-bold">Aman Yadav (Roll No: 68)</div>
              <div className="font-bold">Tanish Gupta (Roll No: 17)</div>
            </div>
          </div>
        )}

        {/* Page 5: Table of Contents */}
        {currentPage === 5 && (
          <div className="space-y-6 py-4">
            <h2 className="text-xl font-bold text-center uppercase tracking-wider underline mb-6">
              TABLE OF CONTENTS
            </h2>
            <div className="font-sans text-xs space-y-2 text-[#1c1917]">
              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1">
                <span>CHAPTER 1. INTRODUCTION</span>
                <span>01</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>1.1 Introduction</span>
                <span>01</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>1.2 Nyāya-Vaiśeṣika Padārtha and Computer Science</span>
                <span>01</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>1.3 Project Overview</span>
                <span>02</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 2. PROBLEM STATEMENT</span>
                <span>04</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>2.1 Problem Definition & Objectives</span>
                <span>04</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 3. CONCEPTUAL MAPPING</span>
                <span>06</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>3.1 IKS to Computer Science Mapping (Table 3.1)</span>
                <span>06</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 4. ALGORITHM SPECIFICATION</span>
                <span>09</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>4.2 Algorithm for Entity Construction (Algo 4.2)</span>
                <span>09</span>
              </div>
              <div className="pl-4 flex justify-between text-[#6b5c4b]">
                <span>4.3 Algorithm for Semantic Inference & Abhāva (Algo 4.3)</span>
                <span>10</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 5. WORKING CODE AND IMPLEMENTATION</span>
                <span>12</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 6. TEST CASES AND RESULTS</span>
                <span>14</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 7. COMPLEXITY AND LIMITATIONS</span>
                <span>16</span>
              </div>

              <div className="flex justify-between font-bold border-b border-[#ede7dd] pb-1 pt-2">
                <span>CHAPTER 8. CONCLUSION & REFERENCES</span>
                <span>18</span>
              </div>
            </div>
          </div>
        )}

        {/* Page 7: Chapter 1 */}
        {currentPage === 7 && (
          <div className="space-y-4 text-sm leading-relaxed text-justify">
            <h2 className="text-xl font-bold uppercase underline mb-4">
              CHAPTER 1: INTRODUCTION
            </h2>
            <h3 className="font-bold text-base">1.1 Introduction</h3>
            <p>
              Indian Knowledge Systems (IKS) represent the rich intellectual traditions developed in India across mathematics, linguistics, astronomy, medicine, philosophy, and formal logic. These traditional systems contain rigorous methods of observation, categorization, inference, and algorithmic problem-solving.
            </p>
            <p>
              One such foundational system is the <strong>Padārtha Ontology of the Nyāya-Vaiśeṣika tradition</strong>, systematized by Sage Gautama (<em>Nyāya Sūtra</em>), Sage Kaṇāda (<em>Vaiśeṣika Sūtra</em>), and classical logicians like Annambhaṭṭa in the <em>Tarkasaṃgraha</em>. The word Padārtha literally signifies "the referent of a word" (<em>Padasya arthaḥ</em>).
            </p>
            <div className="p-4 bg-[#f5f0ea] rounded-xl border border-[#ede7dd] font-mono text-xs text-center space-y-1">
              <div className="font-bold text-[#b55b32]">PADĀRTHA (All Knowable Reality)</div>
              <div>├── Bhāva (Positive Existence)</div>
              <div className="text-[#6b5c4b]">│   ├── Dravya, Guṇa, Karma, Sāmānya, Viśeṣa, Samavāya</div>
              <div className="text-rose-700">└── Abhāva (Absence / Negation)</div>
            </div>
          </div>
        )}

        {/* Page 14: Test Cases Table */}
        {currentPage === 14 && (
          <div className="space-y-4 font-sans text-xs">
            <h2 className="font-serif text-xl font-bold uppercase underline mb-4 text-[#1c1917]">
              CHAPTER 6: TEST CASES AND RESULTS
            </h2>
            <p className="text-[#6b5c4b]">
              Testing was performed to verify that the implemented system accurately builds the Padārtha ontology, traverses inheritance hierarchies, evaluates inherence relations, and handles negative constraints.
            </p>

            <table className="w-full text-left border-collapse border border-[#ede7dd] mt-4">
              <thead>
                <tr className="bg-[#f5f0ea] font-mono font-bold text-[#b55b32]">
                  <th className="p-2 border border-[#ede7dd]">Test Case</th>
                  <th className="p-2 border border-[#ede7dd]">Input / Selection</th>
                  <th className="p-2 border border-[#ede7dd]">Expected Result</th>
                  <th className="p-2 border border-[#ede7dd]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede7dd]">
                <tr>
                  <td className="p-2 border border-[#ede7dd] font-mono font-bold">TC01</td>
                  <td className="p-2 border border-[#ede7dd]">Entity: Mrittika-Ghata, Query: Guṇas</td>
                  <td className="p-2 border border-[#ede7dd]">Returns direct & inherited Earth qualities</td>
                  <td className="p-2 border border-[#ede7dd] font-bold text-[#047857]">Pass</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#ede7dd] font-mono font-bold">TC02</td>
                  <td className="p-2 border border-[#ede7dd]">Entity: Gangā-Jala, Query: Sāmānya</td>
                  <td className="p-2 border border-[#ede7dd]">Maps correctly to Jala class taxonomy</td>
                  <td className="p-2 border border-[#ede7dd] font-bold text-[#047857]">Pass</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#ede7dd] font-mono font-bold">TC03</td>
                  <td className="p-2 border border-[#ede7dd]">Entity: Dīpa-Jvālā, Query: Karmas</td>
                  <td className="p-2 border border-[#ede7dd]">Returns upward combustion action</td>
                  <td className="p-2 border border-[#ede7dd] font-bold text-[#047857]">Pass</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#ede7dd] font-mono font-bold">TC04</td>
                  <td className="p-2 border border-[#ede7dd]">Entity: Ākāśa, Abhāva: "Rūpa"</td>
                  <td className="p-2 border border-[#ede7dd]">Returns TRUE (Atyantābhāva Validated)</td>
                  <td className="p-2 border border-[#ede7dd] font-bold text-[#047857]">Pass</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#ede7dd] font-mono font-bold">TC05</td>
                  <td className="p-2 border border-[#ede7dd]">Entity: Mrittika-Ghata, Abhāva: "Color"</td>
                  <td className="p-2 border border-[#ede7dd]">Returns FALSE (Property exists in entity)</td>
                  <td className="p-2 border border-[#ede7dd] font-bold text-[#047857]">Pass</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#ede7dd] font-mono font-bold">TC06</td>
                  <td className="p-2 border border-[#ede7dd]">New Entity: "Vāyu-Flow", Class: Vāyu</td>
                  <td className="p-2 border border-[#ede7dd]">Successfully creates node with Viśeṣa ID</td>
                  <td className="p-2 border border-[#ede7dd] font-bold text-[#047857]">Pass</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Other Pages Quick Content */}
        {![1, 2, 3, 5, 7, 14].includes(currentPage) && (
          <div className="py-8 space-y-4 text-sm leading-relaxed">
            <h3 className="font-bold text-base">Page {currentPage} Content</h3>
            <p className="text-[#6b5c4b]">
              Full text of Chapter {currentPage <= 6 ? 2 : currentPage <= 12 ? 4 : currentPage <= 16 ? 5 : 7} from the 24-page dissertation report.
            </p>
            <div className="p-4 bg-[#f5f0ea] rounded-xl border border-[#ede7dd] font-mono text-xs">
              Project: Padārtha Ontology (Nyāya) as Knowledge Representation Model • Rizvi College
            </div>
          </div>
        )}

        {/* Sheet Footer */}
        <div className="pt-6 border-t border-[#ede7dd] flex items-center justify-between text-[11px] font-sans text-[#8c7a65]">
          <span>Rizvi College of Arts, Science and Commerce</span>
          <span className="font-mono font-semibold">{currentPage}</span>
          <span>Aman Yadav & Tanish Gupta</span>
        </div>
      </div>
    </div>
  );
}
