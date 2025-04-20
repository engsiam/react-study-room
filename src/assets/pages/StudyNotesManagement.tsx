import React, { useEffect, useState } from "react";
// @ts-ignore: Suppress type error for missing declaration file
import AppNavigation from "../components/AppNavigation"; 
import { useNavigate } from "react-router-dom";
const StudyNotesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSubject, setActiveSubject] = useState<string>("All");
  const [showCreateNote, setShowCreateNote] = useState<boolean>(false);
  const [showNoteDetails, setShowNoteDetails] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("header-dropdown-menu");
      const button = document.getElementById("header-menu-button");
      if (menu && button && !menu.classList.contains("hidden")) {
        if (
          !menu.contains(event.target as Node) &&
          !button.contains(event.target as Node)
        ) {
          menu.classList.add("hidden");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Get current time for status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  // Interface for Note type
  interface Note {
    id: number;
    title: string;
    subject: string;
    content: string;
    dateCreated: string;
    lastEdited: string;
    color: string;
  }
  // Notes data
  const notes: Note[] = [
    {
      id: 1,
      title: "Macroeconomic Theory Key Concepts",
      subject: "Economics",
      content:
        "1. Aggregate Demand (AD): The total demand for final goods and services in an economy. It's the sum of consumption, investment, government spending, and net exports.\n\n2. Aggregate Supply (AS): The total supply of goods and services produced within an economy at a given price level.\n\n3. Fiscal Policy: Government's use of taxation and spending to influence the economy.",
      dateCreated: "Apr 5, 2025",
      lastEdited: "Apr 10, 2025",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Calculus Integration Techniques",
      subject: "Mathematics",
      content:
        "Integration by Parts: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx\n\nSubstitution Method: If u = g(x), then ∫f(g(x))g'(x)dx = ∫f(u)du\n\nPartial Fractions: Used for integrating rational functions by decomposing them into simpler fractions.",
      dateCreated: "Apr 2, 2025",
      lastEdited: "Apr 8, 2025",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Quantum Physics Fundamentals",
      subject: "Physics",
      content:
        "Wave-Particle Duality: Light and matter exhibit properties of both waves and particles.\n\nHeisenberg Uncertainty Principle: It is impossible to simultaneously know both the position and momentum of a particle with perfect precision.\n\nSchrödinger Equation: Describes how the quantum state of a physical system changes over time.",
      dateCreated: "Mar 28, 2025",
      lastEdited: "Apr 9, 2025",
      color: "bg-purple-100",
    },
    {
      id: 4,
      title: "Shakespeare's Hamlet Analysis",
      subject: "Literature",
      content:
        "Themes: Revenge, Madness, Corruption, and Mortality\n\nSymbolism: Yorick's skull represents the inevitability of death. The poisoned cup symbolizes corruption.\n\nHamlet's Character: Intelligent, philosophical, indecisive, and melancholic. His famous soliloquy 'To be or not to be' explores the meaning of existence.",
      dateCreated: "Apr 7, 2025",
      lastEdited: "Apr 11, 2025",
      color: "bg-yellow-100",
    },
    {
      id: 5,
      title: "Data Structures: Trees and Graphs",
      subject: "Computer Science",
      content:
        "Binary Search Tree: A tree data structure where each node has at most two children, and all nodes to the left of a parent are less than the parent, while all nodes to the right are greater.\n\nGraph Traversal: BFS (Breadth-First Search) uses a queue to explore all neighbors at the current depth before moving to nodes at the next depth level. DFS (Depth-First Search) uses a stack to explore as far as possible along each branch before backtracking.",
      dateCreated: "Mar 30, 2025",
      lastEdited: "Apr 6, 2025",
      color: "bg-red-100",
    },
    {
      id: 6,
      title: "Cell Biology: Mitochondria Function",
      subject: "Biology",
      content:
        "Mitochondria are the powerhouses of the cell, responsible for producing ATP through cellular respiration. The process involves several stages: glycolysis, pyruvate oxidation, the citric acid cycle, and oxidative phosphorylation. The inner membrane of mitochondria is folded into cristae to increase surface area for ATP production.",
      dateCreated: "Apr 8, 2025",
      lastEdited: "Apr 10, 2025",
      color: "bg-pink-100",
    },
  ];
  // Filter notes based on search query and active subject
  useEffect(() => {
    let result = notes;
    if (searchQuery) {
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeSubject !== "All") {
      result = result.filter((note) => note.subject === activeSubject);
    }
  
    // Prevent unnecessary state updates
    if (JSON.stringify(result) !== JSON.stringify(filteredNotes)) {
      setFilteredNotes(result);
    }
  }, [searchQuery, activeSubject, notes, filteredNotes]);
  // Get unique subjects for filter
  const subjects = [
    "All",
    ...Array.from(new Set(notes.map((note) => note.subject))),
  ];
  // Handle note click
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setShowNoteDetails(true);
  };
  // Get color for subject tag
  const getSubjectColor = (subject: string): string => {
    const colorMap: { [key: string]: string } = {
      Economics: "bg-blue-500",
      Mathematics: "bg-green-500",
      Physics: "bg-purple-500",
      Literature: "bg-yellow-500",
      "Computer Science": "bg-red-500",
      Biology: "bg-pink-500",
    };
    return colorMap[subject] || "bg-gray-500";
  };
  return (
    <div className="relative bg-gray-50 text-gray-800 font-sans min-h-screen overflow-x-hidden">
      {/* Status Bar */}
      <div className="fixed top-0 w-full bg-white z-50 px-4 py-2 flex justify-between items-center shadow-sm">
        <div className="text-sm font-medium">{currentTime}</div>
        <div className="flex space-x-2">
          <i className="fas fa-wifi"></i>
          <i className="fas fa-battery-three-quarters"></i>
        </div>
      </div>
      {/* Header */}
      <div className="fixed top-10 w-full bg-white z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <span onClick={ ()=> navigate(-1 ) }
          className="text-gray-600 cursor-pointer"
        >
          <i className="fas fa-arrow-left text-lg"></i>
        </span>
        <h1 className="text-xl font-bold">Notes</h1>
        <div className="relative">
          <button
            id="header-menu-button"
            className="text-gray-600 cursor-pointer"
            onClick={() => {
              const menu = document.getElementById("header-dropdown-menu");
              if (menu) {
                menu.classList.toggle("hidden");
              }
            }}
          >
            <i className="fas fa-ellipsis-v text-lg"></i>
          </button>
          <div
            id="header-dropdown-menu"
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 hidden"
          >
            <button
              onClick={() => {
                document
                  .getElementById("sort-options-modal")
                  ?.classList.remove("hidden");
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <i className="fas fa-sort mr-3 text-gray-500"></i>
              Sort notes
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <i className="fas fa-th-large mr-3 text-gray-500"></i>
              View mode
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <i className="fas fa-file-export mr-3 text-gray-500"></i>
              Export notes
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <i className="fas fa-file-import mr-3 text-gray-500"></i>
              Import notes
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <i className="fas fa-check-square mr-3 text-gray-500"></i>
              Select multiple
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <i className="fas fa-cog mr-3 text-gray-500"></i>
              Settings
            </button>
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="fixed top-24 w-full bg-white z-30 px-4 py-3 shadow-sm">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        {/* Subject Filter */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 w-max">
            {subjects.map((subject, index) => (
              <button
                key={index}
                onClick={() => setActiveSubject(subject)}
                className={`px-3 py-1 text-sm rounded-full cursor-pointer whitespace-nowrap !rounded-button ${
                  activeSubject === subject
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="pt-48 pb-20 px-4">
        {filteredNotes.length > 0 ? (
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteClick(note)}
                className={`p-4 rounded-lg shadow-sm cursor-pointer ${note.color} transition-transform duration-200 transform hover:scale-[1.01]`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{note.title}</h3>
                  <button className="text-gray-500 cursor-pointer">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full text-white ${getSubjectColor(
                      note.subject
                    )}`}
                  >
                    {note.subject}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    Created: {note.dateCreated}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-32 h-32 mb-4 text-gray-300 flex items-center justify-center">
              <i className="fas fa-sticky-note text-6xl"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Notes Yet
            </h3>
            <p className="text-gray-500 text-center mb-4">
              Create your first note to get started with organizing your study
              materials.
            </p>
            <button
              onClick={() => setShowCreateNote(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
            >
              <i className="fas fa-plus mr-2"></i>
              Create New Note
            </button>
          </div>
        )}
      </div>
      {/* Note Detail Bottom Sheet */}
      {showNoteDetails && selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-h-[80%] overflow-y-auto animate-slide-up">
            {/* Delete Confirmation Modal */}
            <div
              id="delete-confirmation-modal"
              className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
            >
              <div className="bg-white rounded-lg w-[80%] max-w-sm p-5 animate-fade-in shadow-lg">
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                  Are you sure you want to delete this note?
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      document
                        .getElementById("delete-confirmation-modal")
                        ?.classList.add("hidden");
                    }}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Here you would typically delete the note from your state/database
                      document
                        .getElementById("delete-confirmation-modal")
                        ?.classList.add("hidden");
                      setShowNoteDetails(false);
                      // In a real app, you would filter out the deleted note
                      setFilteredNotes(
                        filteredNotes.filter(
                          (note) => note.id !== selectedNote.id
                        )
                      );
                    }}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            {/* Sort Options Modal */}
            <div
              id="sort-options-modal"
              className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center hidden"
            >
              <div className="bg-white rounded-lg w-[90%] max-w-sm p-5 animate-fade-in shadow-lg">
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                  Sort Notes By
                </h3>
                <div className="space-y-3 mb-5">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="title-asc"
                      defaultChecked
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">Title (A-Z)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="title-desc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">Title (Z-A)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="date-created-desc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Date Created (Newest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="date-created-asc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Date Created (Oldest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="last-edited-desc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Last Edited (Newest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="last-edited-asc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Last Edited (Oldest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="subject"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">Subject</span>
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      document
                        .getElementById("sort-options-modal")
                        ?.classList.add("hidden");
                    }}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Get the selected sort option
                      const selectedOption = document.querySelector(
                        'input[name="sort-option"]:checked'
                      ) as HTMLInputElement;
                      if (selectedOption) {
                        const sortValue = selectedOption.value;
                        // Here you would implement the actual sorting logic based on the selected option
                        const sortedNotes = [...filteredNotes];
                        switch (sortValue) {
                          case "title-asc":
                            sortedNotes.sort((a, b) =>
                              a.title.localeCompare(b.title)
                            );
                            break;
                          case "title-desc":
                            sortedNotes.sort((a, b) =>
                              b.title.localeCompare(a.title)
                            );
                            break;
                          case "date-created-desc":
                            sortedNotes.sort(
                              (a, b) =>
                                new Date(b.dateCreated).getTime() -
                                new Date(a.dateCreated).getTime()
                            );
                            break;
                          case "date-created-asc":
                            sortedNotes.sort(
                              (a, b) =>
                                new Date(a.dateCreated).getTime() -
                                new Date(b.dateCreated).getTime()
                            );
                            break;
                          case "last-edited-desc":
                            sortedNotes.sort(
                              (a, b) =>
                                new Date(b.lastEdited).getTime() -
                                new Date(a.lastEdited).getTime()
                            );
                            break;
                          case "last-edited-asc":
                            sortedNotes.sort(
                              (a, b) =>
                                new Date(a.lastEdited).getTime() -
                                new Date(b.lastEdited).getTime()
                            );
                            break;
                          case "subject":
                            sortedNotes.sort((a, b) =>
                              a.subject.localeCompare(b.subject)
                            );
                            break;
                        }
                        setFilteredNotes(sortedNotes);
                      }
                      document
                        .getElementById("sort-options-modal")
                        ?.classList.add("hidden");
                    }}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedNote.title}</h3>
                <button
                  onClick={() => setShowNoteDetails(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full text-white ${getSubjectColor(
                      selectedNote.subject
                    )}`}
                  >
                    {selectedNote.subject}
                  </span>
                  <div className="text-xs text-gray-500">
                    Last edited: {selectedNote.lastEdited}
                  </div>
                </div>
                <div className="border-t border-b py-4">
                  <p
                    className="text-gray-700 whitespace-pre-line"
                    id="note-content-display"
                  >
                    {selectedNote.content}
                  </p>
                  <div className="hidden" id="note-edit-form">
                    <div className="mb-3">
                      <label className="text-sm text-gray-500 mb-1 block">
                        Title
                      </label>
                      <input
                        type="text"
                        id="edit-note-title"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={selectedNote.title}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-sm text-gray-500 mb-1 block">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          id="edit-note-subject"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-8"
                          defaultValue={selectedNote.subject}
                        >
                          {subjects
                            .filter((s) => s !== "All")
                            .map((subject, index) => (
                              <option key={index} value={subject}>
                                {subject}
                              </option>
                            ))}
                          <option value="new">+ Add new subject</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-sm text-gray-500 mb-1 block">
                        Content
                      </label>
                      <textarea
                        id="edit-note-content"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                        defaultValue={selectedNote.content}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4" id="note-action-buttons">
                  <button
                    id="edit-note-button"
                    onClick={() => {
                      document
                        .getElementById("note-content-display")
                        ?.classList.add("hidden");
                      document
                        .getElementById("note-edit-form")
                        ?.classList.remove("hidden");
                      document
                        .getElementById("note-action-buttons")
                        ?.classList.add("hidden");
                      document
                        .getElementById("note-edit-action-buttons")
                        ?.classList.remove("hidden");
                    }}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit
                  </button>
                  <button className="flex-1 py-2 bg-green-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button">
                    <i className="fas fa-share-alt mr-2"></i>
                    Share
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      document
                        .getElementById("delete-confirmation-modal")
                        ?.classList.remove("hidden");
                    }}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Delete
                  </button>
                </div>
                <div
                  className="flex space-x-2 pt-4"
                  id="note-edit-action-buttons"
                >
                  <button
                    onClick={() => {
                      document
                        .getElementById("note-content-display")
                        ?.classList.remove("hidden");
                      document
                        .getElementById("note-edit-form")
                        ?.classList.add("hidden");
                      document
                        .getElementById("note-action-buttons")
                        ?.classList.remove("hidden");
                      document
                        .getElementById("note-edit-action-buttons")
                        ?.classList.add("hidden");
                    }}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Here you would typically update the note with the edited values
                      const updatedTitle = (
                        document.getElementById(
                          "edit-note-title"
                        ) as HTMLInputElement
                      )?.value;
                      const updatedSubject = (
                        document.getElementById(
                          "edit-note-subject"
                        ) as HTMLSelectElement
                      )?.value;
                      const updatedContent = (
                        document.getElementById(
                          "edit-note-content"
                        ) as HTMLTextAreaElement
                      )?.value;
                      if (
                        selectedNote &&
                        updatedTitle &&
                        updatedSubject &&
                        updatedContent
                      ) {
                        // In a real app, you would update the note in your state/database
                        setSelectedNote({
                          ...selectedNote,
                          title: updatedTitle,
                          subject: updatedSubject,
                          content: updatedContent,
                          lastEdited: "Apr 11, 2025", // Today's date
                        });
                      }
                      document
                        .getElementById("note-content-display")
                        ?.classList.remove("hidden");
                      document
                        .getElementById("note-edit-form")
                        ?.classList.add("hidden");
                      document
                        .getElementById("note-action-buttons")
                        ?.classList.remove("hidden");
                      document
                        .getElementById("note-edit-action-buttons")
                        ?.classList.add("hidden");
                    }}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Create Note Bottom Sheet */}
      {showCreateNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-h-[80%] overflow-y-auto animate-slide-up">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Create New Note</h3>
                <button
                  onClick={() => setShowCreateNote(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Subject
                  </label>
                  <div className="relative">
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-8">
                      <option value="">Select a subject</option>
                      {subjects
                        .filter((s) => s !== "All")
                        .map((subject, index) => (
                          <option key={index} value={subject}>
                            {subject}
                          </option>
                        ))}
                      <option value="new">+ Add new subject</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Content
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                    placeholder="Write your note here..."
                  ></textarea>
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => setShowCreateNote(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Add new note logic would go here
                      setShowCreateNote(false);
                    }}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreateNote(true)}
        className="fixed right-4 bottom-20 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer z-30 !rounded-button"
      >
        <i className="fas fa-plus text-xl"></i>
      </button>
      {/* Bottom Navigation */}
      <AppNavigation />
      {/* CSS for animations */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
export default StudyNotesManagement;
