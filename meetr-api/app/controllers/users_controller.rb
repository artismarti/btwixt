class UsersController < ApplicationController
  before_action :find_user, only:[:show, :edit, :update, :destroy]

  def show
    if @user
      render json: @user
    else 
      render json: {error: 'User not found.'}, status: 404
    end
  end

  def index
		@users = User.all
		render json: @users
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params(:first_name, :last_name, :email, :password, :guest))
    if @user.valid?
      @user.save
      render json: @user
    else
      render json: { error: 'Unable to create user.' }, status: 400
    end
  end

  def signin
    @user = User.find_by(email: params[:email])
    if @user
      if !@user.guest? && @user.authenticate(params[:password])
        render json: {token: issue_token({id: @user.id}) }
      elsif !@user.guest? && !@user.authenticate(params[:password])
        render json: { error: 'Authentication Failed' }, status: 401
      elsif @user.guest?
        render json: {token: issue_token({id: @user.id}) }
      end
    else
      render json: {error: 'User not found'}, status: 404
    end
  end

  def validate
    @user = current_user
    if @user
      render json: {user: @user, token: issue_token({id: @user.id})}
    else
      render json: {error: 'User not found.'}, status: 404
    end
  end

  
  # Get all meeting & user details for all meetings of current user
  def get_meetings
    @user = current_user
    @meetings = @user.meetings.map { |meeting| { :meeting => 
      { meeting_details: meeting, users: assemble_user(meeting)
        }}}
    if @user
      render json: @meetings
    else
      render json: {error: 'Meetings not found.'}
    end
  end

  # Find all users that have previously been invited by current user
  def get_contacts
    @user = current_user
    if @user
      render json: @user.meetings.map { |meeting| { :contacts => meeting.users.distinct } }
    else
      render json: {error: 'Contacts not found.'}
    end
  end

  def update
    # @user.update(user_params(:first_name, :last_name, :email, :password))
    # if @user.valid?
    #   @user.save
    #   redirect_to user_path(@user)
    # else
    #   flash[:errors] = @user.errors.full_messages
    #   render :edit
    # end
  end

  def destroy
    # @user.destroy
    # flash[:success] = 'The user and all location & meeting data was wiped out'
    # redirect_to users_path

    # flash[:success] = 'The user and all location & meeting data was wiped out'
  end

  private
  def find_user
    @user = User.find_by(id: params[:id])
  end

  def user_params(*args)
    params.require(:user).permit(*args)
  end

  def assemble_user(meeting)
    meeting.users.map{|mu|
      user_meeting = UserMeeting.find_by(:user_id == mu.id , :meeting_id == meeting.id)
        {
          first_name: mu.first_name, 
          last_name: mu.last_name, 
          email: mu.email, 
          guest: mu.guest, 
          id: mu.id,
          start_address: user_meeting.start_address,
          start_latitude: user_meeting.start_latitude,
          start_longitude: user_meeting.start_longitude,
          user_status: user_meeting.user_status,
      }
    }
  end
end
