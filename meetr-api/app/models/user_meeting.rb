include Math
require 'rest-client'

class UserMeeting < ApplicationRecord
  belongs_to :user
  belongs_to :meeting

def get_lat_lng(address)
    url = "https://geocoder.api.here.com/6.2/geocode.json?app_id=#{ENV["REACT_APP_HERE_APP_ID"]}&app_code=#{ENV["REACT_APP_HERE_APP_CODE"]}&searchtext=#{address}"
    response_string = RestClient.get(url)
    response_hash = JSON.parse(response_string)
    latitude = response_hash["Response"]["View"][0]["Result"][0]["Location"]["DisplayPosition"]["Latitude"]
    longitude = response_hash["Response"]["View"][0]["Result"][0]["Location"]["DisplayPosition"]["Longitude"]
    self.update(start_latitude: latitude, start_longitude: longitude)
end

end
