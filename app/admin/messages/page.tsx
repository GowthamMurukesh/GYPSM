'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Mail, Archive, Trash2 } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'read' | 'responded';
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const contactsRef = collection(db, 'contacts');
      const q = query(contactsRef);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        phone: doc.data().phone,
        message: doc.data().message,
        submittedAt: doc.data().submittedAt?.toDate?.() || new Date(),
        status: doc.data().status || 'new',
      })) as ContactSubmission[];
      setMessages(data.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()));
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { status: 'read' });
      setMessages(messages.map((m) => (m.id === id ? { ...m, status: 'read' } : m)));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        setMessages(messages.filter((m) => m.id !== id));
        setSelectedMessage(null);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <p className="text-muted-foreground">
          {messages.filter((m) => m.status === 'new').length} unread messages
        </p>
      </div>

      {loading ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading messages...</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <Card
                  key={msg.id}
                  className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedMessage?.id === msg.id ? 'border-accent border-2' : ''
                  } ${msg.status === 'new' ? 'border-l-4 border-l-accent' : ''}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{msg.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {msg.submittedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No messages yet</p>
              </Card>
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedMessage.name}</h2>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${selectedMessage.email}`} className="text-accent hover:underline">
                        {selectedMessage.email}
                      </a>
                    </p>
                    {selectedMessage.phone && (
                      <p>
                        <strong>Phone:</strong>{' '}
                        <a href={`tel:${selectedMessage.phone}`} className="text-accent hover:underline">
                          {selectedMessage.phone}
                        </a>
                      </p>
                    )}
                    <p>
                      <strong>Received:</strong> {selectedMessage.submittedAt.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-2">Message</h3>
                  <p className="text-sm whitespace-pre-wrap text-foreground">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                    disabled={selectedMessage.status === 'read'}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    {selectedMessage.status === 'read' ? 'Read' : 'Mark as Read'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Select a message to view details</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
