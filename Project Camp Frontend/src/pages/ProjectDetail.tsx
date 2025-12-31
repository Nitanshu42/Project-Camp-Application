import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Plus, Upload, UserPlus, Edit, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { getProjectById, getMyProjectRole, addMember, updateProject, deleteProject } from "@/services/project.api";
import {
  getTasksByProject,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "@/services/task.api";
// import { getProjectFiles, uploadFile, deleteFile } from "@/services/file.api";
import { updateProject, deleteProject } from "@/services/project.api";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import TaskList from "@/components/tasks/TaskList";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { NoteList } from "@/components/notes/NoteList";
// import UploadFileModal from "@/components/files/UploadFileModal";
// import FileList from "@/components/files/FileList";

import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { RoleGuard } from "@/components/common/RoleGuard";
import { AddMemberModal } from "@/components/projects/AddMemberModal";
import { EditProjectModal } from "@/components/projects/EditProjectModal";

/* ---------------- TYPES ---------------- */
interface Task {
  _id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
}

interface Project {
  _id: string;
  name: string;
  description: string;
  status: "active" | "completed";
}

/* ---------------- PAGE ---------------- */
const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  // const [files, setFiles] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Edit Description State
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");


  const { toast } = useToast();

  /* -------- LOAD PROJECT + TASKS + ROLE -------- */
  useEffect(() => {
    if (!projectId) return;

    const load = async () => {
      try {
        // const [projectData, taskData, roleData, fileData] = await Promise.all([
        const [projectData, taskData, roleData] = await Promise.all([
          getProjectById(projectId),
          getTasksByProject(projectId),
          getMyProjectRole(projectId),
          // getProjectFiles(projectId),
        ]);

        setProject(projectData);
        setTasks(taskData);
        setUserRole(roleData.role);
        // setFiles(fileData);
      } catch (e) {
        console.error("Failed to load project data", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [projectId]);

  /* -------- ADD TASK -------- */
  const handleAddTask = async (title: string) => {
    if (!projectId) return;

    try {
      const task = await createTask(projectId, {
        title,
      });

      setTasks((prev) => [...prev, task]);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to create task");
    }
  };

  /* -------- DELETE TASK -------- */
  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  /* -------- STATUS CHANGE -------- */
  const handleStatusChange = async (
    taskId: string,
    status: Task["status"]
  ) => {
    const updatedTask = await updateTaskStatus(taskId, status);

    setTasks((prev) =>
      prev.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      )
    );
  };

  /* -------- INVITE MEMBER -------- */
  const handleInvite = async (email: string, role: "member" | "project_admin") => {
    if (!projectId) return;
    try {
      await addMember(projectId, { email, role });
      toast({
        title: "Member Invited",
        description: `${email} has been added as ${role}.`,
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to add member. Ensure user exists.");
    }
  };

  /* -------- UPLOAD FILE -------- */
  // const handleUploadFile = async (file: File) => {
  //   if (!projectId) return;
  //   setIsUploading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //
  //     const newFile = await uploadFile(projectId, formData);
  //     setFiles((prev) => [newFile, ...prev]);
  //     setShowUploadModal(false);
  //     toast({
  //       title: "File Uploaded",
  //       description: "File has been successfully uploaded.",
  //     });
  //   } catch (error: any) {
  //     console.error(error);
  //     alert(error.message || "Failed to upload file");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  /* -------- DELETE FILE -------- */
  // const handleDeleteFile = async (fileId: string) => {
  //   if (!projectId) return;
  //
  //   if (!confirm("Are you sure you want to delete this file?")) return;
  //
  //   try {
  //     await deleteFile(projectId, fileId);
  //     setFiles((prev) => prev.filter((f) => f._id !== fileId));
  //     toast({
  //       title: "File Deleted",
  //       description: "File has been successfully deleted.",
  //     });
  //   } catch (error: any) {
  //     console.error(error);
  //     alert(error.message || "Failed to delete file");
  //   }
  // };

  /* -------- UPDATE PROJECT -------- */
  const handleUpdateProject = async (id: string, data: any) => {
    const updated = await updateProject(id, data);
    setProject(updated);
    toast({ title: "Project Updated" });
  };

  /* -------- DELETE PROJECT (Admin Only) -------- */
  const handleDeleteProject = async () => {
    if (!projectId || !project) return;
    if (!confirm(`Are you sure you want to delete project "${project.name}"? This action cannot be undone.`)) return;

    try {
      await deleteProject(projectId);
      toast({
        title: "Project Deleted",
        description: "Project has been successfully deleted.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete project",
      });
    }
  };

  /* -------- UPDATE DESCRIPTION (Admin Only) -------- */
  const handleUpdateDescription = async () => {
    if (!projectId || !project) return;

    try {
      const updatedProject = await updateProject(projectId, {
        name: project.name,
        description: editedDescription,
      });

      setProject(updatedProject);
      setIsEditingDescription(false);
      toast({
        title: "Project Updated",
        description: "Description has been updated successfully.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update project",
      });
    }
  };


  /* -------- UI STATES -------- */
  if (loading) return <p className="p-6">Loading...</p>;
  if (!project) return <p className="p-6">Project not found</p>;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex-1 mr-4">
          <Button variant="ghost" asChild className="mb-2 pl-0 hover:bg-transparent hover:underline">
            <Link to="/dashboard">
              ← Back to Projects
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {project.status === 'completed' ? 'Completed' : 'Active'}
            </span>
            <RoleGuard currentRole={userRole} allowedRoles={["admin"]}>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteProject}
                className="h-8"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
              </Button>
            </RoleGuard>
          </div>

          <div className="mt-2 group relative">
            {isEditingDescription ? (
              <div className="flex gap-2 max-w-xl">
                <Input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Project Description"
                />
                <Button onClick={handleUpdateDescription} size="sm">Save</Button>
                <Button variant="ghost" onClick={() => setIsEditingDescription(false)} size="sm">Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">{project.description}</p>
                <RoleGuard currentRole={userRole} allowedRoles={["admin"]}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setEditedDescription(project.description);
                      setIsEditingDescription(true);
                    }}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                </RoleGuard>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowVideoModal(true);
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            View Demo
          </Button>
          {activeTab === "files" && (
            <Button onClick={() => setShowUploadModal(true)} disabled>
              <Upload className="w-4 h-4 mr-2" />
              Upload File (Coming Soon)
            </Button>
          )}

          <RoleGuard
            currentRole={userRole}
            allowedRoles={["admin", "project_admin"]}
          >
            <Button variant="outline" size="icon" onClick={() => setShowEditModal(true)}>
              <Edit className="w-4 h-4" />
            </Button>
          </RoleGuard>

          {project.status === "completed" && (
            <RoleGuard
              currentRole={userRole}
              allowedRoles={["admin"]}
            >
              <Button variant="destructive" size="icon" onClick={handleDeleteProject}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </RoleGuard>
          )}

          <RoleGuard
            currentRole={userRole}
            allowedRoles={["admin", "project_admin"]}
          >
            <Button variant="outline" onClick={() => setShowInviteModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </RoleGuard>

          {activeTab === "tasks" && (
            <RoleGuard
              currentRole={userRole}
              allowedRoles={["admin", "project_admin"]}
            >
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </RoleGuard>
          )}
        </div>
      </div>

      <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-6">
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onTaskClick={setSelectedTaskId}
            userRole={userRole}
          />
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
          <NoteList />
        </TabsContent>
        <TabsContent value="files" className="mt-6">
          <div className="p-4 text-center text-muted-foreground">File management coming soon.</div>
          {/* <FileList files={files} onDelete={handleDeleteFile} /> */}
        </TabsContent>
      </Tabs>

      {/* ADD TASK MODAL */}
      <AddTaskModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTask}
      />

      {/* INVITE MODAL */}
      <AddMemberModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onAdd={handleInvite}
      />

      {/* UPLOAD FILE MODAL */}
      {/* <UploadFileModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUploadFile}
        isUploading={isUploading}
      /> */}

      {/* EDIT PROJECT MODAL */}
      {project && (
        <EditProjectModal
          project={project}
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateProject}
        />
      )}

      {/* TASK DETAIL MODAL */}
      <TaskDetailModal
        taskId={selectedTaskId}
        isOpen={!!selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
      />

      {/* VIDEO MODAL */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black border-zinc-800">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <video
              controls
              className="w-full h-full"
              autoPlay
              playsInline
              onError={(e) => console.error("Video load error:", e)}
            >
              <source src="/Demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
