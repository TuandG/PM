"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserPlus, Search, Filter, MoreHorizontal, Mail, Trash2, Clock, X, RefreshCw, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BaseModel {
  id: string
  createdAt: string
  updatedAt: string
}

interface Invitation extends BaseModel {
  userId: string
  projectId: string
  email: string
  role: string
  expiredDate: string
  status: "Accepted" | "Rejected" | "Pending" | "Canceled"
  invitedBy: string
}

const roles = [
  { value: "product-owner", label: "Product Owner", color: "bg-purple-100 text-purple-800" },
  { value: "scrum-master", label: "Scrum Master", color: "bg-blue-100 text-blue-800" },
  { value: "developer", label: "Developer", color: "bg-green-100 text-green-800" },
  { value: "viewer", label: "Viewer/Stakeholder", color: "bg-gray-100 text-gray-800" },
]

const invitations: Invitation[] = [
  {
    id: "inv-1",
    userId: "user-1",
    projectId: "proj-1",
    email: "alice@example.com",
    role: "developer",
    expiredDate: "2024-03-15",
    status: "Pending",
    invitedBy: "John Doe",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15",
  },
  {
    id: "inv-2",
    userId: "user-2",
    projectId: "proj-1",
    email: "bob@example.com",
    role: "scrum-master",
    expiredDate: "2024-02-20",
    status: "Pending",
    invitedBy: "Jane Smith",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    id: "inv-3",
    userId: "user-3",
    projectId: "proj-1",
    email: "charlie@example.com",
    role: "viewer",
    expiredDate: "2024-02-18",
    status: "Canceled",
    invitedBy: "John Doe",
    createdAt: "2024-02-08",
    updatedAt: "2024-02-12",
  },
]

const members = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "product-owner",
    joinedAt: "2024-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "scrum-master",
    joinedAt: "2024-01-10",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "developer",
    joinedAt: "2024-02-01",
    lastActive: "30 minutes ago",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "developer",
    joinedAt: "2024-02-05",
    lastActive: "5 hours ago",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "viewer",
    joinedAt: "2024-02-10",
    lastActive: "1 week ago",
  },
]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("")
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [invitationList, setInvitationList] = useState<Invitation[]>(invitations)
  const [invitationFilter, setInvitationFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("members")

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  const filteredInvitations = invitationList.filter((invitation) => {
    const matchesSearch = invitation.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = invitationFilter === "all" || invitation.status === invitationFilter
    return matchesSearch && matchesStatus
  })

  const getRoleInfo = (roleValue: string) => {
    return roles.find((role) => role.value === roleValue) || roles[3]
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Canceled: "bg-gray-100 text-gray-800",
    }
    return statusStyles[status as keyof typeof statusStyles] || statusStyles.Pending
  }

  const isExpired = (expiredDate: string) => {
    return new Date(expiredDate) < new Date()
  }

  const handleInviteMember = () => {
    const newInvitation: Invitation = {
      id: `inv-${Date.now()}`,
      userId: `user-${Date.now()}`,
      projectId: "proj-1",
      email: inviteEmail,
      role: inviteRole,
      expiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 days from now
      status: "Pending",
      invitedBy: "Current User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setInvitationList([...invitationList, newInvitation])
    console.log("Inviting:", inviteEmail, "as", inviteRole)
    setInviteEmail("")
    setInviteRole("")
    setIsInviteOpen(false)
  }

  const handleRevokeInvitation = (invitationId: string) => {
    setInvitationList(
      invitationList.map((inv) =>
        inv.id === invitationId ? { ...inv, status: "Canceled" as const, updatedAt: new Date().toISOString() } : inv,
      ),
    )
    console.log("Revoking invitation:", invitationId)
  }

  const handleExtendInvitation = (invitationId: string) => {
    const newExpiredDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    setInvitationList(
      invitationList.map((inv) =>
        inv.id === invitationId ? { ...inv, expiredDate: newExpiredDate, updatedAt: new Date().toISOString() } : inv,
      ),
    )
    console.log("Extending invitation:", invitationId, "to", newExpiredDate)
  }

  const handleRoleChange = (memberId: string, newRole: string) => {
    // Handle role change logic here
    console.log("Changing role for member:", memberId, "to:", newRole)
  }

  const handleRemoveMember = (memberId: string) => {
    // Handle member removal logic here
    console.log("Removing member:", memberId)
  }

  return (
    <TooltipProvider>
      <div className="flex-1 space-y-6 p-2 sm:p-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Members</h1>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">Manage team members and their roles</p>
          </div>

          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full elevation-2 bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md elevation-3 rounded-3xl border-outline-variant/50">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl font-semibold text-on-surface">Invite Team Member</DialogTitle>
                <DialogDescription className="text-on-surface-variant">Send an invitation to join this project</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-on-surface mb-2 block">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-on-surface mb-2 block">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="pt-4 border-t border-outline-variant/30">
                <Button
                  variant="outline"
                  onClick={() => setIsInviteOpen(false)}
                  className="rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInviteMember}
                  disabled={!inviteEmail || !inviteRole}
                  className="rounded-full elevation-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              placeholder={activeTab === "members" ? "Search members by name or email..." : "Search invitations by email..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-full border-outline bg-surface focus:border-primary"
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48 rounded-full border-outline bg-surface focus:border-primary">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeTab === "invitations" && (
            <Select value={invitationFilter} onValueChange={setInvitationFilter}>
              <SelectTrigger className="w-48 rounded-full border-outline bg-surface focus:border-primary">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <Tabs defaultValue="members" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-surface-variant/30 rounded-full p-1">
            <TabsTrigger value="members" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Members ({filteredMembers.length})
            </TabsTrigger>
            <TabsTrigger value="invitations" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Invitations ({filteredInvitations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-on-surface">Team Members</h2>
                <div className="text-sm text-on-surface-variant">Total: {filteredMembers.length} members</div>
              </div>

              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="w-full">
                  <div className="w-full">
                    {/* Header */}
                    <div className="bg-surface-variant/30 px-6 py-1.5 sticky top-0 z-10">
                      <div className="flex items-center min-h-[32px]">
                        <div className="w-16 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Avatar</div>
                        <div className="flex-1 text-sm font-semibold text-on-surface-variant">Member Details</div>
                        <div className="w-40 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Role</div>
                        <div className="w-12 flex-shrink-0 text-sm font-semibold text-on-surface-variant text-center">Actions</div>
                      </div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-outline-variant/10">
                      {filteredMembers.map((member, index) => {
                        const roleInfo = getRoleInfo(member.role)
                        return (
                          <div
                            key={member.id}
                            className={`flex items-center min-h-[72px] px-6 py-3 hover:bg-primary/5 transition-colors ${index % 2 === 0 ? "bg-surface" : "bg-surface-variant/10"
                              }`}
                          >
                            {/* Avatar */}
                            <div className="w-16 flex-shrink-0 flex items-center justify-start">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            {/* Member Details */}
                            <div className="flex-1 pr-4">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-medium text-on-surface">{member.name}</h3>
                                <Badge className={`${roleInfo.color} dark:bg-opacity-20 rounded-full px-3 py-1 font-medium text-xs`}>
                                  {roleInfo.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-on-surface-variant">{member.email}</p>
                              <p className="text-xs text-on-surface-variant mt-1">
                                Joined {member.joinedAt} • Last active {member.lastActive}
                              </p>
                            </div>

                            {/* Role Select */}
                            <div className="w-40 flex-shrink-0">
                              <Select value={member.role} onValueChange={(value) => handleRoleChange(member.id, value)}>
                                <SelectTrigger className="w-full rounded-2xl border-outline-variant/50 bg-surface focus:border-primary">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                                  {roles.map((role) => (
                                    <SelectItem key={role.value} value={role.value}>
                                      {role.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Actions */}
                            <div className="w-12 flex-shrink-0 flex items-center justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full hover:bg-surface-variant/50">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>More actions</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="elevation-3 rounded-2xl border-outline-variant/50">
                                  <DropdownMenuItem className="rounded-lg">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive rounded-lg">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove from Project
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="elevation-3 rounded-3xl border-outline-variant/50">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-on-surface">Remove Team Member</AlertDialogTitle>
                                        <AlertDialogDescription className="text-on-surface-variant">
                                          Are you sure you want to remove {member.name} from this project? This action cannot
                                          be undone and they will lose access to all project resources.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter className="border-t border-outline-variant/30 pt-4">
                                        <AlertDialogCancel className="rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleRemoveMember(member.id)}
                                          className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Remove Member
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invitations">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-on-surface">Invitations</h2>
                <div className="text-sm text-on-surface-variant">Total: {filteredInvitations.length} invitations</div>
              </div>

              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="w-full">
                  <div className="w-full">
                    {/* Header */}
                    <div className="bg-surface-variant/30 px-6 py-1.5 sticky top-0 z-10">
                      <div className="flex items-center min-h-[32px]">
                        <div className="w-16 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Avatar</div>
                        <div className="flex-1 text-sm font-semibold text-on-surface-variant">Invitation Details</div>
                        <div className="w-28 flex-shrink-0 text-sm font-semibold text-on-surface-variant text-center">Status</div>
                        <div className="w-32 flex-shrink-0 text-sm font-semibold text-on-surface-variant text-center">Actions</div>
                      </div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-outline-variant/10">
                      {filteredInvitations.map((invitation, index) => {
                        const roleInfo = getRoleInfo(invitation.role)
                        const expired = isExpired(invitation.expiredDate)

                        return (
                          <div
                            key={invitation.id}
                            className={`flex items-center min-h-[72px] px-6 py-3 hover:bg-primary/5 transition-colors ${index % 2 === 0 ? "bg-surface" : "bg-surface-variant/10"
                              }`}
                          >
                            {/* Avatar */}
                            <div className="w-16 flex-shrink-0 flex items-center justify-start">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {invitation.email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            {/* Invitation Details */}
                            <div className="flex-1 pr-4">
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <h3 className="font-medium text-on-surface">{invitation.email}</h3>
                                <Badge className={`${roleInfo.color} dark:bg-opacity-20 rounded-full px-3 py-1 font-medium text-xs`}>
                                  {roleInfo.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-on-surface-variant">
                                Invited by {invitation.invitedBy} on {new Date(invitation.createdAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" />
                                Expires on {new Date(invitation.expiredDate).toLocaleDateString()}
                              </p>
                            </div>

                            {/* Status */}
                            <div className="w-28 flex-shrink-0 flex items-center justify-center">
                              <div className="flex flex-col gap-1 items-center">
                                <Badge className={`${getStatusBadge(invitation.status)} dark:bg-opacity-20 rounded-full px-3 py-1 font-medium text-xs whitespace-nowrap`}>
                                  {invitation.status}
                                </Badge>
                                {expired && invitation.status === "Pending" && (
                                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full px-3 py-1 font-medium text-xs">
                                    Expired
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="w-32 flex-shrink-0 flex items-center justify-center gap-2">
                              {invitation.status === "Pending" && (
                                <>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleExtendInvitation(invitation.id)}
                                        disabled={!expired}
                                        className="w-8 h-8 p-0 rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50"
                                      >
                                        <RefreshCw className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Extend invitation</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="outline" size="sm" className="w-8 h-8 p-0 rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50">
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Revoke invitation</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="elevation-3 rounded-3xl border-outline-variant/50">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-on-surface">Revoke Invitation</AlertDialogTitle>
                                        <AlertDialogDescription className="text-on-surface-variant">
                                          Are you sure you want to revoke the invitation for {invitation.email}? They will no
                                          longer be able to join the project using this invitation.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter className="border-t border-outline-variant/30 pt-4">
                                        <AlertDialogCancel className="rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleRevokeInvitation(invitation.id)}
                                          className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Revoke Invitation
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                              {invitation.status !== "Pending" && (
                                <div className="w-16 h-8 flex items-center justify-center">
                                  <span className="text-xs text-on-surface-variant">-</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}

                      {filteredInvitations.length === 0 && (
                        <div className="flex items-center justify-center py-12 text-on-surface-variant">
                          <div className="text-center">
                            <div className="text-lg font-medium mb-2">No invitations found</div>
                            <div className="text-sm">No invitations match your current criteria.</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
