
import React, { useEffect, useState } from "react";
// @ts-ignore: Suppress type error for missing declaration file
import AppNavigation from "../components/AppNavigation";
const TasksManagementPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [completedFilter, setCompletedFilter] = useState<string>("all"); // 'all', 'completed', 'pending'

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

  // Interface for Task type
  interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    dueTime: string;
    priority: "High" | "Medium" | "Low";
    category: string;
    completed: boolean;
    reminder: boolean;
    createdAt: string;
  }

  // Tasks data
  const tasks: Task[] = [
    {
      id: 1,
      title: "Complete Economics Assignment",
      description:
        "Research and write a 5-page paper on the effects of inflation on developing economies.",
      dueDate: "Apr 12, 2025",
      dueTime: "11:59 PM",
      priority: "High",
      category: "School",
      completed: false,
      reminder: true,
      createdAt: "Apr 8, 2025",
    },
    {
      id: 2,
      title: "Study for Calculus Exam",
      description:
        "Review chapters 7-9, focus on integration techniques and applications.",
      dueDate: "Apr 14, 2025",
      dueTime: "09:00 AM",
      priority: "High",
      category: "School",
      completed: false,
      reminder: true,
      createdAt: "Apr 7, 2025",
    },
    {
      id: 3,
      title: "Prepare Physics Lab Report",
      description:
        "Analyze data from the pendulum experiment and write conclusions.",
      dueDate: "Apr 11, 2025",
      dueTime: "03:00 PM",
      priority: "Medium",
      category: "School",
      completed: false,
      reminder: false,
      createdAt: "Apr 9, 2025",
    },
    {
      id: 4,
      title: "Read Hamlet Act III",
      description:
        "Take notes on key themes and character development for class discussion.",
      dueDate: "Apr 13, 2025",
      dueTime: "08:00 PM",
      priority: "Medium",
      category: "Reading",
      completed: false,
      reminder: false,
      createdAt: "Apr 10, 2025",
    },
    {
      id: 5,
      title: "Implement Binary Search Tree",
      description:
        "Code a BST with insert, delete, and search functions for CS assignment.",
      dueDate: "Apr 15, 2025",
      dueTime: "11:59 PM",
      priority: "High",
      category: "Coding",
      completed: false,
      reminder: true,
      createdAt: "Apr 8, 2025",
    },
    {
      id: 6,
      title: "Buy Groceries",
      description: "Milk, eggs, bread, fruits, and vegetables for the week.",
      dueDate: "Apr 11, 2025",
      dueTime: "06:00 PM",
      priority: "Low",
      category: "Personal",
      completed: true,
      reminder: false,
      createdAt: "Apr 9, 2025",
    },
    {
      id: 7,
      title: "Schedule Dentist Appointment",
      description: "Call Dr. Smith's office for a routine checkup.",
      dueDate: "Apr 12, 2025",
      dueTime: "12:00 PM",
      priority: "Low",
      category: "Health",
      completed: true,
      reminder: false,
      createdAt: "Apr 7, 2025",
    },
    {
      id: 8,
      title: "Submit Research Proposal",
      description:
        "Finalize and submit the research proposal for the summer project.",
      dueDate: "Apr 10, 2025",
      dueTime: "05:00 PM",
      priority: "High",
      category: "Research",
      completed: true,
      reminder: true,
      createdAt: "Apr 5, 2025",
    },
  ];

  // Filter tasks based on search query, active filter, and completion status
  useEffect(() => {
    let result = tasks;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category/time filter
    if (activeFilter !== "All") {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      switch (activeFilter) {
        case "Today":
          result = result.filter((task) => {
            const taskDate = new Date(task.dueDate);
            const taskDateStr = `${taskDate.getFullYear()}-${String(
              taskDate.getMonth() + 1
            ).padStart(2, "0")}-${String(taskDate.getDate()).padStart(2, "0")}`;
            return taskDateStr === todayStr;
          });
          break;
        case "Upcoming":
          result = result.filter((task) => {
            const taskDate = new Date(task.dueDate);
            return taskDate > today;
          });
          break;
        case "Completed":
          result = result.filter((task) => task.completed);
          break;
        case "High":
          result = result.filter((task) => task.priority === "High");
          break;
        case "Medium":
          result = result.filter((task) => task.priority === "Medium");
          break;
        case "Low":
          result = result.filter((task) => task.priority === "Low");
          break;
        default:
          // If it's a category name
          result = result.filter((task) => task.category === activeFilter);
      }
    }

    // Apply completion status filter
    if (completedFilter !== "all") {
      result = result.filter((task) =>
        completedFilter === "completed" ? task.completed : !task.completed
      );
    }

    setFilteredTasks(result);
  }, [searchQuery, activeFilter, completedFilter]);

  // Get unique categories for filter
  const categories = [
    "All",
    "Today",
    "Upcoming",
    "Completed",
    "High",
    "Medium",
    "Low",
    ...Array.from(new Set(tasks.map((task) => task.category))),
  ];

  // Handle task click
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedTasks = filteredTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setFilteredTasks(updatedTasks);
  };

  // Group tasks by due date
  const getTasksByDueDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(
      tomorrow.getMonth() + 1
    ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

    const overdue: Task[] = [];
    const todayTasks: Task[] = [];
    const tomorrowTasks: Task[] = [];
    const thisWeekTasks: Task[] = [];
    const laterTasks: Task[] = [];

    filteredTasks.forEach((task) => {
      const taskDate = new Date(task.dueDate);
      const taskDateStr = `${taskDate.getFullYear()}-${String(
        taskDate.getMonth() + 1
      ).padStart(2, "0")}-${String(taskDate.getDate()).padStart(2, "0")}`;

      if (taskDate < today && !task.completed) {
        overdue.push(task);
      } else if (taskDateStr === todayStr) {
        todayTasks.push(task);
      } else if (taskDateStr === tomorrowStr) {
        tomorrowTasks.push(task);
      } else if (taskDate <= new Date(today.setDate(today.getDate() + 7))) {
        thisWeekTasks.push(task);
      } else {
        laterTasks.push(task);
      }
    });

    return {
      overdue,
      today: todayTasks,
      tomorrow: tomorrowTasks,
      thisWeek: thisWeekTasks,
      later: laterTasks,
    };
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    const colorMap: { [key: string]: string } = {
      High: "bg-red-500",
      Medium: "bg-yellow-500",
      Low: "bg-green-500",
    };
    return colorMap[priority] || "bg-gray-500";
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      School: "bg-blue-500",
      Work: "bg-purple-500",
      Personal: "bg-green-500",
      Health: "bg-pink-500",
      Coding: "bg-indigo-500",
      Reading: "bg-yellow-500",
      Research: "bg-orange-500",
    };
    return colorMap[category] || "bg-gray-500";
  };

  const groupedTasks = getTasksByDueDate();

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
        <a
          href="https://readdy.ai/home/39967d5a-20e4-4a5b-850b-f2b22a95e313/d0f7ff82-f86e-4303-864b-b739a4b4f48b"
          data-readdy="true"
          className="text-gray-600 cursor-pointer"
        >
          <i className="fas fa-arrow-left text-lg"></i>
        </a>
        <h1 className="text-xl font-bold">Tasks</h1>
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
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
            >
              <i className="fas fa-sort mr-3 text-gray-500"></i>
              Sort tasks
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
              <i className="fas fa-filter mr-3 text-gray-500"></i>
              Filter options
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
              <i className="fas fa-check-square mr-3 text-gray-500"></i>
              Select multiple
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
              <i className="fas fa-cog mr-3 text-gray-500"></i>
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="fixed top-24 w-full bg-white z-30 px-4 py-3 shadow-sm">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search tasks..."
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

        {/* Status Filter */}
        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => setCompletedFilter("all")}
            className={`px-3 py-1 text-sm rounded-full cursor-pointer !rounded-button ${
              completedFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCompletedFilter("pending")}
            className={`px-3 py-1 text-sm rounded-full cursor-pointer !rounded-button ${
              completedFilter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setCompletedFilter("completed")}
            className={`px-3 py-1 text-sm rounded-full cursor-pointer !rounded-button ${
              completedFilter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1 text-sm rounded-full cursor-pointer whitespace-nowrap !rounded-button ${
                  activeFilter === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-56 pb-20 px-4">
        {filteredTasks.length > 0 ? (
          <div className="space-y-6">
            {/* Overdue Tasks */}
            {groupedTasks.overdue.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-red-500 mb-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  Overdue
                </h2>
                <div className="space-y-3">
                  {groupedTasks.overdue.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border-l-4 border-red-500"
                    >
                      <div className="flex items-start">
                        <div
                          className="mr-3 mt-1 cursor-pointer"
                          onClick={(e) => toggleTaskCompletion(task.id, e)}
                        >
                          {task.completed ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-base font-medium ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center">
                              {task.reminder && (
                                <i className="fas fa-bell text-yellow-500 mr-2"></i>
                              )}
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full text-white ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p
                            className={`text-sm text-gray-600 mt-1 line-clamp-2 ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full text-white ${getCategoryColor(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                            <div className="text-xs text-red-500 font-medium flex items-center">
                              <i className="fas fa-clock mr-1"></i>
                              {task.dueDate}, {task.dueTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Today's Tasks */}
            {groupedTasks.today.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-500 mb-2 flex items-center">
                  <i className="fas fa-calendar-day mr-2"></i>
                  Today
                </h2>
                <div className="space-y-3">
                  {groupedTasks.today.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border-l-4 border-blue-500"
                    >
                      <div className="flex items-start">
                        <div
                          className="mr-3 mt-1 cursor-pointer"
                          onClick={(e) => toggleTaskCompletion(task.id, e)}
                        >
                          {task.completed ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-base font-medium ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center">
                              {task.reminder && (
                                <i className="fas fa-bell text-yellow-500 mr-2"></i>
                              )}
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full text-white ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p
                            className={`text-sm text-gray-600 mt-1 line-clamp-2 ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full text-white ${getCategoryColor(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                            <div className="text-xs text-gray-500 font-medium flex items-center">
                              <i className="fas fa-clock mr-1"></i>
                              {task.dueTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tomorrow's Tasks */}
            {groupedTasks.tomorrow.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-500 mb-2 flex items-center">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Tomorrow
                </h2>
                <div className="space-y-3">
                  {groupedTasks.tomorrow.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border-l-4 border-purple-500"
                    >
                      <div className="flex items-start">
                        <div
                          className="mr-3 mt-1 cursor-pointer"
                          onClick={(e) => toggleTaskCompletion(task.id, e)}
                        >
                          {task.completed ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-base font-medium ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center">
                              {task.reminder && (
                                <i className="fas fa-bell text-yellow-500 mr-2"></i>
                              )}
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full text-white ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p
                            className={`text-sm text-gray-600 mt-1 line-clamp-2 ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full text-white ${getCategoryColor(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                            <div className="text-xs text-gray-500 font-medium flex items-center">
                              <i className="fas fa-clock mr-1"></i>
                              {task.dueTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* This Week's Tasks */}
            {groupedTasks.thisWeek.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-green-500 mb-2 flex items-center">
                  <i className="fas fa-calendar-week mr-2"></i>
                  This Week
                </h2>
                <div className="space-y-3">
                  {groupedTasks.thisWeek.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border-l-4 border-green-500"
                    >
                      <div className="flex items-start">
                        <div
                          className="mr-3 mt-1 cursor-pointer"
                          onClick={(e) => toggleTaskCompletion(task.id, e)}
                        >
                          {task.completed ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-base font-medium ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center">
                              {task.reminder && (
                                <i className="fas fa-bell text-yellow-500 mr-2"></i>
                              )}
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full text-white ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p
                            className={`text-sm text-gray-600 mt-1 line-clamp-2 ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full text-white ${getCategoryColor(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                            <div className="text-xs text-gray-500 font-medium flex items-center">
                              <i className="fas fa-calendar-day mr-1"></i>
                              {task.dueDate}, {task.dueTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Later Tasks */}
            {groupedTasks.later.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-500 mb-2 flex items-center">
                  <i className="fas fa-hourglass-half mr-2"></i>
                  Later
                </h2>
                <div className="space-y-3">
                  {groupedTasks.later.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border-l-4 border-gray-400"
                    >
                      <div className="flex items-start">
                        <div
                          className="mr-3 mt-1 cursor-pointer"
                          onClick={(e) => toggleTaskCompletion(task.id, e)}
                        >
                          {task.completed ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-base font-medium ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center">
                              {task.reminder && (
                                <i className="fas fa-bell text-yellow-500 mr-2"></i>
                              )}
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full text-white ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p
                            className={`text-sm text-gray-600 mt-1 line-clamp-2 ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full text-white ${getCategoryColor(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                            <div className="text-xs text-gray-500 font-medium flex items-center">
                              <i className="fas fa-calendar-day mr-1"></i>
                              {task.dueDate}, {task.dueTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-32 h-32 mb-4 text-gray-300 flex items-center justify-center">
              <i className="fas fa-tasks text-6xl"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Tasks Found
            </h3>
            <p className="text-gray-500 text-center mb-4">
              {searchQuery
                ? "No tasks match your search criteria."
                : "Create your first task to get started with organizing your work."}
            </p>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
            >
              <i className="fas fa-plus mr-2"></i>
              Create New Task
            </button>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-h-[80%] overflow-y-auto animate-slide-up">
            {/* Delete Confirmation Modal */}
            <div
              id="delete-confirmation-modal"
              className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center hidden"
            >
              <div className="bg-white rounded-lg w-[80%] max-w-sm p-5 animate-fade-in shadow-lg">
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                  Are you sure you want to delete this task?
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
                      document
                        .getElementById("delete-confirmation-modal")
                        ?.classList.add("hidden");
                      setShowTaskDetails(false);
                      setFilteredTasks(
                        filteredTasks.filter(
                          (task) => task.id !== selectedTask.id
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
                  Sort Tasks By
                </h3>
                <div className="space-y-3 mb-5">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="due-date-asc"
                      defaultChecked
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Due Date (Earliest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="due-date-desc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Due Date (Latest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="priority-desc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Priority (High to Low)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="priority-asc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Priority (Low to High)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="title-asc"
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
                      value="created-desc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Created (Newest)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort-option"
                      value="created-asc"
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Created (Oldest)
                    </span>
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
                <div className="flex items-center">
                  <div
                    className="mr-3 cursor-pointer"
                    onClick={() => {
                      const updatedTask = {
                        ...selectedTask,
                        completed: !selectedTask.completed,
                      };
                      setSelectedTask(updatedTask);
                      setFilteredTasks(
                        filteredTasks.map((task) =>
                          task.id === selectedTask.id ? updatedTask : task
                        )
                      );
                    }}
                  >
                    {selectedTask.completed ? (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      selectedTask.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {selectedTask.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowTaskDetails(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={`px-2 py-1 text-sm rounded-full text-white ${getPriorityColor(
                      selectedTask.priority
                    )}`}
                  >
                    {selectedTask.priority} Priority
                  </span>
                  <span
                    className={`px-2 py-1 text-sm rounded-full text-white ${getCategoryColor(
                      selectedTask.category
                    )}`}
                  >
                    {selectedTask.category}
                  </span>
                  {selectedTask.reminder && (
                    <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                      <i className="fas fa-bell mr-1 text-yellow-500"></i>
                      Reminder
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <i className="fas fa-calendar-alt mr-2 text-blue-500"></i>
                    <span className="font-medium">Due Date:</span>
                    <span className="ml-2">
                      {selectedTask.dueDate}, {selectedTask.dueTime}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fas fa-clock mr-2 text-green-500"></i>
                    <span className="font-medium">Created:</span>
                    <span className="ml-2">{selectedTask.createdAt}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedTask.description}
                  </p>
                </div>

                <div className="flex space-x-2 pt-4" id="task-action-buttons">
                  <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button">
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-h-[80%] overflow-y-auto animate-slide-up">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Create New Task</h3>
                <button
                  onClick={() => setShowAddTask(false)}
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
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Enter task description"
                  ></textarea>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Due Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    <label className="flex-1 flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value="Low"
                        className="mr-2"
                      />
                      <span className="text-sm">Low</span>
                    </label>
                    <label className="flex-1 flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value="Medium"
                        className="mr-2"
                      />
                      <span className="text-sm">Medium</span>
                    </label>
                    <label className="flex-1 flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value="High"
                        className="mr-2"
                      />
                      <span className="text-sm">High</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Category
                  </label>
                  <div className="relative">
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-8">
                      <option value="">Select a category</option>
                      {Array.from(
                        new Set(tasks.map((task) => task.category))
                      ).map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="new">+ Add new category</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="block w-10 h-6 bg-gray-300 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition"></div>
                    </div>
                    <div className="ml-3 text-sm font-medium text-gray-700">
                      Set Reminder
                    </div>
                  </label>
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Add new task logic would go here
                      setShowAddTask(false);
                    }}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddTask(true)}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Toggle switch */
        input:checked ~ .dot {
          transform: translateX(100%);
        }
        input:checked ~ .block {
          background-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default TasksManagementPage;
