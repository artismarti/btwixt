class MeetingsController < ApplicationController
  before_action :find_meeting, only:[:show, :edit, :update, :destroy, :existing_invitees, :is_creator]
  before_action :existing_invitees, only:[:edit, :update]

  def show
    # @meeting.get_venues(@meeting.midpoint_latitude,@meeting.midpoint_longitude)
  end

  def index
    # @meetings = UserMeeting.find_by(:user_id => current_user)
		# render json: @meetings
    # # @user_meetings = UserMeeting.where(user_id: current_user.id)
    # # @meetings = Meeting.where(id: @user_meetings.map {|um| um.meeting_id})
  end

  def create
    # Current user will get status == "created" in UserMeeting
    @user = current_user

    # Get or create all guests:
    @all_guests = params["invitees"].map{ |invitee_email| User.find_or_create_by(:email => invitee_email) }

    @meeting = Meeting.new(:title => params["title"], 
      :date_time => params["date_time"], 
      # Make  meeting mid point to be same as creators start lat long
      :midpoint_latitude => params["latitude"],
      :midpoint_longitude => params["longitude"])
      byebug

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
        invitee_user_meeting = UserMeeting.create(:user_id => guest.id, 
          :meeting_id => @meeting.id, 
          :user_status => "invited",
          #  Update the invitee start lat long to be the same as the creators start lat long
          :start_address => params[:start_address],
          :start_latitude => params["latitude"],
          :start_longitude => params["longitude"])
        
        end
      end
    end

  def edit
    @users = User.all
    @creator = is_creator
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