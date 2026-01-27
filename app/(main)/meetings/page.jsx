import { getUserMeetings } from '@/actions/meetings';
import { getUserByUsername } from '@/actions/users';
import { Tabs, TabsList,TabsContent,TabsTrigger } from '@/components/ui/tabs';
import React, { Suspense } from 'react'
import MeetingList from './_components/meeting-list';

export async function generateMetadata() {
  return {
    title: `Meetings | Calendly`,
    description: `Schedule you events easily`,
  };
}

const MeetingsPage = () => {
  return (
    <div>
      <Tabs defaultValue="upcoming">
      <TabsList className="mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense fallback={<div>Loading upcoming meetings...</div>}>
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense fallback={<div>Loading past meetings...</div>}>
          <PastMeetings />
        </Suspense>
      </TabsContent>
    </Tabs>
    </div>
  )
}

async function UpcomingMeetings(){
    const meetings = await getUserMeetings("upcoming")
    return <MeetingList meetings={meetings} type={"upcoming"}/>
}

async function PastMeetings(){
    const meetings = await getUserMeetings("past")
    return <MeetingList meetings={meetings} type={"past"}/>
}

export default MeetingsPage
