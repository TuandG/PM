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
import { UserPlus, Search, Filter, MoreHorizontal, Mail, Trash2, Clock, X, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Members</h1>
          <p className="text-muted-foreground">Manage team members and their roles</p>
        </div>

        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Mời thành viên
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join this project</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteMember} disabled={!inviteEmail || !inviteRole}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Members ({filteredMembers.length})</TabsTrigger>
          <TabsTrigger value="invitations">Invitations ({filteredInvitations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
              <CardDescription>Manage project team members and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member) => {
                  const roleInfo = getRoleInfo(member.role)
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{member.name}</h3>
                            <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {member.joinedAt} • Last active {member.lastActive}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Select value={member.role} onValueChange={(value) => handleRoleChange(member.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove from Project
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {member.name} from this project? This action cannot
                                    be undone and they will lose access to all project resources.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRemoveMember(member.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations">
          <div className="flex items-center gap-4 mb-4">
            <Select value={invitationFilter} onValueChange={setInvitationFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations ({filteredInvitations.length})</CardTitle>
              <CardDescription>Manage project invitations and track their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInvitations.map((invitation) => {
                  const roleInfo = getRoleInfo(invitation.role)
                  const expired = isExpired(invitation.expiredDate)

                  return (
                    <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{invitation.email.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{invitation.email}</h3>
                            <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                            <Badge className={getStatusBadge(invitation.status)}>{invitation.status}</Badge>
                            {expired && invitation.status === "Pending" && <Badge variant="destructive">Expired</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Invited by {invitation.invitedBy} on {new Date(invitation.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Expires on {new Date(invitation.expiredDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {invitation.status === "Pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleExtendInvitation(invitation.id)}
                              disabled={!expired}
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Extend
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <X className="w-4 h-4 mr-2" />
                                  Revoke
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Revoke Invitation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to revoke the invitation for {invitation.email}? They will no
                                    longer be able to join the project using this invitation.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRevokeInvitation(invitation.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Revoke Invitation
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
                {filteredInvitations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No invitations found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
