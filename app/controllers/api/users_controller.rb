module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:index]

    def index
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end
      
      users = User.order(created_at: :desc)
      if users
        render json: {users: users}, status: :ok
      else
        render json: {error: 'users not found'}, status: :not_found
      end
    end

    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else
        render json: { error: @user.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end