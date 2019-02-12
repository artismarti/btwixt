class UsersController < ApplicationController
  before_action :find_user, only:[:show, :edit, :update]

  def index
		@user = current_user
    if @user
      render json: @user
    else 
      render json: {error: 'User not found.'}, status: 404
    end
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
    @meetings = @user.meetings
    if @user
      render json: @meetings, each_serializer: MeetingsInfoSerializer
    else
      render json: {error: 'Meetings not found.'}
    end
  end

  # Find all users that have previously been invited by current user
  def get_contacts
    @user = current_user
    if @user
      render json: @user.meetings.map { |meeting| { :contacts => meeting.users } }
    else
      render json: {error: 'Contacts not found.'}
    end
  end

  def update
    byebug
    if @user.password == BCrypt::Password.create(params[:currentPassword])
       @user.update(user_params(:first_name, :last_name, :password => newPassword))
       byebug
      if @user.valid?
       @user.save
        render json: {success: 'User updated.'}
      else
        render json: {error: 'Could not update user.'}
      end
    end
    else 
      byebug
      render json: {error: 'Incorrect Password'}
  end


  private
  def find_user
    @user = current_user
  end

  def user_params(*args)
    params.require(:user).permit(*args)
  end

  
end
