class MeetingVenue < ApplicationRecord
  belongs_to :meeting
  belongs_to :venue
end
