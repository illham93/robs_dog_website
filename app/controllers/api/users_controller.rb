module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:index, :update, :add_member, :remove_member]

    def index
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      users = User.order(created_at: :desc)
      if users
        render json: {users: users.as_json(except: [:password])}, status: :ok
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

    def update
      user = User.find(params[:id])

      unless @user.admin? || @user == user
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      if user.update(user_params)
        render json: {success: true}, status: :ok
      else
        render json: { error: @user.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end      
    end

    def add_member
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      user = User.find(params[:id])
      if user.update(user_params.merge(member: 1))
        render json: {success: true}, status: :ok
      else
        render json: {error: 'Could not add member'}, status: :unprocessable_entity
      end
    end

    def remove_member
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      user = User.find(params[:id])
      if user.update(member: 0)
        render json: {success: true}, status: :ok
      else
        render json: {error: 'Could not remove member'}, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.permit(:email, :password, :member, :first_name, :last_name, :phone, :town).tap do |whitelisted|
        whitelisted.delete(:password) if whitelisted[:password].blank?
      end
    end    
  end
end