'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllUsers, updateUserRole } from '@/lib/firebaseUtils';
import { UserProfile } from '@/lib/types';
import { useAuthStore } from '@/lib/authStore';
import { Shield } from 'lucide-react';

export default function UsersPage() {
  const { userProfile: currentUser } = useAuthStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    } else if (currentUser) {
      setLoading(false);
    }
  }, [currentUser, isAdmin]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const roleOptions: ('admin' | 'editor' | 'viewer')[] = ['admin', 'editor', 'viewer'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage team members and their roles</p>
      </div>

      {loading ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading users...</p>
        </Card>
      ) : !isAdmin ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            You need admin access to manage users.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id} className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{user.displayName}</h3>
                    {user.id === currentUser?.id && (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value as 'admin' | 'editor' | 'viewer')
                      }
                      disabled={user.id === currentUser?.id}
                      className="text-sm px-2 py-1 border border-border rounded bg-background text-foreground"
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Role Legend */}
      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-3">Role Permissions</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Admin:</strong> Full access to all features including user management
          </p>
          <p>
            <strong>Editor:</strong> Can create and edit content, upload media, view messages
          </p>
          <p>
            <strong>Viewer:</strong> Can only view content, cannot make changes
          </p>
        </div>
      </Card>
    </div>
  );
}
