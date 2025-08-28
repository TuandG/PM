import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Hash, Users } from "lucide-react"
import { use } from "react"

const channels = [
  { id: "general", name: "general", unread: 0 },
  { id: "development", name: "development", unread: 3 },
  { id: "design", name: "design", unread: 1 },
  { id: "testing", name: "testing", unread: 0 },
]

const messages = [
  {
    id: "1",
    user: "John Doe",
    initials: "JD",
    message: "Hey team, I've completed the user authentication module. Ready for review!",
    time: "10:30 AM",
    type: "message",
  },
  {
    id: "2",
    user: "Sarah Miller",
    initials: "SM",
    message: "Great work John! I'll review it this afternoon.",
    time: "10:32 AM",
    type: "message",
  },
  {
    id: "3",
    user: "Alex Brown",
    initials: "AB",
    message: "I've updated the API documentation. Link: https://docs.example.com",
    time: "11:15 AM",
    type: "message",
  },
]

export default function ProjectCommunicationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Team Communication</h1>
        <p className="text-muted-foreground">Collaborate with your team members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Channels Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Channels
                </h3>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={channel.id === "general" ? "default" : "ghost"}
                      className="w-full justify-start gap-2 h-8"
                    >
                      <Hash className="w-3 h-3" />
                      {channel.name}
                      {channel.unread > 0 && (
                        <Badge variant="destructive" className="ml-auto text-xs">
                          {channel.unread}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team Members
                </h3>
                <div className="space-y-2">
                  {["John Doe", "Sarah Miller", "Alex Brown", "Emma Wilson"].map((member) => (
                    <div key={member} className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {member
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="p-0 h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                <h3 className="font-semibold">general</h3>
                <Badge variant="secondary">4 members</Badge>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{message.user}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
