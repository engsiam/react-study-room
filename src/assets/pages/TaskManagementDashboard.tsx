import React, { useEffect, useState } from "react";
// @ts-ignore: Suppress type error for missing declaration file
import AppNavigation from "../components/AppNavigation";
import { useNavigate } from "react-router-dom";

const TaskManagementDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>("");
  // const [activeTab, setActiveTab] = useState<string>("tasks");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedDueDate, setSelectedDueDate] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("dueDate-asc");
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const kanbanRef = useRef<HTMLDivElement>(null);
  // Setup drag and drop for kanban view
  useEffect(() => {
    if (viewMode === "kanban" && !isLoading) {
      const columns = document.querySelectorAll(".kanban-column");
      columns.forEach((column) => {
        column.addEventListener("dragover", (e: Event) => {
          e.preventDefault();
          const dragEvent = e as DragEvent;
          dragEvent.dataTransfer!.dropEffect = "move";
          (e.currentTarget as HTMLElement).classList.add("bg-blue-50");
        });
        column.addEventListener("dragleave", (e: Event) => {
          (e.currentTarget as HTMLElement).classList.remove("bg-blue-50");
        });
        column.addEventListener("drop", (e: Event) => {
          e.preventDefault();
          const dragEvent = e as DragEvent;
          const taskId = dragEvent.dataTransfer!.getData("text/plain");
          (e.currentTarget as HTMLElement).classList.remove("bg-blue-50");
          // In a real app, this would update the task's category
          console.log(
            `Moving task ${taskId} to ${column.id.replace("kanban-", "")}`
          );
          // Visual feedback for the demo
          const notification = document.createElement("div");
          notification.className =
            "fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
          notification.textContent = `Task moved to ${column.id.replace(
            "kanban-",
            ""
          )}`;
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.remove();
          }, 2000);
        });
      });
    }
  }, [viewMode, isLoading]);
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
    // Simulate loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimeout);
    };
  }, []);
  // Task categories
  const categories = ["All", "Assignments", "Exams", "Readings", "Projects"];
  // Priority options
  const priorities = ["All", "High", "Medium", "Low"];
  // Due date options
  const dueDateOptions = ["All", "Today", "This Week", "This Month"];
  // Sort options
  const sortOptions = [
    { value: "dueDate-asc", label: "Due Date (Earliest First)" },
    { value: "dueDate-desc", label: "Due Date (Latest First)" },
    { value: "priority-desc", label: "Priority (High to Low)" },
    { value: "priority-asc", label: "Priority (Low to High)" },
    { value: "progress-desc", label: "Progress (Most Complete)" },
    { value: "progress-asc", label: "Progress (Least Complete)" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ];
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
      completed: false,
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
      completed: false,
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
      completed: false,
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
      completed: false,
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
      completed: false,
    },
    {
      id: 6,
      name: "Programming Assignment",
      subject: "Computer Science 303",
      dueDate: "Apr 12, 2025",
      dueTime: "11:59 PM",
      progress: 90,
      priority: "medium",
      category: "Assignments",
      completed: false,
    },
    {
      id: 7,
      name: "Statistics Quiz",
      subject: "Statistics 101",
      dueDate: "Apr 11, 2025",
      dueTime: "10:00 AM",
      progress: 100,
      priority: "low",
      category: "Exams",
      completed: true,
    },
  ];
  // Filter tasks based on selected filters and search query
  const filteredTasks = tasks.filter((task) => {
    // Filter by category
    if (selectedCategory !== "All" && task.category !== selectedCategory) {
      return false;
    }
    // Filter by priority
    if (
      selectedPriority !== "All" &&
      task.priority.toLowerCase() !== selectedPriority.toLowerCase()
    ) {
      return false;
    }
    // Filter by due date
    if (selectedDueDate !== "All") {
      const today = new Date();
      const taskDate = new Date(task.dueDate + " " + task.dueTime);
      if (selectedDueDate === "Today") {
        if (
          taskDate.getDate() !== today.getDate() ||
          taskDate.getMonth() !== today.getMonth() ||
          taskDate.getFullYear() !== today.getFullYear()
        ) {
          return false;
        }
      } else if (selectedDueDate === "This Week") {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
        if (taskDate > endOfWeek || taskDate < today) {
          return false;
        }
      } else if (selectedDueDate === "This Month") {
        if (
          taskDate.getMonth() !== today.getMonth() ||
          taskDate.getFullYear() !== today.getFullYear()
        ) {
          return false;
        }
      }
    }
    // Filter by search query
    if (
      searchQuery &&
      !task.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const [criteria, direction] = sortOption.split("-");
    if (criteria === "dueDate") {
      const dateA = new Date(a.dueDate + " " + a.dueTime);
      const dateB = new Date(b.dueDate + " " + b.dueTime);
      return direction === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else if (criteria === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder];
      const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder];
      return direction === "asc"
        ? priorityA - priorityB
        : priorityB - priorityA;
    } else if (criteria === "progress") {
      return direction === "asc"
        ? a.progress - b.progress
        : b.progress - a.progress;
    } else if (criteria === "name") {
      return direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });
  // Toggle task completion
  const toggleTaskCompletion = (taskId: number) => {
    // In a real app, this would update the state
    console.log(`Toggling completion for task ${taskId}`);
  };
  // Handle task deletion
  const handleDeleteTask = (taskId: number) => {
    // In a real app, this would update the state
    console.log(`Deleting task ${taskId}`);
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
        <h1 className="text-xl font-bold">Tasks</h1>
        <button className="text-gray-600 cursor-pointer">
          <i className="fas fa-search text-lg"></i>
        </button>
      </div>
      {/* Main Content */}
      <div className="pt-28 pb-20 px-4">
        {/* Filter Categories */}
        <div className="mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
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
        {/* Secondary Filters */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {/* Priority Filter */}
            <div className="relative">
              <button
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg shadow-sm flex items-center space-x-1 cursor-pointer !rounded-button"
                onClick={() =>
                  document
                    .getElementById("priority-dropdown")
                    ?.classList.toggle("hidden")
                }
              >
                <span>{selectedPriority}</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <div
                id="priority-dropdown"
                className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden"
              >
                {priorities.map((priority, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedPriority(priority);
                      document
                        .getElementById("priority-dropdown")
                        ?.classList.add("hidden");
                    }}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
            {/* Due Date Filter */}
            <div className="relative">
              <button
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg shadow-sm flex items-center space-x-1 cursor-pointer !rounded-button"
                onClick={() =>
                  document
                    .getElementById("due-date-dropdown")
                    ?.classList.toggle("hidden")
                }
              >
                <span>{selectedDueDate}</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <div
                id="due-date-dropdown"
                className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden"
              >
                {dueDateOptions.map((option, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedDueDate(option);
                      document
                        .getElementById("due-date-dropdown")
                        ?.classList.add("hidden");
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <i className="fas fa-list-ul"></i>
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <i className="fas fa-columns"></i>
            </button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setSearchQuery("")}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
        {/* Sort Controls */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm font-medium">
            {filteredTasks.length}{" "}
            {filteredTasks.length === 1 ? "task" : "tasks"} found
          </div>
          <div className="relative">
            <button
              className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <i className="fas fa-sort-amount-down"></i>
              <span>Sort</span>
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {sortOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                      sortOption === option.value
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                    onClick={() => {
                      setSortOption(option.value);
                      setShowSortMenu(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Task List or Kanban Board */}
        {isLoading ? (
          // Loading Skeleton
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white p-4 rounded-lg shadow-sm animate-pulse"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded-md mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-24 h-3 bg-gray-200 rounded"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-3 bg-gray-200 rounded"></div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedTasks.length > 0 ? (
          viewMode === "list" ? (
            <div className="space-y-3">
              {sortedTasks.map((task) => (
                <div
                  id={`task-${task.id}`}
                  key={task.id}
                  className="bg-white p-4 rounded-lg shadow-sm relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <button
                        className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer ${
                          task.completed
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "border-gray-300"
                        }`}
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </button>
                      <div className="ml-3">
                        <h3
                          className={`font-medium ${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {task.name}
                        </h3>
                        <p className="text-sm text-gray-500">{task.subject}</p>
                      </div>
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
                      <i className="far fa-calendar-alt mr-1"></i>{" "}
                      {task.dueDate} • {task.dueTime}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs">{task.progress}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            task.progress >= 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                      {task.category}
                    </span>
                    <button
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                  {/* Swipe Actions */}
                  <div className="absolute right-0 top-0 bottom-0 flex opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      className="bg-blue-500 text-white w-16 flex items-center justify-center"
                      onClick={() => {
                        toggleTaskCompletion(task.id);
                        // Visual feedback - update UI
                        const taskElement = document.getElementById(
                          `task-${task.id}`
                        );
                        if (taskElement) {
                          const titleElement = taskElement.querySelector("h3");
                          if (titleElement) {
                            titleElement.classList.toggle("line-through");
                            titleElement.classList.toggle("text-gray-400");
                          }
                          const checkboxElement =
                            taskElement.querySelector(".border");
                          if (checkboxElement) {
                            checkboxElement.classList.toggle("bg-blue-500");
                            checkboxElement.classList.toggle("border-blue-500");
                            checkboxElement.classList.toggle("text-white");
                            const checkIcon =
                              checkboxElement.querySelector("i");
                            if (!checkIcon && !task.completed) {
                              const icon = document.createElement("i");
                              icon.className = "fas fa-check text-xs";
                              checkboxElement.appendChild(icon);
                            } else if (checkIcon && task.completed) {
                              checkIcon.remove();
                            }
                          }
                        }
                        // Show toast notification
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
                        notification.textContent = task.completed
                          ? "Task marked as incomplete"
                          : "Task marked as complete";
                        document.body.appendChild(notification);
                        setTimeout(() => {
                          notification.remove();
                        }, 2000);
                      }}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      className="bg-red-500 text-white w-16 flex items-center justify-center"
                      onClick={() => {
                        // Store the task ID in a data attribute on the confirmation modal
                        const confirmModal = document.getElementById(
                          "delete-confirmation-modal"
                        );
                        if (confirmModal) {
                          confirmModal.setAttribute(
                            "data-task-id",
                            task.id.toString()
                          );
                          confirmModal.classList.remove("hidden");
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Kanban Board View
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max">
                {/* Group tasks by category */}
                {categories
                  .filter((category) => category !== "All")
                  .map((category) => {
                    const categoryTasks = sortedTasks.filter(
                      (task) => task.category === category
                    );
                    return (
                      <div key={category} className="w-72 flex-shrink-0">
                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-gray-700">
                              {category}
                            </h3>
                            <span className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full">
                              {categoryTasks.length}
                            </span>
                          </div>
                          <div
                            className="space-y-2 kanban-column"
                            id={`kanban-${category.toLowerCase()}`}
                          >
                            {categoryTasks.length > 0 ? (
                              categoryTasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="bg-white p-3 rounded-lg shadow-sm cursor-move"
                                  draggable="true"
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData(
                                      "text/plain",
                                      task.id.toString()
                                    );
                                    e.currentTarget.classList.add("opacity-50");
                                  }}
                                  onDragEnd={(e) => {
                                    e.currentTarget.classList.remove(
                                      "opacity-50"
                                    );
                                  }}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4
                                      className={`text-sm font-medium ${
                                        task.completed
                                          ? "line-through text-gray-400"
                                          : ""
                                      }`}
                                    >
                                      {task.name}
                                    </h4>
                                    <div
                                      className={`px-2 py-0.5 rounded-full text-xs ${
                                        task.priority === "high"
                                          ? "bg-red-100 text-red-700"
                                          : task.priority === "medium"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-green-100 text-green-700"
                                      }`}
                                    >
                                      {task.priority.charAt(0).toUpperCase()}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-500 mb-2">
                                    {task.subject}
                                  </p>
                                  <div className="flex justify-between items-center">
                                    <div className="text-xs text-gray-500">
                                      <i className="far fa-calendar-alt mr-1"></i>{" "}
                                      {task.dueDate}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <div className="text-xs">
                                        {task.progress}%
                                      </div>
                                      <div className="w-12 bg-gray-200 rounded-full h-1">
                                        <div
                                          className={`h-1 rounded-full ${
                                            task.progress >= 100
                                              ? "bg-green-500"
                                              : "bg-blue-500"
                                          }`}
                                          style={{ width: `${task.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="bg-white p-3 rounded-lg border border-dashed border-gray-300 text-center text-gray-400 text-xs">
                                No tasks
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-32 h-32 mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <i className="fas fa-tasks text-4xl text-gray-300"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No tasks found
            </h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Try adjusting your filters or create a new task
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button"
              onClick={() =>
                document
                  .getElementById("new-task-modal")
                  ?.classList.remove("hidden")
              }
            >
              Add New Task
            </button>
          </div>
        )}
      </div>
      {/* Floating Action Button */}
      <button
        className="fixed right-4 bottom-20 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer z-30 !rounded-button"
        onClick={() =>
          document.getElementById("new-task-modal")?.classList.remove("hidden")
        }
      >
        <i className="fas fa-plus text-xl"></i>
      </button>
      {/* Delete Confirmation Modal */}
      <div
        id="delete-confirmation-modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
        data-task-id=""
      >
        <div className="bg-white rounded-lg w-11/12 max-w-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700">
              Are you sure you want to delete this task?
            </p>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none !rounded-button"
              onClick={() => {
                document
                  .getElementById("delete-confirmation-modal")
                  ?.classList.add("hidden");
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 focus:outline-none !rounded-button"
              onClick={() => {
                const modal = document.getElementById(
                  "delete-confirmation-modal"
                );
                if (modal) {
                  const taskId = modal.getAttribute("data-task-id");
                  if (taskId) {
                    // In a real app, this would delete the task from the database
                    console.log(`Deleting task ${taskId}`);
                    // Remove the task from the UI
                    const taskElement = document.getElementById(
                      `task-${taskId}`
                    );
                    if (taskElement) {
                      taskElement.remove();
                    }
                    // Show success notification
                    const notification = document.createElement("div");
                    notification.className =
                      "fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
                    notification.textContent = "Task deleted successfully!";
                    document.body.appendChild(notification);
                    setTimeout(() => {
                      notification.remove();
                    }, 2000);
                  }
                  // Hide the modal
                  modal.classList.add("hidden");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* New Task Modal */}
      <div
        id="new-task-modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
      >
        <div className="bg-white rounded-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Create New Task
            </h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Task Name */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter task name"
              />
            </div>
            {/* Subject */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter subject"
              />
            </div>
            {/* Due Date and Time */}
            <div className="flex space-x-3">
              <div className="flex-1">
                <label
                  htmlFor="task-due-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="task-due-date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="task-due-time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Time
                </label>
                <input
                  type="time"
                  id="task-due-time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="flex space-x-3">
                <button
                  id="priority-high"
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none hover:bg-red-50 !rounded-button"
                  onClick={() => {
                    document
                      .getElementById("priority-high")
                      ?.classList.add(
                        "bg-red-100",
                        "text-red-700",
                        "border-red-300"
                      );
                    document
                      .getElementById("priority-medium")
                      ?.classList.remove(
                        "bg-yellow-100",
                        "text-yellow-700",
                        "border-yellow-300"
                      );
                    document
                      .getElementById("priority-low")
                      ?.classList.remove(
                        "bg-green-100",
                        "text-green-700",
                        "border-green-300"
                      );
                  }}
                >
                  High
                </button>
                <button
                  id="priority-medium"
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none hover:bg-yellow-50 !rounded-button"
                  onClick={() => {
                    document
                      .getElementById("priority-high")
                      ?.classList.remove(
                        "bg-red-100",
                        "text-red-700",
                        "border-red-300"
                      );
                    document
                      .getElementById("priority-medium")
                      ?.classList.add(
                        "bg-yellow-100",
                        "text-yellow-700",
                        "border-yellow-300"
                      );
                    document
                      .getElementById("priority-low")
                      ?.classList.remove(
                        "bg-green-100",
                        "text-green-700",
                        "border-green-300"
                      );
                  }}
                >
                  Medium
                </button>
                <button
                  id="priority-low"
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none hover:bg-green-50 !rounded-button"
                  onClick={() => {
                    document
                      .getElementById("priority-high")
                      ?.classList.remove(
                        "bg-red-100",
                        "text-red-700",
                        "border-red-300"
                      );
                    document
                      .getElementById("priority-medium")
                      ?.classList.remove(
                        "bg-yellow-100",
                        "text-yellow-700",
                        "border-yellow-300"
                      );
                    document
                      .getElementById("priority-low")
                      ?.classList.add(
                        "bg-green-100",
                        "text-green-700",
                        "border-green-300"
                      );
                  }}
                >
                  Low
                </button>
              </div>
            </div>
            {/* Category */}
            <div>
              <label
                htmlFor="task-category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="task-category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">Select a category</option>
                <option value="Assignments">Assignments</option>
                <option value="Exams">Exams</option>
                <option value="Readings">Readings</option>
                <option value="Projects">Projects</option>
              </select>
            </div>
            {/* Initial Progress */}
            <div>
              <label
                htmlFor="task-progress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Initial Progress: <span id="progress-value">0</span>%
              </label>
              <input
                type="range"
                id="task-progress"
                min="0"
                max="100"
                step="5"
                defaultValue="0"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  document.getElementById("progress-value")!.textContent =
                    value;
                }}
              />
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none !rounded-button"
              onClick={() => {
                document
                  .getElementById("new-task-modal")
                  ?.classList.add("hidden");
                  (document.getElementById("task-name") as HTMLInputElement).value = "";
                  (document.getElementById("task-subject") as HTMLInputElement).value = "";
                  (document.getElementById("task-due-date") as HTMLInputElement).value = "";
                  (document.getElementById("task-due-time") as HTMLInputElement).value = "";
                document
                  .getElementById("priority-high")
                  ?.classList.remove(
                    "bg-red-100",
                    "text-red-700",
                    "border-red-300"
                  );
                document
                  .getElementById("priority-medium")
                  ?.classList.remove(
                    "bg-yellow-100",
                    "text-yellow-700",
                    "border-yellow-300"
                  );
                document
                  .getElementById("priority-low")
                  ?.classList.remove(
                    "bg-green-100",
                    "text-green-700",
                    "border-green-300"
                  );
                  (document.getElementById("task-category") as HTMLInputElement).value = "";
              
                (
                  document.getElementById("task-progress") as HTMLInputElement
                ).value = "0";
                document.getElementById("progress-value")!.textContent = "0";
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 focus:outline-none !rounded-button"
              onClick={() => {
                // In a real app, this would save the task
                const taskName = (
                  document.getElementById("task-name") as HTMLInputElement
                ).value;
                const taskSubject = (
                  document.getElementById("task-subject") as HTMLInputElement
                ).value;
                const taskDueDate = (
                  document.getElementById("task-due-date") as HTMLInputElement
                ).value;
                const taskDueTime = (
                  document.getElementById("task-due-time") as HTMLInputElement
                ).value;
                let priority = "medium";
                if (
                  document
                    .getElementById("priority-high")
                    ?.classList.contains("bg-red-100")
                ) {
                  priority = "high";
                } else if (
                  document
                    .getElementById("priority-low")
                    ?.classList.contains("bg-green-100")
                ) {
                  priority = "low";
                }
                const category = (
                  document.getElementById("task-category") as HTMLSelectElement
                ).value;
                const progress = (
                  document.getElementById("task-progress") as HTMLInputElement
                ).value;
                console.log("New Task:", {
                  name: taskName,
                  subject: taskSubject,
                  dueDate: taskDueDate,
                  dueTime: taskDueTime,
                  priority,
                  category,
                  progress,
                });
                // Show success notification
                const notification = document.createElement("div");
                notification.className =
                  "fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
                notification.textContent = "Task added successfully!";
                document.body.appendChild(notification);
                setTimeout(() => {
                  notification.remove();
                }, 2000);
                // Close modal and reset form
                document
                  .getElementById("new-task-modal")
                  ?.classList.add("hidden");
                  (document.getElementById("task-name") as HTMLInputElement).value = "";
                  (document.getElementById("task-subject") as HTMLInputElement).value = "";
                  (document.getElementById("task-due-date") as HTMLInputElement).value = "";
                  (document.getElementById("task-due-time") as HTMLInputElement).value = "";
                
                document
                  .getElementById("priority-high")
                  ?.classList.remove(
                    "bg-red-100",
                    "text-red-700",
                    "border-red-300"
                  );
                document
                  .getElementById("priority-medium")
                  ?.classList.remove(
                    "bg-yellow-100",
                    "text-yellow-700",
                    "border-yellow-300"
                  );
                document
                  .getElementById("priority-low")
                  ?.classList.remove(
                    "bg-green-100",
                    "text-green-700",
                    "border-green-300"
                  );
                  (document.getElementById("task-category") as HTMLInputElement).value = "";
                (
                  document.getElementById("task-progress") as HTMLInputElement
                ).value = "0";
                document.getElementById("progress-value")!.textContent = "0";
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <AppNavigation />
    </div>
  );
};
export default TaskManagementDashboard;
