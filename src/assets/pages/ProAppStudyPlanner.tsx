
import React, { useEffect, useState } from "react";
// @ts-ignore: Suppress type error for missing declaration file
import AppNavigation from "../components/AppNavigation";

const ProAppStudyPlanner: React.FC = () => {
  const [pomodoroActive, setPomodoroActive] = useState<boolean>(false);
  const [pomodoroInterval, setPomodoroInterval] = useState<number>();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(25 * 60); // 25 minutes in seconds
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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
  // Handle Pomodoro timer
  useEffect(() => {
    if (pomodoroActive && pomodoroTime > 0) {
      const interval = setInterval(() => {
        setPomodoroTime((prevTime) => prevTime - 1);
      }, 1000);
      setPomodoroInterval(interval);
      return () => clearInterval(interval);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      if (pomodoroInterval) clearInterval(pomodoroInterval);
    }
    return () => {
      if (pomodoroInterval) clearInterval(pomodoroInterval);
    };
  }, [pomodoroActive, pomodoroTime]);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const togglePomodoro = () => {
    if (pomodoroActive) {
      setPomodoroActive(false);
      if (pomodoroInterval) clearInterval(pomodoroInterval);
    } else {
      setPomodoroActive(true);
      setPomodoroTime(25 * 60);
    }
  };
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  // Calculate Pomodoro progress percentage
  const pomodoroProgress = ((25 * 60 - pomodoroTime) / (25 * 60)) * 100;
  // Today's date
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = `${dayNames[today.getDay()]}, ${
    monthNames[today.getMonth()]
  } ${today.getDate()}`;
  // Task categories
  const categories = ["All", "Assignments", "Exams", "Readings", "Projects"];
  // Tasks data
  const tasks = [
    {
      id: 1,
      name: "Research Paper Draft",
      subject: "Advanced Economics",
      dueDate: "Apr 15, 2025",
      dueTime: "11:59 PM",
      progress: 65,
      priority: "high",
      category: "Assignments",
    },
    {
      id: 2,
      name: "Calculus Problem Set",
      subject: "Mathematics 201",
      dueDate: "Apr 13, 2025",
      dueTime: "3:00 PM",
      progress: 30,
      priority: "medium",
      category: "Assignments",
    },
    {
      id: 3,
      name: "Group Presentation",
      subject: "Business Ethics",
      dueDate: "Apr 18, 2025",
      dueTime: "9:30 AM",
      progress: 10,
      priority: "high",
      category: "Projects",
    },
    {
      id: 4,
      name: "Physics Midterm",
      subject: "Physics 101",
      dueDate: "Apr 20, 2025",
      dueTime: "2:00 PM",
      progress: 45,
      priority: "high",
      category: "Exams",
    },
    {
      id: 5,
      name: "Literature Review",
      subject: "English Literature",
      dueDate: "Apr 14, 2025",
      dueTime: "11:59 PM",
      progress: 80,
      priority: "medium",
      category: "Readings",
    },
  ];
  // Calendar data for the week
  const currentDate = new Date();
  const weekDays = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    weekDays.push({
      date: date.getDate(),
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
      hasEvent: [11, 13, 15].includes(date.getDate()),
      isToday: i === 0,
    });
  }
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
      {/* Quick Access Panel */}
      <div
        className={`fixed top-0 w-full bg-white z-40 px-4 pt-10 pb-4 shadow-md transition-transform duration-300 ${
          isPanelOpen
            ? "transform translate-y-0"
            : "transform -translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Quick Access</h3>
          <button
            onClick={togglePanel}
            className="text-gray-500 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            className={`p-3 rounded-lg flex flex-col items-center cursor-pointer ${
              pomodoroActive ? "bg-teal-100 text-teal-700" : "bg-gray-100"
            }`}
            onClick={togglePomodoro}
          >
            <i className="fas fa-clock text-xl mb-1"></i>
            <span className="text-xs">Pomodoro</span>
          </button>
          <button
            id="new-task-button"
            className="p-3 rounded-lg bg-gray-100 flex flex-col items-center cursor-pointer"
            onClick={() => {
              const modal = document.getElementById("new-task-modal");
              if (modal) modal.classList.remove("hidden");
            }}
          >
            <i className="fas fa-plus text-xl mb-1"></i>
            <span className="text-xs">New Task</span>
          </button>
          <button
            id="quick-note-button"
            className="p-3 rounded-lg bg-gray-100 flex flex-col items-center cursor-pointer"
            onClick={() => {
              const modal = document.getElementById("quick-note-modal");
              if (modal) modal.classList.remove("hidden");
            }}
          >
            <i className="fas fa-sticky-note text-xl mb-1"></i>
            <span className="text-xs">Quick Note</span>
          </button>
        </div>
      </div>
      {/* Pull Tab for Panel */}
      <div
        className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-white w-16 h-1 rounded-full cursor-pointer"
        onClick={togglePanel}
      ></div>
      {/* Main Content */}
      <div className="pt-14 pb-20 px-4">
        {/* Welcome Section */}
        <div className="mt-6 mb-5">
          <h1 className="text-2xl font-bold">Hello, Emily!</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </div>
        {/* Progress Tracker Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500 mb-1">Today's Tasks</div>
            <div className="text-md font-bold">3/5</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-teal-500 h-1.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500 mb-1">Study Streak</div>
            <div className="text-md font-bold">7 days</div>
            <div className="flex items-center mt-2">
              <i className="fas fa-fire text-orange-500"></i>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500 mb-1">XP Points</div>
            <div className="text-md font-bold">450</div>
            <div className="flex items-center mt-2">
              <i className="fas fa-star text-yellow-500"></i>
            </div>
          </div>
        </div>
        {/* Current Focus Section with Pomodoro */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-3">Current Focus</h2>
          <div className="flex items-center">
            <div className="relative w-16 h-16 mr-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={pomodoroActive ? "#0d9488" : "#9ca3af"}
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * pomodoroProgress) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {formatTime(pomodoroTime)}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Research Paper Draft</div>
              <div className="text-xs text-gray-500">Advanced Economics</div>
              <div className="mt-2">
                <button
                  onClick={togglePomodoro}
                  className={`text-xs px-3 py-1 rounded-full cursor-pointer !rounded-button ${
                    pomodoroActive
                      ? "bg-teal-100 text-teal-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {pomodoroActive ? "Pause" : "Start Focus"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Task Categories */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">My Tasks</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                id={`category-${category.toLowerCase()}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm whitespace-nowrap rounded-full cursor-pointer !rounded-button ${
                  category === selectedCategory
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* Task List */}
        <div className="space-y-3 mb-6">
          {tasks
            .filter(
              (task) =>
                selectedCategory === "All" || task.category === selectedCategory
            )
            .map((task) => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{task.name}</h3>
                    <p className="text-sm text-gray-500">{task.subject}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <i className="far fa-calendar-alt mr-1"></i> {task.dueDate}{" "}
                    • {task.dueTime}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs">{task.progress}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Calendar Preview */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Calendar</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">April 2025</div>
              <div className="text-xs text-blue-500 cursor-pointer">
                View All
              </div>
            </div>
            <div className="flex justify-between">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    day.isToday ? "text-blue-500 font-medium" : ""
                  }`}
                >
                  <div className="text-xs mb-1">{day.day}</div>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                      day.isToday ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {day.date}
                  </div>
                  {day.hasEvent && (
                    <div
                      className={`w-1 h-1 rounded-full mt-1 ${
                        day.isToday ? "bg-white" : "bg-blue-500"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div>
                  Calculus Exam{" "}
                  <span className="text-xs text-gray-500">• 9:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Button */}
      <button
        id="floating-new-task-button"
        className="fixed right-4 bottom-20 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer z-30 !rounded-button"
        onClick={() => {
          const modal = document.getElementById("new-task-modal");
          if (modal) modal.classList.remove("hidden");
        }}
      >
        <i className="fas fa-plus text-xl"></i>
      </button>
      {/* Quick Note Modal */}
      <div
        id="quick-note-modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div className="bg-white rounded-lg w-11/12 max-w-md p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Quick Note</h3>
            <button
              className="text-gray-500"
              onClick={() => {
                const modal = document.getElementById("quick-note-modal");
                if (modal) modal.classList.add("hidden");
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="note-title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="note-title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Note title"
              />
            </div>
            <div>
              <label
                htmlFor="note-content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <textarea
                id="note-content"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your note here..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 !rounded-button"
                onClick={() => {
                  const modal = document.getElementById("quick-note-modal");
                  if (modal) modal.classList.add("hidden");
                }}
              >
                Discard
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 !rounded-button"
                onClick={() => {
                  // Here you would normally handle saving the note
                  const titleInput = document.getElementById(
                    "note-title"
                  ) as HTMLInputElement;
                  const contentInput = document.getElementById(
                    "note-content"
                  ) as HTMLTextAreaElement;
                  if (
                    titleInput &&
                    contentInput &&
                    titleInput.value.trim() !== ""
                  ) {
                    // Create notification
                    const notification = document.createElement("div");
                    notification.className =
                      "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
                    notification.textContent = "Note saved successfully!";
                    document.body.appendChild(notification);
                    // Clear inputs
                    titleInput.value = "";
                    contentInput.value = "";
                    // Hide modal
                    const modal = document.getElementById("quick-note-modal");
                    if (modal) modal.classList.add("hidden");
                    // Remove notification after 3 seconds
                    setTimeout(() => {
                      document.body.removeChild(notification);
                    }, 3000);
                  }
                }}
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* New Task Modal */}
      <div
        id="new-task-modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div className="bg-white rounded-lg w-11/12 max-w-md p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Create New Task</h3>
            <button
              className="text-gray-500"
              onClick={() => {
                const modal = document.getElementById("new-task-modal");
                if (modal) modal.classList.add("hidden");
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="task-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Name
              </label>
              <input
                type="text"
                id="task-name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name"
              />
            </div>
            <div>
              <label
                htmlFor="task-subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="task-subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="task-due-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="task-due-date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="task-due-time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Time
                </label>
                <input
                  type="time"
                  id="task-due-time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority Level
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    className="form-radio text-red-500"
                  />
                  <span className="ml-2 text-sm">High</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    className="form-radio text-yellow-500"
                  />
                  <span className="ml-2 text-sm">Medium</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    className="form-radio text-green-500"
                  />
                  <span className="ml-2 text-sm">Low</span>
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="task-category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="task-category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill="%236B7280"/></svg>\')',
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="">Select a category</option>
                <option value="Assignments">Assignments</option>
                <option value="Exams">Exams</option>
                <option value="Readings">Readings</option>
                <option value="Projects">Projects</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 !rounded-button"
                onClick={() => {
                  const modal = document.getElementById("new-task-modal");
                  if (modal) modal.classList.add("hidden");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 !rounded-button"
                onClick={() => {
                  // Here you would normally handle the form submission
                  alert("Task added successfully!");
                  const modal = document.getElementById("new-task-modal");
                  if (modal) modal.classList.add("hidden");
                }}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Bottom Navigation */}
      <AppNavigation />
    </div>
  );
};
export default ProAppStudyPlanner;
