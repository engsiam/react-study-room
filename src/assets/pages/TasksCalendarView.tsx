
import React, { useEffect, useState } from "react";
// @ts-ignore: Suppress type error for missing declaration file
import AppNavigation from "../components/AppNavigation";
import { useNavigate } from "react-router-dom";
const TasksCalendarView: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeView, setActiveView] = useState<"month" | "week" | "day">(
    "month"
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<{
    name: string;
    subject: string;
    dueDate: string;
    dueTime: string;
    priority: "high" | "medium" | "low";
    category: string;
  }>({
    name: "",
    subject: "",
    dueDate: "",
    dueTime: "",
    priority: "medium",
    category: "Assignments",
  });
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
  // Format date for display
  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };
  // Get days in month
  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();
    // Get days from previous month to fill the first row
    const prevMonthDays = [];
    if (startingDayOfWeek > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthDaysCount = prevMonth.getDate();
      for (
        let i = prevMonthDaysCount - startingDayOfWeek + 1;
        i <= prevMonthDaysCount;
        i++
      ) {
        prevMonthDays.push(new Date(year, month - 1, i));
      }
    }
    // Get days for current month
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(new Date(year, month, i));
    }
    // Get days from next month to fill the last row
    const nextMonthDays = [];
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = 42 - totalDaysDisplayed; // 6 rows x 7 days = 42 cells
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  // Get days for week view
  const getDaysInWeek = (date: Date): Date[] => {
    const currentDay = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const result = [];
    // Get the Sunday of the current week
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - currentDay);
    // Get all days of the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      result.push(day);
    }
    return result;
  };
  // Get hours for day view
  const getHoursInDay = (): string[] => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 || 12;
      const amPm = i < 12 ? "AM" : "PM";
      hours.push(`${hour}:00 ${amPm}`);
    }
    return hours;
  };
  // Navigate to previous month/week/day
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (activeView === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (activeView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };
  // Navigate to next month/week/day
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (activeView === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (activeView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };
  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date());
  };
  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  // Check if a date is in the current month
  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };
  // Interface for Task type
  interface Task {
    id: number;
    name: string;
    subject: string;
    dueDate: string;
    dueTime: string;
    progress: number;
    priority: "high" | "medium" | "low";
    category: string;
    completed: boolean;
  }
  // Tasks data
  const tasks: Task[] = [
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
  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    const dateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate + " " + task.dueTime);
      const taskDateString = taskDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return dateString === taskDateString;
    });
  };
  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  // Handle task click
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
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
        <h1 className="text-xl font-bold">Calendar</h1>
        <button className="text-gray-600 cursor-pointer">
          <i className="fas fa-search text-lg"></i>
        </button>
      </div>
      {/* View Controls */}
      <div className="fixed top-24 w-full bg-white z-30 px-4 py-3 shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView("month")}
              className={`px-4 py-1 text-sm rounded-md cursor-pointer !rounded-button ${
                activeView === "month"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setActiveView("week")}
              className={`px-4 py-1 text-sm rounded-md cursor-pointer !rounded-button ${
                activeView === "week"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveView("day")}
              className={`px-4 py-1 text-sm rounded-md cursor-pointer !rounded-button ${
                activeView === "day"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Day
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={navigatePrevious}
            className="p-2 text-gray-600 cursor-pointer"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium">
              {formatMonthYear(currentDate)}
            </h2>
            <button
              onClick={navigateToday}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full cursor-pointer !rounded-button"
            >
              Today
            </button>
          </div>
          <button
            onClick={navigateNext}
            className="p-2 text-gray-600 cursor-pointer"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="pt-48 pb-20 px-2">
        {/* Month View */}
        {activeView === "month" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 text-center py-2 border-b">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div
                    key={index}
                    className="text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                )
              )}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-fr">
              {getDaysInMonth(currentDate).map((date, index) => {
                const tasksForDay = getTasksForDate(date);
                const hasTasks = tasksForDay.length > 0;
                return (
                  <div
                    key={index}
                    className={`min-h-[70px] p-1 border-b border-r ${
                      isCurrentMonth(date) ? "bg-white" : "bg-gray-50"
                    } ${isToday(date) ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div
                        className={`flex justify-center items-center w-6 h-6 text-xs rounded-full ${
                          isToday(date)
                            ? "bg-blue-500 text-white"
                            : isCurrentMonth(date)
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      {hasTasks && (
                        <div className="flex space-x-1">
                          {tasksForDay.slice(0, 3).map((task, taskIndex) => (
                            <div
                              key={taskIndex}
                              className={`w-2 h-2 rounded-full ${getPriorityColor(
                                task.priority
                              )}`}
                            ></div>
                          ))}
                          {tasksForDay.length > 3 && (
                            <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                              +{tasksForDay.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Task List */}
                    <div className="mt-1 space-y-1">
                      {tasksForDay.slice(0, 2).map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="text-xs p-1 rounded bg-white shadow-sm cursor-pointer"
                          onClick={() => handleTaskClick(task)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full ${getPriorityColor(
                                task.priority
                              )} mr-1`}
                            ></div>
                            <div className="truncate">{task.name}</div>
                          </div>
                          <div className="text-gray-500 truncate">
                            {task.subject}
                          </div>
                        </div>
                      ))}
                      {tasksForDay.length > 2 && (
                        <div className="text-xs text-center text-blue-500">
                          +{tasksForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Week View */}
        {activeView === "week" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 text-center py-2 border-b">
              {getDaysInWeek(currentDate).map((date, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs font-medium text-gray-500">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mt-1 text-sm ${
                      isToday(date) ? "bg-blue-500 text-white" : "text-gray-700"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              ))}
            </div>
            {/* Time Slots */}
            <div className="grid grid-cols-7 divide-x">
              {getDaysInWeek(currentDate).map((date, dayIndex) => {
                const tasksForDay = getTasksForDate(date);
                return (
                  <div key={dayIndex} className="min-h-[400px] relative">
                    {/* Tasks */}
                    <div className="p-1 space-y-1">
                      {tasksForDay.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className={`p-2 rounded-lg shadow-sm cursor-pointer border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500 bg-red-50"
                              : task.priority === "medium"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-green-500 bg-green-50"
                          }`}
                          onClick={() => handleTaskClick(task)}
                        >
                          <div className="text-xs font-medium truncate">
                            {task.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {task.subject}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {task.dueTime}
                          </div>
                        </div>
                      ))}
                      {tasksForDay.length === 0 && (
                        <div className="h-full flex items-center justify-center text-xs text-gray-400">
                          No tasks
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Day View */}
        {activeView === "day" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Day Header */}
            <div className="text-center py-4 border-b">
              <div className="text-lg font-medium">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            {/* Time Slots */}
            <div className="divide-y">
              {getHoursInDay().map((hour, hourIndex) => {
                const tasksAtHour = tasks.filter((task) => {
                  const taskTime = task.dueTime;
                  return (
                    taskTime.includes(hour.split(" ")[0]) &&
                    taskTime.includes(hour.split(" ")[1])
                  );
                });
                return (
                  <div key={hourIndex} className="flex py-2 px-3">
                    <div className="w-16 text-xs text-gray-500">{hour}</div>
                    <div className="flex-1 min-h-[50px]">
                      {tasksAtHour.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className={`p-2 rounded-lg shadow-sm cursor-pointer mb-1 border-l-4 ${
                            task.priority === "high"
                              ? "border-red-500 bg-red-50"
                              : task.priority === "medium"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-green-500 bg-green-50"
                          }`}
                          onClick={() => handleTaskClick(task)}
                        >
                          <div className="text-sm font-medium">{task.name}</div>
                          <div className="text-xs text-gray-500">
                            {task.subject}
                          </div>
                          <div className="mt-1 flex justify-between items-center">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                              {task.category}
                            </span>
                            <div className="flex items-center">
                              <div className="text-xs mr-1">
                                {task.progress}%
                              </div>
                              <div className="w-16 bg-gray-200 rounded-full h-1">
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
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Task Detail Bottom Sheet */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-h-[70%] overflow-y-auto animate-slide-up">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedTask.name}</h3>
                <button
                  onClick={() => setShowTaskDetails(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Subject</div>
                  <div className="font-medium">{selectedTask.subject}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Due Date</div>
                    <div className="font-medium">{selectedTask.dueDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Due Time</div>
                    <div className="font-medium">{selectedTask.dueTime}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Priority</div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        selectedTask.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : selectedTask.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedTask.priority.charAt(0).toUpperCase() +
                        selectedTask.priority.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Category</div>
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {selectedTask.category}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Progress</div>
                  <div className="flex items-center">
                    <div className="text-sm mr-2">{selectedTask.progress}%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedTask.progress >= 100
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${selectedTask.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button">
                    <i className="fas fa-edit mr-2"></i>
                    Edit
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg shadow-sm cursor-pointer !rounded-button ${
                      selectedTask.completed
                        ? "bg-gray-200 text-gray-600"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    <i
                      className={`fas ${
                        selectedTask.completed ? "fa-redo" : "fa-check"
                      } mr-2`}
                    ></i>
                    {selectedTask.completed ? "Reopen" : "Complete"}
                  </button>
                  <button className="flex-1 py-2 bg-red-500 text-white rounded-lg shadow-sm cursor-pointer !rounded-button">
                    <i className="fas fa-trash mr-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* New Task Form Bottom Sheet */}
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-h-[80%] overflow-y-auto animate-slide-up">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Add New Task</h3>
                <button
                  onClick={() => setShowNewTaskForm(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Task Name
                  </label>
                  <input
                    type="text"
                    value={newTask.name}
                    onChange={(e) =>
                      setNewTask({ ...newTask, name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task name"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newTask.subject}
                    onChange={(e) =>
                      setNewTask({ ...newTask, subject: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const formattedDate = selectedDate.toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        );
                        setNewTask({ ...newTask, dueDate: formattedDate });
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Due Time
                    </label>
                    <input
                      type="time"
                      onChange={(e) => {
                        const timeValue = e.target.value;
                        const [hours, minutes] = timeValue.split(":");
                        const hour = parseInt(hours, 10);
                        const amPm = hour >= 12 ? "PM" : "AM";
                        const hour12 = hour % 12 || 12;
                        const formattedTime = `${hour12}:${minutes} ${amPm}`;
                        setNewTask({ ...newTask, dueTime: formattedTime });
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        setNewTask({ ...newTask, priority: "low" })
                      }
                      className={`flex-1 py-2 px-4 rounded-lg !rounded-button ${
                        newTask.priority === "low"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewTask({ ...newTask, priority: "medium" })
                      }
                      className={`flex-1 py-2 px-4 rounded-lg !rounded-button ${
                        newTask.priority === "medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewTask({ ...newTask, priority: "high" })
                      }
                      className={`flex-1 py-2 px-4 rounded-lg !rounded-button ${
                        newTask.priority === "high"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      High
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Assignments">Assignments</option>
                    <option value="Projects">Projects</option>
                    <option value="Exams">Exams</option>
                    <option value="Readings">Readings</option>
                    <option value="Meetings">Meetings</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => setShowNewTaskForm(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm cursor-pointer !rounded-button"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Add new task logic would go here
                      // For now, just close the form
                      setShowNewTaskForm(false);
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
        id="addTaskButton"
        onClick={() => setShowNewTaskForm(true)}
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
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
export default TasksCalendarView;
