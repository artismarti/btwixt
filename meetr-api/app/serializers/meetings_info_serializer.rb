class MeetingsInfoSerializer < ActiveModel::Serializer
  attributes :id, :title, :midpoint_latitude, :midpoint_longitude, :date_time, :users

  def users
    object.user_meetings.map{ |um|
      {
        first_name: um.user.first_name, 
        last_name: um.user.last_name, 
        email: um.user.email, 
        guest: um.user.guest, 
        id: um.user.id,
        start_address: um.start_address,
        start_latitude: um.start_latitude,
        start_longitude: um.start_longitude,
        user_status: um.user_status,
      }
    }
  end 
end
