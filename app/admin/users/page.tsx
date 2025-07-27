"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, User, Mail, Calendar, Shield, Edit, Trash2, Eye, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  createdAt: string
  lastLogin?: string
}

export default function UsersAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isBulkEmailDialogOpen, setIsBulkEmailDialogOpen] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    if (status === "loading") return
    if (!session || !session.user?.isAdmin) {
      router.push("/")
    }
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.isAdmin) {
      fetchUsers()
    }
  }, [session, currentPage, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm
      })
      
      const response = await fetch(`/api/users?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setUsers(data.users)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
        fetchUsers()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      })
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(user => user._id))
    }
  }

  const handleSendBulkEmail = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message",
        variant: "destructive"
      })
      return
    }

    if (selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one user",
        variant: "destructive"
      })
      return
    }

    try {
      setSendingEmail(true)
      const response = await fetch('/api/users/bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailMessage,
          userIds: selectedUsers,
          sendToAll: false
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: `Email sent to ${data.stats.successful} users successfully`,
        })
        setIsBulkEmailDialogOpen(false)
        setEmailSubject("")
        setEmailMessage("")
        setSelectedUsers([])
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error sending bulk email:', error)
      toast({
        title: "Error",
        description: "Failed to send bulk email",
        variant: "destructive"
      })
    } finally {
      setSendingEmail(false)
    }
  }

  const handleSendToAll = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message",
        variant: "destructive"
      })
      return
    }

    if (!confirm('Are you sure you want to send this email to ALL users?')) {
      return
    }

    try {
      setSendingEmail(true)
      const response = await fetch('/api/users/bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailMessage,
          userIds: [],
          sendToAll: true
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: `Email sent to ${data.stats.successful} users successfully`,
        })
        setIsBulkEmailDialogOpen(false)
        setEmailSubject("")
        setEmailMessage("")
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error sending bulk email:', error)
      toast({
        title: "Error",
        description: "Failed to send bulk email",
        variant: "destructive"
      })
    } finally {
      setSendingEmail(false)
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session || !session.user?.isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Management</h1>
        <p className="text-gray-600">Manage all registered users</p>
      </div>

      {/* Search and Bulk Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsBulkEmailDialogOpen(true)}
            disabled={selectedUsers.length === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Email ({selectedUsers.length})
          </Button>
          
          {selectedUsers.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setSelectedUsers([])}
            >
              Clear Selection
            </Button>
          )}
        </div>
      </div>

      {/* Select All */}
      {users.length > 0 && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedUsers.length === users.length}
            onChange={handleSelectAll}
            className="rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">
            Select All ({selectedUsers.length} of {users.length} selected)
          </span>
        </div>
      )}

      {/* Users Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'No users have registered yet'}
            </p>
          </div>
        ) : (
          users.map((user) => (
            <Card key={user._id} className={`hover:shadow-md transition-shadow ${
              selectedUsers.includes(user._id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleUserSelection(user._id)}
                      className="rounded border-gray-300"
                    />
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {user.isAdmin && (
                      <Badge variant="default" className="bg-red-500">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      User
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 py-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* User Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <Badge variant={selectedUser.isAdmin ? "default" : "secondary"}>
                    {selectedUser.isAdmin ? "Admin" : "User"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined:</span>
                  <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                </div>
                {selectedUser.lastLogin && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Login:</span>
                    <span>{new Date(selectedUser.lastLogin).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Email Dialog */}
      <Dialog open={isBulkEmailDialogOpen} onOpenChange={setIsBulkEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Bulk Email</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients
              </label>
              <div className="text-sm text-gray-600">
                {selectedUsers.length > 0 ? (
                  <p>Sending to {selectedUsers.length} selected user(s)</p>
                ) : (
                  <p>No users selected</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <Input
                placeholder="Enter email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                placeholder="Enter your message..."
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsBulkEmailDialogOpen(false)}
                disabled={sendingEmail}
              >
                Cancel
              </Button>
              
              {selectedUsers.length > 0 && (
                <Button
                  onClick={handleSendBulkEmail}
                  disabled={sendingEmail || !emailSubject.trim() || !emailMessage.trim()}
                >
                  {sendingEmail ? 'Sending...' : `Send to ${selectedUsers.length} Users`}
                </Button>
              )}
              
              <Button
                variant="destructive"
                onClick={handleSendToAll}
                disabled={sendingEmail || !emailSubject.trim() || !emailMessage.trim()}
              >
                {sendingEmail ? 'Sending...' : 'Send to All Users'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 