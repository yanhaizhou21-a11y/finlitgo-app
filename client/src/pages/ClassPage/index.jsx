import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState("progress");

  const lessons = [
    { title: "Pengantar Literasi Keuangan", status: "done" },
    { title: "Mengelola Pemasukan & Pengeluaran", status: "done" },
    { title: "Dasar Menabung & Dana Darurat", status: "done" },
    { title: "Investasi untuk Pemula", status: "active" },
    { title: "Mengenal Saham & Reksa Dana", status: "locked" },
    { title: "Manajemen Risiko Keuangan", status: "locked" },
    { title: "Perencanaan Keuangan Jangka Panjang", status: "locked" },
  ];

  // Calculate progress percentage
  const completedLessons = lessons.filter(l => l.status === "done").length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const filteredLessons =
    activeTab === "completed"
      ? lessons.filter((lesson) => lesson.status === "done")
      : lessons;

  return (
    <div className="site-mockup-bg w-full min-h-screen text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 px-6 md:px-12 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Progress Belajar
            </h1>
          </div>
          <p className="text-gray-400 ml-4">
            Lanjutkan perjalanan literasi keuanganmu ✨
          </p>
        </div>

        {/* Tabs - Simplified */}
        <div className="flex gap-1 mb-8 bg-gray-900/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "progress"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
              }`}
          >
            Kelas Berjalan
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "completed"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
              }`}
          >
            Selesai
          </button>
        </div>

        {/* Main Course Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden">
          {/* Course Header */}
          <div className="p-6 md:p-8 border-b border-gray-800/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">

                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-md">
                    Level Pemula
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Financial Literacy
                </h2>
                <p className="text-gray-400 text-sm">
                  Belajar mengatur keuangan dengan bijak dari dasar hingga mahir
                </p>
              </div>

              <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                🚀 Masuk Kelas
              </button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="px-6 md:px-8 pt-6 pb-4 bg-gray-900/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm font-medium text-blue-400">
                {completedLessons} of {totalLessons} Completed
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="p-6 md:p-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
              Curriculum
            </h3>
            <div className="space-y-2">
              {filteredLessons.map((lesson, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${lesson.status === "active"
                    ? "bg-blue-500/10 border border-blue-500/30"
                    : "hover:bg-gray-800/50"
                    }`}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {lesson.status === "done" && (
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {lesson.status === "active" && (
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                    )}
                    {lesson.status === "locked" && (
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V8a4 4 0 00-8 0v3" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Lesson Title */}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${lesson.status === "locked"
                      ? "text-gray-500"
                      : lesson.status === "active"
                        ? "text-blue-400"
                        : "text-white"
                      }`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {lesson.status === "active" && "Current lesson"}
                      {lesson.status === "done" && "Completed"}
                      {lesson.status === "locked" && "Locked - Complete previous lessons"}
                    </p>
                  </div>

                  {/* Duration (placeholder) */}
                  <div className="flex-shrink-0">
                    <span className="text-xs text-gray-600">
                      {index + 1}/{filteredLessons.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Section */}
          <div className="mt-4 mx-6 md:mx-8 mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">🎓 Complete the Bootcamp</p>
                <p className="text-xs text-gray-500 mt-1">Get your certificate after finishing all lessons</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}