module Api
  class EventSignupsController < ApplicationController
    before_action :authenticate_user!

    def show
      event_signup = EventSignup.find_by(user_id: params[:user_id], event_id: params[:event_id])
      if event_signup
        render json: {signedUp: true}, status: :ok
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

    private

    def event_signup_params
      params.permit(:user_id, :event_id)
    end
  end
end