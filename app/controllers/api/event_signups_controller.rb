module Api
  class EventSignupsController < ApplicationController
    before_action :authenticate_user!

    def approve_registration
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      event_signup = EventSignup::find(params[:id])

      unless event_signup
        return render json: {error: 'User has not signed up for that event'}, status: :not_found
      end

      if event_signup.update(status: 'registered')
        UserMailer.event_registration_approved(event_signup.user, event_signup.event).deliver_later
        render json: {success: true}, status: :ok
      else
        render json: {error: 'Could not approve registration'}, status: :unprocessable_entity
      end
    end

    def show
      event_signup = EventSignup.find_by(user_id: params[:user_id], event_id: params[:event_id])
      if event_signup
        render json: {signedUp: true, event_signup: event_signup}, status: :ok
      else
        render json: {signedUp: false}, status: :ok
      end
    end

    def create
      @event_signup = EventSignup.new(event_signup_params)
      if @event_signup.save
        render json: {success: true}
      else
        render json: {error: @event_signup.errors.full_messages.join(", ")}, status: :unprocessable_entity
      end
    end

    def delete
      event_signup = EventSignup.find_by(user_id: params[:user_id], event_id: params[:event_id])
      if event_signup
        event_signup.destroy
        render json: {success: true}, status: :ok
      else
        render json: {error: 'Event signup not found'}, status: :not_found
      end
    end

    def signups_by_user
      event_signups = EventSignup.includes(:event).where(user_id: params[:user_id])
      render json: event_signups.as_json(include: {event: {only: [:id, :title, :date]}}), status: :ok
    end

    def signups_by_event
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      users_signed_up = EventSignup.includes(:user).where(event_id: params[:event_id])
      render json: users_signed_up.as_json(include: {user: {only: [:id, :email, :first_name, :last_name]}}), status: :ok
    end

    private

    def event_signup_params
      params.permit(:user_id, :event_id)
    end
  end
end