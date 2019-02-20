class MeetingsInfoSerializer < ActiveModel::Serializer
  attributes :id, 
    :title, 
    :midpoint_latitude, 
    :midpoint_longitude, 
    :date_time, 
    :meeting_address,
    :my_status,
    :venues,
    :users,

    

  def meeting_address
    url = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=#{ENV["REACT_APP_HERE_APP_ID"]}&app_code=#{ENV["REACT_APP_HERE_APP_CODE"]}&mode=retrieveAddresses&prox=#{object.midpoint_latitude},#{object.midpoint_longitude}"
    response_string = RestClient.get(url)
    response_hash = JSON.parse(response_string)
    return "Address not found. Try again." if response_hash["Response"]["View"].empty?
    response_hash["Response"]["View"][0]["Result"][0]["Location"]["Address"]["Label"]
  end

  def user_meetings
    object.user_meetings
  end

  def venues
    meeting_venue = self.object.meeting_venues
    meeting_venue.map { |mv|
      {
        id: mv.venue.id,
        name: mv.venue.name,
        address: mv.venue.address,
        category: mv.venue.category,
      }
    }
  end

  def users
    user_meetings.map { |um|
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

  def my_status
    user_meetings.select { |um| um.user.id == current_user.id}
    .map{|um| um.user_status}.join
  end 

end
