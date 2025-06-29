import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Download
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface LeaveApplication {
  id: string;
  type: 'Sick Leave' | 'Personal Leave' | 'Medical Leave' | 'Emergency Leave';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
  attachments?: string[];
}

const LeaveManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<string | null>(null);

  // Mock data
  const leaveApplications: LeaveApplication[] = [
    {
      id: '1',
      type: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      reason: 'Fever and cold symptoms',
      status: 'Approved',
      appliedDate: '2024-03-08',
      approvedBy: 'Dr. Sarah Johnson',
      approvedDate: '2024-03-09',
      attachments: ['medical_certificate.pdf']
    },
    {
      id: '2',
      type: 'Personal Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-15',
      reason: 'Family function',
      status: 'Pending',
      appliedDate: '2024-03-10'
    },
    {
      id: '3',
      type: 'Medical Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      reason: 'Dental surgery',
      status: 'Approved',
      appliedDate: '2024-02-18',
      approvedBy: 'Dr. Michael Chen',
      approvedDate: '2024-02-19',
      attachments: ['dental_report.pdf', 'prescription.pdf']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal Leave': return 'bg-blue-100 text-blue-800';
      case 'Medical Leave': return 'bg-purple-100 text-purple-800';
      case 'Emergency Leave': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentLeave = leaveApplications.find(leave => leave.id === selectedLeave);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600 mt-2">Apply for leave and track your leave applications</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Apply for Leave
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Applications</p>
                  <p className="text-xl font-semibold">{leaveApplications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-xl font-semibold">{leaveApplications.filter(l => l.status === 'Approved').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-semibold">{leaveApplications.filter(l => l.status === 'Pending').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rejected</p>
                  <p className="text-xl font-semibold">{leaveApplications.filter(l => l.status === 'Rejected').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Applications List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold">Your Leave Applications</h3>
            <div className="space-y-3">
              {leaveApplications.map((leave) => (
                <Card 
                  key={leave.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedLeave === leave.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedLeave(leave.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getTypeColor(leave.type)}>
                            {leave.type}
                          </Badge>
                          <Badge className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{leave.reason}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied: {new Date(leave.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leave Details */}
          <div className="lg:col-span-2">
            {currentLeave ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentLeave.type}</CardTitle>
                      <CardDescription>Leave Application Details</CardDescription>
                    </div>
                    <Badge className={getStatusColor(currentLeave.status)}>
                      {currentLeave.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Leave Period</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Start: {new Date(currentLeave.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>End: {new Date(currentLeave.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>Duration: {Math.ceil((new Date(currentLeave.endDate).getTime() - new Date(currentLeave.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                        <p className="text-sm text-gray-600">{currentLeave.reason}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Application Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Applied: {new Date(currentLeave.appliedDate).toLocaleDateString()}</span>
                          </div>
                          {currentLeave.approvedBy && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Approved by: {currentLeave.approvedBy}</span>
                            </div>
                          )}
                          {currentLeave.approvedDate && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>Approved on: {new Date(currentLeave.approvedDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {currentLeave.comments && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Comments</h4>
                          <p className="text-sm text-gray-600">{currentLeave.comments}</p>
                        </div>
                      )}

                      {currentLeave.attachments && currentLeave.attachments.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {currentLeave.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{attachment}</span>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {currentLeave.status === 'Pending' && (
                          <>
                            <Button variant="outline" className="flex-1">
                              <FileText className="h-4 w-4 mr-2" />
                              Edit Application
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Application
                            </Button>
                          </>
                        )}
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Download Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Leave Application</h3>
                  <p className="text-gray-600">Choose a leave application from the list to view details.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Leave Application Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Apply for Leave</CardTitle>
              <CardDescription>Fill out the form below to submit your leave application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Leave Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1">
                    <option value="">Select leave type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Upload Documents</label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Reason for Leave</label>
                <Textarea 
                  placeholder="Please provide a detailed reason for your leave request..."
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowForm(false)}>
                  Submit Application
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LeaveManagementPage; 