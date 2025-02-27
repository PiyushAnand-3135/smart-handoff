import React, { useState, useEffect } from 'react';
import { Clock, Users, Calendar, Check } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  timezone: string;
  utcOffset: number;
  availability: { day: string; start: number; end: number }[];
}

interface Meeting {
  id: number;
  title: string;
  description: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
  requiredAttendees: number[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Developer',
    timezone: 'Asia/Singapore (UTC+8)',
    utcOffset: 8,
    availability: [
      { day: 'Monday', start: 9, end: 18 },
      { day: 'Tuesday', start: 9, end: 18 },
      { day: 'Wednesday', start: 9, end: 18 },
      { day: 'Thursday', start: 9, end: 18 },
      { day: 'Friday', start: 9, end: 17 }
    ]
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'UI/UX Designer',
    timezone: 'Europe/Berlin (UTC+1)',
    utcOffset: 1,
    availability: [
      { day: 'Monday', start: 8, end: 17 },
      { day: 'Tuesday', start: 8, end: 17 },
      { day: 'Wednesday', start: 8, end: 17 },
      { day: 'Thursday', start: 8, end: 17 },
      { day: 'Friday', start: 8, end: 16 }
    ]
  },
  {
    id: 3,
    name: 'James Wilson',
    role: 'Backend Engineer',
    timezone: 'America/New_York (UTC-5)',
    utcOffset: -5,
    availability: [
      { day: 'Monday', start: 10, end: 19 },
      { day: 'Tuesday', start: 10, end: 19 },
      { day: 'Wednesday', start: 10, end: 19 },
      { day: 'Thursday', start: 10, end: 19 },
      { day: 'Friday', start: 10, end: 18 }
    ]
  },
  {
    id: 4,
    name: 'Emma Johnson',
    role: 'Product Manager',
    timezone: 'Europe/London (UTC+0)',
    utcOffset: 0,
    availability: [
      { day: 'Monday', start: 9, end: 18 },
      { day: 'Tuesday', start: 9, end: 18 },
      { day: 'Wednesday', start: 9, end: 18 },
      { day: 'Thursday', start: 9, end: 18 },
      { day: 'Friday', start: 9, end: 17 }
    ]
  },
  {
    id: 5,
    name: 'Raj Patel',
    role: 'QA Engineer',
    timezone: 'Asia/Kolkata (UTC+5:30)',
    utcOffset: 5.5,
    availability: [
      { day: 'Monday', start: 10, end: 19 },
      { day: 'Tuesday', start: 10, end: 19 },
      { day: 'Wednesday', start: 10, end: 19 },
      { day: 'Thursday', start: 10, end: 19 },
      { day: 'Friday', start: 10, end: 18 }
    ]
  }
];

const meetings: Meeting[] = [
  {
    id: 1,
    title: 'Sprint Planning',
    description: 'Plan tasks for the upcoming sprint and assign responsibilities',
    duration: 1,
    priority: 'high',
    requiredAttendees: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    title: 'Design Review',
    description: 'Review and provide feedback on the latest UI designs',
    duration: 1.5,
    priority: 'medium',
    requiredAttendees: [1, 2, 4]
  },
  {
    id: 3,
    title: 'Backend Architecture Discussion',
    description: 'Discuss changes to the API structure and database schema',
    duration: 1,
    priority: 'high',
    requiredAttendees: [1, 3, 5]
  },
  {
    id: 4,
    title: 'Weekly Team Sync',
    description: 'General team sync to discuss progress and blockers',
    duration: 0.5,
    priority: 'medium',
    requiredAttendees: [1, 2, 3, 4, 5]
  }
];

const TimeZoneOverlap: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedAttendees, setSelectedAttendees] = useState<number[]>([]);
  const [overlapTimes, setOverlapTimes] = useState<{day: string; slots: {hour: number; attendees: number[]}[]}[]>([]);
  const [recommendedSlots, setRecommendedSlots] = useState<{day: string; hour: number; score: number}[]>([]);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  useEffect(() => {
    if (selectedAttendees.length > 0) {
      calculateOverlap();
    } else {
      setOverlapTimes([]);
      setRecommendedSlots([]);
    }
  }, [selectedAttendees]);
  
  useEffect(() => {
    if (selectedMeeting) {
      setSelectedAttendees(selectedMeeting.requiredAttendees);
    } else {
      setSelectedAttendees([]);
    }
  }, [selectedMeeting]);
  
  const calculateOverlap = () => {
    const selectedMembers = teamMembers.filter(member => selectedAttendees.includes(member.id));
    
    const newOverlapTimes = days.map(day => {
      const hourSlots = Array.from({ length: 24 }, (_, hour) => {
        const availableAttendees = selectedMembers.filter(member => {
          const dayAvailability = member.availability.find(a => a.day === day);
          if (!dayAvailability) return false;
          
          // Convert local hours to UTC
          const startUtc = dayAvailability.start - member.utcOffset;
          const endUtc = dayAvailability.end - member.utcOffset;
          
          // Convert UTC hour to member's local hour
          const memberLocalHour = (hour + member.utcOffset + 24) % 24;
          
          return memberLocalHour >= dayAvailability.start && memberLocalHour < dayAvailability.end;
        });
        
        return {
          hour,
          attendees: availableAttendees.map(a => a.id)
        };
      });
      
      return {
        day,
        slots: hourSlots
      };
    });
    
    setOverlapTimes(newOverlapTimes);
    
    // Calculate recommended slots based on attendance and working hours preference
    const allRecommendedSlots = [];
    
    for (const dayData of newOverlapTimes) {
      for (let i = 0; i < dayData.slots.length; i++) {
        const currentSlot = dayData.slots[i];
        const attendeeCount = currentSlot.attendees.length;
        
        if (attendeeCount === selectedAttendees.length) {
          // Calculate a score based on how ideal this time is (prefer working hours)
          let score = attendeeCount * 10; // Base score from attendance
          
          // Check if this is during reasonable working hours for all attendees
          const isReasonableHour = selectedMembers.every(member => {
            const memberLocalHour = (currentSlot.hour + member.utcOffset + 24) % 24;
            return memberLocalHour >= 9 && memberLocalHour <= 17; // 9 AM to 5 PM is ideal
          });
          
          if (isReasonableHour) {
            score += 5;
          }
          
          allRecommendedSlots.push({
            day: dayData.day,
            hour: currentSlot.hour,
            score
          });
        }
      }
    }
    
    // Sort by score (highest first) and take top 3
    const topRecommendations = allRecommendedSlots
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    setRecommendedSlots(topRecommendations);
  };
  
  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  };
  
  const formatUtcHour = (hour: number) => {
    return `${hour}:00 UTC`;
  };
  
  const getLocalTime = (utcHour: number, utcOffset: number) => {
    const localHour = (utcHour + utcOffset + 24) % 24;
    return formatHour(localHour);
  };
  
  const toggleAttendee = (id: number) => {
    setSelectedAttendees(prev => 
      prev.includes(id) 
        ? prev.filter(attendeeId => attendeeId !== id)
        : [...prev, id]
    );
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">Time-Zone Overlap Finder</h2>
        </div>
        <p className="mt-2 text-gray-600">Find the optimal meeting times for your global team across different time zones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Meetings</h3>
          
          <div className="space-y-4 mb-6">
            {meetings.map(meeting => (
              <div 
                key={meeting.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedMeeting?.id === meeting.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                onClick={() => setSelectedMeeting(meeting)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-800">{meeting.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(meeting.priority)}`}>
                    {meeting.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{meeting.duration} hour{meeting.duration !== 1 ? 's' : ''}</span>
                  <span className="text-sm text-gray-500">{meeting.requiredAttendees.length} attendees</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Custom Meeting</h3>
            <button 
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setSelectedMeeting(null);
                setSelectedAttendees([]);
              }}
            >
              Create Custom Selection
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Team Members</h3>
          
          <div className="space-y-4">
            {teamMembers.map(member => (
              <div 
                key={member.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedAttendees.includes(member.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                onClick={() => toggleAttendee(member.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  {selectedAttendees.includes(member.id) && (
                    <Check className="h-5 w-5 text-indigo-600" />
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-sm text-gray-500">{member.timezone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Overlap Times</h3>
          
          {selectedAttendees.length > 0 ? (
            <>
              {recommendedSlots.length > 0 ? (
                <div className="mb-6">
                  <h4 className="font-medium text-indigo-700 mb-3">Recommended Meeting Times</h4>
                  <div className="space-y-3">
                    {recommendedSlots.map((slot, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-indigo-800">{slot.day}, {formatUtcHour(slot.hour)}</span>
                          <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full">
                            {selectedAttendees.length}/{selectedAttendees.length} available
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {teamMembers
                            .filter(member => selectedAttendees.includes(member.id))
                            .map(member => (
                              <div key={member.id} className="text-xs text-gray-600">
                                {member.name}: {getLocalTime(slot.hour, member.utcOffset)}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800">No perfect overlap times found for all selected team members.</p>
                </div>
              )}
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      {Array.from({ length: 24 }, (_, i) => (
                        <th key={i} scope="col" className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {overlapTimes.map((dayData, dayIndex) => (
                      <tr key={dayIndex}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {dayData.day}
                        </td>
                        {dayData.slots.map((slot, hourIndex) => (
                          <td 
                            key={hourIndex} 
                            className={`px-1 py-2 whitespace-nowrap text-center text-xs ${
                              slot.attendees.length === selectedAttendees.length 
                                ? 'bg-green-100' 
                                : slot.attendees.length > 0 
                                  ? 'bg-yellow-50' 
                                  : ''
                            }`}
                          >
                            {slot.attendees.length > 0 && (
                              <span className="inline-block w-6 h-6 flex items-center justify-center rounded-full bg-white">
                                {slot.attendees.length}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-100 mr-1"></span>
                  <span className="text-gray-600">All available</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-yellow-50 mr-1"></span>
                  <span className="text-gray-600">Some available</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 p-4 rounded-full">
                <Users className="h-12 w-12 text-indigo-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">Select team members</h3>
              <p className="mt-2 text-gray-600 text-center">
                Select team members or a meeting to find the best overlap times across time zones.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeZoneOverlap;