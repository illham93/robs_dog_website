module Api
  class EventSignupsController < ApplicationController
    before_action :authenticate_user!

    def create
      @event_signup = EventSignup.new(event_signup_params)
      if @event_signup.save
        render json: {success: true}
      else
        render json: {error: @event_signup.errors.full_messages.join(", ")}, status: :unprocessable_entity
      end
    end

    private

    def event_signup_params
      params.permit(:user_id, :event_id)
    end
  end
end