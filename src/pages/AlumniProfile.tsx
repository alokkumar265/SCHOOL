import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save, Edit, X, Linkedin, Globe, Twitter, Github, Plus, Trash2 } from 'lucide-react';

const defaultProfile = {
  name: 'Alumni User',
  email: 'alumni@example.com',
  phoneNumber: '',
  avatar: '',
  graduationYear: '2015',
  degree: 'Bachelor of Technology',
  major: 'Computer Science',
  currentCompany: 'Tech Solutions Inc.',
  currentPosition: 'Senior Software Engineer',
  currentLocation: 'Mumbai, Maharashtra',
  bio: '',
  parentName: '',
  dob: '',
  gender: '',
  address: '',
  skills: [],
  achievements: [],
  socialLinks: {
    linkedin: '',
    twitter: '',
    github: '',
    website: '',
  },
  experience: [],
  education: [],
};

const AlumniProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('alumniProfile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });
  const [formData, setFormData] = useState(profileData);
  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '', description: '' });
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', year: '', description: '' });

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillAdd = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill('');
    }
  };
  const handleSkillRemove = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleAchievementAdd = () => {
    if (newAchievement && !formData.achievements.includes(newAchievement)) {
      setFormData(prev => ({ ...prev, achievements: [...prev.achievements, newAchievement] }));
      setNewAchievement('');
    }
  };
  const handleAchievementRemove = (achievement) => {
    setFormData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a !== achievement) }));
  };

  const handleExperienceAdd = () => {
    if (newExperience.company && newExperience.position) {
      setFormData(prev => ({ ...prev, experience: [...(prev.experience || []), { ...newExperience }] }));
      setNewExperience({ company: '', position: '', duration: '', description: '' });
    }
  };
  const handleExperienceRemove = (idx) => {
    setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }));
  };

  const handleEducationAdd = () => {
    if (newEducation.institution && newEducation.degree) {
      setFormData(prev => ({ ...prev, education: [...(prev.education || []), { ...newEducation }] }));
      setNewEducation({ institution: '', degree: '', year: '', description: '' });
    }
  };
  const handleEducationRemove = (idx) => {
    setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('alumniProfile', JSON.stringify(formData));
      setProfileData(formData);
      setIsEditing(false);
      setIsLoading(false);
      toast({ title: 'Profile Updated', description: 'Your profile has been updated.' });
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setNewSkill('');
    setNewAchievement('');
    setNewExperience({ company: '', position: '', duration: '', description: '' });
    setNewEducation({ institution: '', degree: '', year: '', description: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Alumni Profile</h2>
            <p className="text-muted-foreground">Manage your profile information and stay connected with the alumni network</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                  <X className="h-4 w-4 mr-2" />Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />{isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />Edit Profile
              </Button>
            )}
          </div>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="relative mx-auto mb-2">
              <Avatar className="h-32 w-32 mx-auto">
                {formData.avatar ? (
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-blue-500 text-white">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                )}
              </Avatar>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="bg-school-primary text-white p-2 rounded-full hover:bg-school-primary/90">
                      <Camera className="h-4 w-4" />
                    </div>
                  </Label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <CardTitle className="text-xl">{formData.name}</CardTitle>
            <CardDescription>{formData.currentPosition} at {formData.currentCompany}</CardDescription>
            <div className="flex justify-center gap-3 mt-2">
              {formData.socialLinks.linkedin && (
                <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-blue-700 hover:text-blue-900" />
                </a>
              )}
              {formData.socialLinks.twitter && (
                <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-sky-500 hover:text-sky-700" />
                </a>
              )}
              {formData.socialLinks.github && (
                <a href={formData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5 text-gray-800 hover:text-black" />
                </a>
              )}
              {formData.socialLinks.website && (
                <a href={formData.socialLinks.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <Globe className="h-5 w-5 text-green-700 hover:text-green-900" />
                </a>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Details */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={formData.email} onChange={e => handleInputChange('email', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input value={formData.phoneNumber} onChange={e => handleInputChange('phoneNumber', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input value={formData.dob} onChange={e => handleInputChange('dob', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Input value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value={formData.address} onChange={e => handleInputChange('address', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Parent's Name</Label>
                  <Input value={formData.parentName} onChange={e => handleInputChange('parentName', e.target.value)} disabled={!isEditing} />
                </div>
              </div>
            </div>
            {/* Academic Details */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Graduation Year</Label>
                  {isEditing ? (
                    <Input value={formData.graduationYear} onChange={e => handleInputChange('graduationYear', e.target.value)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.graduationYear}</p>
                  )}
                </div>
                <div>
                  <Label>Degree</Label>
                  {isEditing ? (
                    <Input value={formData.degree} onChange={e => handleInputChange('degree', e.target.value)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.degree}</p>
                  )}
                </div>
                <div>
                  <Label>Major</Label>
                  {isEditing ? (
                    <Input value={formData.major} onChange={e => handleInputChange('major', e.target.value)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.major}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Professional Details */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Current Company</Label>
                  {isEditing ? (
                    <Input value={formData.currentCompany} onChange={e => handleInputChange('currentCompany', e.target.value)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.currentCompany}</p>
                  )}
                </div>
                <div>
                  <Label>Current Position</Label>
                  {isEditing ? (
                    <Input value={formData.currentPosition} onChange={e => handleInputChange('currentPosition', e.target.value)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.currentPosition}</p>
                  )}
                </div>
                <div>
                  <Label>Location</Label>
                  {isEditing ? (
                    <Input value={formData.currentLocation} onChange={e => handleInputChange('currentLocation', e.target.value)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.currentLocation}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label>Bio</Label>
                {isEditing ? (
                  <Textarea value={formData.bio} onChange={e => handleInputChange('bio', e.target.value)} rows={3} />
                ) : (
                  <p className="text-sm text-muted-foreground">{formData.bio}</p>
                )}
              </div>
            </div>
            {/* Skills & Achievements */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Skills & Achievements</h3>
              <div className="mb-2">
                <Label>Skills</Label>
                {isEditing ? (
                  <div className="flex gap-2 mb-2">
                    <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add skill" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSkillAdd(); }}} />
                    <Button type="button" onClick={handleSkillAdd}>Add</Button>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      {isEditing && (
                        <button onClick={() => handleSkillRemove(skill)} className="ml-1 text-blue-600 hover:text-blue-800"><X className="h-3 w-3" /></button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <Label>Achievements</Label>
                {isEditing ? (
                  <div className="flex gap-2 mb-2">
                    <Input value={newAchievement} onChange={e => setNewAchievement(e.target.value)} placeholder="Add achievement" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAchievementAdd(); }}} />
                    <Button type="button" onClick={handleAchievementAdd}>Add</Button>
                  </div>
                ) : null}
                <div className="space-y-1">
                  {formData.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-green-50 rounded px-2 py-1">
                      <span className="text-sm flex-1">{achievement}</span>
                      {isEditing && (
                        <button onClick={() => handleAchievementRemove(achievement)} className="text-red-600 hover:text-red-800"><X className="h-4 w-4" /></button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  {isEditing ? (
                    <Input value={formData.socialLinks.linkedin} onChange={e => handleSocialLinkChange('linkedin', e.target.value)} placeholder="LinkedIn URL" />
                  ) : (
                    <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.socialLinks.linkedin}</a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  {isEditing ? (
                    <Input value={formData.socialLinks.twitter} onChange={e => handleSocialLinkChange('twitter', e.target.value)} placeholder="Twitter URL" />
                  ) : (
                    <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.socialLinks.twitter}</a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  {isEditing ? (
                    <Input value={formData.socialLinks.github} onChange={e => handleSocialLinkChange('github', e.target.value)} placeholder="GitHub URL" />
                  ) : (
                    <a href={formData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.socialLinks.github}</a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {isEditing ? (
                    <Input value={formData.socialLinks.website} onChange={e => handleSocialLinkChange('website', e.target.value)} placeholder="Website URL" />
                  ) : (
                    <a href={formData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.socialLinks.website}</a>
                  )}
                </div>
              </div>
            </div>
            {/* Experience */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Work Experience</h3>
              {isEditing && (
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                  <Input value={newExperience.company} onChange={e => setNewExperience({ ...newExperience, company: e.target.value })} placeholder="Company" />
                  <Input value={newExperience.position} onChange={e => setNewExperience({ ...newExperience, position: e.target.value })} placeholder="Position" />
                  <Input value={newExperience.duration} onChange={e => setNewExperience({ ...newExperience, duration: e.target.value })} placeholder="Duration" />
                  <Input value={newExperience.description} onChange={e => setNewExperience({ ...newExperience, description: e.target.value })} placeholder="Description" />
                  <Button type="button" onClick={handleExperienceAdd}>Add</Button>
                </div>
              )}
              <div className="space-y-1">
                {(formData.experience || []).map((exp, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
                    <span className="text-sm flex-1">{exp.position} at {exp.company} ({exp.duration}) - {exp.description}</span>
                    {isEditing && (
                      <button onClick={() => handleExperienceRemove(idx)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Education */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Education</h3>
              {isEditing && (
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                  <Input value={newEducation.institution} onChange={e => setNewEducation({ ...newEducation, institution: e.target.value })} placeholder="Institution" />
                  <Input value={newEducation.degree} onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })} placeholder="Degree" />
                  <Input value={newEducation.year} onChange={e => setNewEducation({ ...newEducation, year: e.target.value })} placeholder="Year" />
                  <Input value={newEducation.description} onChange={e => setNewEducation({ ...newEducation, description: e.target.value })} placeholder="Description" />
                  <Button type="button" onClick={handleEducationAdd}>Add</Button>
                </div>
              )}
              <div className="space-y-1">
                {(formData.education || []).map((edu, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
                    <span className="text-sm flex-1">{edu.degree} at {edu.institution} ({edu.year}) - {edu.description}</span>
                    {isEditing && (
                      <button onClick={() => handleEducationRemove(idx)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlumniProfile; 