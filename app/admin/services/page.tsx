'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllServices, deleteService } from '@/lib/firebaseUtils';
import { Service } from '@/lib/types';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllServices(true);
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        setServices(services.filter((s) => s.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </Link>
      </div>

      {loading ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading services...</p>
        </Card>
      ) : services.length > 0 ? (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                    <span>Order: {service.order}</span>
                    <span>
                      Status:{' '}
                      <span className={service.published ? 'text-green-600' : 'text-yellow-600'}>
                        {service.published ? 'Published' : 'Draft'}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/services/${service.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No services yet</p>
          <Link href="/admin/services/new">
            <Button>Create First Service</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
