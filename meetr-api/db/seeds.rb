# User.destroy_all
# Meeting.destroy_all
# UserMeeting.destroy_all


# 5.times do
#   User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, password: Faker::Internet.password, guest: false)
# end
# 15.times do
#   User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, password: '', guest: true)
# end
# 10.times do
#   Meeting.create!(title: Faker::Nation.capital_city, date_time: Faker::Time.between(DateTime.now + 1, DateTime.now+20))
# end

# User.create!(first_name: "Arti", last_name: "Mathanda", email: "artismarti@gmail.com", password: "cat", guest: false)
# User.create!(first_name: "Megan", last_name: "Folsom", email: "m@f.com", password: "", guest: true)
# User.create!(first_name: "Graca", last_name: "Morgado", email: "g@m.com", password: "", guest: true)


UserMeeting.create(user_id: 21, meeting_id: 4, start_latitude: 51.53289 , start_longitude: -0.13096 ,user_status: "created", start_address: "W68JS" )
UserMeeting.create(user_id: 22, meeting_id: 4, start_latitude: 51.48881 , start_longitude: -0.22293 ,user_status: "invited", start_address: "W68JS" )
UserMeeting.create(user_id: 23, meeting_id: 4, start_latitude: 51.52612 , start_longitude: -0.10722 ,user_status: "invited", start_address: "W68JS" )


# UserMeeting.create(user_id: 2, meeting_id: 2, start_latitude: 51.53289 , start_longitude: -0.13096 ,user_status: "created", start_address: "W68JS"  )
# UserMeeting.create(user_id: 4, meeting_id: 2, start_latitude: 51.48881 , start_longitude: -0.22293 ,user_status: "invited")
# UserMeeting.create(user_id: 5, meeting_id: 2, start_latitude: 51.48881 , start_longitude: -0.22693 ,user_status: "invited")
# UserMeeting.create(user_id: 11, meeting_id: 2, start_latitude: 51.52612 , start_longitude: -0.10722 ,user_status: "invited")

# UserMeeting.create(user_id: 11, meeting_id: 4, start_latitude: 51.53289 , start_longitude: -0.13096 ,user_status: "created", start_address: "N31EY" )
# UserMeeting.create(user_id: 18, meeting_id: 4, start_latitude: 51.48881 , start_longitude: -0.22293 ,user_status: "invited")
# UserMeeting.create(user_id: 19, meeting_id: 4, start_latitude: 51.52612 , start_longitude: -0.10722 ,user_status: "declined")
