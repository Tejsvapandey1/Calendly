import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, Clock, Video } from "lucide-react";

const EventDetails = ({ event }) => {
  const { user } = event;

  return (
    <div className="w-full lg:w-1/3 bg-white rounded-2xl border shadow-sm p-6 space-y-6">
      
      {/* Event Title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        {event.title}
      </h1>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>
            {user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-base font-medium text-gray-800">
            {user.name}
          </p>
          <p className="text-sm text-gray-500">
            {user.email}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200" />

      {/* Meta Info */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <Clock size={16} />
          <span>{event.duration} minutes</span>
        </div>

        <div className="flex items-center gap-3">
          <Video size={16} />
          <span>Google Meet</span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={16} />
          <span>Online event</span>
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <>
          <div className="h-px bg-gray-200" />
          <p className="text-sm text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </>
      )}
    </div>
  );
};

export default EventDetails;
