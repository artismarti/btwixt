class UserMeetingsController < ApplicationController

	def update
		@guest = current_user.id
		@meeting = Meeting.find(params["meeting"])
		@user_meeting = UserMeeting.find_by(
			:user_id => @guest,
			:meeting_id => @meeting
			)
		@user_meeting.update(:user_status => params["decision"])
    @meeting.recalculate_midpoint
    render json: @meeting
	end



end
