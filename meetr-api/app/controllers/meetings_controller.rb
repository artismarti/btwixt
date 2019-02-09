class MeetingsController < ApplicationController
  def show
    # @meeting.get_venues(@meeting.midpoint_latitude,@meeting.midpoint_longitude)
  end

  def destroy
    @meeting = Meeting.find(params["meeting"])
    @meeting.destroy
    if !@meeting
      render json: {message: "Success"}
    else
      render json: {error: "Error"}
    end
  end

  def create
    # Current user will get status == "created" in UserMeeting
    @user = current_user

    # Get or create all guests:
    @all_guests = params["invitees"].map{ |invitee_email| User.find_or_create_by(
      :email => invitee_email) }
    @meeting = Meeting.new(:title => params["title"], 
      :date_time => params["date_time"], 
      # Make  meeting mid point to be same as creators start lat long
      :midpoint_latitude => params["latitude"],
      :midpoint_longitude => params["longitude"])

    if @meeting.valid?
      @meeting.save
      # Create the UserMeeting for creator
      creator_user_meeting = UserMeeting.create!(:user_id => current_user.id, 
        :meeting_id => @meeting.id, 
        :user_status => "created", 
        :start_address => params[:start_address],
        :start_latitude => params["latitude"],
        :start_longitude => params["longitude"])
      # Save
      creator_user_meeting.save
      #  Create invitee usermeeting records
        @all_guests.each do |guest|
          UserMeeting.create(:user_id => guest.id, 
          :meeting_id => @meeting.id, 
          :user_status => "invited",
          #  Update the invitee start lat long to be the same as the creators start lat long
          :start_address => params[:start_address],
          :start_latitude => params["latitude"],
          :start_longitude => params["longitude"])
        end
    end
  end

  def update_midpoint
    @user = current_user.id
    @meetings = current_user.meetings
    @meeting = Meeting.find(params["meeting"])
    @user_meeting = UserMeeting.find_by(
      :user_id => @user,
      :meeting_id => @meeting
      )
    @user_meeting.update(:start_address => params["startLocation"])
    @user_meeting.get_lat_lng(params["startLocation"])
    if @user_meeting.user_status == 'created'
      @pending_guests = UserMeeting.where(
        :user_status => 'invited',
        :meeting_id => @meeting
      )
      @pending_guests.update(:start_address => params["startLocation"])
      @pending_guests.each{|pg| pg.get_lat_lng(params["startLocation"])}
    end    
    @meeting.recalculate_midpoint
    render json: @meetings, each_serializer: MeetingsInfoSerializer
    
  end  

  private

  def find_meeting
    # @meeting = Meeting.find(params[:id])
  end

  def existing_invitees
    @user_meetings = UserMeeting.all
    meetings = @user_meetings.select{|um| um.meeting_id == @meeting.id}
    @existing_invitees = meetings.map{|u| u.user_id}
  end

  def meeting_params(*args)
    params.require(:meeting).permit(*args)
  end

end