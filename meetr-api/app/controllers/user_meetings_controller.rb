class UserMeetingsController < ApplicationController

	def update
		@guest = current_user.id
		@meeting = Meeting.find(params["meeting"])
		@user_meeting = UserMeeting.find_by(
			:user_id => @guest,
			:meeting_id => @meeting
			)
		@user_meeting.update(:user_status => params["decision"])
		# @user_meeting.get_lat_lng(params["startLocation"])
    @meeting.recalculate_midpoint
    render json: {message: "Updated Midpoint"}
	end

end
