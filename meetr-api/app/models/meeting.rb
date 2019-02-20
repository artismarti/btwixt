class Meeting < ApplicationRecord
  has_many :user_meetings, dependent: :destroy
  has_many :users, through: :user_meetings
  has_many :meeting_venues, dependent: :destroy
  has_many :venues, through: :meeting_venues
  validates :date_time, presence: true
  validates :title, presence: true

  def get_venues(lat,lng)
    # if the midpoint is unchanged AND there are already venues, return early
    if lat == self.midpoint_latitude && lng == self.midpoint_longitude && !self.meeting_venues.count.zero?
      return
    end
    # otherwise get venues
    url = "https://places.cit.api.here.com/places/v1/browse?at=#{lat}%2C#{lng}%3Br%3D100&cat=restaurant&Accept-Language=en-GB%2Cen-US%3Bq%3D0.9%2Cen%3Bq%3D0.8&app_id=#{ENV["REACT_APP_HERE_APP_ID"]}&app_code=#{ENV["REACT_APP_HERE_APP_CODE"]}&size=5"
    response_string = RestClient.get(url)
    response_hash = JSON.parse(response_string)
    new_meeting_venues = response_hash["results"]["items"]
    self.meeting_venues.destroy_all
    new_meeting_venues.map do |mv|
      mv["vicinity"] = mv["vicinity"].gsub("<br/>", "+")
     new_venue =  Venue.find_or_create_by(name: mv["title"], address:  mv["vicinity"], category: mv["category"]["id"])
      MeetingVenue.create(venue_id: new_venue.id, meeting_id: self.id, selected: false)
    end
  end

  def get_address(lat,lng)
    url = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=#{ENV["REACT_APP_HERE_APP_ID"]}&app_code=#{ENV["REACT_APP_HERE_APP_CODE"]}&mode=retrieveAddresses&prox=#{lat},#{lng}"
    response_string = RestClient.get(url)
    response_hash = JSON.parse(response_string)
    response_hash["Response"]["View"][0]["Result"][0]["Location"]["Address"]["Label"]
  end

  def get_lat_lng_hash
    user_status = ['accepted', 'created']
    @user_meetings = self.user_meetings.select{|um| 
      user_status.include?(um.user_status)
    }
    lat_lng = {}
    lats = @user_meetings.map{|um| um.start_latitude}
    lat_lng[:lat] = lats
    lngs = @user_meetings.map{|um| um.start_longitude}
    lat_lng[:lng] = lngs
    lat_lng
  end

  def get_map(lat,lng)
    "https://image.maps.api.here.com/mia/1.6/mapview?app_id=#{ENV["REACT_APP_HERE_APP_ID"]}&app_code=#{ENV["REACT_APP_HERE_APP_CODE"]}&lat=#{lat}&lon=#{lng}&vt=0&z=14"
  end

  # Recalculate if someone changes their start location
  def recalculate_midpoint
    self.get_midpoint_lat(self.get_lat_lng_hash)
    self.get_midpoint_lng(self.get_lat_lng_hash)
    self.save
  end

  def get_midpoint_lat(get_lat_lng_hash)
    if radian_lat(get_lat_lng_hash)
      self.update(midpoint_latitude: radian_lat(get_lat_lng_hash))
    else
      self.update(midpoint_latitude: 1.11111)
    end
  end

  def get_midpoint_lng(get_lat_lng_hash)
    if radian_lng(get_lat_lng_hash)
      self.update(midpoint_longitude: radian_lng(get_lat_lng_hash))
    else
      self.update(midpoint_longitude: -0.33333)
    end
  end

  # Convert lat/long from hash to cartesian (x,y,z) coordinates
  def cosify_hash(l_hash)
    # create empty hash with the following keys:
    cos_hash = Hash.new
    cos_hash[:cos_lat] = []
    cos_hash[:cos_lng] = []
    cos_hash[:product] = []

    # convert each latitude from l_hash into degrees (lat*PI/180)
    # calculate the cos of the degree value & push it into the hash
    # as the value for key :cos_lat
    l_hash[:lat].each do |lat|
       cos_hash[:cos_lat] << (cos(lat * PI/180))
    end
    # convert each longitude from l_hash into degrees (lng*PI/180)
    # calculate the cos of the degree value & push it into the hash
    # as the value for key :cos_lng
    l_hash[:lng].each do |lng|
       cos_hash[:cos_lng] << (cos(lng * PI/180))
    end

    # multiply the cosified degree lat with the cosified degree lng
    # push it as values for the :product key
    cos_hash[:product] = cos_hash[:cos_lat].zip(cos_hash[:cos_lng]).map{|lat,lng| (lat*lng)}
    # add all the values in the product key
    cos_hash[:product].reduce(0){|sum, num| sum+num}
  end

  def cos_sinify(l_hash)
    # create empty hash with the following keys:
    cos_sin_hash = Hash.new
    cos_sin_hash[:cos_lat] = []
    cos_sin_hash[:sin_lng] = []
    cos_sin_hash[:product] = []

    # convert each latitude from l_hash into degrees (lat*PI/180)
    # calculate the cos of the degree value & push it into the hash
    # as the value for key :cos_lat
    l_hash[:lat].each do |lat|
       cos_sin_hash[:cos_lat] << (cos(lat * PI/180))
    end

    # convert each longitude from l_hash into degrees (lat*PI/180)
    # calculate the sin of the degree value & push it into the hash
    # as the value for key :sin_lng
    l_hash[:lng].each do |lng|
       cos_sin_hash[:sin_lng] << (sin(lng * PI/180))
    end
    # zip the lats & lngs
    # multiply the cosified degree lat with the sinified degree lng
    # push them as values for the :product key
    cos_sin_hash[:product] = cos_sin_hash[:cos_lat].zip(cos_sin_hash[:sin_lng]).map{|lat,lng| (lat*lng)}
    # sum all the values in the product key
    cos_sin_hash[:product].reduce(0){|sum, num| sum+num}
  end

  def sinify(l_hash)
    sin_hash = Hash.new
    sin_hash[:sin_lat] = []
    l_hash[:lat].each do |lat|
       sin_hash[:sin_lat] << (sin(lat * PI/180))
    end
    sin_hash[:sin_lat].reduce(0){|sum, num| sum+num}
  end

  # Compute combined weighted cartesian coordinates
  # Convert cartesian coordinate to latitude and longitude for the midpoint
  def radian_calcs(l_hash)
    cosify_hash(l_hash)
    cos_sinify(l_hash)
    sinify(l_hash)
    total_locations = l_hash[:lat].count #3 cities
    x = (cosify_hash(l_hash)/total_locations)
    y = (cos_sinify(l_hash)/total_locations)
    z = (sinify(l_hash)/total_locations)
    hyp = sqrt((x*x)+(y*y))
    [x, y, z, hyp]
  end

  # Convert midpoint lat and lon from radians to degrees
  def radian_lat(l_hash)
    _x, _y, z, hyp = radian_calcs(l_hash)
    (atan2(z,hyp) * (180/PI)).round(5)
  end

  def radian_lng(l_hash)
    x, y, _z, _hyp = radian_calcs(l_hash)
   (atan2(y,x) * (180/PI)).round(5)
  end
  
end
