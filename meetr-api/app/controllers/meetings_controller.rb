class MeetingsController < ApplicationController
  before_action :find_meeting, only:[:show, :edit, :update, :destroy, :existing_invitees, :is_creator]
  before_action :existing_invitees, only:[:edit, :update]

  def show
    @meeting.get_venues(@meeting.midpoint_latitude,@meeting.midpoint_longitude)
  end

  def index
    @user_meetings = UserMeeting.where(user_id: current_user.id)
    @meetings = Meeting.where(id: @user_meetings.map {|um| um.meeting_id})
  end

  def create
    @users = User.all
    @meeting = Meeting.new(meeting_params(:title, :date_time))
    if @meeting.save
      render json: @meeting
    else
      render json: { error: 'Could not save meeting'}, status: 400
    end
  end

  def edit
    @users = User.all
    @creator = is_creator
  end

  private
  def is_creator
    @user_meetings = UserMeeting.where(meeting_id: @meeting)
    creator = false
    @user_meetings.each do |um|
      if um.user_status == "created" && um.user_id == current_user.id
        creator = true
      end
    end
    creator
  end

  def find_meeting
    @meeting = Meeting.find(params[:id])
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
